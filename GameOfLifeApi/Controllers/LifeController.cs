using System;
using System.Net;
using System.Net.Http;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using GameOfLife.Core.Constants;
using GameOfLife.Core.Extentions;
using GameOfLife.Core.Services.Rule;
using GameOfLifeApi.Models;

namespace GameOfLifeApi.Controllers
{
    public class LifeController : ApiController
    {
        private IRuleService _ruleService;


        public LifeController(IRuleService ruleService)
        {
            _ruleService = ruleService;
        }

        [Route("state")]
        public async Task<HttpResponseMessage> GetState(Life currentState, int neibhours)
        {
            HttpResponseMessage response;

            if (currentState == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            var rule = await _ruleService.GetRuleByIdAsync(Convert.ToInt32(Constants.RuleId));

            var mappedRule = new Rule
            {
                Id = rule.Id,
                Survival = rule.Survival.ToIntegerArray(),
                Birth = rule.Birth.ToIntegerArray()
            };

            State nextState = State.Dead;
            switch (currentState.State)
            {
                case State.Alive:
                    nextState = GetSurvivalStatus(mappedRule, neibhours);
                    break;
                case State.Dead:
                    nextState = GetBirthStatus(mappedRule, neibhours);
                    break;
            }

            response = Request.CreateResponse(HttpStatusCode.OK, new Life
            {
                State = nextState
            });

            return response;
        }

        private State GetSurvivalStatus(Rule rule, int neibhours)
        {
            return rule.Survival.Where(c => c == neibhours).Any() ? State.Alive : State.Dead;
        }

        private State GetBirthStatus(Rule rule, int neibhours)
        {
            return rule.Birth.Where(c => c == neibhours).Any() ? State.Alive : State.Dead;
        }
    }
}
