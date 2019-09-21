//ハッシュ化したパスワード。適宜変更する。
var password = '4c716d4cf211c7b7d2f3233c941771ad0507ea5bacf93b492766aa41ae9f720d'
//Cookieを読み込み、認証済みならばデータベースページに転送するscript
var Cookie_Str = document.cookie;
var Cookie_Str = Cookie_Str + ";";
//Cookie名
var Cookie_name = "KUMTCC_sensei_databese";
//先頭位置
var Cookie_start = Cookie_Str.indexOf(Cookie_name);
//終了位置
var Cookie_end = Cookie_Str.indexOf(";");
var Cookie_data = Cookie_start + Cookie_name.length+1;
//Cookieを探し、値がKUMTTC_sensei_database=(正しいハッシュ)ならば認証済み。それ以外なら、未認証なのでログインへ。
if (Cookie_Str.indexOf(Cookie_name) != -1){
if (Cookie_Str.substring(Cookie_data,Cookie_end) == password){}else{
window.location.href = "sensei-items-login.html"
}}else{
window.location.href = "sensei-items-login.html"}
