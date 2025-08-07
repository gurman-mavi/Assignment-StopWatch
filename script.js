const timeLabel = document.getElementById('time-label');
const lapBtn = document.getElementById('lap-btn');
const startBtn = document.getElementById('start-btn');
const lapsList = document.getElementById('laps-list');

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;

function timeToString(time) {
  const diffInHrs = time / 3600000;
  const hh = Math.floor(diffInHrs);

  const diffInMin = (diffInHrs - hh) * 60;
  const mm = Math.floor(diffInMin);

  const diffInSec = (diffInMin - mm) * 60;
  const ss = Math.floor(diffInSec);

  const diffInMs = (diffInSec - ss) * 100;
  const ms = Math.floor(diffInMs);

  const formattedHH = hh.toString().padStart(2, '0');
  const formattedMM = mm.toString().padStart(2, '0');
  const formattedSS = ss.toString().padStart(2, '0');
  const formattedMS = ms.toString().padStart(2, '0');

  return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

function print(txt) {
  timeLabel.innerHTML = txt;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);
  running = true;
  startBtn.textContent = 'Stop';
  startBtn.classList.add('running');
  lapBtn.textContent = 'Lap';
}

function stop() {
  clearInterval(timerInterval);
  running = false;
  startBtn.textContent = 'Start';
  startBtn.classList.remove('running');
  lapBtn.textContent = 'Reset';
}

function reset() {
  clearInterval(timerInterval);
  print('00:00:00.00');
  elapsedTime = 0;
  running = false;
  lapsList.innerHTML = '';
  startBtn.textContent = 'Start';
  startBtn.classList.remove('running');
  lapBtn.textContent = 'Lap';
}

function lap() {
  if (!running) return;
  const li = document.createElement('li');
  li.textContent = timeToString(elapsedTime);
  lapsList.prepend(li);
}

startBtn.addEventListener('click', () => {
  if (!running) {
    start();
  } else {
    stop();
  }
});

lapBtn.addEventListener('click', () => {
  if (running) {
    lap();
  } else {
    reset();
  }
});