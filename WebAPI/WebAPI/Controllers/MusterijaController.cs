using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class MusterijaController : ApiController
    {
        [HttpGet]
        [Route("api/Musterija/OstaviKomentar/")]
        public void OstaviKomentar(string Opis,string Ocjena, string Korisnik, string Voznja)
        {
            string koment = Opis;
            string idVoznje = Voznja.Substring(9);
            int i = int.Parse(idVoznje);
            Musterija must = Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == Korisnik);
            int indVoznja = must.Voznje.IndexOf(must.Voznje.FirstOrDefault(v => v.Id == i));
            Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == Korisnik).Voznje[indVoznja].Komentar = new Komentar() { Korisnik = Korisnik, Voznja = Voznja, DatumObjave = DateTime.Now, Opis = Opis, Ocjena = (Ocjene)(int.Parse(Ocjena)) };
            //return Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje.FirstOrDefault(v => v.Id == i);
        }
        [HttpGet]
        [Route("api/Musterija/VratiVoznju/")]
        public Voznja VratiVoznju(string id,string korIme)
        {
            string idMusterija = id.Substring(11);
            int i = int.Parse(idMusterija);
            Musterija must = Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme);
            //int indVoznja = must.Voznje.IndexOf(must.Voznje.FirstOrDefault(v => v.Id == i));
            return Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje.FirstOrDefault(v => v.Id == i);
        }
        public void Get(string id,string korIme)
        {
            string idMusterija = id.Substring(9);
            int i = int.Parse(idMusterija);
            Musterija must = Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme);
            int indVoznja = must.Voznje.IndexOf(must.Voznje.FirstOrDefault(v => v.Id == i));
            //must.Voznje.RemoveAt(indVoznja);
            Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje[indVoznja].StatusVoznje=StatusiVoznje.Otkazana;
            Musterija ret = Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme);
            System.Web.HttpContext.Current.Session["mojaSesija"] = ret;
        }
        public List<Voznja> Get(string korIme)
        {
            Musterija k = (Musterija)System.Web.HttpContext.Current.Session["mojaSesija"];

            return k.Voznje;
        }
        // GET: api/Musterija/5
        public Musterija Get()
        {
            Musterija k = (Musterija)System.Web.HttpContext.Current.Session["mojaSesija"];

            return k;
        }
        public HttpResponseMessage Get(string x,string y,string tip,string ulica,string broj,string posta,string grad,string korIme)
        {
            HttpResponseMessage ret = new HttpResponseMessage();
            ret.StatusCode = HttpStatusCode.OK;
            string xxx = ulica;

            Adresa adresa = new Adresa() { Ulica = ulica, Broj = broj, NaseljenoMjesto = grad, PozivniBrojMjesta = posta };
            Lokacija lokacija = new Lokacija() { Adresa = adresa, KoordinataX = x, KoordinataY = y };
            Voznja voznja = new Voznja() { DatumIVrijemePorudzbe = DateTime.Now, Musterija = korIme, StatusVoznje = StatusiVoznje.Kreirana_NaCekanju, Lokacija = lokacija, TipAutomobila = (TipoviAutomobila)(int.Parse(tip)), Komentar = new Komentar() { Opis = "", Ocjena = Ocjene.Jedan } };
            //Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje.IndexOf()
            Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje.Add(voznja);
            
            
            System.Web.HttpContext.Current.Session["mojaSesija"] = Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme);
            return ret;
        }
        [HttpGet]
        [Route("api/Musterija/IzmijeniVoznju/")]
        public void Get(string x, string y, string tip, string ulica, string broj, string posta, string grad, string korIme,string id)
        {
            int i = int.Parse(id);//izmijeniti jer se ovdje id promijeni
            string xxx = ulica;
            Adresa adresa = new Adresa() { Ulica = ulica, Broj = broj, NaseljenoMjesto = grad, PozivniBrojMjesta = posta };
            Lokacija lokacija = new Lokacija() { Adresa = adresa, KoordinataX = x, KoordinataY = y };
            Voznja voznja = new Voznja() { DatumIVrijemePorudzbe = DateTime.Now, Musterija = korIme, StatusVoznje = StatusiVoznje.Kreirana_NaCekanju, Lokacija = lokacija, TipAutomobila = (TipoviAutomobila)(int.Parse(tip)) };
            Voznja voz = Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje.FirstOrDefault(v=>v.Id==i);
            int indexVoznje = Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje.IndexOf(voz);
            Komentar kom = Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje[indexVoznje].Komentar;
            //sve preko indeksa izmijeni
            voznja.Komentar = kom;
            Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje[indexVoznje] = voznja;
            System.Web.HttpContext.Current.Session["mojaSesija"] = Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme);
            
        }

        // POST: api/Musterija
        public HttpResponseMessage Post([FromBody]Musterija musterija)
        {
            string ime = musterija.Ime;
            HttpResponseMessage mess = new HttpResponseMessage();
            //Musterija m = musterija;
            if (Korisnici.ListaMusterija.FirstOrDefault(d => musterija.KorisnickoIme == d.KorisnickoIme) != null)
            {
                int ind = Korisnici.ListaMusterija.IndexOf(Korisnici.ListaMusterija.FirstOrDefault(d => musterija.KorisnickoIme == d.KorisnickoIme));
                //ne postoji korisnicko ime do sad
                musterija.Uloga = Uloge.Musterija;
                musterija.Voznje = Korisnici.ListaMusterija[ind].Voznje;
                Korisnici.ListaMusterija[ind] = musterija;
                System.Web.HttpContext.Current.Session["mojaSesija"] = musterija;
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
        

        // PUT: api/Musterija/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Musterija/5
        public void Delete(int id)
        {
           
        }
    }
}
