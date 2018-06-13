$(document).ready(function() {

	var commentCheck = (function(){

			// Переменные модуля
			var _form = $('#form-comment-add');
			var _commentTextarea = $('#textComment');
			var _commentErrorEmpty = $('#commentErrorEmpty');

			// Метод инициализации
			var init = function(){
				_setUpListeners();
			}

			// Метод прослушки событий

			var _setUpListeners = function() {
				_form.on('submit', function(event) {
					_formValidate(event);
				});
			}

			// Приватные методы

			var _formValidate = function (event) {
		    		
					if ( _commentTextarea.val() == "" ) {

						_commentErrorEmpty.fadeIn(1000);

						event.preventDefault();

						_commentTextarea.on('focus', function() {
						_commentErrorEmpty.fadeOut(1000);
						});
					}
					else {
						_commentErrorEmpty.fadeOut;
					}
				}

			// Возвращаем методы для доступа снаружи
			return {
				init
			}
		
	}());
	  
		// Запускаем модуль
		commentCheck.init();

});