var originalJSON;

//上記jsonURLはGoogleドライブ上にある、doGET関数を持つserver.gsのdeploy as web appのURL
$(document).ready(function(){  //読み込み時に動作
    var jsonURL = "https://script.google.com/macros/s/AKfycbw-6y_H9ELb5z6N6fDu7lbKIbzApgzLQdebXMp_VWRhgAz3Aw/exec"
    //var jsonURL = "https://script.google.com/macros/s/AKfycbx-dueD6pv4UmFP82zYsE803Nzh4MYY-Uaqa7B7HLhFK-cAig/exec"; 
    //上記jsonURLはGoogleドライブ上にある、doGET関数を持つcode.gsのdeploy as web appのURL
    $.ajax({ //ajaxのGET方式でJSONデータを取りに行く
        type: 'GET',
        url: jsonURL,
        dataType: 'json',
        cache: false,
        success: function(data){ // 通信が成功した時
            originalJSON = data;
            console.log(data.length)
            JSON2HTML(data);
          },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert('error!!!');
        　　console.log("XMLHttpRequest : " + XMLHttpRequest.status);
        　　console.log("textStatus     : " + textStatus);
        　　console.log("errorThrown    : " + errorThrown.message);
        }
      }); //$.ajax終了


}); //$(document).readyの終了

function JSON2HTML(json){ //JSONをHTMLのtableに整形する
    var HTMLtable = "<table id = \"visitors_table\"><th>席札番号</th><th>席入り</th><th>名前</th><th>フリガナ</th><th>場所</th>";
    for (var i in json) {
        var array1 = ["A","C","E","F","H","J","L","N","P"]
        if (array1.includes(json[i].when)){
            console.log("true")
            HTMLtable += "<tr class = \"colored\"><td>" + json[i].number + "</td>";
        }else if (json[i].when == ""){
            HTMLtable += "<tr class = \"unknown\"><td>" + json[i].number + "</td>";
        }else{
            HTMLtable += "<tr><td>" + json[i].number + "</td>";
        }
        
        HTMLtable += "<td>" + json[i].day + json[i].when + "</td>";
        HTMLtable += "<td>" + json[i].name + "</td>";
        HTMLtable += "<td>" + json[i].furigana + "</td>";
        HTMLtable += "<td>" + json[i].where + "</td></tr>";
    } //forループ終了
    HTMLtable += "</table>";
    var div = document.getElementById("wrap");
    div.innerHTML = HTMLtable;
  }