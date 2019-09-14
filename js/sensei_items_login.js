//Cookieを読み込み、認証済みならばデータベースページに転送するscript
var Cookie_Str = document.cookie;
var Cookie_Str = Cookie_Str + ";";
//Cookie名
var Cookie_name = "KUMTCC_sensei_databese";
//先頭位置
var Cookie_start = Cookie_Str.indexOf(Cookie_name);
//終了位置
var Cookie_end = Cookie_Str.indexOf(";",Cookie_start)+1;
var Cookie_data = Cookie_start + Cookie_name.length+1;
//Cookieを探す
if (Cookie_Str.indexOf(Cookie_name) != -1){
if (Cookie_Str.substring(Cookie_data,Cookie_data+1) == 1){
window.location.href = "sensei-items.html"
}}

//ログイン機能の実装。ログインボタンを押すと呼ばれる
function SWAuthUser()
{
	//ハッシュ化したパスワード。適宜変更する。
    var password = '4c716d4cf211c7b7d2f3233c941771ad0507ea5bacf93b492766aa41ae9f720d'
    var value    = document.getElementById('sw_password').value;
    //alert(value);
    //alert(hex_sha256(value))
    if(hex_sha256(value) == password)
    {
        document.getElementById('sw_result').innerHTML = '認証しました！';
        //Cookieに認証済み旗を立てて次回認証をを省略
        WritetoCookie(1);
        window.location.href = "sensei-items.html"
    }
    else
    {
        document.getElementById('sw_result').innerHTML = 'パスワードが間違っています。';
    }
    SWSetCookie('sw_javascriptauth_password', value);
}

//cookieで認証情報を管理。ブラウザを閉じると削除。
//書き込み。
function WritetoCookie(LoginStatus){
	document.cookie = Cookie_name + "=" +  LoginStatus;
}
