using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using GameOfLife.Core.Data.Pattern;
using GameOfLife.Core.Services.Pattern;

namespace GameOfLifeApi.Controllers
{
    public class PatternController : ApiController
    {
        private IPatternService _patternService;

        public PatternController(IPatternService patternService)
        {
            _patternService = patternService;
        }

        public async Task<HttpResponseMessage> Get()
        {
            HttpResponseMessage response;
            var patterns = await _patternService.GetAllPatternsAsync();
            if (patterns == null)
                response = new HttpResponseMessage(HttpStatusCode.NotFound);
            else
                response = Request.CreateResponse(HttpStatusCode.OK, patterns);

            return response;
        }

        [Route("{id}")]
        public async Task<HttpResponseMessage> GetPatternById(int id)
        {
            HttpResponseMessage response;
            var pattern = await _patternService.GetPatternByIdAsync(id);
            if (pattern == null)
                response = new HttpResponseMessage(HttpStatusCode.NotFound);
            else
            {
                response = Request.CreateResponse(HttpStatusCode.OK, pattern);
            }
            return response;
        }

        // POST: api/Pattern
        public void Post(Pattern pattern)
        {
            throw new HttpResponseException(HttpStatusCode.NotImplemented);
        }

        // PUT: api/Pattern/5
        public void Put(int id, Pattern pattern)
        {
            throw new HttpResponseException(HttpStatusCode.NotImplemented);
        }

        // DELETE: api/Pattern/5
        public void Delete(int id)
        {
            throw new HttpResponseException(HttpStatusCode.NotImplemented);
        }

        private object GetRandomLife()
        {
            Random rnd = new Random();
            var randomData = new bool[70, 70];
            for (var i = 0; i < 70; i++)
            {
                for (var j = 0; j < 70; j++)
                {
                    randomData[i, j] = ((rnd.Next(4900) % 5) == 0);
                }
            }

            return randomData;
        }
    }
}
