$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

	//natural slider
	$('.natural--wrapper').slick({
  		responsive: [
  			{
				breakpoint: 10000,
				settings: "unslick"
			},
  			{
  				breakpoint: 767,
	  			settings: {
	  				unslick: false,
					infinite: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					autoplay: true,
			  		autoplaySpeed: 8000,
			  		speed: 1000,
			  		dots: true,
	  			}
  			}
  		]
	});
	//feedback slider
	$('.feedbacks_slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		autoplay: true,
  		autoplaySpeed: 8000,
  		speed: 1000,
  		responsive: [
  			{
  				breakpoint: 767,
	  			settings: {
					arrows: false,
					dots: true,
	  			}
  			}
  		]
	});
	//function click for popup
	function clickPopup(btn, close, popup) {

		btn.click(function(e){
			e.preventDefault();

			popup.addClass("show-popup");

		})

		close.click(function(e){
			e.preventDefault();

			popup.removeClass("show-popup");

		})

	}
	//callback
	var btnCallback = $(".call-me");
		popupCallback = $(".callback-popup");
		closePopupCallback =$(".callback-popup .icon-close");

	clickPopup(btnCallback, closePopupCallback, popupCallback);
		
	//menu open 
	var btnMenu = $(".header__icon-menu");
		popupMenu = $(".menu-popup");
		closePopupMenu = $(".menu-popup .icon-close");

	clickPopup(btnMenu, closePopupMenu, popupMenu);

	//scroll to id
	$(".menu-list li a").mPageScroll2id();

	$(".menu-list li a").click(function(){
		popupMenu.removeClass("show-popup");
	})

	//read more open 
	var btnReadMore = $(".read-more");
		popupReadMore = $(".read-more-popup");
		closePopupReadMore = $(".read-more-popup .icon-close");

	clickPopup(btnReadMore, closePopupReadMore, popupReadMore);

	//plugin for scroll scroll-pane
	$(".read-more-popup .container-content").jScrollPane();
	// $(".jspTrack").css("height", "200px");
	$(".jspDrag").css("height", "40px");

	//slider change technoloy
	var btnNavTech = $(".technology .nav-slider li");
		slideImgTech = $(".technology_slider .technology__slide .slide--img");
		slideContentTech = $(".technology_slider .technology__slide .slide--content");
		prevSlide = 0;

	btnNavTech.first().addClass("active");
	slideImgTech.first().addClass("active");
	slideContentTech.first().addClass("active");

	btnNavTech.click(function(e){

		e.preventDefault();

		var s = $(this);
			i = btnNavTech.index(s);

		if (!(s.hasClass("active"))) {

			btnNavTech.removeClass("active");
			s.addClass("active");

			slideImgTech.eq(prevSlide).removeClass("active animated flipInX");
			slideImgTech.eq(i).addClass("active animated flipInX");
			slideContentTech.eq(prevSlide).removeClass("active animated fadeIn");
			slideContentTech.eq(i).addClass("active animated fadeIn");

			prevSlide = i;

		}

	})	

	//fill form date
	var fillFormDate = {};
		fillFormParts = $(".fill-form .fill-form__part");
		fillFormBtn = $(".fill-form .fill-form__part .fill-form__btn");
		fillFormPartsActive = 0;
		fillFormSetting = '';

	fillFormParts.eq(fillFormPartsActive).addClass("active");

	fillFormBtn.click(function(e){
		e.preventDefault();

		switch(fillFormPartsActive) {
			case 0:
				fillFormSetting = 'represent';
				break;
			case 1:
				fillFormSetting = 'position';
				break;
			case 2:
				fillFormSetting = 'volume';
				break;
		}

		fillFormDate[fillFormSetting] = $(this).text();

		fillFormParts.eq(fillFormPartsActive).removeClass("active animated flipInX");
		fillFormPartsActive++;
		fillFormParts.eq(fillFormPartsActive).addClass("active animated flipInX");

	})

	$(".fill-form--submit").click(function(e){
		e.preventDefault();

		fillFormDate.name = $(".fill-form--name").val();
		fillFormDate.mobile = $(".fill-form--mobile").val();

		console.log(fillFormDate);
	})

	//validation form
	var form = document.querySelector('.header_form');
		mobile = document.querySelector('.header_form .input-mobile');
		submitForm = document.querySelector('.header_form input[type=submit'); 
		invalidBlock = document.querySelector('.header_form .form-invalid_block');
		invalidBlockContainer = document.querySelector('.header_form .form-invalid_block .form-invalid__container');
		invalidBlockClose = document.querySelector('.header_form .form-invalid_block .icon-close-invalid');
		invalidBlockText = document.querySelector('.header_form .form-invalid_block p');

	submitForm.addEventListener("click", function(e){

		if (!mobile.validity.valid) {

			invalidBlockText.innerHTML = "Пожалуйста, введите свой мобильный телефон!"
			
			invalidBlock.classList.add("active");
			invalidBlockContainer.classList.add("animated","bounceIn");

			e.preventDefault();
			
		} else {
			var date = mobile.value;
			SendMail(date);

		}

	}, false);

	invalidBlockClose.addEventListener("click", function(e){
		e.preventDefault();

		mobile.value = '';

		invalidBlockContainer.classList.remove("animated","bounceIn");
		invalidBlockContainer.classList.add("animated","bounceOut");
		// invalidBlock.classList.remove("active");
		setTimeout(function(){
			invalidBlock.classList.remove("active");
			invalidBlockContainer.classList.remove("animated","bounceOut");
		}, 1000);

	})

	function SendMail(date) {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: date
	    }).done(function() {
			alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
	    });

	    return false;
	}
});
