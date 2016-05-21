
using System.Threading.Tasks;

namespace GameOfLife.Core.Services.Rule
{
    public partial class RuleService : IRuleService
    {
        #region Fields

        private readonly IRepository<Data.Rule.Rule> _ruleRepository;

        #endregion

        #region Ctor

        /// <summary>
        /// Ctor
        /// </summary>
        /// <param name="ruleRepository">Rule repository</param>
        public RuleService(IRepository<Data.Rule.Rule> ruleRepository)
        {
            this._ruleRepository = ruleRepository;
        }

        #endregion

        #region Methods

        /// <summary>
        /// Gets a Rule by rule identifier
        /// </summary>
        /// <returns>Data.Rule.Rule</returns>
        public virtual async Task<Data.Rule.Rule> GetRuleByIdAsync(int id)
        {
            return await _ruleRepository.GetByIdAsync(id);
        }

        #endregion
    }
}
