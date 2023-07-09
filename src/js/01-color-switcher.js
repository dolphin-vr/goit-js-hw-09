const refs = {
   btnStart: document.querySelector('[data-start]'),
   btnStop: document.querySelector('[data-stop]'),
   body: document.querySelector('body'),
}
let colorId = null;

refs.btnStart.addEventListener('click', onStart);
refs.btnStop.addEventListener('click', onStop);

function onStart(){
   refs.btnStart.disabled=true;
   refs.btnStop.disabled=false;
   colorId = setInterval(()=>{ refs.body.style.backgroundColor=getRandomHexColor()}, 1000)
}

function onStop(){
   refs.btnStart.disabled=false;
   refs.btnStop.disabled=true;
   clearInterval(colorId)
}

function getRandomHexColor() {
   return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
