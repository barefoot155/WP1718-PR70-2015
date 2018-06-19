using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class DispecerController : ApiController
    {
        public List<Voznja> Get(string korIme)
        {
            Dispecer k = (Dispecer)System.Web.HttpContext.Current.Session["mojaSesija"];

            return k.Voznje;
        }
        // GET: api/Dispecer/5
        public Dispecer Get()
        {
            Dispecer k = (Dispecer)System.Web.HttpContext.Current.Session["mojaSesija"];
            
            return k;
        }
        public HttpResponseMessage Get(string x, string y, string tip, string ulica, string broj, string posta, string grad, string korIme)
        {
            HttpResponseMessage ret = new HttpResponseMessage();
            ret.StatusCode = HttpStatusCode.OK;
            string xxx = ulica;
            Adresa adresa = new Adresa() { Ulica = ulica, Broj = broj, NaseljenoMjesto = grad, PozivniBrojMjesta = posta };
            Lokacija lokacija = new Lokacija() { Adresa = adresa, KoordinataX = x, KoordinataY = y };
            Voznja voznja = new Voznja() { DatumIVrijemePorudzbe = DateTime.Now, Musterija ="nepoznato", StatusVoznje = StatusiVoznje.Kreirana_NaCekanju, Lokacija = lokacija, TipAutomobila = (TipoviAutomobila)(int.Parse(tip)) };
            Dispecer disp = Korisnici.ListaDispecera.FirstOrDefault(m => m.KorisnickoIme == korIme);
            disp.Voznje.Add(voznja);

            System.Web.HttpContext.Current.Session["mojaSesija"] = disp;
            return ret;
        }

        // POST: api/Dispecer
        public HttpResponseMessage Post([FromBody]Dispecer dispecer)
        {
            string ime = dispecer.Ime;
            HttpResponseMessage mess = new HttpResponseMessage();
            //Musterija m = musterija;
            if (Korisnici.ListaDispecera.FirstOrDefault(d => dispecer.KorisnickoIme == d.KorisnickoIme)!=null)
            {
                int ind = Korisnici.ListaDispecera.IndexOf(Korisnici.ListaDispecera.FirstOrDefault(d => dispecer.KorisnickoIme == d.KorisnickoIme));
                //ne postoji korisnicko ime do sad
                dispecer.Uloga = Uloge.Dispecer;
                Korisnici.ListaDispecera[ind]=dispecer;
                System.Web.HttpContext.Current.Session["mojaSesija"] = dispecer;
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

        // PUT: api/Dispecer/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Dispecer/5
        public void Delete(int id)
        {
        }
    }
}
