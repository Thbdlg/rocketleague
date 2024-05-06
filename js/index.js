// Génération d'un captcha simple
function generateCaptcha() {
  var captchaText = '';
  var possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 6; i++) {
    captchaText += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }
  document.getElementById('captcha-text').textContent = captchaText;
}

// Validation du formulaire
document.getElementById('login-form').addEventListener('submit', function(event) {
  var username = document.getElementById('username').value.trim();
  var password = document.getElementById('password').value.trim();
  var captcha = document.getElementById('captcha').value.trim();
  var captchaText = document.getElementById('captcha-text').textContent.trim();

  // Expression régulière pour valider le pseudo (seulement des lettres)
  var usernameRegex = /^[a-zA-Z]+$/;

  var usernameError = document.getElementById('username-error');
  var captchaError = document.getElementById('captcha-error');

  function clearErrors() {
    setTimeout(function() {
      usernameError.textContent = '';
      captchaError.textContent = '';
    }, 3000);
  }

  if (username === '' || password === '' || captcha === '') {
    usernameError.textContent = 'Veuillez remplir tous les champs ! ';
    captchaError.textContent = '';
    event.preventDefault();
    clearErrors();
  } else if (!usernameRegex.test(username)) {
    usernameError.textContent = 'Saisissez un pseudo avec seulement des lettres';
    captchaError.textContent = '';
    event.preventDefault();
    clearErrors();
  } else if (captcha !== captchaText) {
    captchaError.textContent = 'Captcha incorrect';
    usernameError.textContent = '';
    event.preventDefault();
    generateCaptcha();
    clearErrors();
   }
});

// Génération du captcha au chargement de la page
generateCaptcha();
