import dataObject from './dataObject.js';
import {KaTeXmarkUp, renderAllMath} from './parse-render.js';

$(document).ready(function(){

  //BEGIN initialization
  dataObject.init();
  refresh();

  let score = 0;
  $("#score").text(score);

  let foundIt = false;

  buildSelection(dataObject.chapters);
  //END

  //$("#score").click($(this).text(score));


$(".list-group-item").click(function(){
  if (foundIt) {
    return;
  }
    removeColor();
    if ($(this).attr('data-correct')=="true"){
      $(this).addClass("list-group-item-success");
      $("#QuestionBody").addClass("foundit");
      score++;
      keepScore(score);
      foundIt=true;
    }
    else{
      $(this).addClass("list-group-item-danger");
      score--;
      keepScore(score);
    }
});


$("#nav-forward").click(function(){
    removeColor();
    dataObject.next();
    refresh();
    foundIt=false;
});


$("#nav-backward").click(function(){
    removeColor();
    dataObject.previous();
    refresh();
    foundIt=false;
});


$('select').change(function () {
    let optionSelected = $(this).find("option:selected");
    let valueSelected  = optionSelected.val();

    score = 0;
    keepScore(score);
    foundIt=false;
    removeColor();

    dataObject.chapterNum(valueSelected);
    refresh();
  });

});
//----


// Auxillary functions
function removeColor (){
  $(".list-group-item").removeClass("list-group-item-danger list-group-item-success");
  $("#QuestionBody").removeClass("foundit");
}

//
function keepScore(score){
  $("#score").text(score);
}

//
function buildSelection(num){
  let selectElement = document.getElementById("myselection");
  let optionElement;
  for (let i = 2; i <= num; i++) {
    optionElement = document.createElement("option");
    optionElement.value = i;
    optionElement.innerHTML = "Κεφάλαιο " + i;
    selectElement.appendChild(optionElement);
  }
}

//
function removeAllChildNodes (parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  };
}

// typeset
function printQ(question){

  // print body
  let body = document.getElementById('QuestionBody');
  removeAllChildNodes(body);
  body.appendChild(KaTeXmarkUp(question.body));

  // print answers
  for(let i=0; i<4; i++){
    let ID = i + 1;
    let itemID = "item" + ID;
    let item = document.getElementById(itemID);
    removeAllChildNodes(item);
    item.appendChild(KaTeXmarkUp(question.choises[i]));
    if (ID == question.ans)
      {item.dataset.correct = true;}
    else
      {item.dataset.correct = false;}
    };

  renderAllMath();
}

//
function refresh(){
  // print the question
  printQ(dataObject.returnQ());

  // print the score
  let navDisplay = document.getElementById('number-display');
  navDisplay.innerHTML = "";
  navDisplay.innerHTML = dataObject.returnNavDisplay();
}
