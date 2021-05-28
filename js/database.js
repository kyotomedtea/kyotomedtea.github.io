var originalJSON;
var selectedItems = [];

$(document).ready(function(){  //読み込み時に動作
  //道具データベースのjsonを取りに行くURL
  var jsonURL = "https://script.google.com/macros/s/AKfycbx-dueD6pv4UmFP82zYsE803Nzh4MYY-Uaqa7B7HLhFK-cAig/exec"; //新しい方
  //上記jsonURLはGoogleドライブ上にある、doGET関数を持つserver.gsのdeploy as web appのURL
  //URLパラメータを分離。選択済リストのIDやリスト名がURLに載っていれば処理する
  selectedItems = getParam("items").split(",");
  if (selectedItems != []) {
    document.getElementById("onlyselected").checked = true;
  }
  var listname = getParam("name");
  if (listname != null) {
    document.getElementById("list_title").innerHTML = "<h4>リスト名：" + listname + "</h4>";
    document.getElementById("list_name").value = listname;
    document.getElementById("onlyselected").checked = true;
  }

  //alert('現在道具データベースは改修作業を行っています。一時的に意図せぬ動作になる場合があります。\n作業終了予定：5月31日')
  $.ajax({ //ajaxのGET方式でJSONデータを取りに行く
    type: 'GET',
    url: jsonURL,
    dataType: 'json',
    cache: false,
    }).done(function(data1){//取得成功
        /*for(i = 0; i < data1.length; i++){
            data1[i].storage = '部';
        }*/
        originalJSON = data1;
        JSON2HTML(originalJSON);
        modifyJSON(originalJSON, document.forms.kind_search_form.kind.value,  document.forms.kind_search_form.storage.value, document.forms.kind_search_form.search.value, document.forms.kind_search_form.onlyselected.checked)
        modifySelectedConsole();
        //ここから小泉先生データベースの取得を始める、やり方は同様
        /*var jsonURL = "https://script.google.com/macros/s/AKfycbwX0CaW7y3_hNnaNEl5bVmgQNtA2B_B9Fln7MpH5I2JDCcr_Q/exec";
        $.ajax({ //ajaxのGET方式でJSONデータを取りに行く
            type: 'GET',
            url: jsonURL,
            dataType: 'json',
            cache: false,
        }).done(function(data1){//取得成功
            for(i = 0;i < data1.length; i++){//「所蔵」を追加・JSONを結合
                data1[i].storage = '小泉先生';
                originalJSON.push(data1[i]);
            }
            JSON2HTML(originalJSON);
        }).fail(function(textStatus, errorThrown){//取得失敗
            alert('情報の取得に失敗しました。（小泉先生データベース）\n状態：' + textStatus + '\nエラー：' + errorThrown);
        });*/
    }).fail(function(XMLhttpRequest, textStatus, errorThrown){//取得失敗
        alert('情報の取得に失敗しました。\n繰り返し発生する場合は以下の記載を管理者にお知らせください。\nHTTP状態：' + XMLhttpRequest.status + '\n状態：' + textStatus + '\n例外：' + errorThrown);
  }); //$.ajax終了
}); //$(document).readyの終了

function JSON2HTML(json){ //JSONをHTMLのtableに整形する（部）
  var HTMLtable = "<table id = \"db_table\"><th><input type=\"checkbox\" id=\"checkall\" onClick=\"checkAll();\"></th><th>カテゴリ</th><th>名称</th><th>画像</th><th>説明</th><th>所蔵</th>";
  var item_num = 0;//表示した道具の数を数える
  for (i = 0; i < json.length; i++) {
    var id = "ID" +  i;
    if (json[i]["name"] != "") {//nameが空のものは表示しない（Unique_idのため空行が大量にjsonに紛れてる）
        item_num ++;//表示した道具の数を数える
        HTMLtable += "<tr><td><input type=\"checkbox\" name=\"Unique_id\" id=\"" + json[i]["Unique_id"] + "\" value=\"" + json[i]["Unique_id"] + "\" onclick=\"selectItems('" + json[i]["Unique_id"] + "');\""
        if (selectedItems.includes(json[i]["Unique_id"])) {//選択されている道具ならチェックをつけて表示
          HTMLtable += " checked";
        }
        HTMLtable += "><td>";
        if(json[i]['storage'] == '部'){//部の道具は種別を青字にする
            HTMLtable += "<font color=\'blue\'>" + json[i]["category"] + "</font></td>";
        }else{
            HTMLtable += json[i]["category"] + "</td>";
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
        HTMLtable += "<td>" + json[i]["storage"] + "</td></tr>";//所蔵を追加
    }
  } //forループ終了
  HTMLtable += "</table>";
  $(function(){ //colorboxはここで動作させる。ページ読み込み時点ではHTML tableはできていないので。
    $(".itemimg").colorbox();
  });

  document.getElementById("numberOfResults").innerHTML = "該当データ数：" + item_num + "件";
  document.getElementById("DBcontents").innerHTML = HTMLtable;
}


function modifyJSON(json, kind, storage, search, select){ //絞込や検索に応じてJSONをいじる
  var modifiedJSON　= [];
  for (i = 0; i < json.length; i++) {
    if ((json[i]["category"] == kind || kind == "全て") && (json[i]["name"].indexOf(search) != -1 || json[i]["description"].indexOf(search) != -1) && (json[i]["storage"] == storage || storage == "全て") && (selectedItems.includes(json[i]["Unique_id"]) || select == false)) {
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
    //リスト共有のポップアップが表示されているときはエンターキーの動作を無効にする
    if (!document.getElementById("trigger").checked) {
      if ((ev.which && ev.which === 13) ||
      (ev.keyCode && ev.keyCode === 13)) {
        modifyJSON(originalJSON, document.forms.kind_search_form.kind.value, document.forms.kind_search_form.storage.value, document.forms.kind_search_form.search.value);
      } else {
        return true;
      }
    }
  });
});

//URLパラメータを鍵ごとに取得する関数
function getParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g,"\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g," "));
}

//-----以下、表のチェックボックスを利用して道具のカスタムリストを作る機能関連-----
//選択した道具のリスト（内部で使用）を更新する
function selectItems(Unique_id) {
  if (document.getElementById(Unique_id).checked) {
    if (!selectedItems.includes(Unique_id)) {//重複防止
      selectedItems.push(Unique_id);
    }
  } else {
    selectedItems = selectedItems.filter(function(v) { return ! (Unique_id == v);});
  }
    modifySelectedConsole();
}

//選択した道具の数やボタンの表示を制御
function modifySelectedConsole() {
    if (selectedItems.length == 0) {
        document.getElementById("selectedConsole").innerHTML = ""
    } else {
        document.getElementById("selectedConsole").innerHTML = "|選択済：" + selectedItems.length + "件";
        //document.getElementById("selectedConsole").innerHTML += " <input type=\"button\" value = \"保存・共有\" onClick=\"showExportMenu();  \">";
        document.getElementById("selectedConsole").innerHTML += "<label for=\"trigger\" class=\"open_btn\">共有</label>";
    }
}

//「保存・共有」ポップアップのURLを作成、更新する
function makeURL() {
  var listName = document.getElementById('list_name').value;
  var itemsforurl = selectedItems.join(",");
  document.getElementById('list_url').value = 'https://kyotomedtea.github.io/items.html?items=' + itemsforurl + "&name=" + listName;
  document.getElementById("popup_messagearea").innerHTML = "";
  document.getElementById("qrcode").innerHTML = "";
  var qrcode = new QRCode(document.getElementById("qrcode"), {
    text: document.getElementById('list_url').value
  });
  
}

//上記関数で表示しているURLをクリップボードにコピーする（ボタンで呼び出し）
function copyURL() {
  document.getElementById("list_url").select();
  document.execCommand("copy");
  document.getElementById("popup_messagearea").innerHTML = "コピーしました。";
}

//表示されている道具を一括で選択・選択解除
function checkAll () {
  var state = true;
  if (!document.getElementById("checkall").checked) {
    state = false;
  }
  var checkboxes = document.getElementsByName("Unique_id");
  for (var i=0; i<checkboxes.length; i++) {
    checkboxes[i].checked = state;
    selectItems(checkboxes[i].id);
  }
  //selectItems();
}