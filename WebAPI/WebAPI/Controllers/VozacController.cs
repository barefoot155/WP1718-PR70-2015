using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class VozacController : ApiController
    {

        // GET: api/Vozac/5
        public Vozac Get()
        {
            Vozac k = (Vozac)System.Web.HttpContext.Current.Session["mojaSesija"];

            return k;
        }

        // POST: api/Vozac
        public HttpResponseMessage Post([FromBody]Vozac vozac)
        {
            string ime = vozac.Ime;
            HttpResponseMessage mess = new HttpResponseMessage();
            //Musterija m = musterija;
            if (Korisnici.ListaVozaca.FirstOrDefault(d => vozac.KorisnickoIme == d.KorisnickoIme) != null)
            {
                int ind = Korisnici.ListaVozaca.IndexOf(Korisnici.ListaVozaca.FirstOrDefault(d => vozac.KorisnickoIme == d.KorisnickoIme));
                //ne postoji korisnicko ime do sad
                vozac.Uloga = Uloge.Vozac;
                Korisnici.ListaVozaca[ind] = vozac;
                System.Web.HttpContext.Current.Session["mojaSesija"] = vozac;
                mess.StatusCode = HttpStatusCode.OK;
                return mess;
            }
            else
            {
                // postoji korisnicko ime vec
                mess.StatusCode = HttpStatusCode.NotAcceptable;
                return mess;
            }
        }

        // PUT: api/Vozac/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Vozac/5
        public void Delete(int id)
        {
        }
    }
}
