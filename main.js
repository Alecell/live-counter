const HOURS_IN_MILLISECONDS = 3_600_000;
const MINUTES_IN_MILLISECONDS = 60_000;
const SECONDS_IN_MILLISECONDS = 1_000;
const MINUTES_IN_AN_HOUR = 60;
const SECONDS_IN_A_MINUTE = 60;

let timer = -1;

window.onload = function() {
  const element = document.querySelector('.timer');
  const queryParams = getURLParams();

  const mode = queryParams.mode;
  const hours = getHourMilliseconds(queryParams.hours);
  const minutes = getMinuteMilliseconds(queryParams.minutes);
  const seconds = getSecondMilliseconds(queryParams.seconds);

  const initialTime = Date.now();
  const totalTime = hours + minutes + seconds;
  const finalTime = Date.now() + totalTime;

  timer = setInterval(() => updateTimer(element, mode, initialTime, finalTime), 1000);
}

function updateTimer(element, mode, initialTime, finalTime) {
  if (mode === 'down') {
    const currentTime = finalTime - Date.now();

    if (currentTime > 0) {
      element.innerText = millisecondsToTime(currentTime);
    } 

    if (currentTime <= 0) clearInterval(timer);
  } 

  if (mode === 'up') {
    const currentTime = Date.now() - initialTime;
    const rangeTime = finalTime - initialTime;

    if (currentTime <= rangeTime) {
      element.innerText = millisecondsToTime(currentTime);
    } 

    if (currentTime > rangeTime) clearInterval(timer);
  }
}

function getURLParams() {
  return new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
}

function getHourMilliseconds(hours) {
  return hours * HOURS_IN_MILLISECONDS;
}

function getMinuteMilliseconds(minutes) {
  const number = Number(minutes);
  if (isNaN(number) || number >= MINUTES_IN_AN_HOUR) return false;
  return minutes * MINUTES_IN_MILLISECONDS;
}

function getSecondMilliseconds(seconds) {
  const number = Number(seconds);
  if (isNaN(number) || number >= SECONDS_IN_A_MINUTE) return false;
  return seconds * SECONDS_IN_MILLISECONDS;
}

function millisecondsToTime(currentTime) {
  let seconds = Math.floor(currentTime / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds,
  )}`;
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}
