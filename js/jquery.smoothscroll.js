/* =========================================================*/
// jquery.smoothscroll.js / ver.1.1
// Lisence : MIT License

// Date: 2015-10-01
// Author: CoolWebWindow
// Mail: info@coolwebwindow.com
// Web: http://www.coolwebwindow.com

// Used jquery.js
// http://jquery.com/
/* =========================================================*/

$.fn.smoothscroll = function(config) {
    // オプション
    var o = $.extend({
        easing    : 'swing', // 動作パターン
        speed     : 500,     // スクロールの速度
        margintop : 0,       // スクロール位置の変更
        headerfix : ''       // 固定されているヘッダーのセレクタ
    }, config);

    // #で始まるアンカーをクリックした場合に処理
    $('a[href^=#]',this).click(function() {
        // アンカーの値取得
        var href= $(this).attr('href');
        // 移動先を取得
        var target = $(href == '#' || href == '' ? 'body' : href);
        // 移動先を数値で取得
        if(o.headerfix != ''){
            var navHeight = o.headerfix.outerHeight(true);
            var position = target.offset().top - navHeight  - o.margintop;
        } else {
            var position = target.offset().top - o.margintop;
        }
        // スムーススクロール
        $('html,body').animate({scrollTop:position}, o.speed, o.easing);
        return false;
    });
};
