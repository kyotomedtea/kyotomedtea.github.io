var originalJSON;
var myrec=
[
  {"no":"1","name":"name1","score":"98"},
  {"no":"2","name":"name2","score":"80"},
  {"no":"3","name":"name3","score":"67"},
  {"no":"4","name":"name4","score":"32"}
];
alert("test");

$(function(){
  alert('The document is ready.');
  google.script.run.withSuccessHandler(result).getDBasJSON();
//    google.script.run
//    .withSuccessHandler(result)
//    .withFailureHandler(failed)
//    .getDBasJSON(); //ページが読み込まれたらすぐにデータベースをゲットし、そのJSONデータを関数resultに渡す　　失敗したときのメソッドを考える必要がある
});

function result(data){
  alert('function result was called.');
  originalJSON = JSON.parse(data); //JSONオブジェクトに変換
  alert("function result() " + originalJSON);
  //JSON2HTML(myrec);
  JSON2HTML(originalJSON);
}

function failure(){
  alert('データベースの読み込みに失敗しました。');
}

function callbackFunc(){
  //今のところこいつはダミー
  document.getElementById("DBcontents").innerHTML = "";
}


function JSON2HTML(json){
  //alert(json.length); //これは動く
  //alert("Object.keys(json[0])" + Object.keys(json[0])); //これは動く
  //alert("json[0][category]: " + json[0]["category"]); //これは動く
  var index[] = Object.getOwnPropertyNames(json[0]);
  alert('index: ' + index);
  var HTMLtable = "<table>";
  for(key in Object.keys(json[0])){
    alert(key); //ホントはkeyにID,category,descriptionとかなってほしいのになんでデランのかな
    alert(json[0]["category"]);
    HTMLtable += "<th>" + key + "</th>" //テーブルの見出しを作る
  }
  alert("function JSON2HTML" + HTMLtable);
  for (i = 0; i < json.length; i++) {
  rows += "<tr>";
  for (j = 0; j < json[i].length; j++) {
  rows += "<td>";
  rows += json[i][j];
  rows += "</td>";
  }
  rows += "</tr>";
  }
  HTMLtable += "</html>";
  document.getElementById("DBcontents").innerHTML = HTMLtable;
}

function modifyJSON(){
}
