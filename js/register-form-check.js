$(document).ready(function(){

	var checkRegistration = (function(){
		// переменные
		var _emailField = $('[data-field-mail]');
		var _passField = $('[data-field-pass]');
		var _adminemail = 'mail@mail.ru';
		var _adminpass = '123';
		var _formReg = $("#formRegistration");
		var _pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
		var _textError = $('input').data('error');
		var _errorTemplate = $('<div class="error err-email-hide"></div>');
		var _errorTemplateData = $('<div class="error error--with-desc">Данный email уже занят</div>'
			+ '<div class="error-description">'
			+ '<p>Используйте другой email чтобы создать новый аккаунт.</p>'
			+ '<p>Или воспользуйтесь <a href="#">восстановлением пароля</a>, чтобы войти на сайт.</p>');

		var _emailEmpty = _emailField.attr('data-error');
		var _passEmpty = _passField.attr('data-error');
		var _emailFormat = _emailField.attr('data-error-format');

		var init = function(){
			_formValidate();
		}

		var _formValidate = function() {

			// Отлавливаем события - клик на кнопке “Войти”
			_formReg.on('submit', function(e){
				e.preventDefault();
				$('.error').remove();

			// Получаем данные которые ввел пользователь в поля формы
			var _email = _emailField.val().trim().toLowerCase();
			var _password = _passField.val().trim();

			function _errorLogin() {
				var _errorEmailEmpty = _errorTemplate.clone().text(_emailEmpty);
				_emailField.before(_errorEmailEmpty);	
				_errorEmailEmpty.fadeIn(1000);
				_emailField.on('focus', function(){
					_errorEmailEmpty.fadeOut(1000);
				});
			}

			function _errorPass() {
				var _errorPassEmpty = _errorTemplate.clone().text(_passEmpty);
				_emailField.before(_errorPassEmpty);	
				_errorPassEmpty.fadeIn(1000);
				_passField.on('focus', function(){
						_errorPassEmpty.fadeOut(1000);
					});
			}

			function _errorLoginPass() {
				_emailField.before(_errorTemplateData);
				_errorTemplateData.fadeIn(1000); // плавно ее показываем
				_passField.on('focus', function(){
					_errorTemplateData.fadeOut(1000);
				});
				_emailField.on('focus', function(){
					_errorTemplateData.fadeOut(1000);
				});
			}

			function _errorFormatMail() {
				var _errorEmailFormat = _errorTemplate.clone().text(_emailFormat);
				_emailField.before(_errorEmailFormat);	
				_errorEmailFormat.fadeIn(1000);
				_emailField.on('focus', function(){
					_errorEmailFormat.fadeOut(1000);
				});
			}

				// Делаем проверку

			if ( _email == "" || _password == "" ) {
				if ( _email == "" ) {
					_errorLogin();
				} else if ( !_pattern.test( _email ) ) {
					_errorFormatMail();
				} else if ( _email == "mail@mail.com" ) {
					_errorLoginPass();
				}
				if ( _password == "" ) {
					_errorPass();
				}
			} else {
					if ( _email == "mail@mail.com"  ) {
						_errorLoginPass();
					} else if ( _pattern.test( _email ) &&  _password != '' ) {
							$(_formReg).unbind('submit').submit();
					} else {
						_errorFormatMail();
					}	
				}


			});

		}


		return {
			init
		}

	}());

	checkRegistration.init();

});