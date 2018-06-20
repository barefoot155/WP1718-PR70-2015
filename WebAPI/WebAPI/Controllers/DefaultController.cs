using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class DefaultController : ApiController
    {
        [HttpGet, Route("")]
        public RedirectResult Index()
        {
            var cookie = Request.Headers.GetCookies("mojKuki").FirstOrDefault();
            var requestUri = Request.RequestUri;
            
            if (cookie == null)
            {
                return Redirect(requestUri.AbsoluteUri + "Login.html");
            }
            else//zavisi od toga koji je korisnik
            {
                string imeKukija = cookie["mojKuki"].Value;//dobijamo username
                Korisnik korisnik;
                if ((Korisnici.ListaDispecera.FirstOrDefault(dispecer => dispecer.KorisnickoIme == imeKukija)) != null)
                {
                    korisnik = Korisnici.ListaDispecera.FirstOrDefault(dispecer => dispecer.KorisnickoIme == imeKukija);

                    //HttpCookie httpCookie = new HttpCookie("mojKuki");
                    //HttpCookie myCookie = Request.Cookies["mojCookie"];
                    //System.Web.HttpContext.Current.SetSessionStateBehavior(System.Web.SessionState.SessionStateBehavior.Required);
                    //System.Web.HttpContext.Current.Session["mojaSesija"] = new Dispecer();
                    System.Web.HttpContext.Current.Session["mojaSesija"] = (Dispecer)korisnik;
                    return Redirect(requestUri.AbsoluteUri + "Dispecer.html");
                    //return korisnik.Uloga.ToString();
                }
                else if ((Korisnici.ListaVozaca.FirstOrDefault(vozac => vozac.KorisnickoIme == imeKukija)) != null)
                {
                    korisnik = Korisnici.ListaVozaca.FirstOrDefault(vozac => vozac.KorisnickoIme == imeKukija);
                    //System.Web.HttpContext.Current.Session["mojaSesija"] = new Vozac();
                    System.Web.HttpContext.Current.Session["mojaSesija"] = korisnik;
                    //return korisnik.Uloga.ToString();
                    return Redirect(requestUri.AbsoluteUri + "Vozac.html");
                }
                else if ((Korisnici.ListaMusterija.FirstOrDefault(musterija => musterija.KorisnickoIme == imeKukija)) != null)
                {
                    korisnik = Korisnici.ListaMusterija.FirstOrDefault(musterija => musterija.KorisnickoIme == imeKukija);
                    //System.Web.HttpContext.Current.Session["mojaSesija"] = new Musterija();
                    System.Web.HttpContext.Current.Session["mojaSesija"] = korisnik;
                    return Redirect(requestUri.AbsoluteUri + "Musterija.html");
                    //return korisnik.Uloga.ToString();
                }
                else
                {
                    //null je - ne postoji u listama, mozda je u medjuvremenu izbrisan
                    //return "Pogresno korisnicko ime ili lozinka";
                }
                System.Web.HttpContext.Current.Session["mojaSesija"] = null;
                return Redirect(requestUri.AbsoluteUri + "Login.html");

            }
            
        }
    }
}
