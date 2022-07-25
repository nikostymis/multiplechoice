import rawData from './data.js';

const dataObject = {

rawData : rawData,

chapterFocus  : 1,
chapters      : 1,

questionFocus : 1,
// An array containing how many questions each chapter contains
// Also, each entry denotes where the next chapter begins
totalQuestions: [],

// BEGIN initialization
getChaptersNum: function (){
  let maxValue = 1;
  for (let entry of this.rawData) {
    if (entry.chapter > 1) maxValue = entry.chapter;
  };
  this.chapters = maxValue; //int
},

getQNumArray : function (){
  let maxValue = 1;
  for (let i=1; i<=this.chapters; i++) {
    maxValue = 1;
    for (let entry of this.rawData) {
      if (entry.chapter == i && entry.number > maxValue) maxValue = entry.number;
    };
  this.totalQuestions.push(maxValue);
  };
},

init: function (){
  this.getChaptersNum();
  this.getQNumArray();
},
// END

// BEGIN navigation
next: function (){
  if (this.questionFocus == this.totalQuestions[this.chapterFocus - 1]) {return};
  this.questionFocus += 1;
},

previous: function (){
  if (this.questionFocus == 1) {return};
  this.questionFocus -= 1;
},

chapterNum: function(num){
  this.chapterFocus  = num;
  this.questionFocus = 1;
},
// END

returnQ : function(){
  let offSet = 0;
  let chIndex = this.chapterFocus - 1;
  let Qindex = this.questionFocus - 1;
  if (chIndex == 0)
    {return this.rawData[Qindex];}
  else{
    for (let i=0; i <= chIndex - 1; i++) {
      offSet += this.totalQuestions[i]
    };
    return this.rawData[offSet + Qindex]};
},

returnNavDisplay : function(){
    return this.questionFocus + "/" + this.totalQuestions[this.chapterFocus - 1];
  }
};

export default dataObject;
