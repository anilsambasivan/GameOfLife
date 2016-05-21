using System.Data.Entity.ModelConfiguration;
using GameOfLife.Core.Data.Rule;

namespace GameOfLife.Core.Mapping
{
    public class RuleMap : GameOfLifeEntityTypeConfiguration<Rule>
    {
        public RuleMap()
        {
            this.ToTable("Rule");
            this.HasKey(a => a.Id);
        }
    }
}
