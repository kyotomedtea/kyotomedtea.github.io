var originalJSON;
var myrec=
[
  {"no":"1","name":"name1","score":"98"},
  {"no":"2","name":"name2","score":"80"},
  {"no":"3","name":"name3","score":"67"},
  {"no":"4","name":"name4","score":"32"}
];



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
