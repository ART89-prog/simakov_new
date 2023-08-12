$(() => {
    // Ширина окна для ресайза
    WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
    WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
    BODY = document.getElementsByTagName('body')[0]
    OVERLAY = document.querySelector('.overlay')

    $(document).on('change', '.error', function() {
        $(this).removeClass('error');
    })

    if (window.location.href.indexOf('#service1') > -1){
        $(".service_box:nth-child(1)").css('order', '-1');
    } else if (window.location.href.indexOf('#service2') > -1){
        $(".service_box:nth-child(2)").css('order', '-1');
    } else if (window.location.href.indexOf('#service3') > -1){
        $(".service_box:nth-child(3)").css('order', '-1');
    } else if (window.location.href.indexOf('#service4') > -1){
        $(".service_box:nth-child(4)").css('order', '-1');
    } else if (window.location.href.indexOf('#service5') > -1){
        $(".service_box:nth-child(5)").css('order', '-1');
    }  


	$('.js-form button').on('click', function(event){
        event.preventDefault();
        if (event.ctrlKey) {
            let form = $(this).closest("form");
            $(".js-test1").text(form.find("input[name='land']").val());
            $(".js-test2").text(form.find("input[name='level']").val());
            $(".js-test3").text(form.find("input[name='lidforma']").val());
            Fancybox.show([{
                src: "#test",
                type: 'inline',
            }]);
        }
        else
        {
            var dataForAjax = "action=form&";
            var addressForAjax = myajax.url;
            var valid = true;
            
            $(this).closest('form').find('input:not([type=submit]),textarea, select').each(function(i, elem) {
                if (this.value.length < 3 && $(this).hasClass('required')) {
                    valid = false;
                    $(this).addClass('error');
                }
                if ($(this).attr('name') == 'email' && $(this).hasClass('required')) {
                    var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                    if (!pattern.test($(this).val())) {
                        valid = false;
                        $(this).addClass('error');
                    }
                }
                if ($(this).attr('name') == 'agree' && !$(this).prop("checked")) {
                    $(this).addClass('error');
                    valid = false;
                }

                if($(this).attr('name') == 'phone' && $(this).hasClass('required')) {
                    if (!$(this).inputmask("isComplete"))
                    {
                        valid = false;
                        $(this).addClass('error');
                    }
                }  

                if (i > 0) {
                    dataForAjax += '&';
                }
                dataForAjax += this.name + '=' + encodeURIComponent(this.value);
            })

            if (!valid) {
                return false;
            }               

            $.ajax({
                type: 'POST',
                data: dataForAjax,
                url: addressForAjax,
                success: function(response) {
                    $("form").trigger("reset");
                    window.location.href = 'https://simakovdoc.ru/spasibo/';             
                }
            });      
        }        
    });


    	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs button', function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			const $parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				$activeTabContent = $(activeTab),
				level = $(this).data('level')

			$parent.find('.tabs:first button').removeClass('active')
			$parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			$activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		const $activeTab = $('.tabs button[data-content=' + locationHash + ']'),
			$activeTabContent = $(locationHash),
			$parent = $activeTab.closest('.tabs_container'),
			level = $activeTab.data('level')

		$parent.find('.tabs:first button').removeClass('active')
		$parent.find('.tab_content.' + level).removeClass('active')

		$activeTab.addClass('active')
		$activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}



    	// Моб. меню
	$('header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('header .mob_menu_btn').addClass('active')
		$('body').addClass('menu_open')
		$('header .menu').addClass('show')
		$('.overlay').fadeIn(300)
	})

	$('header .close_btn, header .menu .item a, .overlay').click((e) => {
		e.preventDefault()

		$('header .mob_menu_btn').removeClass('active')
		$('body').removeClass('menu_open')
		$('header .menu').removeClass('show')
		$('.overlay').fadeOut(300)
	})

	

    $('body').on('click', '.modal_link', function (e) {
        e.preventDefault()
        if($(this).hasClass("service_item"))
        {
            let level = $(this).data("category");
            let lidforma  = $(this).data("title");
            let modal_title  = $(this).data("modal");
            $("#modal_callback2 .js-modal-title").text(modal_title);
            $("#modal_callback2 input[name='level']").val(level);
            $("#modal_callback2 input[name='lidforma']").val(lidforma);
        }
        Fancybox.close(true)
        Fancybox.show([{
            src: $(this).data('content'),
            type: 'inline',
        }]);
    })

    var swiper = new Swiper(".about_sertificat .swiper", {
        slidesPerView: 3,
        spaceBetween: 10,
        loop: true,
        allowTouchMove: false,

        breakpoints: {
            0: {
                spaceBetween: 20,
                slidesPerView: 3,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                centeredSlides: true,
                allowTouchMove: true
            },
            767: {
                spaceBetween: 20,
                slidesPerView: 3
            },
            1023: {
                spaceBetween: 10,
                slidesPerView: 3
            }
        }
    });

    var swiper = new Swiper(".reviews_item-slider .swiper", {
        slidesPerView: 'auto',
        spaceBetween: 22,
        loop: true,
        breakpoints: {
            0: {
                spaceBetween: 10,
                slidesPerView: 'auto',
            },
            767: {
                spaceBetween: 15,
                slidesPerView: 'auto',
            },
            1023: {
                spaceBetween: 22,
                slidesPerView: 'auto',
            }
        }
    });


    var swiper = new Swiper(".example_slider .swiper", {
        slidesPerView: 3,
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },

        breakpoints: {
            0: {
                spaceBetween: 10,
                slidesPerView: 1.3
            },
            479: {
                spaceBetween: 10,
                slidesPerView: 2
            },
            767: {
                spaceBetween: 10,
                slidesPerView: 2
            },
            1023: {
                spaceBetween: 10,
                slidesPerView: 3
            }
        }
    });


    $(".link-more").click(function (e) {
		e.preventDefault();
		$(".reviews_item").removeClass("hide");
		$(".link-more").hide();
	});


    // Fancybox
    Fancybox.defaults.autoFocus = false
    Fancybox.defaults.trapFocus = false
    Fancybox.defaults.dragToClose = false
    Fancybox.defaults.placeFocusBack = false
    Fancybox.defaults.l10n = {
        CLOSE: "Закрыть",
        NEXT: "Следующий",
        PREV: "Предыдущий",
        MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
    }

    Fancybox.defaults.template = {
        closeButton: '<img src='+myajax.template_url+'/images/close2.svg>'
    }

    $('input[type=tel]').inputmask('+9 (999) 999-99-99[9]')

    // Скрол к пунктам меню
    $(".scroll").on("click", function (e) {
        e.preventDefault();
        let id = $(this).attr("href");

        $("html, body").animate({
            scrollTop: $(id).offset().top
        }, {
            duration: 400,
            easing: "swing"
        });
    });

    window.addEventListener('resize', function () {
        WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight

        let windowW = window.outerWidth

        if (typeof WW !== 'undefined' && WW != windowW) {


            // Перезапись ширины окна
            WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth


            // Моб. версия
            if (!fakeResize) {
                fakeResize = true
                fakeResize2 = false

                document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
            }

            if (!fakeResize2) {
                fakeResize2 = true

                if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
            } else {
                fakeResize = false
                fakeResize2 = true
            }
        }
    })
})