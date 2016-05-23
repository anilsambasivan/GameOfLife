using System.Configuration;
using System.Web.Mvc;
using GameOfLifeWeb.Models;

namespace GameOfLifeWeb.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var model = new HomeModel
            {
                ApiUrl = System.Configuration.ConfigurationManager.AppSettings["apiurl"]
            };
            return View(model);
        }
    }
}