(function() {
    
	var client = {
		
		initialize : function () {

            this.floatGrid();
            this.startSlick();
			this.setUpListeners();

		},
        
        setUpListeners: function () {
            
            $('header #nav-icon').on('click', this.showMenu);
            $('header .header-actions .search').on('click', this.showSearch);
            $('.show-filter').on('click', this.showFilters);
            $('.filters .title').on('click', this.showFilter);
            $('.filters div ul li a').on('click', this.paramSelect);
            $('.item-detail .select li a').on('click', this.paramSelect);
            $('.qsh.popup ul li a').on('click', this.paramSelect);
            $('.sort').on('click', this.showSelectUl);
            $('.sort ul li').on('click', this.selectSection);
            $('.offers .add2cart').on('click', this.add2CartPopup);
            $('.offers .qsh').on('click', this.qshPopup);
            $('.top-arrow').on('click', this.scrollTop);
            
            $('form').on('submit', this.submitForm);
            $('form').on('keydown', 'input', this.removeError);

            $(window).on('scroll', this.checkScroll);

		},

        removeError: function () {
            $(this).css('border-color', '')
                   .siblings('label')
                   .css('color', '');
        },

        submitForm: function (e) {
            e.preventDefault();
            
            var form = $(this),
                formBtn = form.find('input[type="submit"]');
            
            if ( client.validateForm(form) === false ) return false;
            
            formBtn.attr('disabled', 'disabled');

            var data = form.serialize();

            console.log(data);

            /* Отправляем данные на сервер */

            client.showFormMsg('Данные успешно отправлены!', 'welldone');
        },

        validateForm: function (form) {
            var valid = true,
                inputs = form.find('input').not(':input[type=button], :input[type=submit], :input[type=reset]'),
                textError = '';

            $.each(inputs, function(index, el) {
                var input = $(el),
                    inputName = input.attr('name'),
                    val = input.val(),
                    label = input.siblings('label');

                switch (inputName) {
                    case 'email': checkEmail(input, val, label);
                    // case 'phone', case 'adress' ...
                }

            });

            function checkEmail (input, val, label) { 
                if (val.length !== 0) {
                    if (val.indexOf('@') < 0) {
                        textError = 'Введите правильный email';

                        client.showFormMsg(textError, 'email');

                        valid = false;
                    }

                } else {
                    textError = 'Введите email';

                    client.showFormMsg(textError, 'email');

                    input.css('border-color', '#DF314D');
                    label.css('color', '#DF314D');

                    valid = false;
                }
            }

            return valid;
        },
        
        showFormMsg: function (text, input) {
            $('body').append('<div class="form-msg '+ input +'">' + text + '</div>');
            $('.form-msg').fadeIn('slow', function() {
                setTimeout(function(){
                    $('.form-msg').fadeOut('slow', function () {
                        $('.form-msg').remove();
                    });
                }, 1000);
            });
        },

        qshPopup: function (e) {
            var item = $(this).parents('div.item'),
                name = item.find('.title').text().toLocaleLowerCase(),
                price = item.find('.price').text(),
                shadow = $('.wrapper .shadow'),
                popup = $('.popup.qsh'),
                btn = popup.find('.button'),
                close = popup.find('.close');
            
            popup.find('.name').text(name);
            popup.find('.price').text(price);
            
            client.showItemPopup(popup, shadow);
            
            btn.on('click', function(e){
                client.hideItemPopup(popup, shadow);
                
                e.preventDefault();
            });
                        
            close.on('click', function(e){
                client.hideItemPopup(popup, shadow);
                
                e.preventDefault();
            });
            
            e.preventDefault();
        },

        add2CartPopup: function (e) {
            var item = $(this).parents('div.item'),
                name = item.find('.title').text().toLocaleLowerCase(),
                img = item.find('img').attr('src'),
                price = item.find('.price').text(),
                shadow = $('.wrapper .shadow'),
                popup = $('.popup.add2cart'),
                links = popup.find('a');
            
            popup.find('img').attr('src', img);
            popup.find('.name').text(name);
            popup.find('.price').text(price);
            
            client.showItemPopup(popup, shadow);
            
            links.on('click', function(e){
                client.hideItemPopup(popup, shadow);
                
                e.preventDefault();
            });
            
            e.preventDefault();
        },
        
        showItemPopup: function (popup, shadow) {
            shadow.css({
                'position': 'fixed',
                'top': 0,
                'z-index': 98
            }).fadeIn();
            
            popup.show().animate({
                'top': '20%'
            }, 300);
        },
        
        hideItemPopup: function (popup, shadow) {
            popup.animate({
                'top': '60%'
            }, 300, function(){
                popup.hide().css({
                    'position': '',
                    'top': '',
                    'z-index': ''
                });
                shadow.hide();
            });
            
            $('.params script').empty();
        },
        
        selectSection: function () {
            var sitem = $(this).text(),
				sdata = $(this).data('item'),
				span = $(this).parent('ul')
						.siblings('span.selected');

			$(this).siblings('li').removeClass('selected');
			$(this).addClass('selected');

			span.text(sitem);
        },
        
        showSelectUl: function () {
            $(this).children('ul').slideToggle(150);
			$(this).toggleClass('open');
        },
        
        paramSelect: function (e) {
            $(this).toggleClass('selected');
            
            e.preventDefault();
        },
        
        showFilter: function () {
            var ul = $(this).siblings('ul'),
                showFilter = $('.show-filter');
            
            ul.slideToggle();
            $(this).toggleClass('open');
        },
        
        showFilters: function (e) {
            var button = $(this),
                filters = $('.filters div ul'),
                title = $('.filters div'),
                aside = $('.shop-list aside'),
                itemsContainer = $('.shop-list .item-list'),
                item = $('.grid .row .item'),
                $grid = $('.grid .row');
            
            button.toggleClass('open');
            
            if ( button.hasClass('open') ){
                aside.fadeIn();
                itemsContainer.removeClass('col-12').addClass('col-9');
                item.removeClass('col-3').addClass('col-4');
                $grid.masonry('layout');
            } else {
                aside.fadeOut(function () {
                    itemsContainer.removeClass('col-9').addClass('col-12');
                    item.removeClass('col-4').addClass('col-3');
                    $grid.masonry('layout');
                });
            }
            
            
            e.preventDefault();   
        },
        
        startSlick: function () {
            
            $('.brands-slider').slick({
                infinite: true,
                autoplay: true,
                
                responsive: [{                  
                    breakpoint: 1920,
                    settings: {
                        slidesToShow: 5
                    }
                },{                  
                    breakpoint: 1240,
                    settings: {
                        slidesToShow: 4
                    }
                },{                  
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3
                    }
                },{

                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2
                    }

                }, {

                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1
                    }
                    
                }]
            });
            
        },
        
        floatGrid: function () {
            
            var $grid = $('.grid .row').imagesLoaded( function() {
                $grid.masonry({
                    itemSelector: '.cols',
                    percentPosition: true,
                    columnWidth: '.width'
                });
            });
            
        },

		showMenu: function () {

			var wrap = $('.wrapper'),
                shadow = $('.wrapper .shadow'),
                icon = $(this);

            icon.toggleClass('open');
			wrap.toggleClass('show-sidebar');
            shadow.fadeToggle();
            
            if (wrap.hasClass('show-sidebar')) {
                $('body').css({'overflow': 'hidden'});
            } else {
                $('body').css({'overflow': ''});
            }
            
            shadow.on('click', function () {
                
                icon.removeClass('open');
                wrap.removeClass('show-sidebar');
                shadow.fadeOut();
                $('body').css({'overflow': ''});
                
            });

		},
        
        showSearch: function (e) {
            
            var sf = $('.search-form');
            
            $(this).toggleClass('open');
            sf.slideToggle();
            
            e.preventDefault();
            
        },

		scrollTop: function () {
            
            $('html, body').animate({scrollTop: 0}, 500);

        },

		checkScroll: function() {

		    var scrollTop = Math.round($(this).scrollTop()),
				clientHeight = Math.round(document.documentElement.clientHeight);
			
            if ( scrollTop > clientHeight / 2 )
			    $(".top-arrow").show();
			else
			    $(".top-arrow").hide();

		}
	}

	client.initialize();

}());