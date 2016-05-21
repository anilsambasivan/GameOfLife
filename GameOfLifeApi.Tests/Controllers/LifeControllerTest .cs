using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using GameOfLife.Core.Services.Rule;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using GameOfLifeApi.Controllers;
using GameOfLifeApi.Models;
using Moq;
using Rule = GameOfLife.Core.Data.Rule.Rule;

namespace GameOfLifeApi.Tests.Controllers
{
    [TestClass]
    public class LifeControllerTest 
    {
        private Mock<IRuleService> _ruleServiceMoq;

        public LifeControllerTest()
        {
            
        }

        [TestInitialize]
        public void SetupTests()
        {
            var rule = new Rule() { Birth = "3", Survival = "2,3"};

            _ruleServiceMoq = new Mock<IRuleService>();
            _ruleServiceMoq.Setup(x => x.GetRuleByIdAsync(1)).Returns(Task.FromResult(rule));
        }

        [TestMethod]
        public async Task GetLife()
        {
            // Arrange
            var controller = new LifeController(_ruleServiceMoq.Object);

            // Act
            HttpResponseMessage response = await controller.WithMockedHttpRequest(c => c.GetState(new Life{State = State.Dead}, 3));

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Life life;
            Assert.IsTrue(response.TryGetContentValue(out life));
            Assert.AreEqual(State.Alive, life.State);
        }

        [TestMethod]
        public async Task Alive_Cell_With_2_Alive_Neibhours_Should_Survive_To_Next_Generation()
        {
            // Arrange
            var controller = new LifeController(_ruleServiceMoq.Object);

            // Act
            HttpResponseMessage response = await controller.WithMockedHttpRequest(c => c.GetState(new Life { State = State.Alive }, 2));

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Life life;
            Assert.IsTrue(response.TryGetContentValue(out life));
            Assert.AreEqual(State.Alive, life.State);
        }

        [TestMethod]
        public async Task Alive_Cell_With_3_Alive_Neibhours_Should_Survive_To_Next_Generation()
        {
            // Arrange
            var controller = new LifeController(_ruleServiceMoq.Object);

            // Act
            HttpResponseMessage response = await controller.WithMockedHttpRequest(c => c.GetState(new Life { State = State.Alive }, 3));

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Life life;
            Assert.IsTrue(response.TryGetContentValue(out life));
            Assert.AreEqual(State.Alive, life.State);
        }

        [TestMethod]
        public async Task Dead_Cell_With_3_Alive_Neibhours_Should_Be_Alive_In_Next_Generation()
        {
            // Arrange
            var controller = new LifeController(_ruleServiceMoq.Object);

            // Act
            HttpResponseMessage response = await controller.WithMockedHttpRequest(c => c.GetState(new Life { State = State.Dead }, 3));

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Life life;
            Assert.IsTrue(response.TryGetContentValue(out life));
            Assert.AreEqual(State.Alive, life.State);
        }

        [TestMethod]
        public async Task Alive_Cell_With_Less_Than_2_Alive_Neibhours_Should_Die_In_Next_Generation_Due_To_Under_Population()
        {
            // Arrange
            var controller = new LifeController(_ruleServiceMoq.Object);

            // Act
            HttpResponseMessage response = await controller.WithMockedHttpRequest(c => c.GetState(new Life { State = State.Alive }, 1));

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Life life;
            Assert.IsTrue(response.TryGetContentValue(out life));
            Assert.AreEqual(State.Dead, life.State);
        }

        [TestMethod]
        public async Task Alive_Cell_With_Greater_Than_3_Alive_Neibhours_Should_Die_In_Next_Generation_Due_To_Over_Population()
        {
            // Arrange
            var controller = new LifeController(_ruleServiceMoq.Object);

            // Act
            HttpResponseMessage response = await controller.WithMockedHttpRequest(c => c.GetState(new Life { State = State.Alive }, 4));

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Life life;
            Assert.IsTrue(response.TryGetContentValue(out life));
            Assert.AreEqual(State.Dead, life.State);
        }
    }
}
