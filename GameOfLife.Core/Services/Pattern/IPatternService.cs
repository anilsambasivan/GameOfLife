
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GameOfLife.Core.Services.Pattern
{
    public interface IPatternService
    {
        /// <summary>
        /// Gets a Pattern by Pattern identifier
        /// </summary>
        /// <param name="patternId">Pattern identifier</param>
        /// <returns>Data.Pattern.Pattern</returns>
        Task<Data.Pattern.Pattern> GetPatternByIdAsync(int patternId);

        /// <summary>
        /// Gets all Patterns
        /// </summary>
        /// <returns>Data.Pattern.Pattern</returns>
        Task<IEnumerable<Data.Pattern.Pattern>> GetAllPatternsAsync();

    }
}
