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

	//validation form
	var form = $('form');
		submitForm = $('input[type=submit]'); 
		invalidBlock = $('.form-invalid_block');
		invalidBlockContainer = $('.form-invalid_block .form-invalid__container');
		invalidBlockClose = $('.form-invalid_block .icon-close-invalid');
		invalidBlockText = $('.form-invalid_block p');

	submitForm.click(function(e){

		e.preventDefault();

		var i = submitForm.index($(this));

		switch(i) {
			case 0:
				var name = 'underfined';
				var mobile = document.querySelector('.header_form .input-mobile');
				var question = 'underfined';

				var validationState = validateForm(name, mobile, question, i);

				if (validationState === true) {
					SendMail(form.eq(i));
				}

				break;
			case 1:
				var name = document.querySelector('.fill-form .input-name');
				var mobile = document.querySelector('.fill-form .input-mobile');
				var question = 'underfined';

				var validationState = validateForm(name, mobile, question, i);

				if (validationState) {
					var info1 = document.querySelector(".input-info-1");
					var info2 = document.querySelector(".input-info-2");
					var info3 = document.querySelector(".input-info-3");

					info1.value = fillFormDate.represent;
					info2.value = fillFormDate.position;
					info3.value = fillFormDate.volume;

					SendMail(form.eq(i));
				}
				 
				break;
			case 2:
				var name = document.querySelector('.order-probes .input-name');
				var mobile = document.querySelector('.order-probes .input-mobile');
				var question = 'underfined';

				var validationState = validateForm(name, mobile, question, i);

				if (validationState) {
					SendMail(form.eq(i));
				}
				 
				break;
			case 3:
				var name = document.querySelector('.contact_form .input-name');
				var mobile = document.querySelector('.contact_form .input-mobile');
				var question = document.querySelector('.contact_form .input-question');

				var validationState = validateForm(name, mobile, question, i);

				if (validationState) {
					SendMail(form.eq(i));
				}

				break;
			case 4:
				var name = document.querySelector('.callback-form .input-name');
				var mobile = document.querySelector('.callback-form .input-mobile');
				var question = 'underfined';

				var validationState = validateForm(name, mobile, question, i);

				if (validationState) {
					SendMail(form.eq(i));
				}

				break;
		}

	});

	invalidBlockClose.click(function(e){
		e.preventDefault();

		var i = invalidBlockClose.index($(this));
		var animateClose = "animated bounceOut"
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

		invalidBlockContainer.eq(i).addClass(animateClose).one(animationEnd, function() {
			$(this).removeClass(animateClose);
			invalidBlock.eq(i).removeClass("active");
        });

	})

	function validateForm(name, mobile, question, i) {
		var errorText = '';

		if ((validateDate(name) === "un") && (validateDate(mobile) === "-") && (validateDate(question) === "un")) {
			errorText = "Пожалуйста, введите свой телефон!";
			showErrorMassage(errorText, i);
			return false
		}

		if (((validateDate(name) !== "+") && (validateDate(mobile) !== "+")) && (validateDate(question) !== "+")) {
			errorText = "Пожалуйста, введите свои данные!";
			showErrorMassage(errorText, i);
			return false
		}

		if ((validateDate(name) === "-") && (validateDate(mobile) === "+") && (validateDate(question) !== "-")) {
			errorText = "Пожалуйста, введите свое имя!";
			showErrorMassage(errorText, i);
			return false
		}

		if ((validateDate(name) !== "-") && (validateDate(mobile) === "-") && (validateDate(question) !== "-")) {
			errorText = "Пожалуйста, введите свой телефон!";
			showErrorMassage(errorText, i);
			return false
		}


		if ((validateDate(name) !== "-") && (validateDate(mobile) === "+") && (validateDate(question) === "-")) {
			errorText = "Пожалуйста, введите свой вопрос!";
			showErrorMassage(errorText, i);
			return false
		}

		if ((validateDate(name) === "-") && (validateDate(mobile) === "+") && (validateDate(question) === "-")) {
			errorText = "Пожалуйста, введите свое имя и вопрос!";
			showErrorMassage(errorText, i);
			return false
		}

		if ((validateDate(name) === "-") && (validateDate(mobile) === "+") && (validateDate(question) === "+")) {
			errorText = "Пожалуйста, введите свое имя!";
			showErrorMassage(errorText, i);
			return false
		}

		if ((validateDate(name) === "+") && (validateDate(mobile) === "-") && (validateDate(question) === "+")) {
			errorText = "Пожалуйста, введите свой телефон!";
			showErrorMassage(errorText, i);
			return false
		}

		if ((validateDate(name) === "-") && (validateDate(mobile) === "-") && (validateDate(question) === "+")) {
			errorText = "Пожалуйста, введите свое имя и телефон!";
			showErrorMassage(errorText, i);
			return false
		}
	
		return true;

	}

	function validateDate(date) {
		
		if (date === 'underfined') {
			return 'un';
		} else {
			if (date.validity.valid) {
				return '+';
			} else {
				return '-';
			}
		}
	}

	function showErrorMassage(errorText, i) {

		invalidBlockText.eq(i).text(errorText);
		invalidBlock.eq(i).addClass("active");

		var animateOpen = "animated bounceIn"
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

		invalidBlockContainer.eq(i).addClass(animateOpen).one(animationEnd, function() {
			$(this).removeClass(animateOpen);
        });


	}

	function SendMail(form) {
	    $.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: form.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				form.trigger("reset");
			}, 1000);
		});
		return false;
	}

	//product slider

	var smallImages = $(".products .slider__images .row-item");
		bigImage = $(".products .slider__images .product--full-img");
		slidesInfo = $(".products .slider_info");

	slidesInfo.first().addClass("active");	

	//for desktop
	smallImages.click(function(e){
		e.preventDefault();

		var src = $(this).attr("src");
			i = smallImages.index($(this));
		smallImages.removeClass("active");
		$(this).addClass("active");

		bigImage.attr("src", src);

		var animate = "animated zoomIn";
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

		bigImage.addClass(animate).one(animationEnd, function() {
			$(this).removeClass(animate);
		});

		slidesInfo.removeClass("active");
		slidesInfo.eq(i).addClass("active");

		slidesInfo.eq(i).addClass(animate).one(animationEnd, function() {
			$(this).removeClass(animate);
		});

	})
	//for mobile 
	//choise product
	var btnChoiseprodict = $(".products .slider__images--mobile .btn-product");
		productBlock = $(".products .slider__images--mobile .images-small");

	btnChoiseprodict.first().addClass("active");
	productBlock.first().addClass("active");

	btnChoiseprodict.click(function(e){
		e.preventDefault();

		var i = btnChoiseprodict.index($(this));


		btnChoiseprodict.removeClass("active");
		btnChoiseprodict.eq(i).addClass("active");
		
		productBlock.removeClass("active");
		productBlock.eq(i).addClass("active");

	});

	var smallImagesM = $(".products .slider__images--mobile .row-item");
		bigImageM = $(".products .slider__images--mobile .product--full-img");



	smallImagesM.click(function(e){
		e.preventDefault();

		var src = $(this).attr("src");
			i = smallImagesM.index($(this));
		smallImagesM.removeClass("active");
		$(this).addClass("active");

		bigImageM.attr("src", src);

		slidesInfo.removeClass("active");
		slidesInfo.eq(i).addClass("active");

	})


});
