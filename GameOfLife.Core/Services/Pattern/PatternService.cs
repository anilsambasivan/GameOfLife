using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace GameOfLife.Core.Services.Pattern
{
    public partial class PatternService : IPatternService
    {
        #region Fields

        private readonly IRepository<Data.Pattern.Pattern> _patternRepository;

        #endregion

        #region Ctor

        /// <summary>
        /// Ctor
        /// </summary>
        /// <param name="patternRepository">Pattern repository</param>
        public PatternService(IRepository<Data.Pattern.Pattern> patternRepository)
        {
            this._patternRepository = patternRepository;
        }

        #endregion

        #region Methods

        /// <summary>
        /// Gets a Pattern by Pattern identifier
        /// </summary>
        /// <param name="patternId">Pattern identifier</param>
        /// <returns>Data.Pattern.Pattern</returns>
        public async Task<Data.Pattern.Pattern> GetPatternByIdAsync(int patternId)
        {
            return await _patternRepository.GetByIdAsync(patternId);
        }

        public async Task<IEnumerable<Data.Pattern.Pattern>> GetAllPatternsAsync()
        {
            return await _patternRepository.Table.ToListAsync<Data.Pattern.Pattern>();
        }

        #endregion
    }
}
