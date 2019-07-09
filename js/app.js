
var inventorySection = "";
var animals_Array = [];
var output = "";

function importAnimals(){
   var request = new XMLHttpRequest();  
   request.open('GET', './data/animals.json', true);
     request.onload = function() {
       if (request.status >= 200 && request.status < 400) {
         // Success!
         var data = JSON.parse(request.responseText);
         //  console.log(data);
         data.forEach(function(val, key){
   animals_Array.push([
     val.title,
     val.letter,
     val.imagepath,
     val.sound
   ]);
   output +=
     '<div class="product" id="product-' +
     animals_Array[key][0] +`">` + 
     
     '<p class="title noselect">' +
     val.title +
     "</p>" +
     '<div class="image_line noselect">' +
     '<img src="' +
     val.imagepath +
     '" alt="'+ val.alt +'">' +
     "</div>" +
     '<p class="price noselect">' +
     val.letter +
     "</p>" 
     +` <audio id="`+ val.title+
     `"> <source src="`+ val.sound +
     `" type="audio/mpeg">`
     + "</audio>" +
     "</div>";
 });
 inventorySection = output;
 document.getElementById("inventory").innerHTML=output;
}};
request.send();
}



importAnimals();


function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}
function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;
  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}
const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
