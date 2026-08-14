const time = document.querySelector('.time');
const date = document.querySelector('.date');

setInterval(() => {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    time.textContent = `${hours}:${minutes}`
}, 1000);

setInterval(() => {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    date.textContent = `${day}.${month}.${year}`;
}, 1000);

const menu = document.querySelector('.menu');
const arrow = document.querySelector('.arrow');
arrow.addEventListener('click', () => {
    menu.classList.toggle("active");
    arrow.classList.toggle("active");
})


const timer = document.querySelector('.timer')
const openTimer = document.querySelector('.open-timer');
openTimer.addEventListener('click', () => {
    timer.classList.toggle("active")
});

const apps = document.querySelectorAll('.app');
const closeButtons = document.querySelectorAll('.close-app');

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        apps.forEach(app => {
            app.classList.remove('active');
        });
    });
});





const startTimerBtn = document.querySelector('.start-timer');
const timerControlWrap = document.querySelector('.timer-control-wrap');

const secondsInp = document.querySelector('.seconds-inp');
const minutesInp = document.querySelector('.minutes-inp');
const hoursInp = document.querySelector('.hours-inp');

startTimerBtn.addEventListener('click', () => {
    const secondsTimer = Number(secondsInp.value) || 0;
    const minutesTimer = Number(minutesInp.value) || 0;
    const hoursTimer = Number(hoursInp.value) || 0;

    const totalTime = secondsTimer + (minutesTimer * 60) + (hoursTimer * 3600);

    startTimer(totalTime);

    startTimerBtn.classList.toggle('active');
    timerControlWrap.classList.toggle('active');
});

let timerCounter = null;

const startTimer = (totalTime) => {
    timerCounter = setInterval(() => {
        totalTime -= 1;

        renderTimer(totalTime);

        if (totalTime <= 0) {
            clearInterval(timerCounter);
            startTimerBtn.classList.toggle('active')
        }
    }, 1000);
};

const renderTimer = (totalTime) => {
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const seconds = totalTime % 60;

    hoursInp.value = String(hours).padStart(2, '0');
    minutesInp.value = String(minutes).padStart(2, '0');
    secondsInp.value = String(seconds).padStart(2, '0');
};

const timerStop = document.querySelector('.timer-stop');
const timerPause = document.querySelector('.timer-pause');

timerStop.addEventListener('click', () => {
    clearInterval(timerCounter);
    startTimerBtn.classList.toggle('active');
    hoursInp.value = '';
    minutesInp.value = '';
    secondsInp.value = '';
    timerControlWrap.classList.toggle('active');
});

timerPause.addEventListener('click', () => {
    clearInterval(timerCounter);
    startTimerBtn.classList.toggle('active');
    timerControlWrap.classList.toggle('active');
});





const openStopwatch = document.querySelector('.open-stopwatch');
const stopwatch = document.querySelector('.stopwatch');

openStopwatch.addEventListener('click', () => {
    stopwatch.classList.toggle('active');
});

const stopwatchText = document.querySelector('.stopwatch-text');
const ssStopwatch = document.querySelector('.ss-stopwatch');
const clearStopwatch = document.querySelector('.clear-stopwatch');

let stopwatchStatus = false;
let stopwatchValue = 0;
let stopwatchTimer = null;
let startTime = 0;

ssStopwatch.addEventListener('click', () => {
    if (!stopwatchStatus) {
        startStopwatch();
    } else {
        stopStopwatch();
    }
});

const startStopwatch = () => {
    stopwatchStatus = true;
    startTime = Date.now() - stopwatchValue;

    ssStopwatch.textContent = 'stop';
    ssStopwatch.classList.add('active');

    stopwatchTimer = setInterval(() => {
        stopwatchValue = Date.now() - startTime;
        renderStopwatch();
    }, 10);
};

const stopStopwatch = () => {
    stopwatchStatus = false;

    clearInterval(stopwatchTimer);
    stopwatchTimer = null;

    ssStopwatch.textContent = 'start';
    ssStopwatch.classList.remove('active');
};

const renderStopwatch = () => {
    const minutes = Math.floor(stopwatchValue / 60000);
    const seconds = Math.floor((stopwatchValue % 60000) / 1000);
    const milliseconds = Math.floor((stopwatchValue % 1000) / 10);

    const minutesVal = String(minutes).padStart(2, '0');
    const secondsVal = String(seconds).padStart(2, '0');
    const millisecondsVal = String(milliseconds).padStart(2, '0');

    stopwatchText.textContent =
        `${minutesVal}:${secondsVal},${millisecondsVal}`;
};

clearStopwatch.addEventListener('click', () => {
    clearInterval(stopwatchTimer);

    stopwatchTimer = null;
    stopwatchStatus = false;
    stopwatchValue = 0;

    ssStopwatch.textContent = 'start';
    ssStopwatch.classList.remove('active');

    renderStopwatch();
});