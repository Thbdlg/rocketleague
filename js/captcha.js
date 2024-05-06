$(document).ready(function () {
    $('#errorSpam').css('display', 'none');
    $("#BtnSendMail").click
        (function () {
            return validateForm();
        }
        );
    function validateForm() {
        /*permet de valider les required htm5 avant le code js input[name=option_mauvaise]').is(':checked')*/
        if (document.FormMailRadio.mail_body.value == '') {
            return;
        }
        if ($('input[name=option_mauvaise]').is(':checked')) {
            $('#errorSpam').
                css(
                    {
                        'display': 'inline',
                        'color': 'red'
                    }); // on affiche le message d'erreur
            $('#errorSpam').fadeOut(2000);
            return false;
        }
        return true;
    };

});//fct document ready fct	