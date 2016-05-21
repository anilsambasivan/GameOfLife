using System.Data.Entity.ModelConfiguration;
using GameOfLife.Core.Data.Pattern;

namespace GameOfLife.Core.Mapping
{
    public class PatternMap : GameOfLifeEntityTypeConfiguration<Pattern>
    {
        public PatternMap()
        {
            this.ToTable("Pattern");
            this.HasKey(a => a.Id);
        }
    }
}
