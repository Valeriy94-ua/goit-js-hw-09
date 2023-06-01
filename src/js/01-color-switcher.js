const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

const COLOR_DELAY_CHANGE = 1000;
let setInt = null;

// random color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// setting start btn
refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;

  setInt = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, COLOR_DELAY_CHANGE);
});

// setting stop btn
refs.stopBtn.addEventListener('click', () => {
  clearInterval(setInt);
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
});
