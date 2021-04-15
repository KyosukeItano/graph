
$('newCreate').submit(function(){
  let errCnt = 0;
  if($('sYear').value == "" ||$('sMonth').value == "" ||$('sDay').value == "" ){
    $('dateErr').text("日付が入力されていません");
    errCnt++;
  }
  if($("Money").value == ""){
    $("moneyErr").text("金額が入力されていません");
    errCnt++;
  }
  if($("use").value == ""){
    $('useErr').text("用途が選ばれていません");
    errCnt++;
  }
  if(errCnt !== 0){
    return false;
  }
})

function changeItem(obj) {
  if (obj.value == 0) {
    obj.style.color = "#000";
    obj.style.backgroundColor = "#fff";
  } else if (obj.value == 1) {
    obj.style.backgroundColor = "#FF8A5C";
    obj.style.color = "#fff";
  } else if (obj.value == 2) {
    obj.style.backgroundColor = "#F5587B";
    obj.style.color = "#fff";
  } else if (obj.value == 3) {
    obj.style.backgroundColor = "#E41749";
    obj.style.color = "#fff";
  }
}
const coll = 'sasasasas'