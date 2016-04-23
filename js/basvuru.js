/// <reference path="crmApi.js" />
/// <reference path="knockout-3.4.0.js" />
/*
  Jquery Validation using jqBootstrapValidation
   example is taken from jqBootstrapValidation docs 
  */
var dataModel = {
    name : ko.observable(),
    phone : ko.observable(),
    email: ko.observable(),
    message: ko.observable(),
    ret: ko.observable(),
    redirect: function () {
        window.location.href = "index.html";
    },
    insertBasvuru: function () {
        var self = this;
        var data = {
            adsoyad: self.name,
            gsm: self.phone,
            mail: self.email,
            adres: self.message,
        };
        if (data.adsoyad != null && data.gsm != null)
            crmAPI.insertBasvuru(data, function (a, b, c) {
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                $('#success > .alert-success')
                    .append("<strong>Ýsteðiniz alýnmýþtýr. Teþekkür ederiz. Ana Sayfaya dönülüyor... </strong>");
                $('#success > .alert-success')
                    .append('</div>');

                //clear all fields
                $('#basvuruForm').trigger("reset");
                window.setTimeout(function () {
                    //$("#success").alert('close');
                    self.redirect();
                }, 5000);
            }, null, null);
        else {//hata alma durumu if kýsmýnda olacak
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-danger').append("<strong>Merhaba " + dataModel.name + ". Bilinmeyen hata oluþtu...</strong> Bize mail atmanýzý rica ederiz ! <a href='mailto:info@kociletisim.com.tr' from mail.google.com;>info@kociletisim.com.tr</a>");
            $('#success > .alert-danger').append('</div>');
        }
    },

};

$(function() {

    $("#basvuruForm input,#basvuruForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // something to have when submit produces an error ?
            // Not decided if I need it yet
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            dataModel.name = $("input#name").val();
            dataModel.phone = $("input#phone").val();
            dataModel.email = $("input#email").val();
            dataModel.message = $("textarea#message").val();
            dataModel.insertBasvuru();
            //var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            //if (firstName.indexOf(' ') >= 0) {
            //    firstName = name.split(' ').slice(0, -1).join(' ');
            //}
            //$.ajax({
            //    url: "./bin/basvuru.php",
            //    type: "POST",
            //    data: {
            //        name: name,
            //        phone: phone,
            //        email: email,
            //        message: message,
            //        contentType: "application/json",
            //    },
            //    beforeSend: function (xhr) {
            //        xhr.setRequestHeader("Content-type", "application/json");
            //    },
            //    contentType: "application/json",
            //    cache: false,
            //    dataType: "json",
            //    success: function() {
            //        // Success message
            //        $('#success').html("<div class='alert alert-success'>");
            //        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            //            .append("</button>");
            //        $('#success > .alert-success')
            //            .append("<strong>Ýsteðiniz alýnmýþtýr. Teþekkür ederiz. </strong>");
            //        $('#success > .alert-success')
            //            .append('</div>');
            //        //clear all fields
            //        $('#basvuruForm').trigger("reset");
            //    },
            //    error: function() {
            //        // Fail message
            //        $('#success').html("<div class='alert alert-danger'>");
            //        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            //            .append("</button>");
            //        $('#success > .alert-danger').append("<strong>Merhaba " + firstName + ". Mail sunucumuz cevap veremiyor...</strong> Bize mail atmanýzý rica ederiz ! <a href='mailto:info@kociletisim.com.tr' from mail.google.com;>info@kociletisim.com.tr</a>");
            //        $('#success > .alert-danger').append('</div>');
            //        //clear all fields
            //        $('#basvuruForm').trigger("reset");
            //    },
            //})
        },
        //filter: function() {
        //    return $(this).is(":visible");
        //},
    });

    //$("a[data-toggle=\"tab\"]").click(function(e) {
    //    e.preventDefault();
    //    $(this).tab("show");
    //});
});
/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
