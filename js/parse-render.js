function indexMathContent(str) {
  let indexArray = [];
  let mathMarkers = /(\$|\\\[|\\\])/g;
  let openingDelimeter = true;
  let indexObjectText = {mode:"text", begin:0, end:0};
  let indexObjectMath = {mode:"inline", begin:0, end:0};
  let textStart = 0;
  let marker;

  while ((marker = mathMarkers.exec(str)) !== null) {

    if (openingDelimeter){ // On opening delimeters, push text objects

      indexObjectMath.begin = marker.index + marker[1].length;



  //    if (textStart < marker.index){// If the string starts with text (only for the first round)
        indexObjectText.begin = textStart;

        indexObjectText.end   = marker.index;
        indexArray.push(indexObjectText);
        indexObjectText = {mode:"text", begin:0, end:0};
        //    };

      openingDelimeter = false;
    }
    else { // On closing delimeters push math objects
      textStart = marker.index + marker[1].length;

      indexObjectMath.end = marker.index;

      if (marker[1] == "\\\]") {
        indexObjectMath.mode = "display"
      };

      indexArray.push(indexObjectMath);
      indexObjectMath = {mode:"inline", begin:0, end:0};
      openingDelimeter = true;
    };

  };

  if (textStart < str.length){
    indexObjectText.begin = textStart;
    indexObjectText.end = str.length;
    indexArray.push(indexObjectText);
  };

  return indexArray;

}

//
function KaTeXmarkUp(str){

  let indexArray = indexMathContent(str);
  let parsedString = document.createDocumentFragment();// a node in the memory not the DOM

  let content, node;


  for (let entry of indexArray) {
    content = str.substring(entry.begin, entry.end);

    if (entry.mode == "text"){
      node = document.createTextNode(content);
      parsedString.appendChild(node);
    };

    if (entry.mode == "inline"){
      node = document.createElement('span');
      node.className = "Math";
      node.dataset.expr = content;
      parsedString.appendChild(node);
    };

    if (entry.mode == "display"){
      node = document.createElement('span');
      node.className = "MathDisplay";
      node.dataset.expr = content;
      parsedString.appendChild(node);
    };

  };

  return parsedString;//An array of text and Math nodes!
}

//
function renderAllMath() {
  let inline  = document.getElementsByClassName("Math");
  let display = document.getElementsByClassName("MathDisplay");
  // for each element, render the expression attribute
  Array.prototype.forEach.call(inline, function(el) {
    katex.render(el.getAttribute("data-expr"), el);
  });
  Array.prototype.forEach.call(display, function(el) {
    katex.render(el.getAttribute("data-expr"), el, {displayMode:true});
  });
}


export {KaTeXmarkUp, renderAllMath};
