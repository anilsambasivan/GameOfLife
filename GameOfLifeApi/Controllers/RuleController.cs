using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using GameOfLife.Core.Constants;
using GameOfLife.Core.Services.Rule;
using GameOfLifeApi.Models;
using GameOfLife.Core.Extentions;
using log4net;

namespace GameOfLifeApi.Controllers
{
    public class RuleController : ApiController
    {
        private IRuleService _ruleService;
        private static readonly ILog _logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public RuleController(IRuleService ruleService)
        {
            _ruleService = ruleService;
        }

        public async Task<HttpResponseMessage> GetRule()
        {
            HttpResponseMessage response;
            var rule = await _ruleService.GetRuleByIdAsync(Convert.ToInt32(Constants.RuleId));

            if (rule == null)
                response = new HttpResponseMessage(HttpStatusCode.NotFound);
            else
            {
                var mappedRule = new Rule
                {
                    Id = rule.Id,
                    Survival = rule.Survival.ToIntegerArray(),
                    Birth = rule.Birth.ToIntegerArray()
                };
                response = Request.CreateResponse(HttpStatusCode.OK, mappedRule);
            }

            return response;
        }
    }
}
