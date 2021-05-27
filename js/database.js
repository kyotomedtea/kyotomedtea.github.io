var originalJSON;

$(document).ready(function(){  //読み込み時に動作
  //先に部道具データベースを処理する、小泉先生のデータベースは部データの取得ajax成功時に追加で取りに行く
  var jsonURL = "https://script.google.com/macros/s/AKfycbx-dueD6pv4UmFP82zYsE803Nzh4MYY-Uaqa7B7HLhFK-cAig/exec"; //新しい方
  //上記jsonURLはGoogleドライブ上にある、doGET関数を持つserver.gsのdeploy as web appのURL

  alert('現在道具データベースは改修作業を行っています。一時的に意図せぬ動作になる場合があります。\n作業終了予定：5月31日')
  $.ajax({ //ajaxのGET方式でJSONデータを取りに行く
    type: 'GET',
    url: jsonURL,
    dataType: 'json',
    cache: false,
    }).done(function(data1){//取得成功
        for(i = 0; i < data1.length; i++){
            data1[i].where = '部';
        }
        originalJSON = data1;
        //ここから小泉先生データベースの取得を始める、やり方は同様
        var jsonURL = "https://script.google.com/macros/s/AKfycbwX0CaW7y3_hNnaNEl5bVmgQNtA2B_B9Fln7MpH5I2JDCcr_Q/exec";
        $.ajax({ //ajaxのGET方式でJSONデータを取りに行く
            type: 'GET',
            url: jsonURL,
            dataType: 'json',
            cache: false,
        }).done(function(data1){//取得成功
            for(i = 0;i < data1.length; i++){//「所蔵」を追加・JSONを結合
                data1[i].where = '小泉先生';
                originalJSON.push(data1[i]);
            }
            JSON2HTML(originalJSON);
        }).fail(function(textStatus, errorThrown){//取得失敗
            alert('情報の取得に失敗しました。（小泉先生データベース）\n状態：' + textStatus + '\nエラー：' + errorThrown);
        });
    }).fail(function(textStatus, errorThrown){//取得失敗
        alert('情報の取得に失敗しました。（部データベース）\n状態：' + textStatus + '\nエラー：' + errorThrown);
  }); //$.ajax終了
}); //$(document).readyの終了

function JSON2HTML(json){ //JSONをHTMLのtableに整形する（部）
  var HTMLtable = "<table id = \"db_table\"><th>カテゴリ</th><th>名称</th><th>画像</th><th>説明</th><th>所蔵</th>";//「所蔵」を追加しました
  for (i = 0; i < json.length; i++) {
    var id = "ID" +  i;
    if(json[i]['where'] == '小泉先生'){//小泉先生道具は種別を青字にする
        HTMLtable += "<tr><td><font color=\'blue\'>" + json[i]["category"] + "</font></td>";
    }else{
        HTMLtable += "<tr><td>" + json[i]["category"] + "</td>";
    };
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
    HTMLtable += "<td>" + json[i]["description"] + "</td>";
    HTMLtable += "<td>" + json[i]["where"] + "</td></tr>";//所蔵を追加
  } //forループ終了
  HTMLtable += "</table>";
  $(function(){ //colorboxはここで動作させる。ページ読み込み時点ではHTML tableはできていないので。
    $(".itemimg").colorbox();
  });

  document.getElementById("numberOfResults").innerHTML = "<p>該当データ数：" + json.length + "件</p>";
  document.getElementById("DBcontents").innerHTML = HTMLtable;
}


function modifyJSON(json, kind, where, search){ //絞込や検索に応じてJSONをいじる
  var modifiedJSON　= [];
  for (i = 0; i < json.length; i++) {
    if ((json[i]["category"] == kind || kind == "全て") && (json[i]["name"].indexOf(search) != -1 || json[i]["description"].indexOf(search) != -1) && (json[i]["where"] == where || where == "全て")) {
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
