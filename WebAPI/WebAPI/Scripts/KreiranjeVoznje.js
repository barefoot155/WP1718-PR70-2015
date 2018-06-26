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
            return "";
    }
};
function funkcijaTipAuta(tipAuta) {
    switch (tipAuta) {
        case 0:
            return "Nepoznato";
            break;
        case 1:
            return "Putnicki automobil";
            break;
        case 2:
            return "Kombi vozilo";
            break;        
        default:
            return "";
    }
};
function ModalDialogKod(header,opis,ocjena,datum,voznja,autor) {
return `<!-- Trigger the modal with a button -->
<button id="${voznja}" type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#myModal${voznja}">Prikazi +</button>

<!-- Modal -->
<div id="myModal${voznja}" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">`+ header +`</h4>
      </div>
      <div class="modal-body">
        <p><b>Datum:</b>`+ datum + `</p>
        <p><b>Autor:</b>`+ autor + `</p>
        <p><b>Voznja:</b>`+ voznja + `</p>        
        <p><b>Ocjena:</b>`+ ocjena + `</p>
        <p><b>Opis:</b>`+ opis + `</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal">Zatvori</button>
      </div>
    </div>

  </div>
</div>`;
};


function display(startDate, endDate) {
    if (endDate == "") {
        var startDateTimeStamp = new Date(startDate).getTime();
        $("#table tbody tr").each(function () {
            var rowDate = $(this).find('td:eq(0)').html();
            /*var rDate = startDate.split(`T`)[0].split(`-`);
            var rTime = startDate.split(`T`)[1].split(`-`);
            */
            var rowDateTimeStamp = new Date(rowDate).getTime();
            if (startDateTimeStamp <= rowDateTimeStamp) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

    }else if(startDate == ""){

        var startDateTimeStamp = new Date(startDate).getTime();
        $("#table tbody tr").each(function () {
            var rowDate = $(this).find('td:eq(0)').html();
            /*var rDate = startDate.split(`T`)[0].split(`-`);
            var rTime = startDate.split(`T`)[1].split(`-`);
            */
            var rowDateTimeStamp = new Date(rowDate).getTime();
            if (rowDateTimeStamp <= endDateTimeStamp) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }else{

        var startDateTimeStamp = new Date(startDate).getTime();
        var endDateTimeStamp = new Date(endDate).getTime();

        $("#table tbody tr").each(function () {
            var rowDate = $(this).find('td:eq(0)').html();
            /*var rDate = startDate.split(`T`)[0].split(`-`);
            var rTime = startDate.split(`T`)[1].split(`-`);
            */
            var rowDateTimeStamp = new Date(rowDate).getTime();
            if (startDateTimeStamp <= rowDateTimeStamp && rowDateTimeStamp <= endDateTimeStamp) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
};

let KreiranjeVoznje = function (data) {
    $("#prikazPodataka").html(`<h2>Pocetna lokacija</h2>
    <button id="kreiranje">Uzmi lokaciju sa mape</button>
    <div id="map" class="map" style="width:50%;height:500px;float:left;"></div>
    <table class="table table-bordered" style="width:50%;padding:200px 0px 200px 0px;float:right;">
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
    pomocna();
    /*$("#kreiranje").click(function () {
        alert(jsonObjekat);
        $.post("/api/Musterija/GetLokacija/", { jsonResult: jsonObjekat,tipA:`0` }, function (data) {
            alert(data.KoordinataX);
            $("#txtUlica").val(data.Adresa.Ulica);
            $("#txtBroj").val(data.Adresa.Broj);
            $("#txtGrad").val(data.Adresa.NaseljenoMjesto);
            $("#txtPostanskiBroj").val(data.Adresa.PozivniBrojMjesta);
            $("#txtKoordinataX").val(data.KoordinataX);
            $("#txtKoordinataY").val(data.KoordinataY);
            //location.href = uloga + `.html`;
        });
    });*/
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
        $.get("/api/Musterija/KreirajVoznju/", { x: x, y: y, tip: tipAutomobila, ulica: ulica, broj: broj, posta: postanskiBr, grad: grad, korIme: korIme }, function (data) {
            //alert(`iz geta`);
            location.href = uloga+`.html`;
        });
    });    
};

function comparer(index) {
    return function (a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
    }
};
function getCellValue(row, index) {
    return $(row).children('td').eq(index).text()
};
let IspisiVoznje = function (data) {
    let temp = ``;
    for (drive in data) {
        var imeiprzMusterije = ``;
        var imeiprzVozaca = ``;
        $.ajax({
            url: "/api/Dispecer/VratiImeIPrezime/",
            type: "get",
            async: false,
            data: { korIme: data[drive].Musterija },
            success: function (imeiprz) {
                imeiprzMusterije = imeiprz;
                imeiprzMusterije = imeiprz.split('-')[0] + ` ` + imeiprz.split('-')[1];
            }
        });
        $.ajax({
            url: "/api/Dispecer/VratiImeIPrezime/",
            type: "get",
            async: false,
            data: { korIme: data[drive].Vozac },
            success: function (imeiprz2) {
                imeiprzVozaca = imeiprz2;
                imeiprzVozaca = imeiprz2.split('-')[0] + ` ` + imeiprz2.split('-')[1];
            }
        });
        temp += `<tr>`;
        temp += (`<td>${data[drive].DatumIVrijemePorudzbe}</td>`);
        temp += (`<td>${imeiprzMusterije}</td>`);
        temp += (`<td>${data[drive].Dispecer}</td>`);
        temp += (`<td>${imeiprzVozaca}</td>`);
        temp += (`<td class="col1">${funkcijaStatusVoznje(data[drive].StatusVoznje)}</td>`);
        temp += (`<td>${funkcijaTipAuta(data[drive].TipAutomobila)}</td >`);
        temp += (`<td>${data[drive].Lokacija.Adresa.Ulica}</td>`);
        temp += (`<td>${data[drive].Odrediste.Adresa.Ulica}</td>`);
        temp += (`<td>${data[drive].Iznos}</td>`);
        //temp += (`<td>${data[drive].Komentar.Opis}</td>`);
        var komen = `Komentar`;
        temp += (`<td>${ModalDialogKod(komen, data[drive].Komentar.Opis, data[drive].Komentar.Ocjena, data[drive].Komentar.DatumObjave, data[drive].Id, data[drive].Komentar.Korisnik)}</td>`);
        temp += (`<td>${data[drive].Komentar.Ocjena}</td>`);
        temp += (`<td>`);
        temp += (data[drive].StatusVoznje == 0) ? (`<input name="otkazi" id="btnOtkazi` + data[drive].Id + `" class="btn btn-success" type="button" value="Otkazi voznju"></br><input name="izmijeni" id="btnIzmijeni` + data[drive].Id + `" class="btn btn-success" type="button" value="Izmijeni voznju">`) : ``;
        temp += (data[drive].StatusVoznje == 6) ? (`</br><input name="komentar" id="btnKoment` + data[drive].Id + `" class="btn btn-success" type="button" value="Ostavi komentar">`) : ``;
        temp += (`</td>`);
        temp += `</tr>`;
    }
    
    $("#prikazPodataka").html(`<div>
    </br><b>Filtriraj po statusu:&nbsp;&nbsp;</b><select id="zaFilter">
         <option value="Bez naznake" selected>Bez naznake</option>
         <option value="Kreirana - Na cekanju">Kreirana - Na cekanju</option>
         <option value="Formirana">Formirana</option>
         <option value="Obradjena">Obradjena</option>
         <option value="Prihvacena">Prihvacena</option>
         <option value="Otkazana">Otkazana</option>
         <option value="Neuspjesna">Neuspjesna</option>
         <option value="Uspjesna">Uspjesna</option>
    </select>
    </div><br/>    
    <table id="table" class="table table - bordered">
        <thead>
        <tr class="success">
            <th colspan="12" style="text-align:center">
                Korisnikove voznje
            </th>
        </tr>
        <tr>    
            <th name="sortiraj" class="success">Datum i vrijeme<span name="strelica" class="glyphicon glyphicon-arrow-down"/></th>
            <th class="success">Musterija</th>
            <th class="success">Dispecer</th>
            <th class="success">Vozac</th>
            <th class="success">StatusVoznje</th>
            <th class="success">TipAutomobila</th>
            <th class="success">Ulica</th>
            <th class="success">Odrediste</th>
            <th name="sortiraj" class="success">Iznos<span name="strelica" class="glyphicon glyphicon-arrow-down"/></th>
            <th class="success">Komentar</th>
            <th name="sortiraj" class="success">Komentar-Ocjena<span name="strelica" class="glyphicon glyphicon-arrow-down"/></th>
            <th class="success">Opcije</th>
        </tr>
        <tr class="success">
            <th>
                od: <input type="datetime-local" id="odDatum" style="width:160px;"/></br>
                do: <input type="datetime-local" id="doDatum" style="width:160px;"/>
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>
                od: <input type="number" id="odCijena" min="0" style="width:60px;"/></br>
                do: <input type="number" id="doCijena" min="0" style="width:60px;"/>
            </th>
            <th></th>
            <th>
                od: <input type="number" id="odOcjena" min="0" max="5"/></br>
                do: <input type="number" id="doOcjena" min="0" max="5"/>
            </th>
            <th></th>
        </tr>
        </thead>
        <tbody>${temp}        
        </tbody>
    </table>`);
    $("#pretraziVozace").keyup(function(){
        $("#table tbody tr").each(function () {
            var name = $('td:eq(3)', this).text().toLowerCase();
            //$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            if (name.indexOf($("#pretraziVozace").text().toLowerCase())>-1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    $("#pretraziMusterije").keyup(function () {
        $("#table tbody tr").each(function () {
            var name = $('td:eq(1)', this).text().toLowerCase();
            //$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            if (name.indexOf($("#pretraziMusterije").text().toLowerCase()) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    $("#odDatum").change(function () {
        if ($("#odDatum").val() == "" && $("#doDatum").val() == "") {
            $("#table tbody tr").each(function () {
                $(this).show();
            });
        } else {
            display($("#odDatum").val(), $("#doDatum").val());
        }        
    });
    $("#doDatum").change(function () {
        if ($("#odDatum").val() == "" && $("#doDatum").val() == "") {
            $("#table tbody tr").each(function () {
                $(this).show();
            });
        } else {
            display($("#odDatum").val(), $("#doDatum").val());
        }
    });
    
    $("#odCijena").keyup(function () {
        //alert("promjenaaaa")
        if ($("#doCijena").val() != ``) {
            if ($("#odCijena").val()-$("#doCijena").val()>0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretraga($("#odCijena").val(), $("#doCijena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretraga($("#odCijena").val(), $("#doCijena").val());
        }
        
    });
    $("#odCijena").mouseup(function () {
        //alert("miss")
        if ($("#doCijena").val() != ``) {
            if ($("#odCijena").val() - $("#doCijena").val() > 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretraga($("#odCijena").val(), $("#doCijena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretraga($("#odCijena").val(), $("#doCijena").val());
        }
    });
    $("#doCijena").keyup(function () {
        //alert("promjenaaaa")
        if ($("#odCijena").val() != ``) {
            if ($("#doCijena").val() - $("#odCijena").val() < 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretraga($("#odCijena").val(), $("#doCijena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretraga($("#odCijena").val(), $("#doCijena").val());
        }

    });
    $("#doCijena").mouseup(function () {
        //alert("miss")
        if ($("#odCijena").val() != ``) {
            if ($("#doCijena").val() - $("#odCijena").val() < 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretraga($("#odCijena").val(), $("#doCijena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretraga($("#odCijena").val(), $("#doCijena").val());
        }
    });
    $("#odOcjena").keyup(function () {
        //alert("promjenaaaa")
        if ($("#doOcjena").val() != ``) {
            if ($("#odOcjena").val() - $("#doOcjena").val() > 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
        }

    });
    $("#odOcjena").mouseup(function () {
        //alert("miss")
        if ($("#doOcjena").val() != ``) {
            if ($("#odCijena").val() - $("#doOcjena").val() > 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
        }
    });
    $("#doOcjena").keyup(function () {
        //alert("promjenaaaa")
        if ($("#odOcjena").val() != ``) {
            if ($("#doOcjena").val() - $("#odOcjena").val() < 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
        }

    });
    $("#doOcjena").mouseup(function () {
        //alert("miss")
        if ($("#odOcjena").val() != ``) {
            if ($("#doOcjena").val() - $("#odOcjena").val() < 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
        }
    });
    $("#zaFilter").change(function () {
        //alert($(this).val());
        if ($(this).val() == "Bez naznake") {
            $("#table td.col1").parent().show();
        } else {
            $("#table td.col1:contains('" + $(this).val() + "')").parent().show();
            $("#table td.col1:not(:contains('" + $(this).val() + "'))").parent().hide();
        }
    });
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
    $("input:button[name=komentar]").click(function () {
        //alert(this.id);//uzmi id tog dugmeta
        ulogaKorisnika(`0`);
        var ppp = this.id;
        //alert(`uloga prije geta` + ul + this.id + data[0].Musterija);
        OstaviKom(ppp, data[0].Musterija);        
    });
    $("th[name=sortiraj]").click(function () {

        if ($(this.getElementsByTagName("span")).attr(`class`) == "glyphicon glyphicon-arrow-down") {
            $(this.getElementsByTagName("span")).removeClass("glyphicon glyphicon-arrow-down");
            $(this.getElementsByTagName("span")).toggleClass("glyphicon glyphicon-arrow-up");
        } else {
            $(this.getElementsByTagName("span")).removeClass("glyphicon glyphicon-up-down");
            $(this.getElementsByTagName("span")).toggleClass("glyphicon glyphicon-arrow-down");
        }
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(2)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    });
};
function ImeIPrezime(korisnicko) {
    let vraceno = ``;
    $.get("/api/Dispecer/VratiImeIPrezime/", { korIme: korisnicko }, function (vr) {
        vraceno = vr;
    });
    return vraceno;
};
let IspisiVoznjeDisp = function (data, username) {
    let temp = ``;
    let komen = `Komentar`;
    var br = 0;
    for (drive in data) {
        var imeiprzMusterije = ``;
        var imeiprzVozaca = ``;
        $.ajax({
            url: "/api/Dispecer/VratiImeIPrezime/",
            type: "get",
            async: false,
            data: { korIme: data[drive].Musterija},
            success: function (imeiprz) {
                imeiprzMusterije = imeiprz;
                imeiprzMusterije = imeiprz.split('-')[0] + ` ` + imeiprz.split('-')[1];
            }
        });
        $.ajax({
            url: "/api/Dispecer/VratiImeIPrezime/",
            type: "get",
            async: false,
            data: { korIme: data[drive].Vozac },
            success: function (imeiprz2) {
                imeiprzVozaca = imeiprz2;
                imeiprzVozaca=imeiprz2.split('-')[0] + ` ` + imeiprz2.split('-')[1];
            }
        });
        
        temp += `<tr>`;
        temp += (`<td>${data[drive].DatumIVrijemePorudzbe}</td>`);
        temp += (`<td>${imeiprzMusterije}</td>`);
        temp += (`<td>${data[drive].Dispecer}</td>`);
        temp += (`<td>${imeiprzVozaca}</td>`);
        temp += (`<td class="col1">${funkcijaStatusVoznje(data[drive].StatusVoznje)}</td>`);
        temp += (`<td>${funkcijaTipAuta(data[drive].TipAutomobila)}</td>`);
        temp += (`<td>${data[drive].Lokacija.Adresa.Ulica}</td>`);
        temp += (`<td>${data[drive].Odrediste.Adresa.Ulica}</td>`);
        temp += (`<td>${data[drive].Iznos}</td>`);        
        temp += (`<td>${ModalDialogKod(komen, data[drive].Komentar.Opis, data[drive].Komentar.Ocjena, data[drive].Komentar.DatumObjave, data[drive].Komentar.Voznja, data[drive].Komentar.Korisnik)}</td>`);
        temp += (`<td>${data[drive].Komentar.Ocjena}</td>`);
        temp += (data[drive].StatusVoznje == 0) ? (`<td><input name="obradi" id="btnObradi` + data[drive].Id + `" class="btn btn-success" type="button" value="Obradi voznju">`) : `<td>` + `</td>`;
        temp += `</tr>`;
    }
    
    $("#prikazPodataka").html(`<div>
    </br><b>Filtriraj po statusu:&nbsp;&nbsp;</b><select id="zaFilter">
         <option value="Bez naznake" selected>Bez naznake</option>
         <option value="Kreirana - Na cekanju">Kreirana - Na cekanju</option>
         <option value="Formirana">Formirana</option>
         <option value="Obradjena">Obradjena</option>
         <option value="Prihvacena">Prihvacena</option>
         <option value="Otkazana">Otkazana</option>
         <option value="Neuspjesna">Neuspjesna</option>
         <option value="Uspjesna">Uspjesna</option>
    </select>
    </div>
    <br/>
    <table id="table" class="table table - bordered">
        <thead>
        <tr class="success">
            <th colspan="12" style="text-align:center">
                Korisnikove voznje
            </th>
        </tr>
        <tr>    
            <th name="sortiraj" class="success">Datum i vrijeme<span name="strelica" class="glyphicon glyphicon-arrow-down"/></th>
            <th class="success">Musterija</th>
            <th class="success">Dispecer</th>
            <th class="success">Vozac</th>
            <th class="success">StatusVoznje</th>
            <th class="success">TipAutomobila</th>
            <th class="success">Ulica</th>
            <th class="success">Odrediste</th>
            <th name="sortiraj" class="success">Iznos<span name="strelica" class="glyphicon glyphicon-arrow-down"/></th>
            <th class="success">Komentar</th>
            <th name="sortiraj" class="success">Komentar-Ocjena<span name="strelica" class="glyphicon glyphicon-arrow-down"/></th>
            <th class="success">Opcije</th>
        </tr>
        <tr class="success">
            <th>
                od: <input type="datetime-local" id="odDatum" style="width:160px;"/></br>
                do: <input type="datetime-local" id="doDatum" style="width:160px;"/>
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>
                od: <input type="number" id="odCijena" min="0" style="width:60px;"/></br>
                do: <input type="number" id="doCijena" min="0" style="width:60px;"/>
            </th>
            <th></th>
            <th>
                od: <input type="number" id="odOcjena" min="0" max="5"/></br>
                do: <input type="number" id="doOcjena" min="0" max="5"/>
            </th>
            <th></th>
        </tr>
        </thead>
        <tbody>${temp}        
        </tbody>
    </table>`);
    $("#pretraziVozace").keyup(function () {
        $("#table tbody tr").each(function () {
            var name = $('td:eq(3)', this).text().toLowerCase();
            var unesi = $("#pretraziVozace").val().toLowerCase();
            //$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            if (name.indexOf(unesi) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    $("#pretraziMusterije").keyup(function () {
        $("#table tbody tr").each(function () {
            var name = $('td:eq(1)', this).text().toLowerCase();
            var unesi = $("#pretraziMusterije").val().toLowerCase();
            //$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            if (name.indexOf(unesi) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    $("#odDatum").change(function () {
        if ($("#odDatum").val() == "" && $("#doDatum").val() == "") {
            $("#table tbody tr").each(function () {
                $(this).show();
            });
        } else {
            display($("#odDatum").val(), $("#doDatum").val());
        }
    });
    $("#doDatum").change(function () {
        if ($("#odDatum").val() == "" && $("#doDatum").val() == "") {
            $("#table tbody tr").each(function () {
                $(this).show();
            });
        } else {
            display($("#odDatum").val(), $("#doDatum").val());
        }
    });
    $("#odCijena").keyup(function () {
        //alert("promjenaaaa")
        if ($("#doCijena").val() != ``) {
            if ($("#odCijena").val() - $("#doCijena").val() > 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretraga($("#odCijena").val(), $("#doCijena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretraga($("#odCijena").val(), $("#doCijena").val());
        }

    });
    $("#odCijena").mouseup(function () {
        //alert("miss")
        if ($("#doCijena").val() != ``) {
            if ($("#odCijena").val() - $("#doCijena").val() > 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretraga($("#odCijena").val(), $("#doCijena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretraga($("#odCijena").val(), $("#doCijena").val());
        }
    });
    $("#doCijena").keyup(function () {
        //alert("promjenaaaa")
        if ($("#odCijena").val() != ``) {
            if ($("#doCijena").val() - $("#odCijena").val() < 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretraga($("#odCijena").val(), $("#doCijena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretraga($("#odCijena").val(), $("#doCijena").val());
        }

    });
    $("#doCijena").mouseup(function () {
        //alert("miss")
        if ($("#odCijena").val() != ``) {
            if ($("#doCijena").val() - $("#odCijena").val() < 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretraga($("#odCijena").val(), $("#doCijena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretraga($("#odCijena").val(), $("#doCijena").val());
        }
    });
    $("#odOcjena").keyup(function () {
        //alert("promjenaaaa")
        if ($("#doOcjena").val() != ``) {
            if ($("#odOcjena").val() - $("#doOcjena").val() > 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
        }

    });
    $("#odOcjena").mouseup(function () {
        //alert("miss")
        if ($("#doOcjena").val() != ``) {
            if ($("#odCijena").val() - $("#doOcjena").val() > 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
        }
    });
    $("#doOcjena").keyup(function () {
        //alert("promjenaaaa")
        if ($("#odOcjena").val() != ``) {
            if ($("#doOcjena").val() - $("#odOcjena").val() < 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
        }

    });
    $("#doOcjena").mouseup(function () {
        //alert("miss")
        if ($("#odOcjena").val() != ``) {
            if ($("#doOcjena").val() - $("#odOcjena").val() < 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
        }
    });
    $("#zaFilter").change(function () {
        //alert($(this).val());
        if ($(this).val() == "Bez naznake") {
            $("#table td.col1").parent().show();
        } else {
            $("#table td.col1:contains('" + $(this).val() + "')").parent().show();
            $("#table td.col1:not(:contains('" + $(this).val() + "'))").parent().hide();
        }
    });
    $("th[name=sortiraj]").click(function () {

        if ($(this.getElementsByTagName("span")).attr(`class`) == "glyphicon glyphicon-arrow-down") {
            $(this.getElementsByTagName("span")).removeClass("glyphicon glyphicon-arrow-down");
            $(this.getElementsByTagName("span")).toggleClass("glyphicon glyphicon-arrow-up");
        } else {
            $(this.getElementsByTagName("span")).removeClass("glyphicon glyphicon-up-down");
            $(this.getElementsByTagName("span")).toggleClass("glyphicon glyphicon-arrow-down");
        }
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(2)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    });
    $("input:button[name=obradi]").click(function () {
        //alert(this.id);//uzmi id tog dugmeta
        ulogaKorisnika(`1`);
        var ppp = this.id;
        //alert(`uloga prije geta` + ul + this.id + data[0].Musterija);
        var imeMusterije = ``;
        for (drive in data) {
            if (("btnObradi" + data[drive].Id) == ppp) {
                imeMusterije = data[drive].Musterija;
                break;
            }
        }
        ObradjivanjeVoznje(ppp, username, imeMusterije);

    });
};
function pretraga(minValue, maxValue) {
    var min = parseInt($('#odCijena').val(), 10);
    var max = parseInt($('#doCijena').val(), 10);
    $("#table tbody tr").each(function () {
        var age = parseFloat($('td:eq(8)', this).text()) || 0;
        if ((isNaN(min) && isNaN(max)) ||
            (isNaN(min) && age <= max) ||
            (min <= age && isNaN(max)) ||
            (min <= age && age <= max)) {
            $(this).show()
        } else {
            $(this).hide()
        }
    });
};
function pretragaOcj(minValue, maxValue) {
    var min = parseInt($('#odOcjena').val(), 10);
    var max = parseInt($('#doOcjena').val(), 10);
    $("#table tbody tr").each(function () {
        var age = parseFloat($('td:eq(10)', this).text()) || 0;
        if ((isNaN(min) && isNaN(max)) ||
            (isNaN(min) && age <= max) ||
            (min <= age && isNaN(max)) ||
            (min <= age && age <= max)) {
            $(this).show()
        } else {
            $(this).hide()
        }
    });
};
let OstaviKom = function (idVoz, idKor) {
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

        //idKor i idVoz
        $.get("/api/" + uloga + "/OstaviKomentar/", { Opis: koment, Ocjena: ocj, Korisnik: idKor, Voznja: idVoz }, function () {
            //alert(`komeeeeeentaaar`);
            location.href = ul + `.html`;
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
                    <textarea id="txtKom" rows="4" cols="50"></textarea>
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
        
        //idKor i idVoz
        $.get("/api/" + uloga + "/OstaviKomentar/", { Opis: koment, Ocjena: ocj, Korisnik: idKor, Voznja: idVoz }, function () {
            //alert(`komeeeeeentaaar`);
            location.href =ul+ `.html`;
        });
        
    });
};
let KreiranjeVoznjeDisp = function (data,data1) {//u data su podaci o dispeceru, data1 podaci o vozacima
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


let ObradjivanjeVoznje = function (data1, data2, data3) {
    let voznje = null;
    let temp = ``;
    $.get("/api/Dispecer/VratiSlobodneVozace", function (data4) {
        //alert(data4[0].KorisnickoIme);
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
            //alert(KorisnickoIme);
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
        temp += (`<td class="col1">${funkcijaStatusVoznje(data[drive].StatusVoznje)}</td>`);
        temp += (`<td>${funkcijaTipAuta(data[drive].TipAutomobila)}</td>`);
        temp += (`<td>${data[drive].Lokacija.Adresa.Ulica}</td>`);
        temp += (`<td>${data[drive].Odrediste}</td>`);
        temp += (`<td>${data[drive].Iznos}</td>`);
        var komen = `Komentar`;
        temp += (`<td>${ModalDialogKod(komen, data[drive].Komentar.Opis, data[drive].Komentar.Ocjena, data[drive].Komentar.DatumObjave, data[drive].Komentar.Voznja, data[drive].Komentar.Korisnik)}</td>`);
        temp += (`<td>${data[drive].Komentar.Ocjena}</td>`);
        temp += `<td>`;
        temp += (data[drive].StatusVoznje == 0) ? (`<input name="prihvati" id="btnPrihvati` + data[drive].Id + `" class="btn btn-success" type="button" value="Prihvati voznju">`) : ``;
        temp += (data[drive].StatusVoznje == 2 || data[drive].StatusVoznje == 3 || data[drive].StatusVoznje == 1) ? (`<input name="obradi" id="btnObradi` + data[drive].Id + `" class="btn btn-success" type="button" value="Promijeni status voznje">`) : ``;
        temp += `</td>`;
        temp += `</tr>`;
    }

    $("#prikazPodataka").html(`<div>
    <select id="zaFilter">
         <option value="Bez naznake" selected>Bez naznake</option>
         <option value="Kreirana - Na cekanju">Kreirana - Na cekanju</option>
         <option value="Formirana">Formirana</option>
         <option value="Obradjena">Obradjena</option>
         <option value="Prihvacena">Prihvacena</option>
         <option value="Otkazana">Otkazana</option>
         <option value="Neuspjesna">Neuspjesna</option>
         <option value="Uspjesna">Uspjesna</option>
    </select>
    </div>
    <table id="table" class="table table - bordered">
        <thead>
        <tr class="success">
            <th colspan="12" style="text-align:center">
                Korisnikove voznje
            </th>
        </tr>
        <tr>    
            <th name="sortiraj" class="success">Datum i vrijeme<span name="strelica" class="glyphicon glyphicon-arrow-down"/></th>
            <th class="success">Musterija</th>
            <th class="success">Dispecer</th>
            <th class="success">Vozac</th>
            <th class="success">StatusVoznje</th>
            <th class="success">TipAutomobila</th>
            <th class="success">Ulica</th>
            <th class="success">Odrediste</th>
            <th name="sortiraj" class="success">Iznos<span name="strelica" class="glyphicon glyphicon-arrow-down"/></th>
            <th class="success">Komentar</th>
            <th name="sortiraj" class="success">Komentar-Ocjena<span name="strelica" class="glyphicon glyphicon-arrow-down"/></th>
            <th class="success">Opcije</th>
        </tr>
        <tr class="success">
            <th>
                od: <input type="datetime-local" id="odDatum" style="width:160px;"/></br>
                do: <input type="datetime-local" id="doDatum" style="width:160px;"/>
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>
                od: <input type="number" id="odCijena" min="0" style="width:60px;"/></br>
                do: <input type="number" id="doCijena" min="0" style="width:60px;"/>
            </th>
            <th></th>
            <th>
                od: <input type="number" id="odOcjena" min="0" max="5"/></br>
                do: <input type="number" id="doOcjena" min="0" max="5"/>
            </th>
            <th></th>
        </tr>
        </thead>
        <tbody>${temp}        
        </tbody>
    </table>`);
    $("#odDatum").change(function () {
        if ($("#odDatum").val() == "" && $("#doDatum").val() == "") {
            $("#table tbody tr").each(function () {
                $(this).show();
            });
        } else {
            display($("#odDatum").val(), $("#doDatum").val());
        }
    });
    $("#doDatum").change(function () {
        if ($("#odDatum").val() == "" && $("#doDatum").val() == "") {
            $("#table tbody tr").each(function () {
                $(this).show();
            });
        } else {
            display($("#odDatum").val(), $("#doDatum").val());
        }
    });
    $("#odCijena").keyup(function () {
        //alert("promjenaaaa")
        if ($("#doCijena").val() != ``) {
            if ($("#odCijena").val() - $("#doCijena").val() > 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretraga($("#odCijena").val(), $("#doCijena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretraga($("#odCijena").val(), $("#doCijena").val());
        }

    });
    $("#odCijena").mouseup(function () {
        //alert("miss")
        if ($("#doCijena").val() != ``) {
            if ($("#odCijena").val() - $("#doCijena").val() > 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretraga($("#odCijena").val(), $("#doCijena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretraga($("#odCijena").val(), $("#doCijena").val());
        }
    });
    $("#doCijena").keyup(function () {
        //alert("promjenaaaa")
        if ($("#odCijena").val() != ``) {
            if ($("#doCijena").val() - $("#odCijena").val() < 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretraga($("#odCijena").val(), $("#doCijena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretraga($("#odCijena").val(), $("#doCijena").val());
        }

    });
    $("#doCijena").mouseup(function () {
        //alert("miss")
        if ($("#odCijena").val() != ``) {
            if ($("#doCijena").val() - $("#odCijena").val() < 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretraga($("#odCijena").val(), $("#doCijena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretraga($("#odCijena").val(), $("#doCijena").val());
        }
    });
    $("#odOcjena").keyup(function () {
        //alert("promjenaaaa")
        if ($("#doOcjena").val() != ``) {
            if ($("#odOcjena").val() - $("#doOcjena").val() > 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
        }

    });
    $("#odOcjena").mouseup(function () {
        //alert("miss")
        if ($("#doOcjena").val() != ``) {
            if ($("#odCijena").val() - $("#doOcjena").val() > 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
        }
    });
    $("#doOcjena").keyup(function () {
        //alert("promjenaaaa")
        if ($("#odOcjena").val() != ``) {
            if ($("#doOcjena").val() - $("#odOcjena").val() < 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
        }

    });
    $("#doOcjena").mouseup(function () {
        //alert("miss")
        if ($("#odOcjena").val() != ``) {
            if ($("#doOcjena").val() - $("#odOcjena").val() < 0) {
                $(this).removeAttr("class");
                $(this).addClass("alert-danger");
            } else {
                $(this).removeAttr("class");
                pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
            }
        } else {
            $(this).removeAttr("class");
            pretragaOcj($("#odOcjena").val(), $("#doOcjena").val());
        }
    });
    $("#zaFilter").change(function () {
        //alert($(this).val());
        if ($(this).val() == "Bez naznake") {
            $("#table td.col1").parent().show();
        } else {
            $("#table td.col1:contains('" + $(this).val() + "')").parent().show();
            $("#table td.col1:not(:contains('" + $(this).val() + "'))").parent().hide();
        }
    });
    $("th[name=sortiraj]").click(function () {

        if ($(this.getElementsByTagName("span")).attr(`class`) == "glyphicon glyphicon-arrow-down") {
            $(this.getElementsByTagName("span")).removeClass("glyphicon glyphicon-arrow-down");
            $(this.getElementsByTagName("span")).toggleClass("glyphicon glyphicon-arrow-up");
        } else {
            $(this.getElementsByTagName("span")).removeClass("glyphicon glyphicon-up-down");
            $(this.getElementsByTagName("span")).toggleClass("glyphicon glyphicon-arrow-down");
        }
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(2)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    });
    $("input:button[name=prihvati]").click(function () {
        //alert(this.id);//uzmi id tog dugmeta
        ulogaKorisnika(`2`);
        var ppp = this.id;
        $.get("/api/Vozac/PrihvatiVoznju/", { idVoznje: ppp, idVozaca:idVoz}, function () {
            //alert(`prihvacena`);
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
                    <input type="number" id="txtIznos" placeholder="Unesi iznos..." />
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

let IzmijeniLokaciju = function (idVozaca) {
    let htmlLokacija = `<table class="table table-bordered">
        <thead>
            <tr class="success">
                <th colspan="2">
                    Moja lokacija
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
            <tr class="success">
                <td colspan="2">
                    <input id="btnLok" class="btn btn-success pull-right" type="button" value="Promijeni lokaciju">                    
                </td>
            </tr>
        </tbody>
     </table>`;    
    $("#prikazPodataka").html(htmlLokacija);
    $("#btnLok").click(function () {
        $.get("/api/Vozac/PromijeniLokaciju/", { idVozaca: idVozaca, ulica: $("#txtUlica").val(), broj: $("#txtBroj").val(), grad: $("#txtGrad").val(), posta: $("#txtPostanskiBroj").val(), x: $("#txtKoordinataX").val(), y: $("#txtKoordinataY").val() }, function () {
            location.href = "Vozac.html";
        });
    });
};

let IspisiKorisnike = function (data) {
    var pom = ``;
    for (user in data) {
        pom += `<tr><td>`;
        pom += data[user].split(`-`)[0];
        pom += `</td><td>`;
        pom += data[user].split(`-`)[1];
        pom += `</td><td>`;
        pom += (data[user].split(`-`)[2] == `True`) ? `<button name="blok" id="${data[user].split(`-`)[0]}" type="button" class="btn btn-success btn-sm">Odblokiraj</button>` : `<button name="blok" id="${data[user].split(`-`)[0]}" type="button" class="btn btn-danger btn-sm">Blokiraj</button>`;
        pom += `</td></tr>`;
    }
    $("#prikazPodataka").html(`<table class="table table-bordered">
        <thead>
            <tr class="success">
                <th colspan="3">
                    Svi vozaci i musterije
                </th>
            </tr>
            <tr class="success">
                <th>
                    Korisnicko ime
                </th>
                <th>
                    Uloga
                </th>
                <th>
                    Opcije
                </th>
            </tr>
        </thead>
        <tbody>
            ${pom}
        </tbody>
     </table>`);
    $("button[name=blok]").click(function () {

        $.get("api/Dispecer/Blokiranje/", { korIme: this.id }, function (pod) {
            
            IspisiKorisnike(pod);
        });        
    });
};