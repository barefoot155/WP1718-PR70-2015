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
            Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == Korisnik).Voznje[indVoznja].Komentar = new Komentar() { Korisnik = Korisnik, Voznja = idVoznje, DatumObjave = DateTime.SpecifyKind(DateTime.Now,DateTimeKind.Unspecified), Opis = Opis, Ocjena = (Ocjene)(int.Parse(Ocjena)) };
            System.Web.HttpContext.Current.Session["mojaSesija"] = Korisnici.ListaMusterija.FirstOrDefault(m=>m.KorisnickoIme==Korisnik);
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
            //Musterija k = (Musterija)System.Web.HttpContext.Current.Session["mojaSesija"];
            return Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje;
            //return k.Voznje;
        }
        // GET: api/Musterija/5
        public Musterija Get()
        {
            Musterija k = (Musterija)System.Web.HttpContext.Current.Session["mojaSesija"];

            return k;
        }
        [HttpPost]
        [Route("api/Musterija/GetLokacija/")]
        public Lokacija GetLokacija([FromBody]JObject jsonResult)
        {
            string korisnicko = "";
            string s = jsonResult.ToString();
            IList<JToken> addresses = jsonResult["jsonResult"]["address"].Children().ToList();
            //string b="";
            string grad = "";
            string ulica = "";
            string posta = "";
            string broj = "";
            foreach (var item in addresses)
            {
                string ssss = item.ToString().Replace("\"", "");
                if (ssss.Split(':')[0] == "city")
                {
                    grad = ssss.Split(':')[1].Trim();
                }
                else if (ssss.Split(':')[0] == "road")
                {
                    ulica = ssss.Split(':')[1].Trim();
                }
                else if (ssss.Split(':')[0] == "postcode")
                {
                    posta = ssss.Split(':')[1].Trim();
                }
                else if (ssss.Split(':')[0] == "house_number")//ako nema broj moram stavit bb
                {
                    broj = ssss.Split(':')[1].Trim();
                }
            }
            IList<JToken> koordinate = jsonResult["jsonResult"]["boundingbox"].Children().ToList();
            //IList<JToken> tipAuta = jsonResult["tipAuta"].Children().ToList();
            //TripObject item = JsonConvert.DeserializeObject<TripObject>(jsonResult.ToString());
            //return jsonResult;
            string x = koordinate[0].ToString().Trim(new char[] { '{', '}' });
            string y = koordinate[3].ToString().Trim(new char[] { '{', '}' });
            if (broj.Trim() == "")
            {
                broj = "bb";
            }
            Lokacija lok = new Lokacija() { KoordinataX = x, KoordinataY = y, Adresa = new Adresa() { NaseljenoMjesto = grad, Ulica = ulica, PozivniBrojMjesta = posta, Broj = broj } };
            korisnicko = Get().KorisnickoIme;
            //Korisnici.ListaVozaca.FirstOrDefault(v => v.KorisnickoIme == korisnicko).Lokacija = lok;
            Voznja voznja = new Voznja() { DatumIVrijemePorudzbe = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Unspecified), Musterija = Get().KorisnickoIme, StatusVoznje = StatusiVoznje.Kreirana_NaCekanju, Lokacija = lok, TipAutomobila = (TipoviAutomobila)(0), Komentar = new Komentar() { Opis = "", Ocjena = Ocjene.Neocijenjeno } };
            Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == Get().KorisnickoIme).Voznje.Add(voznja);
            return lok;
            /*HttpResponseMessage ret = new HttpResponseMessage();
            ret.StatusCode = HttpStatusCode.OK;
            string xxx = ulica;

            Adresa adresa = new Adresa() { Ulica = ulica, Broj = broj, NaseljenoMjesto = grad, PozivniBrojMjesta = posta };
            Lokacija lokacija = new Lokacija() { Adresa = adresa, KoordinataX = x, KoordinataY = y };
            Voznja voznja = new Voznja() { DatumIVrijemePorudzbe = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Unspecified), Musterija = korIme, StatusVoznje = StatusiVoznje.Kreirana_NaCekanju, Lokacija = lokacija, TipAutomobila = (TipoviAutomobila)(int.Parse(tip)), Komentar = new Komentar() { Opis = "", Ocjena = Ocjene.Jedan } };
            //Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje.IndexOf()
            Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje.Add(voznja);
            
            
            System.Web.HttpContext.Current.Session["mojaSesija"] = Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme);
            return ret;*/
        }
        //x: x, y: y, tip: tipAutomobila, ulica: ulica, broj: broj, posta: postanskiBr, grad: grad, korIme: korIme 
        [HttpGet]
        [Route("api/Musterija/KreirajVoznju/")]
        public HttpResponseMessage KreirajVoznju(string x, string y, string tip, string ulica, string broj, string posta, string grad, string korIme)
        {
            HttpResponseMessage ret = new HttpResponseMessage();
            ret.StatusCode = HttpStatusCode.OK;
            string xxx = ulica;

            Adresa adresa = new Adresa() { Ulica = ulica, Broj = broj, NaseljenoMjesto = grad, PozivniBrojMjesta = posta };
            Lokacija lokacija = new Lokacija() { Adresa = adresa, KoordinataX = x, KoordinataY = y };
            Voznja voznja = new Voznja() { DatumIVrijemePorudzbe = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Unspecified), Musterija = korIme, StatusVoznje = StatusiVoznje.Kreirana_NaCekanju, Lokacija = lokacija, TipAutomobila = (TipoviAutomobila)(int.Parse(tip)), Komentar = new Komentar() { Opis = "", Ocjena = Ocjene.Jedan } };
            //Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje.IndexOf()
            Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje.Add(voznja);


            System.Web.HttpContext.Current.Session["mojaSesija"] = Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme);
            return ret;
            
        }
        [HttpGet]
        [Route("api/Musterija/IzmijeniVoznju/")]
        public void Get(string x, string y, string tip, string ulica, string broj, string posta, string grad, string korIme,string id)
        {
            int i = int.Parse(id);
            string xxx = ulica;

            Adresa adresa = new Adresa() { Ulica = ulica, Broj = broj, NaseljenoMjesto = grad, PozivniBrojMjesta = posta };
            Lokacija lokacija = new Lokacija() { Adresa = adresa, KoordinataX = x, KoordinataY = y };

            Voznja voz = Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje.FirstOrDefault(v=>v.Id==i);
            int indexVoznje = Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje.IndexOf(voz);
            Komentar kom = Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje[indexVoznje].Komentar;
            
            Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje[indexVoznje].Lokacija=lokacija;
            Korisnici.ListaMusterija.FirstOrDefault(m => m.KorisnickoIme == korIme).Voznje[indexVoznje].TipAutomobila= (TipoviAutomobila)(int.Parse(tip));
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
