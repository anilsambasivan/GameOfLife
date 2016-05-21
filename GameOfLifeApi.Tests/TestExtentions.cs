using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using Moq;

namespace GameOfLifeApi.Tests
{
    public static class TestExtensions
    {
        /// <summary>
        /// Runs the controller action within a mocked HTTP context
        /// </summary>
        /// <typeparam name="T">The controller type</typeparam>
        /// <typeparam name="TReturn">The controller action return type</typeparam>
        /// <param name="controller"></param>
        /// <param name="func">The controller code to execute within a mocked HTTP context</param>
        /// <returns>The HttpResponseMessage containing the action result</returns>
        public static async Task<HttpResponseMessage> WithMockedHttpRequest<T, TReturn>(
            this T controller, Func<T, Task<TReturn>> func) where T : ApiController
        {
            // Build a mocked JSON request/response configuration
            MediaTypeFormatter expectedFormatter = new StubMediaTypeFormatter();
            MediaTypeHeaderValue expectedMediaType = new MediaTypeHeaderValue("text/json");
            ContentNegotiationResult negotiationResult = new ContentNegotiationResult(expectedFormatter, expectedMediaType);
            Mock<IContentNegotiator> contentNegotiator = new Mock<IContentNegotiator>();
            contentNegotiator
                .Setup(n => n.Negotiate(It.IsAny<Type>(), It.IsAny<HttpRequestMessage>(), It.IsAny<IEnumerable<MediaTypeFormatter>>()))
                .Returns(negotiationResult);
            using (HttpConfiguration configuration = CreateConfiguration(new StubMediaTypeFormatter(), contentNegotiator.Object))
            {
                controller.Configuration = configuration;
                // Build a mocked request context from which to build the response
                using (HttpRequestMessage request = new HttpRequestMessage())
                {
                    controller.Request = request;
                    var actionResult = await func.Invoke(controller);
                    // Create the response from the action result
                    if (typeof(IHttpActionResult).IsAssignableFrom(typeof(TReturn)))
                    {
                        return await ((IHttpActionResult)actionResult).ExecuteAsync(CancellationToken.None);
                    }
                    else
                    {
                        return await Task.FromResult(request.CreateResponse(actionResult));
                    }
                }
            }
        }

        private class StubMediaTypeFormatter : MediaTypeFormatter
        {
            public override bool CanReadType(Type type)
            {
                return true;
            }
            public override bool CanWriteType(Type type)
            {
                return true;
            }
        }

        private static HttpConfiguration CreateConfiguration(MediaTypeFormatter formatter, IContentNegotiator contentNegotiator)
        {
            HttpConfiguration configuration = new HttpConfiguration();
            configuration.Formatters.Clear();
            configuration.Formatters.Add(formatter);
            configuration.Services.Replace(typeof(IContentNegotiator), contentNegotiator);
            return configuration;
        }
    }
}
