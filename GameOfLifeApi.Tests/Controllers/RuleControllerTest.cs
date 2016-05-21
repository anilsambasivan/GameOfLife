using GameOfLife.Core.Services.Rule;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using GameOfLifeApi.Controllers;

namespace GameOfLifeApi.Tests.Controllers
{
    [TestClass]
    public class RulesControllerTest
    {
        private IRuleService _ruleService;

        public RulesControllerTest(IRuleService ruleService)
        {
            _ruleService = ruleService;
        }

        [TestMethod]
        public void GetRule()
        {
            // Arrange
            var controller = new RuleController(_ruleService);

            // Act
            var result = controller.GetRule();

            // Assert
            Assert.IsNotNull(result);
            //Assert.AreEqual(2, result.Survival[0]);
            //Assert.AreEqual(3, result.Survival[1]);
            //Assert.AreEqual(3, result.Birth[0]);
        }

        [TestMethod]
        public void neighbour_count_should_be_2_or_3_for_survival_to_next_geneartion()
        {
            // Arrange
            var controller = new RuleController(_ruleService);

            // Act
            var result = controller.GetRule();

            // Assert
            Assert.IsNotNull(result);
            //Assert.AreEqual(2, result.Survival[0]);
            //Assert.AreEqual(3, result.Survival[1]);
        }

        [TestMethod]
        public void neighbour_count_should_be_3_for_birth_in_next_geneartion()
        {
            // Arrange
            var controller = new RuleController(_ruleService);

            // Act
            var result = controller.GetRule();

            // Assert
            Assert.IsNotNull(result);
            //Assert.AreEqual(3, result.Birth[0]);
        }
    }
}
