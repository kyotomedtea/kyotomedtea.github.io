var originalJSON;
$(document).ready(function(){  //読み込み時
  //var jsonURL = "https://script.google.com/macros/s/AKfycbwzEIf805yqL4ptzS9tdY8Xd5_I6rTV0dH-HebDY2-SFL1KkBR-/exec"; //古い方 test用
  var jsonURL = "https://script.google.com/macros/s/AKfycbx-dueD6pv4UmFP82zYsE803Nzh4MYY-Uaqa7B7HLhFK-cAig/exec"; //新しい方
  $.ajax({
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

function JSON2HTML(json){
  var HTMLtable = "<table id = \"db_table\"><th>カテゴリ</th><th>名称</th><th>画像</th><th>説明</th>";
  for (i = 0; i < json.length; i++) {
    var id = "ID" +  i;
    HTMLtable += "<tr><td>" + json[i]["category"] + "</td>";
    HTMLtable += "<td><a onclick=\"OnLinkClick(" + i + ");\">" + json[i]["name"] + "</a></td>";
    HTMLtable += "<td><a href = \"" + json[i]["image1"] + "\" class = \"itemimg\" rel = \"" + json[i]["name"] + i + "\" title = \"" + json[i]["name"] + "\" id = \"" + id + "\"><img src = \"" + json[i]["image1"] + "\"></a>"; //</td閉じてない>
    if(json[i]["image2"]){
      HTMLtable += "<div style=\"display: none;\"><a href = \"" + json[i]["image2"] + "\" class = \"itemimg\" rel = \"" + json[i]["name"] +　i + "\" title = \"" + json[i]["name"] + "\"><img src = \"" + json[i]["image2"] + "\"></a>";
      if(json[i]["image3"]){
        HTMLtable += "<a href = \"" + json[i]["image3"] + "\" class = \"itemimg\" rel = \"" + json[i]["name"] + i + "\" title = \"" + json[i]["name"] + "\"><img src = \"" + json[i]["image3"] + "\"></a>";
      }
      HTMLtable += "</div>";
    }
    HTMLtable += "</td>";
    HTMLtable += "<td>" + json[i]["description"] + "</td></tr>";
  } //forループ終了
  HTMLtable += "</table>";
  $(function(){
    $(".itemimg").colorbox();
  });
  //console.log(HTMLtable);
  document.getElementById("numberOfResults").innerHTML = "<p>該当データ数：" + json.length + "件</p>";
  document.getElementById("DBcontents").innerHTML = HTMLtable;
}

function modifyJSON(json, kind, search){
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

function OnLinkClick(id_no){
  var id = "ID" + id_no;
  document.getElementById(id).click();
}

$(function(){
  $("input[type=text]").keypress(function(ev) {
    if ((ev.which && ev.which === 13) ||
    (ev.keyCode && ev.keyCode === 13)) {
      modifyJSON(originalJSON, document.forms.kind_search_form.kind.value, document.forms.kind_search_form.search.value);
    } else {
      return true;
    }
  });
});

$(function(){
  $(".itemimg").colorbox();
});
