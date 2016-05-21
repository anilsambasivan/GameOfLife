namespace GameOfLifeApi.Models
{
    public class Rule
    {
        public int Id { get; set; }
        public int[] Survival { get; set; }
        public int[] Birth { get; set; }
    }
}