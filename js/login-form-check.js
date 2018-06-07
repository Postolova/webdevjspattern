$(document).ready(function(){

	var checkLogin = (function(){

		// переменные
		var _formLogin = $("#formLogin");
		var _pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
		var _errMail = $('<div class="error err-email-hide" data-error-email="Введите email"></div>');
		var _errFormatMail = $('<div class="error err-format-email-hide" data-error-format-email="Неверный формат email"></div>');
		var _errPass = $('<div class="error err-password-hide" data-error-password="Введите пароль"></div>');
		var _errLogin = $('<div class="error error--with-desc err-email-password-hide">Неверный email или пароль</div>'
			+ '<div class="error-description err-email-password-hide">'
			+ '<p>Введите верные данные для входа или воспользуйтесь <a href="#">восстановлением пароля, </a>чтобы войти на сайт.</p>'
			+ '</div>');

		var init = function(){
			_formValidate();
		}

		var _formValidate = function() {
			// Отлавливаем события - клик на кнопке “Войти”
			_formLogin.on('submit', function(e){
				e.preventDefault();

				// Получаем данные которые ввел пользователь в поля формы
				var _email = $('[data-field-mail]').val().trim();
				var _password = $('[data-field-pass]').val().trim();

				// Делаем проверку на пустые поля
				if ( _email == "") {
					$('[data-error-email]').remove();

					var _errorTextMail = _errMail.data('error-email'); // берем текст ошибки из data

					_errMail = _errMail.text(_errorTextMail); // добавляем текст в тег

					$('[data-field-mail]').before(_errMail); // добавляем ошибку перед вводом логина

					_errMail.fadeIn(1000); // плавно ее показываем

					$('[data-field-mail]').on('focus', function(){
						_errMail.fadeOut(1000);
					});
				} else if ( _pattern.test( _email ) ) {
						if ( _email == "mail@mail.com" && _password == "123" ) {
								$(_formLogin).unbind('submit').submit();
						} else {
							$('[data-error-login]').remove();
							$('[data-field-mail]').before(_errLogin); // добавляем ошибку перед вводом логина

							_errLogin.fadeIn(1000); // плавно ее показываем

							$('[data-field-pass]').on('focus', function(){
								_errLogin.fadeOut(1000);
							});
							$('[data-field-mail]').on('focus', function(){
								_errLogin.fadeOut(1000);
							});
						}
					} else {
						console.log('Ошибка');

						var _errorFormatMailText = _errFormatMail.data('error-format-email'); // берем текст ошибки из data

						_errFormatMail = _errFormatMail.text(_errorFormatMailText); // добавляем текст в тег

						$('[data-field-mail]').before(_errFormatMail); // добавляем ошибку перед вводом логина

						_errFormatMail.fadeIn(1000);

						$('[data-field-mail]').on('focus', function(){
						_errFormatMail.fadeOut(1000);
						});
					}

				if ( _password == "") {
					$('[data-error-password]').remove();

					var _errorTextPass = _errPass.data('error-password'); // берем текст ошибки из data

					_errPass = _errPass.text(_errorTextPass); // добавляем текст в тег

					$('[data-field-mail]').before(_errPass); // добавляем ошибку перед вводом логина

					_errPass.fadeIn(1000); // плавно ее показываем

					$('[data-field-pass]').on('focus', function(){
						_errPass.fadeOut(1000);
					})
				}
			})
		}

		return {
				init
		}

	}());

	checkLogin.init();
});