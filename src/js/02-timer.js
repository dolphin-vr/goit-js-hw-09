import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const optNotiflx = {
   timeout: 3000,
 };
let timeDiff = 0;
let id=null;
const refs = {
   calendar: document.querySelector('#datetime-picker'),
   btnStart: document.querySelector('[data-start]'),
   btnReset: document.querySelector('[data-reset]'),
   days: document.querySelector('[data-days]'),
   hours: document.querySelector('[data-hours]'),
   minutes: document.querySelector('[data-minutes]'),
   seconds: document.querySelector('[data-seconds]'),
}

refs.btnStart.disabled=true;
refs.btnReset.disabled=true;

const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose(selectedDates) {
     timeDiff = selectedDates[0] - new Date();
     if (timeDiff<1){
      Notify.failure('Please choose date in the future', optNotiflx);
      timeDiff = 0
     }else{
      refs.btnStart.disabled=false;
     }     
   },
 };

flatpickr(refs.calendar, options);

refs.btnStart.addEventListener('click', countDown);
refs.btnReset.addEventListener('click', countReset);

function countDown(){
   refs.btnStart.disabled=true;
   refs.btnReset.disabled=false;
   id =setInterval(showTimer, 1000);
   setTimeout(()=>clearInterval(id), timeDiff+1000)
}

function showTimer(){
   const timeCounter = convertMs(timeDiff);
   timeDiff-=1000;
   refs.days.textContent=String(timeCounter.days).padStart(2, '0');
   refs.hours.textContent=String(timeCounter.hours).padStart(2, '0');
   refs.minutes.textContent=String(timeCounter.minutes).padStart(2, '0');
   refs.seconds.textContent=String(timeCounter.seconds).padStart(2, '0');
}

function countReset(){
   timeDiff = 0;
   clearInterval(id);
   showTimer()
}

function convertMs(ms) {
   // Number of milliseconds per unit of time
   const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;
 
   // Remaining days
   const days = Math.floor(ms / day);
   // Remaining hours
   const hours = Math.floor((ms % day) / hour);
   // Remaining minutes
   const minutes = Math.floor(((ms % day) % hour) / minute);
   // Remaining seconds
   const seconds = Math.floor((((ms % day) % hour) % minute) / second);
 
   return { days, hours, minutes, seconds };
 }
