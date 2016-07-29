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
					arrows: false
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


});
