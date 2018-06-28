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
        
        public Korisnici(string putanja,string putanjaMusterija,string putanjaVozac)
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
            PutanjaDispeceri = putanja;
            PutanjaMusterije = putanjaMusterija;
            PutanjaVozaci = putanjaVozac;
            //deserijalizacija
            ListaDispecera = new List<Dispecer>();
            ListaVozaca = new List<Vozac>();
            ListaMusterija = new List<Musterija>();

            if (File.Exists(putanja))
            {
                XmlSerializer xmlSerializer = new XmlSerializer(typeof(List<Dispecer>));
                using (StreamReader reader = new StreamReader(putanja))
                {
                    ListaDispecera = (List<Dispecer>)xmlSerializer.Deserialize(reader);
                }
                
            }
            if (File.Exists(putanjaMusterija))
            {
                XmlSerializer xmlSerializer = new XmlSerializer(typeof(List<Musterija>));
                using (StreamReader reader = new StreamReader(putanjaMusterija))
                {
                    ListaMusterija = (List<Musterija>)xmlSerializer.Deserialize(reader);
                }
            }
            if (File.Exists(putanjaVozac))
            {
                XmlSerializer xmlSerializer = new XmlSerializer(typeof(List<Vozac>));
                using (StreamReader reader = new StreamReader(putanjaVozac))
                {
                    ListaVozaca = (List<Vozac>)xmlSerializer.Deserialize(reader);
                }
            }
            
            /*
            //8 auta za 8 vozaca
            Automobil a = new Automobil() { BrojTaksiVozila = 1, GodisteAutomobila = 1980, TipAutomobila = TipoviAutomobila.PutnickiAutomobil, Vozac="vozac" };
            Automobil a1 = new Automobil() { BrojTaksiVozila = 2, GodisteAutomobila = 1990, TipAutomobila = TipoviAutomobila.PutnickiAutomobil, Vozac="vozac1" };
            Automobil a2 = new Automobil() { BrojTaksiVozila = 3, GodisteAutomobila = 2000, TipAutomobila = TipoviAutomobila.PutnickiAutomobil, Vozac="vozac2" };
            Automobil a3 = new Automobil() { BrojTaksiVozila = 4, GodisteAutomobila = 1998, TipAutomobila = TipoviAutomobila.PutnickiAutomobil, Vozac="vozac3" };
            Automobil a4 = new Automobil() { BrojTaksiVozila = 5, GodisteAutomobila = 2010, TipAutomobila = TipoviAutomobila.PutnickiAutomobil, Vozac="vozac4" };
            Automobil a5 = new Automobil() { BrojTaksiVozila = 6, GodisteAutomobila = 2017, TipAutomobila = TipoviAutomobila.PutnickiAutomobil, Vozac="vozac5" };
            Automobil a6 = new Automobil() { BrojTaksiVozila = 7, GodisteAutomobila = 1989, TipAutomobila = TipoviAutomobila.KombiVozilo, Vozac="vozac6" };
            Automobil a7 = new Automobil() { BrojTaksiVozila = 8, GodisteAutomobila = 1991, TipAutomobila = TipoviAutomobila.KombiVozilo, Vozac="vozac7" };

            Voznja v = new Voznja() {Musterija="musterija", DatumIVrijemePorudzbe = DateTime.SpecifyKind(new DateTime(2010, 10, 10),DateTimeKind.Unspecified), Iznos = 5, Lokacija = new Lokacija() { KoordinataX = "19.751733541488647", KoordinataY = "45.253153525820665", Adresa = new Adresa() { Ulica = "Centar" } }, Komentar = new Komentar() { Opis = "kom1" }, TipAutomobila = TipoviAutomobila.PutnickiAutomobil, StatusVoznje = StatusiVoznje.Kreirana_NaCekanju, Vozac = "vozac", Odrediste = new Lokacija() { KoordinataX = "19.84742403030395", KoordinataY = "45.25395412113065", Adresa = new Adresa() { Ulica = "" } } };//centar
            Voznja v2 = new Voznja() { Musterija="musterija", DatumIVrijemePorudzbe = DateTime.SpecifyKind(new DateTime(2016, 11, 9), DateTimeKind.Unspecified), Iznos = 7, Lokacija = new Lokacija() { KoordinataX = "19.843057394027706", KoordinataY = "45.24224617881842", Adresa = new Adresa() { Ulica = "Jugodrvo" } }, Komentar = new Komentar() { Opis = "kom2" }, TipAutomobila = TipoviAutomobila.PutnickiAutomobil, StatusVoznje = StatusiVoznje.Kreirana_NaCekanju, Vozac = "vozac", Odrediste = new Lokacija() { KoordinataX = "19.843057394027706", KoordinataY = "45.24224617881842", Adresa = new Adresa() { Ulica = "" } } };
            Voznja v3 = new Voznja() { Musterija="", DatumIVrijemePorudzbe = DateTime.SpecifyKind(new DateTime(2013, 1, 8), DateTimeKind.Unspecified), Iznos = 8, Lokacija = new Lokacija() { Adresa = new Adresa() { Ulica = "na keju" }, KoordinataX = "19.855535030364987", KoordinataY = "45.252775882606045" }, Komentar = new Komentar() { Opis = "kom3" }, TipAutomobila = TipoviAutomobila.KombiVozilo, StatusVoznje = StatusiVoznje.Prihvacena, Vozac = "vozac", Odrediste = new Lokacija() { Adresa = new Adresa() { Ulica = "ulica" } } };

            ListaVozaca.Add(new Vozac() { KorisnickoIme = "vozac", Lozinka = "vozac", Ime="MarkoV",Prezime="JankovicV", Automobil=a, Uloga = Uloge.Vozac, Pol = Polovi.Muski, Voznje = new List<Voznja>() { v3 }, Lokacija=new Lokacija() {KoordinataX= "19.84742403030395", KoordinataY= "45.25395412113065" } });//u centru
            ListaVozaca.Add(new Vozac() { KorisnickoIme = "vozac1", Lozinka = "vozac1",Ime="Janko",Prezime="Markovic",Automobil=a1, Uloga = Uloge.Vozac, Pol = Polovi.Muski, Voznje = new List<Voznja>() { v3 }, Lokacija = new Lokacija() { KoordinataX = "19.815838336944577", KoordinataY = "45.25948245236333" } });//na detelinari
            ListaVozaca.Add(new Vozac() { KorisnickoIme = "vozac2", Lozinka = "vozac2",Ime="Misko",Prezime="Miskovic",Automobil=a2, Uloga = Uloge.Vozac, Pol = Polovi.Muski, Voznje = new List<Voznja>() { v3 }, Lokacija = new Lokacija() { KoordinataX = "19.82776880264282", KoordinataY = "45.275913220733145" } });//u bigu
            ListaVozaca.Add(new Vozac() { KorisnickoIme = "vozac3", Lozinka = "vozac3",Ime="Ivan",Prezime="Ivanovic",Automobil=a3, Uloga = Uloge.Vozac, Pol = Polovi.Muski, Voznje = new List<Voznja>() { v3 }, Lokacija = new Lokacija() { KoordinataX = "19.837038516998295", KoordinataY = "45.25186952864547" } });//futoska
            ListaVozaca.Add(new Vozac() { KorisnickoIme = "vozac4", Lozinka = "vozac4",Ime="Milos",Prezime="Teodosic",Automobil=a4, Uloga = Uloge.Vozac, Pol = Polovi.Muski, Voznje = new List<Voznja>() { v3 }, Lokacija = new Lokacija() { KoordinataX = "19.855535030364987", KoordinataY = "45.252775882606045" } });//kej
            ListaVozaca.Add(new Vozac() { KorisnickoIme = "vozac5", Lozinka = "vozac5",Ime="Bobi",Prezime="Marjanovic",Automobil=a5, Uloga = Uloge.Vozac, Pol = Polovi.Muski, Voznje = new List<Voznja>() { v3 }, Lokacija = new Lokacija() { KoordinataX = "19.751733541488647", KoordinataY = "45.253153525820665" } });//veternik
            ListaVozaca.Add(new Vozac() { KorisnickoIme = "vozac6", Lozinka = "vozac6",Ime="Nikola",Prezime="Kalinic",Automobil=a6, Uloga = Uloge.Vozac, Pol = Polovi.Muski, Voznje = new List<Voznja>() { v3 }, Lokacija = new Lokacija() { KoordinataX = "19.843057394027706", KoordinataY = "45.24224617881842" } });//jugodrvo
            ListaVozaca.Add(new Vozac() { KorisnickoIme = "vozac7", Lozinka = "vozac7",Ime="Vujadin",Prezime="Savic",Automobil=a7, Uloga = Uloge.Vozac, Pol = Polovi.Muski, Voznje = new List<Voznja>() { v3 }, Lokacija = new Lokacija() { KoordinataX = "19.846104383468628", KoordinataY = "45.25649178261992" } });//laze teleckog
            
            ListaMusterija.Add(new Musterija() { KorisnickoIme = "musterija", Ime = "MarkoM", Prezime = "JankovicM", Lozinka = "musterija",Uloga=Uloge.Musterija,Pol=Polovi.Zenski, Voznje = new List<Voznja>() {v,v2}});

            string putanjaMusterije = @"C:\Users\BosaBratic\Downloads\WebAPI_AJAX\WebAPI\WebAPI\App_Data\Musterije.xml";
            if (File.Exists(putanjaMusterije))
            {
                XmlSerializer xmlSerializer = new XmlSerializer(typeof(List<Musterija>));
                using (StreamWriter writer = new StreamWriter(putanjaMusterije, true))
                {
                    xmlSerializer.Serialize(writer, ListaMusterija);
                }
            }
            string putanjaVozaci = @"C:\Users\BosaBratic\Downloads\WebAPI_AJAX\WebAPI\WebAPI\App_Data\Vozaci.xml";
            if (File.Exists(putanjaVozaci))
            {
                XmlSerializer xmlSerializer = new XmlSerializer(typeof(List<Vozac>));
                using (StreamWriter writer = new StreamWriter(putanjaVozaci, true))
                {
                    xmlSerializer.Serialize(writer, ListaVozaca);
                }
            }*/
        }
        
        public static List<Musterija> ListaMusterija { get; set; }
        public static List<Vozac> ListaVozaca { get; set; }
        public static List<Dispecer> ListaDispecera { get; set; }
        public static String PutanjaDispeceri { get; set; }
        public static String PutanjaVozaci { get; set; }
        public static String PutanjaMusterije { get; set; }
    }
}