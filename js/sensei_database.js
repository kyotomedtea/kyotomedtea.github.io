var originalJSON;

$(document).ready(function(){  //読み込み時に動作
  var jsonURL = "https://script.google.com/macros/s/AKfycbwX0CaW7y3_hNnaNEl5bVmgQNtA2B_B9Fln7MpH5I2JDCcr_Q/exec"; //新しい方
  //上記jsonURLはGoogleドライブ上にある、doGET関数を持つserver.gsのdeploy as web appのURL

  $.ajax({ //ajaxのGET方式でJSONデータを取りに行く
    type: 'GET',
    url: jsonURL,
    dataType: 'json',
    cache: false,
    success: function(data){ // 通信が成功した時
      originalJSON = data;
      JSON2HTML(data);
    },
    error: function(){ // 通信が失敗した時
      alert('An unexpected error occured.');
    }
  }); //$.ajax終了
}); //$(document).readyの終了

function JSON2HTML(json){ //JSONをHTMLのtableに整形する
  var HTMLtable = "<table id = \"db_table\"><th>カテゴリ</th><th>名称</th><th>画像</th><th>説明</th>";
  for (i = 0; i < json.length; i++) {
    var id = "ID" +  i;
    HTMLtable += "<tr><td>" + json[i]["category"] + "</td>";
    HTMLtable += "<td><a onclick=\"OnLinkClick(" + i + ");\">" + json[i]["name"] + "</a></td>";
    //名前をクリックすると、画像をクリックしたのと同じ動作をする（colorboxで表示する画像がダブらないように）
    HTMLtable += "<td><a href = \"" + json[i]["image1"] + "\" class = \"itemimg\" rel = \"" + json[i]["name"] + i + "\" title = \"" + json[i]["name"] + "\" id = \"" + id + "\"><img src = \"" + json[i]["image0"] + "\"></a>";
    //</td>閉じてないの注意。class="itemimg"に対してcolorboxが動作。rel=同じIDに対して同じグループとしてcolorboxが動作。
    if(json[i]["image2"]){ //2個目の画像
      HTMLtable += "<div style=\"display: none;\"><a href = \"" + json[i]["image2"] + "\" class = \"itemimg\" rel = \"" + json[i]["name"] +　i + "\" title = \"" + json[i]["name"] + "\"><img src = \"" + json[i]["image2"] + "\"></a>";
      if(json[i]["image3"]){ //3個目の画像
        HTMLtable += "<a href = \"" + json[i]["image3"] + "\" class = \"itemimg\" rel = \"" + json[i]["name"] + i + "\" title = \"" + json[i]["name"] + "\"><img src = \"" + json[i]["image3"] + "\"></a>";
      }
      HTMLtable += "</div>";
    }
    HTMLtable += "</td>";
    HTMLtable += "<td>" + json[i]["description"] + "</td></tr>";
  } //forループ終了
  HTMLtable += "</table>";

  $(function(){ //colorboxはここで動作させる。ページ読み込み時点ではHTML tableはできていないので。
    $(".itemimg").colorbox();
  });

  document.getElementById("numberOfResults").innerHTML = "<p>該当データ数：" + json.length + "件</p>";
  document.getElementById("DBcontents").innerHTML = HTMLtable;
}

function modifyJSON(json, kind, search){ //絞込や検索に応じてJSONをいじる
  var modifiedJSON　= [];
  for (i = 0; i < json.length; i++) {
    if ((json[i]["category"] == kind || kind == "全て") && (json[i]["name"].indexOf(search) != -1 || json[i]["description"].indexOf(search) != -1)) {
      modifiedJSON.push(json[i]);
    }
  } //forループ終了
  JSON2HTML(modifiedJSON);
  if (!modifiedJSON.length) {
    alert('No results. :(');
  }
}

function OnLinkClick(id_no){ //HTML tableで、名称をクリックすると画像をクリックしたのと同じ動作をさせる
  var id = "ID" + id_no;
  document.getElementById(id).click();
}

$(function(){ //エンターキーを押しても動作するようにする
  $("input[type=text]").keypress(function(ev) {
    if ((ev.which && ev.which === 13) ||
    (ev.keyCode && ev.keyCode === 13)) {
      modifyJSON(originalJSON, document.forms.kind_search_form.kind.value, document.forms.kind_search_form.search.value);
    } else {
      return true;
    }
  });
});
