using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace WebAPI.Models
{
    public class Korisnici
    {
        
        public Korisnici(string putanja)
        {
            //serijalizacija
            /*Dispecer d1 = new Dispecer() { KorisnickoIme = "admin", Lozinka = "admin", Ime = "Pera", Prezime = "Peric", Email = "pera@yahoo.com", Jmbg = "48788968", KontaktTelefon = "06499965", Pol = Polovi.Muski, Uloga = Uloge.Dispecer, Voznje = new List<Voznja>() };
            Dispecer d2 = new Dispecer() { KorisnickoIme = "admin1", Lozinka = "admin1", Ime = "Mika", Prezime = "Mikic", Email = "mika@yahoo.com", Jmbg = "487968", KontaktTelefon = "064686465", Pol = Polovi.Zenski, Uloga = Uloge.Dispecer, Voznje = new List<Voznja>() };
            Dispecer d3 = new Dispecer() { KorisnickoIme = "admin2", Lozinka = "admin2", Ime = "Zika", Prezime = "Zikic", Email = "zika@yahoo.com", Jmbg = "484658", KontaktTelefon = "064686765", Pol = Polovi.Muski, Uloga = Uloge.Dispecer, Voznje = new List<Voznja>() };
            ListaDispecera = new List<Dispecer>() { d1, d2, d3 };
            
            if (File.Exists(putanja)) {
                XmlSerializer xmlSerializer = new XmlSerializer(typeof(List<Dispecer>));
                using (StreamWriter writer = new StreamWriter(putanja, true))
                {
                    xmlSerializer.Serialize(writer, ListaDispecera);
                }
                string[] dispeceri = File.ReadAllLines(putanja);
                foreach (var item in dispeceri)
                {
                    //if (item.Split('|'))
                }
            }*/
            //deserijalizacija
            ListaDispecera = new List<Dispecer>();

            if (File.Exists(putanja))
            {
                XmlSerializer xmlSerializer = new XmlSerializer(typeof(List<Dispecer>));
                using (StreamReader reader = new StreamReader(putanja))
                {
                    ListaDispecera = (List<Dispecer>)xmlSerializer.Deserialize(reader);
                }
                
            }
            //string s = Directory.GetCurrentDirectory();
            

            ListaVozaca = new List<Vozac>();
            Voznja v = new Voznja() {Musterija="musterija", DatumIVrijemePorudzbe = new DateTime(2010, 10, 10), Iznos = 5, Lokacija = new Lokacija() { Adresa = new Adresa() { Ulica = "kralja petra" } }, Komentar = new Komentar() { Opis = "kom" }, TipAutomobila = TipoviAutomobila.PutnickiAutomobil, StatusVoznje = StatusiVoznje.Kreirana_NaCekanju, Vozac = "vozac", Odrediste = new Lokacija() { Adresa = new Adresa() { Ulica = "ulica" } } };
            Voznja v2 = new Voznja() { Musterija="musterija", DatumIVrijemePorudzbe = new DateTime(2016, 10, 10), Iznos = 5, Lokacija = new Lokacija() { Adresa = new Adresa() { Ulica = "kralja petra" } }, Komentar = new Komentar() { Opis = "kom" }, TipAutomobila = TipoviAutomobila.PutnickiAutomobil, StatusVoznje = StatusiVoznje.Kreirana_NaCekanju, Vozac = "vozac", Odrediste = new Lokacija() { Adresa = new Adresa() { Ulica = "ulica" } } };
            ListaVozaca.Add(new Vozac() { KorisnickoIme = "vozac", Lozinka = "vozac", Uloga = Uloge.Vozac, Pol = Polovi.Muski, Voznje = new List<Voznja>() { v } });
            ListaMusterija = new List<Musterija>();
            ListaMusterija.Add(new Musterija() { KorisnickoIme = "musterija", Lozinka = "musterija",Uloga=Uloge.Musterija,Pol=Polovi.Zenski, Voznje = new List<Voznja>() {v,v2} });
        }

        public static List<Musterija> ListaMusterija { get; set; }
        public static List<Vozac> ListaVozaca { get; set; }
        public static List<Dispecer> ListaDispecera { get; set; }
        
    }
}