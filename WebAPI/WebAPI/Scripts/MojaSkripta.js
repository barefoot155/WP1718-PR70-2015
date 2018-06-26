let IspisiPodatke = function (korisnik) {
    var pol = ``;
    if (korisnik.Pol == "1") {
        pol = `Zenski`;
    } else {
        pol = `Muski`;
    }
    $("#prikazPodataka").html(`<table class="table table-bordered"><thead><tr class="success"><th colspan="2">Moji podaci</th></tr></thead><tbody><tr><td>Korisnicko ime:</td><td>` + korisnik.KorisnickoIme + `</td></tr><tr><td>Sifra:</td><td>` + korisnik.Lozinka + `</td></tr><tr><td>Ime:</td><td>` + korisnik.Ime + `</td></tr><tr><td>Prezime:</td><td>` + korisnik.Prezime + `</td></tr><tr><td>Kontakt telefon:</td><td>` + korisnik.KontaktTelefon + `</td></tr><tr><td>JMBG:</td><td>` + korisnik.Jmbg + `</td></tr><tr><td>Pol:</td><td>` + pol + `</td></tr><tr><td>Email:</td> <td>` + korisnik.Email + `</td></tr></tbody></table>`);
};
let IzmijeniSifru = function (korisnik) {
    $("#prikazPodataka").html(`<table class="table table-bordered">
                    <thead>
                        <tr class="success">
                            <th colspan="2">
                                Promjena sifre                         
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Stara sifra:</td>
                            <td>
                                <input type="password" id="txtStaraSifra" placeholder="Stara sifra..." />
                            </td>
                        </tr>
                        <tr>
                            <td>Nova sifra:</td>
                            <td>
                                <input type="password" id="txtNovaSifra" placeholder="Nova sifra..." />
                            </td>
                        </tr>
                           <tr>
                            <td>Ponovi novu sifru:</td>
                            <td>
                                <input type="password" id="txtPonovljenaSifra" placeholder="Nova sifra..." />
                            </td>
                        </tr>
                        <tr class="success">
                            <td colspan="2">
                                <input id="btnSacuvajIzmjenu" class="btn btn-success pull-right" type="button" value="Sacuvaj">
                        <!--/form-->
                            </td>
                        </tr>
                    </tbody>
                </table>`
    );
    $("#btnSacuvajIzmjenu").click(function () {
        var stara = korisnik.Lozinka;
        var staraUnesena = $("#txtStaraSifra").val();
        var novaUnesena = $("#txtNovaSifra").val();
        var novaPonovoUnesena = $("#txtPonovljenaSifra").val();
        if (stara != staraUnesena) {
            alert(`stara sifra nije u redu`);
        } else if (novaUnesena != novaPonovoUnesena) {
            alert(`nova i ponovljena nisu iste`);
        } else {
            //ispravno, sacuvaj
            alert(`moze`);
            $.post("/api/Dispecer", { KorisnickoIme: korisnik.KorisnickoIme, Lozinka: novaUnesena, Email: korisnik.Email, Jmbg: korisnik.Jmbg, KontaktTelefon: korisnik.KontaktTelefon, Ime: korisnik.Ime, Prezime: korisnik.Prezime, Pol: korisnik.Pol }, function (data) {
                //alert(remember);
                //alert(data);
            })
                .done(function () {
                    alert("uspjesno izmijenjeno");
                    location.href = "Dispecer.html";
                })
                .fail(function () {
                    alert("ne moze");
                });
        }
    });
};
let IzmijeniPodatke = function (korisnik) {
    var pol = ``;
    if (korisnik.Pol == "1") {
        pol = `<input type="radio"  name="pol" value="0"> Muski
               <input type="radio"  name="pol" value="1" checked="checked"> Zenski`;
    } else {
        pol = `<input type="radio"  name="pol" value="0" checked="checked"> Muski
               <input type="radio"  name="pol" value="1"> Zenski`;
    }
    $("#prikazPodataka").html(`<table class="table table-bordered">
        <thead>
            <tr class="success">
                <th colspan="2">
                    Registracija                    
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Korisnicko ime:</td>
                <td>`
        + korisnik.KorisnickoIme +
        `</td>
            </tr>
            
            <tr>
                <td>Ime:</td>
                <td>
                    <input type="text" id="txtIme" value="`+ korisnik.Ime + `"/>
                </td>
            </tr>
            <tr>
                <td>Prezime:</td>
                <td>
                    <input type="text" id="txtPrezime" value="`+ korisnik.Prezime + `"/>
                </td>
            </tr>
            <tr>
                <td>Kontakt telefon:</td>
                <td>
                    <input type="text" id="txtTelefon" value="`+ korisnik.KontaktTelefon + `"/>
                </td>
            </tr>
            <tr>
                <td>JMBG:</td>
                <td>
                    <input type="text" id="txtJMBG" value="`+ korisnik.Jmbg + `"/>
                </td>
            </tr>
            <tr>
                <td>Pol:</td>
                <td>`
        + pol +
        `</td>
            </tr>
            <tr>
                <td>Email:</td>
                <td>
                    <input type="email" id="txtEmail" value="`+ korisnik.Email + `"/>
                </td>
            </tr>
            <tr class="success">
                <td colspan="2">
                    <input id="btnIzmijeniPodatke" class="btn btn-success" type="button"
                           value="Izmijeni podatke" />
                </td>
            </tr>
        </tbody>
    </table>`);
    $("#btnIzmijeniPodatke").click(function () {
        //alert(`prije promjenljivih`);

        var Email = $("#txtEmail").val();
        var Jmbg = $("#txtJMBG").val();
        var KontaktTelefon = $("#txtTelefon").val();
        var Ime = $("#txtIme").val();
        var Prezime = $("#txtPrezime").val();
        var Pol = $("input:radio[name=pol]:checked").val();
        //alert(Pol);


        //alert("posle promjenljivih");
        $.post("/api/Dispecer", { KorisnickoIme: korisnik.KorisnickoIme, Lozinka: korisnik.Lozinka, Email: Email, Jmbg: Jmbg, KontaktTelefon: KontaktTelefon, Ime: Ime, Prezime: Prezime, Pol: Pol }, function (data) {
            //alert(remember);
            //alert(data);
        })
            .done(function () {
                alert("uspjesno izmijenjeni podaci");
                location.href = "Dispecer.html";
            })
            .fail(function () {
                alert("greska prilikom izmjene podataka");
            });
    });
};

let IzmijeniPodatke2 = function (korisnik) {
    var pol = ``;
    if (korisnik.Pol == "1") {
        pol = `<input type="radio"  name="pol" value="0"> Muski
               <input type="radio"  name="pol" value="1" checked="checked"> Zenski`;
    } else {
        pol = `<input type="radio"  name="pol" value="0" checked="checked"> Muski
               <input type="radio"  name="pol" value="1"> Zenski`;
    }
    $("#prikazPodataka").html(`<table class="table table-bordered">
        <thead>
            <tr class="success">
                <th colspan="2">
                    Registracija                    
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Korisnicko ime:</td>
                <td>`
        + korisnik.KorisnickoIme +
        `</td>
            </tr>
            
            <tr>
                <td>Ime:</td>
                <td>
                    <input type="text" id="txtIme" value="`+ korisnik.Ime + `"/>
                </td>
            </tr>
            <tr>
                <td>Prezime:</td>
                <td>
                    <input type="text" id="txtPrezime" value="`+ korisnik.Prezime + `"/>
                </td>
            </tr>
            <tr>
                <td>Kontakt telefon:</td>
                <td>
                    <input type="text" id="txtTelefon" value="`+ korisnik.KontaktTelefon + `"/>
                </td>
            </tr>
            <tr>
                <td>JMBG:</td>
                <td>
                    <input type="text" id="txtJMBG" value="`+ korisnik.Jmbg + `"/>
                </td>
            </tr>
            <tr>
                <td>Pol:</td>
                <td>`
        + pol +
        `</td>
            </tr>
            <tr>
                <td>Email:</td>
                <td>
                    <input type="email" id="txtEmail" value="`+ korisnik.Email + `"/>
                </td>
            </tr>
            <tr class="success">
                <td colspan="2">
                    <input id="btnIzmijeniPodatke" class="btn btn-success" type="button"
                           value="Izmijeni podatke" />
                </td>
            </tr>
        </tbody>
    </table>`);
    $("#btnIzmijeniPodatke").click(function () {
        //alert(`prije promjenljivih`);

        var Email = $("#txtEmail").val();
        var Jmbg = $("#txtJMBG").val();
        var KontaktTelefon = $("#txtTelefon").val();
        var Ime = $("#txtIme").val();
        var Prezime = $("#txtPrezime").val();
        var Pol = $("input:radio[name=pol]:checked").val();
        //alert(Pol);


        //alert("posle promjenljivih");
        $.post("/api/Musterija", { KorisnickoIme: korisnik.KorisnickoIme, Lozinka: korisnik.Lozinka, Email: Email, Jmbg: Jmbg, KontaktTelefon: KontaktTelefon, Ime: Ime, Prezime: Prezime, Pol: Pol }, function (data) {
            //alert(remember);
            //alert(data);
        })
            .done(function () {
                alert("uspjesno registrovano, sad se uloguj");
                location.href = "Musterija.html";
            })
            .fail(function () {
                alert("vec postoji korisnik sa datim korisnickim imenom");
            });
    });
};
let IzmijeniPodatke3 = function (korisnik) {
    var pol = ``;
    if (korisnik.Pol == "1") {
        pol = `<input type="radio"  name="pol" value="0"> Muski
               <input type="radio"  name="pol" value="1" checked="checked"> Zenski`;
    } else {
        pol = `<input type="radio"  name="pol" value="0" checked="checked"> Muski
               <input type="radio"  name="pol" value="1"> Zenski`;
    }
    $("#prikazPodataka").html(`<table class="table table-bordered">
        <thead>
            <tr class="success">
                <th colspan="2">
                    Registracija                    
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Korisnicko ime:</td>
                <td>`
        + korisnik.KorisnickoIme +
        `</td>
            </tr>
            
            <tr>
                <td>Ime:</td>
                <td>
                    <input type="text" id="txtIme" value="`+ korisnik.Ime + `"/>
                </td>
            </tr>
            <tr>
                <td>Prezime:</td>
                <td>
                    <input type="text" id="txtPrezime" value="`+ korisnik.Prezime + `"/>
                </td>
            </tr>
            <tr>
                <td>Kontakt telefon:</td>
                <td>
                    <input type="text" id="txtTelefon" value="`+ korisnik.KontaktTelefon + `"/>
                </td>
            </tr>
            <tr>
                <td>JMBG:</td>
                <td>
                    <input type="text" id="txtJMBG" value="`+ korisnik.Jmbg + `"/>
                </td>
            </tr>
            <tr>
                <td>Pol:</td>
                <td>`
        + pol +
        `</td>
            </tr>
            <tr>
                <td>Email:</td>
                <td>
                    <input type="email" id="txtEmail" value="`+ korisnik.Email + `"/>
                </td>
            </tr>
            <tr class="success">
                <td colspan="2">
                    <input id="btnIzmijeniPodatke" class="btn btn-success" type="button"
                           value="Izmijeni podatke" />
                </td>
            </tr>
        </tbody>
    </table>`);
    $("#btnIzmijeniPodatke").click(function () {
        //alert(`prije promjenljivih`);

        var Email = $("#txtEmail").val();
        var Jmbg = $("#txtJMBG").val();
        var KontaktTelefon = $("#txtTelefon").val();
        var Ime = $("#txtIme").val();
        var Prezime = $("#txtPrezime").val();
        var Pol = $("input:radio[name=pol]:checked").val();
        //alert(Pol);


        //alert("posle promjenljivih");
        $.post("/api/Vozac", { KorisnickoIme: korisnik.KorisnickoIme, Lozinka: korisnik.Lozinka, Email: Email, Jmbg: Jmbg, KontaktTelefon: KontaktTelefon, Ime: Ime, Prezime: Prezime, Pol: Pol }, function (data) {
            //alert(remember);
            //alert(data);
        })
            .done(function () {
                alert("uspjesno registrovano, sad se uloguj");
                location.href = "Vozac.html";
            })
            .fail(function () {
                alert("vec postoji korisnik sa datim korisnickim imenom");
            });
    });
};
let IzmijeniSifru2 = function (korisnik) {
    $("#prikazPodataka").html(`<table class="table table-bordered">
                    <thead>
                        <tr class="success">
                            <th colspan="2">
                                Promjena sifre                         
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Stara sifra:</td>
                            <td>
                                <input type="password" id="txtStaraSifra" placeholder="Stara sifra..." />
                            </td>
                        </tr>
                        <tr>
                            <td>Nova sifra:</td>
                            <td>
                                <input type="password" id="txtNovaSifra" placeholder="Nova sifra..." />
                            </td>
                        </tr>
                           <tr>
                            <td>Ponovi novu sifru:</td>
                            <td>
                                <input type="password" id="txtPonovljenaSifra" placeholder="Nova sifra..." />
                            </td>
                        </tr>
                        <tr class="success">
                            <td colspan="2">
                                <input id="btnSacuvajIzmjenu" class="btn btn-success pull-right" type="button" value="Sacuvaj">
                        <!--/form-->
                            </td>
                        </tr>
                    </tbody>
                </table>`
    );
    $("#btnSacuvajIzmjenu").click(function () {
        var stara = korisnik.Lozinka;
        var staraUnesena = $("#txtStaraSifra").val();
        var novaUnesena = $("#txtNovaSifra").val();
        var novaPonovoUnesena = $("#txtPonovljenaSifra").val();
        if (stara != staraUnesena) {
            alert(`stara sifra nije u redu`);
        } else if (novaUnesena != novaPonovoUnesena) {
            alert(`nova i ponovljena nisu iste`);
        } else {
            //ispravno, sacuvaj
            alert(`moze`);
            $.post("/api/Musterija", { KorisnickoIme: korisnik.KorisnickoIme, Lozinka: novaUnesena, Email: korisnik.Email, Jmbg: korisnik.Jmbg, KontaktTelefon: korisnik.KontaktTelefon, Ime: korisnik.Ime, Prezime: korisnik.Prezime, Pol: korisnik.Pol }, function (data) {
                //alert(remember);
                //alert(data);
            })
                .done(function () {
                    alert("uspjesno izmijenjeno");
                    location.href = "Musterija.html";
                })
                .fail(function () {
                    alert("ne moze");
                });
        }
    });
};
let IzmijeniSifru3 = function (korisnik) {
    $("#prikazPodataka").html(`<table class="table table-bordered">
                    <thead>
                        <tr class="success">
                            <th colspan="2">
                                Promjena sifre                         
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Stara sifra:</td>
                            <td>
                                <input type="password" id="txtStaraSifra" placeholder="Stara sifra..." />
                            </td>
                        </tr>
                        <tr>
                            <td>Nova sifra:</td>
                            <td>
                                <input type="password" id="txtNovaSifra" placeholder="Nova sifra..." />
                            </td>
                        </tr>
                           <tr>
                            <td>Ponovi novu sifru:</td>
                            <td>
                                <input type="password" id="txtPonovljenaSifra" placeholder="Nova sifra..." />
                            </td>
                        </tr>
                        <tr class="success">
                            <td colspan="2">
                                <input id="btnSacuvajIzmjenu" class="btn btn-success pull-right" type="button" value="Sacuvaj">
                        <!--/form-->
                            </td>
                        </tr>
                    </tbody>
                </table>`
    );
    $("#btnSacuvajIzmjenu").click(function () {
        var stara = korisnik.Lozinka;
        var staraUnesena = $("#txtStaraSifra").val();
        var novaUnesena = $("#txtNovaSifra").val();
        var novaPonovoUnesena = $("#txtPonovljenaSifra").val();
        if (stara != staraUnesena) {
            alert(`stara sifra nije u redu`);
        } else if (novaUnesena != novaPonovoUnesena) {
            alert(`nova i ponovljena nisu iste`);
        } else {
            //ispravno, sacuvaj
            alert(`moze`);
            $.post("/api/Vozac", { KorisnickoIme: korisnik.KorisnickoIme, Lozinka: novaUnesena, Email: korisnik.Email, Jmbg: korisnik.Jmbg, KontaktTelefon: korisnik.KontaktTelefon, Ime: korisnik.Ime, Prezime: korisnik.Prezime, Pol: korisnik.Pol }, function (data) {
                //alert(remember);
                //alert(data);
            })
                .done(function () {
                    alert("uspjesno izmijenjeno");
                    location.href = "Vozac.html";
                })
                .fail(function () {
                    alert("ne moze");
                });
        }
    });
};
let jsonObjekat;
function reverseGeocode(coords) {
    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1])
        .then(function (response) {
            alert(response);
            return response.json();
        }).then(function (json) {
            console.log(json);
            jsonObjekat = json;
        });
};
let pomocna = function () {
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([19.8424, 45.2541]),
            zoom: 15
        })
    });
    //var jsonObjekat;
    map.on('click', function (evt) {
        var coord = ol.proj.toLonLat(evt.coordinate);
        alert(coord);
        reverseGeocode(coord);
        var iconFeatures = [];
        var lon = coord[0];
        var lat = coord[1];
        var icon = "marker.png";
        var iconGeometry = new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
        var iconFeature = new ol.Feature({
            geometry: iconGeometry
        });

        iconFeatures.push(iconFeature);

        var vectorSource = new ol.source.Vector({
            features: iconFeatures //add an array of features
        });

        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.95,
                src: icon
            }))
        });

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: iconStyle
        });

        map.addLayer(vectorLayer);
        //addMarker(coord[0], coord[1], "marker.png");

    });
    $("#btnMijenjaj").click(function () {
        alert(jsonObjekat);
        $.post("/api/Vozac/IzmijeniLokaciju/", { jsonResult: jsonObjekat }, function () {
            location.href = `Vozac.html`;
        });
    });
    $("#kreiranjeVoz").click(function () {
        alert(jsonObjekat);
        $.post("/api/Vozac/GetLokacija/", { jsonResult: jsonObjekat }, function (data) {
            //alert(data.KoordinataX);
            $("#txtUlica").val(data.Adresa.Ulica);
            $("#txtBroj").val(data.Adresa.Broj);
            $("#txtGrad").val(data.Adresa.NaseljenoMjesto);
            $("#txtPostanskiBroj").val(data.Adresa.PozivniBrojMjesta);
            $("#txtKoordinataX").val(data.KoordinataX);
            $("#txtKoordinataY").val(data.KoordinataY);
            //location.href = uloga + `.html`;
        });
    });
    $("#kreiranje").click(function () {
        alert(jsonObjekat);
        $.post("/api/Musterija/GetLokacija/", { jsonResult: jsonObjekat}, function (data) {
            //alert(data.KoordinataX);
            $("#txtUlica").val(data.Adresa.Ulica);
            $("#txtBroj").val(data.Adresa.Broj);
            $("#txtGrad").val(data.Adresa.NaseljenoMjesto);
            $("#txtPostanskiBroj").val(data.Adresa.PozivniBrojMjesta);
            $("#txtKoordinataX").val(data.KoordinataX);
            $("#txtKoordinataY").val(data.KoordinataY);
            //location.href = uloga + `.html`;
        });
    });
    $("#kreiranjeDisp").click(function () {
        alert(jsonObjekat);
        $.post("/api/Dispecer/GetLokacija/", { jsonResult: jsonObjekat }, function (data) {
            //alert(data.KoordinataX);
            $("#txtUlica").val(data.Adresa.Ulica);
            $("#txtBroj").val(data.Adresa.Broj);
            $("#txtGrad").val(data.Adresa.NaseljenoMjesto);
            $("#txtPostanskiBroj").val(data.Adresa.PozivniBrojMjesta);
            $("#txtKoordinataX").val(data.KoordinataX);
            $("#txtKoordinataY").val(data.KoordinataY);
            //location.href = uloga + `.html`;
        });
    });
};
let PrikaziMapu = function () {
    
    $("#prikazPodataka").html(`<h2>Moja lokacija</h2>
    <button id="btnMijenjaj">Izmijeni lokaciju</button>
    <div id="map" class="map"></div>`);
    pomocna();
    var icon1 = "marker.png";
    
};