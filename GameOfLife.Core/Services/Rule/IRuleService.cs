
using System.Threading.Tasks;

namespace GameOfLife.Core.Services.Rule
{
    public interface IRuleService
    {
        /// <summary>
        /// Gets a Rule by rule identifier
        /// </summary>
        /// <param name="ruleId">Rule identifier</param>
        /// <returns>Data.Rule.Rule</returns>
        Task<Data.Rule.Rule> GetRuleByIdAsync(int ruleId);
    }
}
