/* =========================================================*/
// jquery.scrollshow.js / ver.1.0
// Lisence : MIT License

// Date: 2014-01-22
// Author: CoolWebWindow
// Mail: info@coolwebwindow.com
// Web: http://www.coolwebwindow.com

// Used jquery.js
// http://jquery.com/
/* =========================================================*/

$.fn.scrollshow = function(config) {
    // オプション
    var o = $.extend({
        position : 400 // 表示位置
    }, config);

    var $element = $(this);

    // 要素の非表示
    if ($(window).scrollTop() < o.position){
        $element.hide();
    }
    // スクロールすると表示させる
    $(window).scroll(function(){
        if ($(this).scrollTop() >= o.position) {
            $element.not(':animated').fadeIn();
        } else {
            $element.not(':animated').fadeOut();
        }
    });
};
