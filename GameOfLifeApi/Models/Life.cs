namespace GameOfLifeApi.Models
{
    public class Life
    {
        public State State { get; set; }
    }

    public enum State
    {
        Alive,
        Dead
    }
}