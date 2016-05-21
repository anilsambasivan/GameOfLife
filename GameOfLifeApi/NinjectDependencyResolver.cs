using System;
using System.Web;
using System.Web.Http;
using System.Web.Http.Dependencies;
using GameOfLife.Core.Services.Pattern;
using GameOfLife.Core.Services.Rule;
using Ninject;
using Ninject.Web.Common;

namespace GameOfLifeApi
{
    public class NinjectDependencyResolver : NinjectDependencyScope, IDependencyResolver
    {
        private readonly IKernel _kernel;

        public NinjectDependencyResolver(IKernel kernel)
            : base(kernel)
        {
            this._kernel = kernel;
        }

        public IDependencyScope BeginScope()
        {
            return new NinjectDependencyScope(_kernel.BeginBlock());
        }

    }
}