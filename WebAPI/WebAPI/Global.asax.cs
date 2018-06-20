﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.SessionState;
using WebAPI.Models;

namespace WebAPI
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            //HttpContext.Current.SetSessionStateBehavior(System.Web.SessionState.SessionStateBehavior.Required);
            string path = Server.MapPath("~/App_Data/Adminitratori.xml");
            Korisnici korisnici = new Korisnici(path);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            
        }
        public override void Init()
        {
            this.PostAuthenticateRequest += MyPostAuthenticateRequest;
            base.Init();
        }

        
        void MyPostAuthenticateRequest(object sender, EventArgs e)
        {
            
                System.Web.HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
            
        }
    }
}
