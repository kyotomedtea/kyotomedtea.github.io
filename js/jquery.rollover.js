/* =========================================================*/
// jquery.rollover.js / ver.1.1
// Lisence : MIT License

// Date: 2015-05-16
// Author: CoolWebWindow
// Mail: info@coolwebwindow.com
// Web: http://www.coolwebwindow.com

// Used jquery.js
// http://jquery.com/
/* =========================================================*/

$.fn.rollover = function() {
    return this.each(function() {
        // 画像名を取得
        var src = $(this).attr('src');
        //すでに画像名に「_on.」が付いていた場合、ロールオーバー処理をしない
        if (src.match('_on.')) return;
        // ロールオーバー用の画像名を取得（_onを付加）
        var src_on = src.replace(/^(.+)(\.[a-z]+)$/, "$1_on$2");
        // 画像のプリロード（先読み込み）
        $('<img>').attr('src', src_on);
        // スマホ対応
        var onMouseover = ('ontouchstart' in document) ? 'touchstart' : 'mouseenter';
        var onMouseout = ('ontouchstart' in document) ? 'touchend' : 'mouseleave';
        // ロールオーバー処理
        $(this).on(onMouseover,function() {
             $(this).attr('src', src_on);
        });
        $(this).on(onMouseout,function() {
             $(this).attr('src', src);
        });
   });
};
