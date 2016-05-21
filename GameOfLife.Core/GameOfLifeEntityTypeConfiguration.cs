using System.Data.Entity.ModelConfiguration;

namespace GameOfLife.Core
{
    public class GameOfLifeEntityTypeConfiguration<T> : EntityTypeConfiguration<T> where T : class
    {
    }
}
