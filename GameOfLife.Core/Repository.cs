using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace GameOfLife.Core
{
    /// <summary>
    /// Entity Framework repository
    /// </summary>
    public partial class Repository<T> : IRepository<T> where T : BaseModel
    {
        #region Fields

        private readonly IDbContext _context;
        private IDbSet<T> _entities;

        #endregion

        #region Ctor

        /// <summary>
        /// Ctor
        /// </summary>
        /// <param name="context">Object context</param>
        public Repository(IDbContext context)
        {
            this._context = context;
        }

        #endregion

        #region Methods

        /// <summary>
        /// Get entity by identifier
        /// </summary>
        /// <param name="id">Identifier</param>
        /// <returns>Entity</returns>
        public virtual async Task<T> GetByIdAsync(int id)
        {
            return await this.Entities.Where(e => e.Id == id).FirstOrDefaultAsync();
        }


        #endregion

        #region Properties
        /// <summary>
        /// Entities
        /// </summary>
        protected virtual IDbSet<T> Entities
        {
            get
            {
                if (_entities == null)
                    _entities = _context.Set<T>();
                return _entities;
            }
        }

        /// <summary>
        /// Gets a table
        /// </summary>
        public virtual IQueryable<T> Table
        {
            get
            {
                return this.Entities;
            }
        }
        #endregion
    }
}