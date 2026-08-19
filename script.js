navigator.getBattery().then(battery => {
    function update() {
        const percent = Math.round(battery.level * 100);

        document.querySelector(".battery").value = percent;
        document.querySelector(".batteryText").textContent = percent + "%";
    }

    update();
    battery.addEventListener("levelchange", update);
});


const clockSound = document.getElementById('clock-music');

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
            arrow.style.display = 'flex';
        });
    });
});

const openButtons = document.querySelectorAll('.open-btns');

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        apps.forEach(app => {
            arrow.style.display = 'none';
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
            startTimerBtn.classList.toggle('active');
            clockSound.play();
            secondsInp.value = '';
            minutesInp.value = '';
            hoursInp.value = '';
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


const alarmClock = document.querySelector('.alarmClock')
const openAlarmClock = document.querySelector('.open-alarm-clock');
openAlarmClock.addEventListener('click', () => {
    alarmClock.classList.toggle("active")
});

const alarmTime = document.querySelector('#alarm-time');
const setAlarmBtn = document.querySelector('#set-alarm');
const cancelAlarmBtn = document.querySelector('#cancel-alarm');
const alarmStatus = document.querySelector('#alarm-status');
const alarmSound = document.querySelector('#alarm-sound');

let alarm = null;

setAlarmBtn.addEventListener('click', () => {
    if (!alarmTime.value) {
        alarmStatus.textContent = 'Виберіть час';
        return;
    }

    alarm = alarmTime.value;

    alarmStatus.textContent = `Будильник встановлено на ${alarm}`;
});

cancelAlarmBtn.addEventListener('click', () => {
    alarm = null;

    alarmSound.pause();
    alarmSound.currentTime = 0;

    alarmStatus.textContent = 'Будильник скасовано';
});

setInterval(() => {
    if (!alarm) return;

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const currentTime = `${hours}:${minutes}`;

    if (currentTime === alarm) {
        alarmSound.play();

        alarmStatus.textContent = 'Час прокидатися!';

        alarm = null;
    }
}, 1000);


const weather = document.querySelector('.weather');
const openWeather = document.querySelector('.open-weather');
const weatherInp = document.querySelector('.city-inp');
const weatherBtn = document.querySelector('.search-city');
const weatherWrap = document.querySelector('.weather-wrap');

openWeather.addEventListener('click', () => {
    weather.classList.toggle('active');
});

const apiKey = '5ec584e7cf36ca20d779b522aa3500d3';
let cityName = '';

weatherBtn.addEventListener('click', () => {
    cityName = weatherInp.value.trim();

    if (!cityName) return;

    getCoordinates();
});

const getCoordinates = async () => {
    showLoader();

    try {
        const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${apiKey}`
        );

        const data = await res.json();

        if (!data.length) {
            showError('Місто не знайдено');
            return;
        }

        const { lat, lon } = data[0];

        getWeather(lat, lon);

    } catch (error) {
        showError('Помилка завантаження');
        console.error(error);
    }
};

const getWeather = async (lat, lon) => {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=uk&appid=${apiKey}`
        );

        const weatherData = await res.json();

        if (!res.ok) {
            showError('Не вдалося отримати погоду');
            return;
        }

        const iconCode = weatherData.weather[0].icon;

        const iconUrl =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        renderWeather(weatherData, iconUrl);

    } catch (error) {
        showError('Помилка завантаження погоди');
        console.error(error);
    }
};

const renderWeather = (weatherData, iconUrl) => {

    const sunrise = weatherData.sys.sunrise;
    const sunset = weatherData.sys.sunset;

    const sunriseDate = new Date(sunrise * 1000);

    const sunriseTime = sunriseDate.toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const sunsetDate = new Date(sunset * 1000);

    const sunsetTime = sunsetDate.toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit'
    });

    weatherWrap.innerHTML = `
        <h4 class="city-name">
            ${weatherData.name}
        </h4>

        <div class="weather-container">

            <img
                src="${iconUrl}"
                alt="${weatherData.weather[0].description}"
                class="weather-clouds-img"
            >

            <div class="weather-temp-wrap">

                <h3 class="weather-temp">
                    ${Math.round(weatherData.main.temp)}°
                </h3>

                <h4 class="weather-feel-temp">
                    Відчувається як
                    ${Math.round(weatherData.main.feels_like)}°
                </h4>

            </div>
        </div>
        <p class="weather-clouds">
                ${weatherData.weather[0].description}
            </p>

            <div class="weather-data-wrap">

                <div class="humidity-wrap">
                    <h5 class="weather-data-name">
                        Вологість
                    </h5>

                    <h4 class="weather-data">
                        ${weatherData.main.humidity}%
                    </h4>
                </div>

                <div class="wind-wrap">
                    <h5 class="weather-data-name">
                        Вітер
                    </h5>

                    <h4 class="weather-data">
                        ${weatherData.wind.speed} м/с
                    </h4>
                </div>

                <div class="pressure-wrap">
                    <h5 class="weather-data-name">
                        Тиск
                    </h5>

                    <h4 class="weather-data">
                        ${weatherData.main.pressure} гПа
                    </h4>
                </div>

            </div>

            <div class="sun-wrap">

                <h4>
                    Схід сонця: ${sunriseTime}
                </h4>

                <h4>
                    Захід сонця: ${sunsetTime}
                </h4>

            </div>
    `;
};

const showLoader = () => {

    weatherWrap.innerHTML = `
        <div class="weather-loader">
            <div class="loader"></div>
            <p>Завантаження...</p>
        </div>
    `;
};

const showError = (message) => {

    weatherWrap.innerHTML = `
        <div class="weather-error">
            ${message}
        </div>
    `;
};



const openCalculator = document.querySelector('.open-calculator');
const calculator = document.querySelector('.calculator');

openCalculator.addEventListener('click', () => {
    calculator.classList.toggle('active');
});



const calculatorScreen = document.querySelector('.calculator-screen');
const calculatorNumButtons = document.querySelectorAll('.calculator-number-btn');
const calculatorOpButtons = document.querySelectorAll('.calculator-operator-btn');
const calculatorClearBtn = document.querySelector('.calculator-clear-btn');
const calculatorEqualsBtn = document.querySelector('.calculator-equals-btn');

let calculatorNumArr = [];
let calculatorNum = 0;
let numA = null;
let numB = null;
let calculatorOp = null;

function calculate(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
    }
}

calculatorClearBtn.addEventListener('click', () => {
    numA = null;
    numB = null;
    calculatorNumArr = [];
    calculatorNum = 0;
    calculatorOp = null;
    calculatorScreen.textContent = calculatorNum;
})

calculatorNumButtons.forEach(calculatorButton => {
    calculatorButton.addEventListener('click', () => {
        calculatorNumArr.push(calculatorButton.textContent);
        calculatorNum = Number(calculatorNumArr.join(''));
        calculatorScreen.textContent = calculatorNum;
    });
});

calculatorOpButtons.forEach(calculatorButton => {
    calculatorButton.addEventListener('click', () => {
        const currentNum = calculatorNum;

        if (numA === null) {
            numA = currentNum;
        } else if (calculatorOp && calculatorNumArr.length > 0) {
            numB = currentNum;
            numA = calculate(numA, numB, calculatorOp);
            calculatorScreen.textContent = Math.round(parseFloat(numA) * 100) / 100;
        }

        calculatorOp = calculatorButton.textContent;
        calculatorNum = 0;
        calculatorNumArr = [];
    });
});

calculatorEqualsBtn.addEventListener('click', () => {
    if (calculatorOp === null || numA === null) return;
    numB = calculatorNum;

    if (calculatorOp === '/' && numB === 0) {
        calculatorScreen.textContent = 'Помилка';
        return;
    }

    numA = calculate(numA, numB, calculatorOp);
    calculatorScreen.textContent = Math.round(parseFloat(numA) * 100) / 100;
    calculatorOp = null;
    calculatorNum = numA;
    calculatorNumArr = [numA.toString()];
});