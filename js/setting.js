$(function(){
    $('html').smoothscroll({easing : 'swing', speed : 1000, margintop : 10});
    $('.totop').scrollshow({position : 500});
    $('.slide').slideshow({
        touch        : true,
        touchDistance : '80',
        bgImage      : false,
        autoSlide    : true,
        effect       : 'slide',
        repeat       : true,
        easing       : 'swing',
        interval     : 3000,
        duration     : 1000,
        imgHoverStop : true,
        navHoverStop : true,
        navImg       : false,
        navImgCustom : false,
        navImgSuffix : ''
    });
    $('.slidePrev img').rollover();
    $('.slideNext img').rollover();
    });
