var originalJSON;
var myrec=
[
  {"no":"1","name":"name1","score":"98"},
  {"no":"2","name":"name2","score":"80"},
  {"no":"3","name":"name3","score":"67"},
  {"no":"4","name":"name4","score":"32"}
];


function categorizeData(sheetsEntry){ // データを整形して配列で返す
  var categorized = [];
  for(var i = 0; i < sheetsEntry.length; i++){
    var dataCol = sheetsEntry[i].gs$cell.col;
    var dataRow = sheetsEntry[i].gs$cell.row;

    if(dataCol == 1 && dataRow != sheetsEntry[i+1].gs$cell.row){
      categorized[categorized.length] = [];
    }
    categorized[categorized.length-1].push(sheetsEntry[i]);
  }
  return categorized;
}

function renderForm(categorized){ // レンダリング用の関数
  var target = $('.formSubmit');
  categorized.forEach(function(areaCats){
    target.before('<h2>'+areaCats[0].gs$cell.$t+'</h2>');
    target.before('<dl>');
    for(var i = 1; i &lt; areaCats.length; i+=2){
      target.before('<dt><label><input name="cats" type="checkbox" />'+areaCats[i].gs$cell.$t+'</label></dt>');
      target.before('<dd>原産地：'+areaCats[i+1].gs$cell.$t+'</dd>');
    }
    target.before('</dl>');
  });
}

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
