using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class RegistracijaController : ApiController
    {
        // GET: api/Registracija
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Registracija/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Registracija
        public HttpResponseMessage Post([FromBody]Musterija musterija)
        {
            string ime = musterija.Ime;
            HttpResponseMessage mess = new HttpResponseMessage();
            //Musterija m = musterija;
            if(Korisnici.ListaDispecera.FirstOrDefault(dispecer => dispecer.KorisnickoIme == musterija.KorisnickoIme)==null && Korisnici.ListaVozaca.FirstOrDefault(dispecer => dispecer.KorisnickoIme == musterija.KorisnickoIme)==null && Korisnici.ListaMusterija.FirstOrDefault(dispecer => dispecer.KorisnickoIme == musterija.KorisnickoIme) == null)
            {
                //ne postoji korisnicko ime do sad
                musterija.Uloga = Uloge.Musterija;
                musterija.Voznje = new List<Voznja>();
                Korisnici.ListaMusterija.Add(musterija);
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

        // PUT: api/Registracija/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Registracija/5
        public void Delete(int id)
        {
        }
    }
}
