let ul = ``;//uloga trenutnog korisnika, za html bitno!!
let ulogaKorisnika = function (data) {
    if (data == `0`) {
        ul = "Musterija";
    } else if (data == `1`) {
        ul = "Dispecer";
    } else if (data == `2`) {
        ul = "Vozac";
    }
};
function funkcijaStatusVoznje(statusV) {
    switch (statusV) {
        case 0:
            return "Kreirana - Na cekanju";
            break;
        case 1:
            return "Formirana";
            break;
        case 2:
            return "Obradjena";
            break;
        case 3:
            return "Prihvacena";
            break;
        case 4:
            return "Otkazana";
            break;
        case 5:
            return "Neuspjesna";
            break;
        case 6:
            return "Uspjesna";
            break;
        default:
            return "greska";
    }
};
let KreiranjeVoznje = function (data) {
    $("#prikazPodataka").html(`<table class="table table-bordered">
        <thead>
            <tr class="success">
                <th colspan="2">
                    Kreiranje voznje
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Adresa na koju taksi dolazi:</td>                
            </tr>
            <tr>
                <td>Ulica:</td>
                <td>
                    <input type="text" id="txtUlica" placeholder="Unesi ulicu..." />
                </td>
            </tr>
            <tr>
                <td>Broj:</td>
                <td>
                    <input type="text" id="txtBroj" placeholder="Unesi broj..." />
                </td>
            </tr>
            <tr>
                <td>Grad:</td>
                <td>
                    <input type="text" id="txtGrad" placeholder="Unesi grad..." />
                </td>
            </tr>            
            <tr>
                <td>Postanski broj:</td>
                <td>
                    <input type="text" id="txtPostanskiBroj" placeholder="Unesi postanski broj..." />
                </td>
            </tr>
            <tr>
                <td>Koordinate</td>                
            </tr>
            <tr>
                <td>Koordinata X:</td>
                <td>
                    <input type="text" id="txtKoordinataX" placeholder="Koordinata X..." />
                </td>
            </tr>
            <tr>
                <td>Koordinata Y:</td>
                <td>
                    <input type="text" id="txtKoordinataY" placeholder="Koordinata Y..." />
                </td>
            </tr>
            <tr>
                <td>Tip automobila:</td>
                <td>
                    <select id="tipAuta">
                        <option value="1">Putnicko</option>
                        <option value="2">Kombi</option>
                        <option value="0" selected>Bez naznake</option>
                    </select>
                </td>
            </tr>
            <tr class="success">
                <td colspan="2">
                    <input id="btnKreirajVoznju" class="btn btn-success pull-right" type="button" value="Kreiraj voznju">
                        <!--/form-->
                            </td>
                        </tr>
                    </tbody>
                </table>`
    );
    $("#btnKreirajVoznju").click(function () {        
        ulogaKorisnika(data.Uloga);
        var uloga = ul;
        //alert(uloga);
        var tipAutomobila = $("#tipAuta").val();
        var ulica = $("#txtUlica").val();
        var broj = $("#txtBroj").val();
        var grad = $("#txtGrad").val();
        var postanskiBr = $("#txtPostanskiBroj").val();
        var x = $("#txtKoordinataX").val();
        var y = $("#txtKoordinataY").val();
        //alert(`prije posta` + x + y + ulica + broj + grad + postanskiBr + `shd:`+ tipAutomobila);
        
        var korIme = data.KorisnickoIme;
        $.get("/api/" + uloga, { x: x, y: y, tip: tipAutomobila, ulica: ulica, broj: broj, posta: postanskiBr, grad: grad, korIme: korIme }, function () {
            //alert(`iz geta`);
            location.href = uloga+`.html`;
        });
    });    
};

let IspisiVoznje = function (data) {
    let temp = ``;
    for (drive in data) {
        temp += `<tr>`;
        temp += (`<td>${data[drive].DatumIVrijemePorudzbe}</td>`);
        temp += (`<td>${data[drive].Musterija}</td>`);
        temp += (`<td>${data[drive].Dispecer}</td>`);
        temp += (`<td>${data[drive].Vozac}</td>`);
        temp += (`<td>${funkcijaStatusVoznje(data[drive].StatusVoznje)}</td >`);
        temp += (`<td>${data[drive].TipAutomobila}</td>`);
        temp += (`<td>${data[drive].Lokacija.Adresa.Ulica}</td>`);
        temp += (`<td>${data[drive].Odrediste}</td>`);
        temp += (`<td>${data[drive].Iznos}</td>`);
        temp += (`<td>${data[drive].Komentar.Opis}</td>`);
        temp += (data[drive].StatusVoznje == 0) ? (`<td><input name="otkazi" id="btnOtkazi` + data[drive].Id + `" class="btn btn-success" type="button" value="Otkazi voznju"></br><input name="izmijeni" id="btnIzmijeni` + data[drive].Id + `" class="btn btn-success" type="button" value="Izmijeni voznju">`) : `<td>` + `</td>`;
       temp += `</tr>`;
    }

    $("#prikazPodataka").html(`<table class="table table - bordered">
        <thead>
        <tr class="success">
            <th colspan="10" style="text-align:center">
                Korisnikove voznje
            </th>
        </tr>
        <tr>    
            <th class="success">Datum i vrijeme</th>
            <th class="success">Musterija</th>
            <th class="success">Dispecer</th>
            <th class="success">Vozac</th>
            <th class="success">StatusVoznje</th>
            <th class="success">TipAutomobila</th>
            <th class="success">Ulica</th>
            <th class="success">Odrediste</th>
            <th class="success">Iznos</th>
            <th class="success">Komentar</th>
            <th class="success">Opcije</th>
        </tr>
        </thead>
        <tbody>${temp}        
        </tbody>
    </table>`);
    $("input:button[name=otkazi]").click(function () {
        //alert(this.id);//uzmi id tog dugmeta
        ulogaKorisnika(`0`);
        var ppp = this.id;
        //alert(`uloga prije geta` + ul + this.id + data[0].Musterija);
        $.get("/api/" + ul, { id: this.id, korIme: data[0].Musterija }, function () {
            Komentarisanje(ppp, data[0].Musterija);
            //location.href = (ul + `.html`);
        });
        
    });
    $("input:button[name=izmijeni]").click(function () {
        //alert(this.id);//uzmi id tog dugmeta
        ulogaKorisnika(`0`);
        $.get("/api/" + ul + "/VratiVoznju/", { id: this.id, korIme: data[0].Musterija }, function (voznja) {
            IzmijeniVoznju(voznja);
            //location.href = (ul + `.html`);
        });
    });
};

let IzmijeniVoznju = function (data) {
    var tip = ``;
    if (data.TipAutomobila == "1") {//putnicki
        tip = `<select id="tipAuta">
            <option value="1" selected>Putnicko</option>
            <option value="2">Kombi</option>
            <option value="0">Bez naznake</option>
        </select>`;
    } else if (data.TipAutomobila == "2") {//kombi
        tip = `<select id="tipAuta">
            <option value="1">Putnicko</option>
            <option value="2" selected>Kombi</option>
            <option value="0">Bez naznake</option>
        </select>`;
    } else {
        tip = `<select id="tipAuta">
            <option value="1">Putnicko</option>
            <option value="2">Kombi</option>
            <option value="0" selected>Bez naznake</option>
        </select>`;
    }
    $("#prikazPodataka").html(`<table class="table table-bordered">
        <thead>
            <tr class="success">
                <th colspan="2">
                    Kreiranje voznje
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Adresa na koju taksi dolazi:</td>                
            </tr>
            <tr>
                <td>Ulica:</td>
                <td>
                    <input type="text" id="txtUlica" value="`+ data.Lokacija.Adresa.Ulica +`" />
                </td>
            </tr>
            <tr>
                <td>Broj:</td>
                <td>
                    <input type="text" id="txtBroj" value="`+ data.Lokacija.Adresa.Broj +`" />
                </td>
            </tr>
            <tr>
                <td>Grad:</td>
                <td>
                    <input type="text" id="txtGrad" value="`+ data.Lokacija.Adresa.NaseljenoMjesto +`" />
                </td>
            </tr>            
            <tr>
                <td>Postanski broj:</td>
                <td>
                    <input type="text" id="txtPostanskiBroj" value="`+ data.Lokacija.Adresa.PozivniBrojMjesta +`" />
                </td>
            </tr>
            <tr>
                <td>Koordinate</td>                
            </tr>
            <tr>
                <td>Koordinata X:</td>
                <td>
                    <input type="text" id="txtKoordinataX" value="`+data.Lokacija.KoordinataX+`" />
                </td>
            </tr>
            <tr>
                <td>Koordinata Y:</td>
                <td>
                    <input type="text" id="txtKoordinataY" value="`+data.Lokacija.KoordinataY+`" />
                </td>
            </tr>
            <tr>
                <td>Tip automobila:</td>
                <td>`
                    + tip +                    
                `</td>
            </tr>
            <tr class="success">
                <td colspan="2">
                    <input id="btnIzmijeniVoznju" class="btn btn-success pull-right" type="button" value="Izmijeni voznju">
                        <!--/form-->
                            </td>
                        </tr>
                    </tbody>
                </table>`
    );
   
    $("#btnIzmijeniVoznju").click(function () {
        var tipAutomobila = $("#tipAuta").val();
        var ulica = $("#txtUlica").val();
        var broj = $("#txtBroj").val();
        var grad = $("#txtGrad").val();
        var postanskiBr = $("#txtPostanskiBroj").val();
        var x = $("#txtKoordinataX").val();
        var y = $("#txtKoordinataY").val();
        $.get("/api/" + ul + "/IzmijeniVoznju/", { x: x, y: y, tip: tipAutomobila, ulica: ulica, broj: broj, posta: postanskiBr, grad: grad, korIme: data.Musterija, id: data.Id }, function () {
            //IzmijeniVoznju(voznja);
            ulogaKorisnika(`0`);
            location.href = (ul + `.html`);
        });
    });
        
};

let Komentarisanje = function (idVoz, idKor) {    
    $("#prikazPodataka").html(`<table class="table table-bordered">
        <thead>
            <tr class="success">
                <th colspan="2">
                    Komentarisanje
                </th>
            </tr>
        </thead>
        <tbody>
            
            <tr>
                <td>Ocjena:</td>
                <td>
                    <select id="ocjena">
                        <option value="0" selected>Neocijenjeno</option>
                        <option value="1">Jedan</option>
                        <option value="2">Dva</option>
                        <option value="3">Tri</option>
                        <option value="4">Cetiri</option>
                        <option value="5">Pet</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Komentar:</td>
                <td>
                    <input type="text" id="txtKom" placeholder="Unesi komenatar..." />
                </td>
            </tr>
            
            <tr class="success">
                <td colspan="2">
                    <input id="btnKoment" class="btn btn-success pull-right" type="button" value="Ostavi komentar">                    
                </td>
            </tr>
        </tbody>
     </table>`
    );
    $("#btnKoment").click(function () {
        ulogaKorisnika(`0`);
        var uloga = ul;
        //alert(uloga);
        var ocj = $("#ocjena").val();
        var koment = $("#txtKom").val();
        //alert(`prije geta` + ocj + koment + idKor + idVoz);
        
        /*$.get("/api/" + uloga, { x: x, y: y, tip: tipAutomobila, ulica: ulica, broj: broj, posta: postanskiBr, grad: grad, korIme: korIme }, function () {
            //alert(`iz geta`);
            location.href = uloga + `.html`;
        });*/
        //idKor i idVoz
        $.get("/api/" + uloga + "/OstaviKomentar/", { Opis: koment, Ocjena: ocj, Korisnik: idKor, Voznja: idVoz }, function () {
            //alert(`komeeeeeentaaar`);
            location.href =ul+ `.html`;
        });
        
    });
};
let KreiranjeVoznjeDisp = function (data,data1) {//u data su podaci o dispeceru, fale jos podaci o vozacima
    var listaVozaca;
    let temp = ``;
    for (v in data1) {
        temp += `<option value="${data1[v].KorisnickoIme}">${data1[v].KorisnickoIme}</option>`;
    }
    
    $("#prikazPodataka").html(`<table class="table table-bordered">
        <thead>
            <tr class="success">
                <th colspan="2">
                    Kreiranje voznje
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Adresa na koju taksi dolazi:</td>                
            </tr>
            <tr>
                <td>Ulica:</td>
                <td>
                    <input type="text" id="txtUlica" placeholder="Unesi ulicu..." />
                </td>
            </tr>
            <tr>
                <td>Broj:</td>
                <td>
                    <input type="text" id="txtBroj" placeholder="Unesi broj..." />
                </td>
            </tr>
            <tr>
                <td>Grad:</td>
                <td>
                    <input type="text" id="txtGrad" placeholder="Unesi grad..." />
                </td>
            </tr>            
            <tr>
                <td>Postanski broj:</td>
                <td>
                    <input type="text" id="txtPostanskiBroj" placeholder="Unesi postanski broj..." />
                </td>
            </tr>
            <tr>
                <td>Koordinate</td>                
            </tr>
            <tr>
                <td>Koordinata X:</td>
                <td>
                    <input type="text" id="txtKoordinataX" placeholder="Koordinata X..." />
                </td>
            </tr>
            <tr>
                <td>Koordinata Y:</td>
                <td>
                    <input type="text" id="txtKoordinataY" placeholder="Koordinata Y..." />
                </td>
            </tr>
            <tr>
                <td>Tip automobila:</td>
                <td>
                    <select id="tipAuta">
                        <option value="1">Putnicko</option>
                        <option value="2">Kombi</option>
                        <option value="0" selected>Bez naznake</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Izaberi slobodnog vozaca:</td>
                <td>
                    <select id="cbVozaci">
                        ${temp}
                    </select>
                </td>
            </tr>
            <tr class="success">
                <td colspan="2">
                    <input id="btnKreirajVoznju" class="btn btn-success pull-right" type="button" value="Kreiraj voznju">
                        <!--/form-->
                            </td>
                        </tr>
                    </tbody>
                </table>`
    );
    $("#btnKreirajVoznju").click(function () {

        ulogaKorisnika(data.Uloga);
        //alert(temp);
        var uloga = ul;
        //alert(uloga);
        var tipAutomobila = $("#tipAuta").val();
        var ulica = $("#txtUlica").val();
        var broj = $("#txtBroj").val();
        var grad = $("#txtGrad").val();
        var postanskiBr = $("#txtPostanskiBroj").val();
        var x = $("#txtKoordinataX").val();
        var y = $("#txtKoordinataY").val();
        var voz = $("#cbVozaci").val();//username izabranog vozaca
        
        var korIme = data.KorisnickoIme;
        $.get("/api/" + uloga, { x: x, y: y, tip: tipAutomobila, ulica: ulica, broj: broj, posta: postanskiBr, grad: grad, korIme: korIme, vozac: voz }, function () {
            //alert(`iz geta`);
            location.href = uloga + `.html`;
        });
    });
};

let IspisiVoznjeDisp = function (data,username) {
    let temp = ``;
    for (drive in data) {
        temp += `<tr>`;
        temp += (`<td>${data[drive].DatumIVrijemePorudzbe}</td>`);
        temp += (`<td>${data[drive].Musterija}</td>`);
        temp += (`<td>${data[drive].Dispecer}</td>`);
        temp += (`<td>${data[drive].Vozac}</td>`);
        temp += (`<td>${funkcijaStatusVoznje(data[drive].StatusVoznje)}</td>`);
        temp += (`<td>${data[drive].TipAutomobila}</td>`);
        temp += (`<td>${data[drive].Lokacija.Adresa.Ulica}</td>`);
        temp += (`<td>${data[drive].Odrediste}</td>`);
        temp += (`<td>${data[drive].Iznos}</td>`);
        temp += (`<td>${data[drive].Komentar.Opis}</td>`);
        temp += (data[drive].StatusVoznje == 0) ? (`<td><input name="obradi" id="btnObradi` + data[drive].Id + `" class="btn btn-success" type="button" value="Obradi voznju">`) : `<td>` + `</td>`;
        temp += `</tr>`;
    }

    $("#prikazPodataka").html(`<table class="table table - bordered">
        <thead>
        <tr class="success">
            <th colspan="10" style="text-align:center">
                Korisnikove voznje
            </th>
        </tr>
        <tr>    
            <th class="success">Datum i vrijeme</th>
            <th class="success">Musterija</th>
            <th class="success">Dispecer</th>
            <th class="success">Vozac</th>
            <th class="success">StatusVoznje</th>
            <th class="success">TipAutomobila</th>
            <th class="success">Ulica</th>
            <th class="success">Odrediste</th>
            <th class="success">Iznos</th>
            <th class="success">Komentar</th>
            <th class="success">Opcije</th>
        </tr>
        </thead>
        <tbody>${temp}        
        </tbody>
    </table>`);
    $("input:button[name=obradi]").click(function () {
        //alert(this.id);//uzmi id tog dugmeta
        ulogaKorisnika(`1`);
        var ppp = this.id;
        //alert(`uloga prije geta` + ul + this.id + data[0].Musterija);
        var imeMusterije = ``;
        for (drive in data) {
            if (("btnObradi"+data[drive].Id) == ppp) {
                imeMusterije = data[drive].Musterija;
                break;
            }
        }
        ObradjivanjeVoznje(ppp, username,imeMusterije);
        /*$.get("/api/" + ul, { id: this.id, korImeDisp: username, korImeMusterije: imeMusterije }, function () {
            
            //location.href = (ul + `.html`);
        });*/

    });
    /*$("input:button[name=izmijeni]").click(function () {
        //alert(this.id);//uzmi id tog dugmeta
        ulogaKorisnika(`0`);
        $.get("/api/" + ul + "/VratiVoznju/", { id: this.id, korIme: data[0].Musterija }, function (voznja) {
            IzmijeniVoznju(voznja);
            //location.href = (ul + `.html`);
        });
    });*/
};
let ObradjivanjeVoznje = function (data1, data2, data3) {
    let voznje = null;
    let temp = ``;
    $.get("/api/Dispecer/VratiSlobodneVozace", function (data4) {
        alert(data4[0].KorisnickoIme);
        voznje = data4;
        for (v in data4) {
            temp += `<option value="${data4[v].KorisnickoIme}">${data4[v].KorisnickoIme}</option>`;
        }
        $("#prikazPodataka").html(`<table class="table table - bordered">
        <thead>
        <tr class="success">
            <th colspan="10" style="text-align:center">
                Obradjivanje voznje
            </th>
        </tr>
        </thead>
        <tbody>
            <tr>
                <td>Izaberi slobodnog vozaca:</td>
                <td>
                    <select id="cbVozaci">
                        ${temp}
                    </select>
                </td>
            </tr>
<tr class="success">
                <td colspan="2">
                    <input id="btnObradi" class="btn btn-success pull-right" type="button" value="Obradi voznju">
                        <!--/form-->
                            </td>
                        </tr>
        </tbody>
    </table>`);
        $("#btnObradi").click(function () {
            var voz = $("#cbVozaci").val();
            var lll = data1;
            $.get("/api/Dispecer/ObradiVoznju/", { id: data1, korImeDisp: data2, korImeMusterije: data3, vozac: voz }, function () {

                location.href = `Dispecer.html`;
            });
        });
    });
    //var tipAutomobila = $("#tipAuta").val();   
};
let KreirajVozaca = function (dispecer) {//objekat dispecer, sa svim podacima.. taj disp kreira novog vozaca
    $("#prikazPodataka").html(`<table class="table table-bordered">
        <thead>
            <tr class="success">
                <th colspan="2">
                    Kreiranje novog vozaca                    
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Korisnicko ime:</td>
                <td>
                    <input type="text" id="txtUsername" placeholder="Korisnicko ime..." />
                </td>
            </tr>
            <tr>
                <td>Sifra:</td>
                <td>
                    <input type="password" id="txtPassword"
                           placeholder="Sifra..." />
                </td>
            </tr>
            <tr>
                <td>Ime:</td>
                <td>
                    <input type="text" id="txtIme"
                           placeholder="Ime..." />
                </td>
            </tr>
            <tr>
                <td>Prezime:</td>
                <td>
                    <input type="text" id="txtPrezime"
                           placeholder="Prezime..." />
                </td>
            </tr>
            <tr>
                <td>Kontakt telefon:</td>
                <td>
                    <input type="text" id="txtTelefon"
                           placeholder="Broj telefona..." />
                </td>
            </tr>
            <tr>
                <td>JMBG:</td>
                <td>
                    <input type="text" id="txtJMBG"
                           placeholder="Maticni broj..." />
                </td>
            </tr>
            <tr>
                <td>Pol:</td>
                <td>
                    <input type="radio"  name="pol" value="0"> Muski
                    <input type="radio"  name="pol" value="1" checked="checked"> Zenski
                </td>
            </tr>
            <tr>
                <td>Email:</td>
                <td>
                    <input type="email" id="txtEmail" placeholder="Email..." />
                </td>
            </tr>
            <tr class="success">
                <td colspan="2">
                    <input id="btnKreiraj" class="btn btn-success" type="button"
                           value="Kreiraj vozaca" />
                </td>
            </tr>
        </tbody>
    </table>`);
    $("#btnKreiraj").click(function () {
        //pozovi neki get u disp kontroleru
        var KorisnickoIme = $("#txtUsername").val();
        var Lozinka = $("#txtPassword").val();
        var Email = $("#txtEmail").val();
        var Jmbg = $("#txtJMBG").val();
        var KontaktTelefon = $("#txtTelefon").val();
        var Ime = $("#txtIme").val();
        var Prezime = $("#txtPrezime").val();
        var Pol = $("input:radio[name=pol]:checked").val();
        $.post("/api/Dispecer/DodajVozaca/", { KorisnickoIme: KorisnickoIme, Lozinka: Lozinka, Email: Email, Jmbg: Jmbg, KontaktTelefon: KontaktTelefon, Ime: Ime, Prezime: Prezime, Pol: Pol }, function (data) {
            alert(KorisnickoIme);
            location.href = `Dispecer.html`;
            //alert(data);
        })
    });
};

let IspisiVoznjeVozac = function (dataVoz,idVoz) {
    let temp = ``;
    data = dataVoz;
    for (drive in data) {
        temp += `<tr>`;
        temp += (`<td>${data[drive].DatumIVrijemePorudzbe}</td>`);
        temp += (`<td>${data[drive].Musterija}</td>`);
        temp += (`<td>${data[drive].Dispecer}</td>`);
        temp += (`<td>${data[drive].Vozac}</td>`);
        temp += (`<td>${funkcijaStatusVoznje(data[drive].StatusVoznje)}</td>`);
        temp += (`<td>${data[drive].TipAutomobila}</td>`);
        temp += (`<td>${data[drive].Lokacija.Adresa.Ulica}</td>`);
        temp += (`<td>${data[drive].Odrediste}</td>`);
        temp += (`<td>${data[drive].Iznos}</td>`);
        temp += (`<td>${data[drive].Komentar.Opis}</td>`);
        temp += `<td>`;
        temp += (data[drive].StatusVoznje == 0) ? (`<input name="prihvati" id="btnPrihvati` + data[drive].Id + `" class="btn btn-success" type="button" value="Prihvati voznju">`) : ``;
        temp += (data[drive].StatusVoznje == 2 || data[drive].StatusVoznje == 3 || data[drive].StatusVoznje == 4) ? (`<input name="obradi" id="btnObradi` + data[drive].Id + `" class="btn btn-success" type="button" value="Promijeni status voznje">`) : ``;
        temp += `</td>`;
        temp += `</tr>`;
    }

    $("#prikazPodataka").html(`<table class="table table - bordered">
        <thead>
        <tr class="success">
            <th colspan="10" style="text-align:center">
                Korisnikove voznje
            </th>
        </tr>
        <tr>    
            <th class="success">Datum i vrijeme</th>
            <th class="success">Musterija</th>
            <th class="success">Dispecer</th>
            <th class="success">Vozac</th>
            <th class="success">StatusVoznje</th>
            <th class="success">TipAutomobila</th>
            <th class="success">Ulica</th>
            <th class="success">Odrediste</th>
            <th class="success">Iznos</th>
            <th class="success">Komentar</th>
            <th class="success">Opcije</th>
        </tr>
        </thead>
        <tbody>${temp}        
        </tbody>
    </table>`);
    
    $("input:button[name=prihvati]").click(function () {
        //alert(this.id);//uzmi id tog dugmeta
        ulogaKorisnika(`2`);
        var ppp = this.id;
        $.get("/api/Vozac/PrihvatiVoznju/", { idVoznje: ppp, idVozaca:idVoz}, function () {
            alert(`prihvacena`);
            location.href = "Vozac.html";
        });
        //alert(`uloga prije geta` + ul + this.id + data[0].Musterija);
        /*$.get("/api/" + ul, { id: this.id, korIme: data[0].Musterija }, function () {
            Komentarisanje(ppp, data[0].Musterija);
            //location.href = (ul + `.html`);
        });*/
    });
    $("input:button[name=obradi]").click(function () {
        //alert(this.id);//uzmi id tog dugmeta
        ulogaKorisnika(`2`);
        var ppp = this.id;
        ObradjivanjeVoznjeVozac(ppp,idVoz);        
    });
};

let ObradjivanjeVoznjeVozac = function (data1, data2) {// data1 id voznje tj buttona,data2 idVozaca
    //let voznje = null;
    let htmlKodOdredisteIIznos = `<table class="table table-bordered">
        <thead>
            <tr class="success">
                <th colspan="2">
                    Lokacija i iznos
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Iznos:</td>                
                <td>
                    <input type="text" id="txtIznos" placeholder="Unesi iznos..." />
                </td>                
            </tr>
            <tr>
                <td>Adresa na koju taksi dolazi:</td>                
            </tr>
            <tr>
                <td>Ulica:</td>
                <td>
                    <input type="text" id="txtUlica" placeholder="Unesi ulicu..." />
                </td>
            </tr>
            <tr>
                <td>Broj:</td>
                <td>
                    <input type="text" id="txtBroj" placeholder="Unesi broj..." />
                </td>
            </tr>
            <tr>
                <td>Grad:</td>
                <td>
                    <input type="text" id="txtGrad" placeholder="Unesi grad..." />
                </td>
            </tr>            
            <tr>
                <td>Postanski broj:</td>
                <td>
                    <input type="text" id="txtPostanskiBroj" placeholder="Unesi postanski broj..." />
                </td>
            </tr>
            <tr>
                <td>Koordinate</td>                
            </tr>
            <tr>
                <td>Koordinata X:</td>
                <td>
                    <input type="text" id="txtKoordinataX" placeholder="Koordinata X..." />
                </td>
            </tr>
            <tr>
                <td>Koordinata Y:</td>
                <td>
                    <input type="text" id="txtKoordinataY" placeholder="Koordinata Y..." />
                </td>
            </tr>
            <tr class="success">
                <td colspan="2">
                    <input id="btnObradiV" class="btn btn-success pull-right" type="button" value="Obradi">                    
                </td>
            </tr>
        </tbody>
     </table>`;
    let htmlKodKomentar = `<table class="table table-bordered">
        <thead>
            <tr class="success">
                <th colspan="2">
                    Komentarisanje
                </th>
            </tr>
        </thead>
        <tbody>           
            
            <tr>
                <td>Komentar:</td>
                <td>
                    <textarea id="txtKom" rows="4" cols="50"></textarea>
                </td>
            </tr>
            
            <tr class="success">
                <td colspan="2">
                    <input id="btnObradiV" class="btn btn-success pull-right" type="button" value="Obradi">                    
                </td>
            </tr>
        </tbody>
     </table>`;
    let htmlKod = `<table class="table table - bordered">
        <thead>
        <tr class="success">
            <th colspan="10" style="text-align:center">
                Obradjivanje voznje
            </th>
        </tr>
        </thead>
        <tbody>
            <tr>
                <td>Izaberi novi status:</td>
                <td>
                    <select id="cbStatusi">
                        <option value="1" selected>Uspjesno</option>
                        <option value="0">Neuspjesno</option>
                    </select>
                </td>
            </tr>            
        </tbody>
    </table>`;
    $("#prikazPodatakaDrugi").html(htmlKodOdredisteIIznos);
    $("#prikazPodataka").html(htmlKod);
    $("#cbStatusi").change(function () {
        //alert(`promjena`);
        var status = $("#cbStatusi").val();
        if (status == "1") {
            $("#prikazPodatakaDrugi").html(htmlKodOdredisteIIznos);
        } else {//neuspjesna
            $("#prikazPodatakaDrugi").html(htmlKodKomentar);
        }
        $("#btnObradiV").click(function () {
            var status1 = $("#cbStatusi").val();
            if (status1 == "1") {//uspjesna
                $.get("/api/Vozac/UspjesnaVoznja/", { idVoznje: data1, idVozaca: data2, iznos: $("#txtIznos").val(), ulica: $("#txtUlica").val(), broj: $("#txtBroj").val(), grad: $("#txtGrad").val(), posta: $("#txtPostanskiBroj").val(), x: $("#txtKoordinataX").val(), y: $("#txtKoordinataY").val() }, function () {
                    location.href = "Vozac.html";
                });
            } else {//neuspjesna
                $.get("/api/Vozac/NeuspjesnaVoznja/", { idVoznje: data1, idVozaca: data2, koment: $("#txtKom").val() }, function () {
                    location.href = "Vozac.html";
                });
            }
        });
    });
    $("#btnObradiV").click(function () {
        var status1 = $("#cbStatusi").val();
        if (status1 == "1") {//uspjesna
            $.get("/api/Vozac/UspjesnaVoznja/", { idVoznje: data1, idVozaca: data2, iznos: $("#txtIznos").val(), ulica: $("#txtUlica").val(), broj: $("#txtBroj").val(), grad: $("#txtGrad").val(), posta: $("#txtPostanskiBroj").val(), x: $("#txtKoordinataX").val(), y: $("#txtKoordinataY").val() }, function () {
                location.href = "Vozac.html";
            });
        } else {//neuspjesna
            $.get("/api/Vozac/NeuspjesnaVoznja/", { idVoznje: data1, idVozaca: data2, koment: $("#txtKom").val() }, function () {
                location.href = "Vozac.html";
            });
        }
    });    
};