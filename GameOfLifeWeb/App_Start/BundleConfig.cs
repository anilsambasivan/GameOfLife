using System.Web;
using System.Web.Optimization;

namespace GameOfLifeWeb
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/css/bootstrap.css",
                      "~/Content/css/portfolio-item.css",
                      "~/Content/app.css"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/lib/jquery/jquery-2.2.3.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/content/js/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/underscore").Include(
                      "~/Scripts/lib/underscore/underscore.js"));

            bundles.Add(new ScriptBundle("~/bundles/backbone").Include(
                      "~/Scripts/lib/backbone/backbone.js"));

            bundles.Add(new ScriptBundle("~/bundles/gameoflife").Include(
                      "~/Scripts/gameoflife.js"));
        }
    }
}
