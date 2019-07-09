
var amimalsSection = "";
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
     '<div class="letter" onclick="focus(this);" id="letter-' +
     animals_Array[key][1] +`">` + 
     
     '<p class="title noselect">' +
     val.title +
     "</p>" +
     '<div class="image_line noselect">' +
     '<img src="' +
     val.imagepath +
     '" alt="'+ val.alt +'">' +
     "</div>" +
     '<p class="text noselect">' +
     val.letter +
     "</p>" 
     +` <audio id="`+ val.title+
     `"> <source src="`+ val.sound +
     `" type="audio/mpeg">`
     + "</audio>" +
     "</div>";
 });
 animalsSection = output;
 document.getElementById("animals").innerHTML=output;
}};
request.send();
}

importAnimals();

function focus(e) {
  var id = e.id;
  console.log(id);
}

// $(function () {
//   $('.letter').click(function () {
//       $(this).toggleClass('playing');

//   });

//   centered = function () {
//       var wy = window.innerHeight / 2,
//           wx = window.innerWidth / 2,
//           py = 300,
//           px = 300,
//           pageTop = .9 * wy,
//           pageLeft = .9 * wx;
//       if ($('.letter').hasClass('playing')) {
//         showAnimalCard();
// } else {
//           $('.letter').removeClass('playing');
//       }
//   };

//   $('.letter').click(centered);
//   $(window).resize(centered);
// });


// function removeTransition(e) {
//   if (e.propertyName !== 'transform') return;
//   e.target.classList.remove('playing');
// }

// function playSound(e) {
//   const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
//   const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
//   if (!audio) return;
//   key.classList.add('playing');
//   audio.currentTime = 0;
//   audio.play();
// }

// const letters = Array.from(document.querySelectorAll('.letter'));
// letters.forEach(letter => letter.addEventListener('transitionend', removeTransition));

// function showAnimalCard(){
//  $('.playing').css({
//               position: "absolute",
//               top: pageTop,
//               left: pageLeft
//           });
// }