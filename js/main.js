(function () {
    'use strict';

    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('custom-validation-form');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);

    $('#offlineActivationForm').submit(function (event) {
        event.preventDefault();
        if ($(this)[0].checkValidity() === false) {
            return;
        };

        // get the form data
        var body = {
            offlineRequest: $('#offlineRequestTextArea').val(),
            productId: $("#product").val(),
            responseValidity: 259500 // 3 days
        };
        if(body.offlineRequest.split('.').length != 3){
            alert('Invalid offline trial activation request!');
            return;
        }

        $('#submitBtn').text('Validating...');
        $('#submitBtn').attr('disabled', true);

        // process the form
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: 'https://api.cryptlex.com/v3/trial-activations/offline-activate',
            data: JSON.stringify(body), // our json payload
            contentType: "application/json",
            dataType: 'json', // what type of data do we expect back from the server
        })
            .done(function (data) {
                var blob = new Blob([data.offlineResponse], { type: 'text/plain;charset=utf-8' });
                saveAs(blob, 'offline_trial_response.dat', true);
            })
            .fail(function (error) {
                alert(error.responseJSON.message);
                $('#submitBtn').attr('disabled', false);
            })
            .always(function () {
                $('#submitBtn').text('Download Offline Response');
            });

        // stop the form from submitting the normal way and refreshing the page
    });

})();