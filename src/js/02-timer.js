import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let timeDiff = 0;
const refs = {
   calendar: document.querySelector('#datetime-picker'),
   btnStart: document.querySelector('[data-start]'),
   days: document.querySelector('[data-days]'),
   hours: document.querySelector('[data-hours]'),
   minutes: document.querySelector('[data-minutes]'),
   seconds: document.querySelector('[data-seconds]'),
}

refs.btnStart.disabled=true;

const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose(selectedDates) {
     timeDiff = selectedDates[0] - new Date();
     if (timeDiff<1){
      alert('choose date in future');
      timeDiff = 0
     }else{
      refs.btnStart.disabled=false;
     }     
   },
 };

flatpickr(refs.calendar, options);

refs.btnStart.addEventListener('click', countDown);

function countDown(){
   refs.btnStart.disabled=true;
   const id =setInterval(showTimer, 1000);
   setTimeout(()=>clearInterval(id), timeDiff+1000)
}

function showTimer(){
   const timeCounter = convertMs(timeDiff);
   timeDiff-=1000;
   refs.days.textContent=timeCounter.days;
   refs.hours.textContent=timeCounter.hours;
   refs.minutes.textContent=timeCounter.minutes;
   refs.seconds.textContent=timeCounter.seconds;
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
