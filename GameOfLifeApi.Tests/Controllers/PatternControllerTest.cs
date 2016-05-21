using GameOfLife.Core.Services.Pattern;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using GameOfLifeApi.Controllers;

namespace GameOfLifeApi.Tests.Controllers
{
    [TestClass]
    public class PatternControllerTest
    {
        private IPatternService _patternService;

        public PatternControllerTest(IPatternService patternService)
        {
            _patternService = patternService;
        }

        [TestMethod]
        public void GetPattern()
        {
            // Arrange
            var controller = new PatternController(_patternService);
            var id = 1;
            // Act
            var result = controller.GetPatternById(id);

            // Assert
            Assert.IsNotNull(result);
        //    Assert.AreEqual("", result.Name);
        //    Assert.AreEqual(3, result.Data);
        }
    }
}
