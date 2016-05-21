using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Security;
using System.Web.Http;
using GameOfLife.Core.ErrorLogging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace GameOfLifeApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            log4net.Config.XmlConfigurator.Configure();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}",
                defaults: new { id = RouteParameter.Optional }
            );

            var formatters = GlobalConfiguration.Configuration.Formatters;
            var jsonFormatter = formatters.JsonFormatter;
            var settings = jsonFormatter.SerializerSettings;
            settings.Formatting = Formatting.Indented;
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            GlobalConfiguration.Configuration.Filters.Add(
                new UnhandledExceptionFilterAttribute()
                    .Register<KeyNotFoundException>(HttpStatusCode.NotFound)
                    .Register<SecurityException>(HttpStatusCode.Forbidden)
                    .Register<SqlException>(
                        (exception, request) =>
                        {
                            var sqlException = exception as SqlException;

                            if (sqlException.Number > 50000)
                            {
                                var response = request.CreateResponse(HttpStatusCode.BadRequest);
                                response.ReasonPhrase = sqlException.Message.Replace(Environment.NewLine, String.Empty);

                                return response;
                            }
                            else
                            {
                                return request.CreateResponse(HttpStatusCode.InternalServerError);
                            }
                        }
                    )
                );
        }
    }
}
