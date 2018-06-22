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
        //api/Dispecer/VratiSveVoznje
        [HttpGet]
        [Route("api/Dispecer/VratiSveVoznje")]
        public List<Voznja> VratiSveVoznje()
        {
            List<Voznja> ret = new List<Voznja>();
            foreach (var item in Korisnici.ListaMusterija)
            {
                ret.AddRange(item.Voznje);
            }
            foreach (var item in Korisnici.ListaDispecera)
            {
                foreach (var item2 in item.Voznje)
                {
                    if (!ret.Contains(item2))
                    {
                        ret.Add(item2);
                    }
                }
            }
            return ret;
        }
        [HttpGet]
        [Route("api/Dispecer/VratiSlobodneVozace")]
        public List<Vozac> VratiSlobodneVozace()
        {
            var ret = Korisnici.ListaVozaca.Where(v => !v.Zauzet).ToList();
            return ret;
        }
        [HttpGet]
        [Route("api/Dispecer/ObradiVoznju/")]
        public void ObradiVoznju(string id,string korImeDisp, string korImeMusterije, string vozac)
        {
            string id2 = id;
            id2 = id.Substring(9);
            Voznja voznja = Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korImeMusterije).Voznje.FirstOrDefault(v => v.Id == int.Parse(id2));
            int indVoz = Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korImeMusterije).Voznje.IndexOf(voznja);
            Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korImeMusterije).Voznje[indVoz].StatusVoznje = StatusiVoznje.Obradjena;
            Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korImeMusterije).Voznje[indVoz].Dispecer = korImeDisp;
            Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korImeMusterije).Voznje[indVoz].Vozac = vozac;
            voznja.StatusVoznje = StatusiVoznje.Obradjena;
            voznja.Dispecer = korImeDisp;
            voznja.Vozac = vozac;
            Korisnici.ListaDispecera.FirstOrDefault(d => d.KorisnickoIme == korImeDisp).Voznje.Add(voznja);
            Korisnici.ListaVozaca.FirstOrDefault(d => d.KorisnickoIme == vozac).Voznje.Add(voznja);
            Korisnici.ListaVozaca.FirstOrDefault(d => d.KorisnickoIme == vozac).Zauzet = true;
        }
        [HttpPost]
        [Route("api/Dispecer/DodajVozaca/")]
        public HttpResponseMessage DodajVozaca([FromBody]Vozac voz)//from body?
        {
            string ime = voz.Ime;
            HttpResponseMessage mess = new HttpResponseMessage();
            //Musterija m = musterija;
            if (Korisnici.ListaDispecera.FirstOrDefault(dispecer => dispecer.KorisnickoIme == voz.KorisnickoIme) == null && Korisnici.ListaVozaca.FirstOrDefault(dispecer => dispecer.KorisnickoIme == voz.KorisnickoIme) == null && Korisnici.ListaMusterija.FirstOrDefault(dispecer => dispecer.KorisnickoIme == voz.KorisnickoIme) == null)
            {
                //ne postoji korisnicko ime do sad
                voz.Uloga = Uloge.Vozac;
                voz.Voznje = new List<Voznja>();
                voz.Zauzet = false;
                Korisnici.ListaVozaca.Add(voz);
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
        public List<Voznja> Get(string korIme)
        {
            //Dispecer k = (Dispecer)System.Web.HttpContext.Current.Session["mojaSesija"];
            return Korisnici.ListaDispecera.FirstOrDefault(v => v.KorisnickoIme == korIme).Voznje;
            //return k.Voznje;
        }
        // GET: api/Dispecer/5
        public Dispecer Get()
        {
            Dispecer k = (Dispecer)System.Web.HttpContext.Current.Session["mojaSesija"];
            
            return k;
        }
        public HttpResponseMessage Get(string x, string y, string tip, string ulica, string broj, string posta, string grad, string korIme,string vozac)
        {
            HttpResponseMessage ret = new HttpResponseMessage();
            ret.StatusCode = HttpStatusCode.OK;
            string xxx = ulica;
            string usernameVozaca = vozac;
            Adresa adresa = new Adresa() { Ulica = ulica, Broj = broj, NaseljenoMjesto = grad, PozivniBrojMjesta = posta };
            Lokacija lokacija = new Lokacija() { Adresa = adresa, KoordinataX = x, KoordinataY = y };
            Voznja voznja = new Voznja() { DatumIVrijemePorudzbe = DateTime.Now, Musterija ="nepoznato", Vozac=vozac, Dispecer = korIme, StatusVoznje = StatusiVoznje.Formirana, Lokacija = lokacija, Komentar = new Komentar() { Opis="", Ocjena=Ocjene.Neocijenjeno}, TipAutomobila = (TipoviAutomobila)(int.Parse(tip))};
            Dispecer disp = Korisnici.ListaDispecera.FirstOrDefault(m => m.KorisnickoIme == korIme);
            /*Voznja voz = Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje.FirstOrDefault(v => v.Id == i);
            int indexVoznje = Korisnici.ListaDispecera.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje.IndexOf(voz);
            Komentar kom = Korisnici.ListaDispecera.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje[indexVoznje].Komentar;
            //sve preko indeksa izmijeni
            voznja.Komentar = kom;*/
            disp.Voznje.Add(voznja);
            Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == vozac).Voznje.Add(voznja);
            Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == vozac).Zauzet=true;
            System.Web.HttpContext.Current.Session["mojaSesija"] = disp;
            return ret;
        }

        // POST: api/Dispecer
        public HttpResponseMessage Post([FromBody]Dispecer dispecer)
        {
            string ime = dispecer.Ime;
            HttpResponseMessage mess = new HttpResponseMessage();
            //mora postojati ako je izmjena podataka
            if (Korisnici.ListaDispecera.FirstOrDefault(d => dispecer.KorisnickoIme == d.KorisnickoIme)!=null)
            {
                int ind = Korisnici.ListaDispecera.IndexOf(Korisnici.ListaDispecera.FirstOrDefault(d => dispecer.KorisnickoIme == d.KorisnickoIme));
                //ne postoji korisnicko ime do sad
                dispecer.Uloga = Uloge.Dispecer;
                dispecer.Voznje = Korisnici.ListaDispecera[ind].Voznje;                
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
