using System;
using System.Linq;

namespace GameOfLife.Core.Extentions
{
    public static class StringExtensions
    {
        public static string ToCommaSeperatedString(this int[] sourceString)
        {
            return string.Join(",", sourceString);
        }

        public static int[] ToIntegerArray(this string sourceString)
        {
            return sourceString.Split(',').Select(n => Convert.ToInt32(n)).ToArray();
        }
    }
}
