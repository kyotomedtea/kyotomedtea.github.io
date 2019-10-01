//ハッシュ化したパスワード。適宜変更する。
var password = 'f0fd61511fd1179395d4a04292f13f48f3d1160c1ed6f07acefb2cc052509fa0'
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
var Cookie_pass = Cookie_Str.substring(Cookie_data,Cookie_end);
alert(Cookie_pass);
alert("test");
//Cookieを探す
if (Cookie_Str.indexOf(Cookie_name) != -1){
if (Cookie_Str.substring(Cookie_data,Cookie_end) == password){
window.location.href = "sensei-items.html"
}}

//ログイン機能の実装。ログインボタンを押すと呼ばれる
function SWAuthUser()
{
    var value    = document.getElementById('sw_password').value;
    //alert(value);
    //alert(hex_sha256(value))
    //alert(Cookie_Str);
    //alert(Cookie_end)
    //alert(Cookie_Str.substring(Cookie_data,Cookie_end))
    if(hex_sha256(value) == password)
    {
        document.getElementById('sw_result').innerHTML = '認証しました！';
        alert("認証しました！");
        //Cookieにパスワードのハッシュを入れて次回認証をを省略
        WritetoCookie(hex_sha256(value));
        window.location.href = "sensei-items.html"
    }
    else
    {
        document.getElementById('sw_result').innerHTML = 'パスワードが間違っています。';
    }
}

//cookieで認証情報を管理。ブラウザを閉じると削除。
//書き込み。
function WritetoCookie(LoginStatus){
	document.cookie = Cookie_name + "=" +  LoginStatus;
}
