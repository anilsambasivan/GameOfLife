using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;

namespace GameOfLifeApi
{
    [assembly: log4net.Config.XmlConfigurator(Watch = true)]
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
