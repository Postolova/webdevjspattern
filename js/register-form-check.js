$(document).ready(function(){

	var checkLogin = (function(){

		// переменные
		var _formReg = $("#formRegistration");
		var _pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
		var _errMail = $('<div class="error err-email-hide" data-error-email="Введите email"></div>');
		var _errFormatMail = $('<div class="error err-format-email-hide" data-error-format-email="Неверный формат email"></div>');
		var _errPass = $('<div class="error err-password-hide" data-error-password="Введите пароль"></div>');
		var _errLogin = $('<div class="error error--with-desc">Данный email уже занят</div>'
			+ '<div class="error-description">'
			+ '<p>Используйте другой email чтобы создать новый аккаунт.</p>'
			+ '<p>Или воспользуйтесь <a href="#">восстановлением пароля</a>, чтобы войти на сайт.</p>');

		var init = function(){
			_formValidate();
		}

		var _formValidate = function() {
			// Отлавливаем события - клик на кнопке “Войти”
			_formReg.on('submit', function(e){
				e.preventDefault();

			// Получаем данные которые ввел пользователь в поля формы
			var _email = $('[data-field-mail]').val().trim().toLowerCase();
			var _password = $('[data-field-pass]').val().trim();

			// Делаем проверку на пустые поля
			if ( _email == "" ) {
				$('[data-error-email]').remove();

				var _errorTextMail = _errMail.data('error-email'); // берем текст ошибки из data

				_errMail = _errMail.text(_errorTextMail); // добавляем текст в тег

				$('[data-field-mail]').before(_errMail); // добавляем ошибку перед вводом логина

				_errMail.fadeIn(1000); // плавно ее показываем

				$('[data-field-mail]').on('focus', function(){
					_errMail.fadeOut(1000);
				});
			} else if ( _pattern.test( _email ) ) {
					
					if ( _email == "mail@mail.com") {
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
					else {
						$(_formReg).unbind('submit').submit();
					}

				} else {

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