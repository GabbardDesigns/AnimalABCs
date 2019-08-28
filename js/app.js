var audioFilesSection = "";
var amimalsSection = "";
var animals_Array = [];
var output = "";
var audioOutput= "";
var letters = [];
var modalContent = "";

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
     '<div class="letter key" href="#overlay" data-key="' +
    (key) +`">` + 
     
     '<p class="title noselect">' +
     val.letter +
     "</p>" +
     '<div class="image_line noselect">' +
     '<img src="' +
     val.imagepath +
     '" alt="'+ val.alt +'">' +
     "</div>" +
     '<p class="text noselect">' +
     val.title +
     "</p>" +
     ` <audio data-key="`+ val.title+
     `"> <source src="`+ val.sound +
     `" type="audio/mpeg">`
     + "</audio>" +
      "</div>";
 });
 
 animalsSection = output;
 audioFilesSection = audioOutput;

 document.getElementById("animals").innerHTML=output;
 document.getElementById("audiofiles").innerHTML=audioOutput;
 
}};
request.send();
}

importAnimals();


function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="e"]`);
  const letter = document.querySelector(`div[data-key="e"]`);
  if (!audio) return;
  letter.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

keys =  Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener("click", playSound);


$('.animal_list_section').on('click', 'div', function(){
// gets position in the array of the box, used to access position of audio file.
  var key = $(this).data("key");

  //sets the modal content to that of the box clicked
   document.getElementById('animal_card').innerHTML = this.innerHTML;

// shows modal   
   $('#modal').show();
   $('#overlay').show();


// plays the audio file associated with key array value   
setTimeout(function () {
  $('.letter audio')[key].play();
}, 1000);
  

// when audio is finished, hide the modal   
  $('.letter audio').on('ended', function(){
    $('#modal').hide();
    $('#overlay').hide();
     $(this).parent().removeClass("playing");
});
//
} );