import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  daysCounter: document.querySelector('[data-days]'),
  hoursCounter: document.querySelector('[data-hours]'),
  minutesCounter: document.querySelector('[data-minutes]'),
  secondsCounter: document.querySelector('[data-seconds]'),
};

let intervalId = null;
const TIMER_STEP = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectDate = selectedDates[0].getTime();
    if (selectDate < Date.now()) {
      alert('Please, choose a date in the future');
    }
    return;
  },
};

flatpickr(refs.input, options);

refs.btnStart.addEventListener('click', () => {
  refs.btnStart.disabled = true;
  refs.input.disabled = true;
  const selectedDate = new Date(refs.input.value).getTime();
  if (!isNaN(selectedDate) && selectedDate > Date.now()) {
    startCounter(selectedDate);
  } else {
    alert('Please, choose a valid date in the future');
  }
});

function startCounter(selectDate) {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    const currentDate = Date.now();
    const diffTime = selectDate - currentDate;

    if (diffTime <= 0) {
      stopCounter();
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diffTime);

    refs.daysCounter.textContent = addLeadingZero(days);
    refs.hoursCounter.textContent = addLeadingZero(hours);
    refs.minutesCounter.textContent = addLeadingZero(minutes);
    refs.secondsCounter.textContent = addLeadingZero(seconds);
  }, TIMER_STEP);
}

function stopCounter() {
  clearInterval(intervalId);
  intervalId = null;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
