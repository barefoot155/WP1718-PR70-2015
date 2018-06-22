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
        [HttpGet]
        [Route("api/Vozac/VratiKreirane")]
        public List<Voznja> VratiKreirane()
        {
            List<Voznja> ret = new List<Voznja>();
            foreach (var item in Korisnici.ListaMusterija)
            {
                ret.AddRange(item.Voznje.Where(d=>d.StatusVoznje== StatusiVoznje.Kreirana_NaCekanju));
            }
            
            return ret;
        }
        // GET: api/Vozac/5
        public Vozac Get()
        {
            Vozac k = (Vozac)System.Web.HttpContext.Current.Session["mojaSesija"];

            return k;
        }
        ///api/Vozac/PrihvatiVoznju
        [HttpGet]
        [Route("api/Vozac/PrihvatiVoznju/")]
        public void PrihvatiVoznju(string idVoznje,string idVozaca)
        {
            //od 11 substring
            string id = idVoznje.Substring(11);
            Voznja v = null;
            foreach (var item in Korisnici.ListaMusterija)
            {
                foreach (var item2 in item.Voznje)
                {
                    if (item2.Id == int.Parse(id))
                    {
                        item2.Vozac = idVozaca;
                        item2.StatusVoznje = StatusiVoznje.Prihvacena;
                        v = item2;
                    }
                }
            }
            Korisnici.ListaVozaca.FirstOrDefault(vo => vo.KorisnickoIme == idVozaca).Voznje.Add(v);
        }
        [HttpGet]
        [Route("api/Vozac/ObradiVoznju/")]
        public void ObradiVoznju(string idVoznje, string idVozaca)
        {
            //od 11 substring
            string id = idVoznje.Substring(11);
            Voznja v = null;
            foreach (var item in Korisnici.ListaMusterija)
            {
                foreach (var item2 in item.Voznje)
                {
                    if (item2.Id == int.Parse(id))
                    {
                        item2.Vozac = idVozaca;
                        item2.StatusVoznje = StatusiVoznje.Prihvacena;
                        v = item2;
                    }
                }
            }
            Korisnici.ListaVozaca.FirstOrDefault(vo => vo.KorisnickoIme == idVozaca).Voznje.Add(v);
        }
        [HttpGet]
        [Route("api/Vozac/NeuspjesnaVoznja/")]
        public void NeuspjesnaVoznja(string idVoznje,string idVozaca,string koment)
        {
            string j = koment;
            string id = idVoznje.Substring(9);
            Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).StatusVoznje=StatusiVoznje.Neuspjesna;
            Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Komentar.Opis=koment;
            Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Zauzet = false;
            if (Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Musterija!=null && Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Musterija != "")
            {
                string korImeMust = Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Musterija;
                Korisnici.ListaMusterija.FirstOrDefault(v => v.KorisnickoIme == korImeMust).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).StatusVoznje = StatusiVoznje.Neuspjesna;
                Korisnici.ListaMusterija.FirstOrDefault(v => v.KorisnickoIme == korImeMust).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Komentar.Opis=koment;
            }
            if (Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Dispecer != null && Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Dispecer != "")
            {
                string korImeDisp = Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Dispecer;
                Korisnici.ListaDispecera.FirstOrDefault(v => v.KorisnickoIme == korImeDisp).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).StatusVoznje = StatusiVoznje.Neuspjesna;
                Korisnici.ListaDispecera.FirstOrDefault(v => v.KorisnickoIme == korImeDisp).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Komentar.Opis = koment;
            }
            System.Web.HttpContext.Current.Session["mojaSesija"] = Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca);
            //Korisnici.ListaMusterija.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Komentar.Opis=koment;
        }
        [HttpGet]
        [Route("api/Vozac/UspjesnaVoznja/")]
        public void UspjesnaVoznja(string idVoznje, string idVozaca, string iznos,string broj,string ulica,string grad,string x,string y,string posta)
        {
            string j = ulica;
            string id = idVoznje.Substring(9);
            Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).StatusVoznje = StatusiVoznje.Uspjesna;
            Lokacija odr = new Lokacija() { KoordinataX = x, KoordinataY = y, Adresa = new Adresa() { Ulica = ulica, Broj = broj, NaseljenoMjesto = grad, PozivniBrojMjesta = posta } };
            Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Odrediste = odr;
            
            Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Zauzet = false;
            if (Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Musterija != null && Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Musterija != "")
            {
                string korImeMust = Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Musterija;
                Korisnici.ListaMusterija.FirstOrDefault(v => v.KorisnickoIme == korImeMust).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).StatusVoznje = StatusiVoznje.Uspjesna;
                Korisnici.ListaMusterija.FirstOrDefault(v => v.KorisnickoIme == korImeMust).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Odrediste = odr;
            }
            if (Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Dispecer != null && Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Dispecer != "")
            {
                string korImeDisp = Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Dispecer;
                Korisnici.ListaDispecera.FirstOrDefault(v => v.KorisnickoIme == korImeDisp).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).StatusVoznje = StatusiVoznje.Uspjesna;
                Korisnici.ListaDispecera.FirstOrDefault(v => v.KorisnickoIme == korImeDisp).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Odrediste=odr;
            }
            System.Web.HttpContext.Current.Session["mojaSesija"] = Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == idVozaca);
            //Korisnici.ListaMusterija.FirstOrDefault(v => v.KorisnickoIme == idVozaca).Voznje.FirstOrDefault(v => v.Id == int.Parse(id)).Komentar.Opis=koment;
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
