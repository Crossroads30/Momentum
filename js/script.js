//переменные:

//время и дата
const date = new Date();
const time = document.querySelector('.time');
const dayMonthYear = document.querySelector('.date');
let hours = date.getHours();
const options = { month: 'long', day: 'numeric' };
const daysRu = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
const daysEn = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sut'];
let currentDay = daysRu[date.getDay()];

//приветствие
const greet = document.querySelector('.greeting');
const userName = document.querySelector('.name');

//фоновые изображения
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
var randomNum;
var timeOfDay;
// var bgNum;

//погода
const weatherError = document.querySelector('.weather-error');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const realFeel = document.querySelector('.feel-like');
city.value = 'Минск';

//цитаты
const quotesText = document.querySelector('.quote');
const quoteButton = document.querySelector('.change-quote');
const author = document.querySelector('.author');
let langQuotes = 'data.json';

//плеер
let isPlay = false;
const playPrevy = document.querySelector('.play-prev');
const playNexty = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
let play = document.querySelector('.play');
let playNum = 0;

//settings
const settings = document.querySelector('.settings');
const settingsWindow = document.querySelector('.settings-window');
const playerBlock = document.querySelector('.player');
const playerOn = document.querySelector('.player-on');
const playerOff = document.querySelector('.player-off');
const weatherOn = document.querySelector('.weather-on');
const weatherOff = document.querySelector('.weather-off');
const weatherBlock = document.querySelector('.weather');
const quotesBlock = document.querySelector('.quotes');
const quotesOn = document.querySelector('.quotes-on');
const quotesOff = document.querySelector('.quotes-off');
const greetBlock = document.querySelector('.greeting-container');
const greetOn = document.querySelector('.greet-on');
const greetOff = document.querySelector('.greet-off');

//смена языка
const en = document.querySelector('.en');
const ru = document.querySelector('.ru');
let langDateTime = 'ru-RU';
let langWeather = 'lang=ru';
let feelsLike = 'Ощущается как:';
let windSpeed = 'Скорость ветра:';
let humid = 'Влажность:';
let morning = 'Доброе утро';
let day = 'Добрый день';
let evening = 'Добрый вечер';
let night = 'Доброй ночи';

//Функции:------------------------------------------------------

//функция времени:----------------------------------------------
function showTime() {
   const date = new Date();
   time.textContent = date.toLocaleTimeString(`${langDateTime}`);
   hours = date.getHours();
   showDate();
   // showGreeting();
   getTimeOfDay();
   setTimeout(showTime, 1000);
};
showTime();

//функция даты:-----------------------------------------------
function showDate() {
   return dayMonthYear.textContent = currentDay + ' ' + date.toLocaleDateString(`${langDateTime}`, options);
};
showDate();

//Функция приветствие:----------------------------------------
function getTimeOfDay() {
   if (hours >= 6 && hours < 12) {
      timeOfDay = 'morning';
      return greet.textContent = morning;
   } else if (hours >= 12 && hours < 18) {
      timeOfDay = 'afternoon';
      return greet.textContent = day;
   } else if (hours >= 18 && hours < 24) {
      timeOfDay = 'evening';
      return greet.textContent = evening
   } else if (hours >= 0 && hours < 6) {
      timeOfDay = 'night';
      return greet.textContent = night;
   };
   setTimeout(getTimeOfDay, 1000);
};
getTimeOfDay();

// var greetingText = `${getTimeOfDay()}`;
// function showGreeting(){
// return greet.textContent = greetingText
// };
// showGreeting();


//Функция для 'local storage':------------------------------------
//перезагрузка или закрытие 'beforeunload':
function setLocalStorage() {
   localStorage.setItem('name', userName.value);
   localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

//загрузка 'load':
function getLocalStorage() {
   if (localStorage.getItem('name')) {
      userName.value = localStorage.getItem('name');
      city.textContent = localStorage.getItem('city');
   };
   if (localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
   };
};
window.addEventListener('load', getLocalStorage);

//функции фонового изображений:-------------------------------
//Функция получение случайного числа
function getRandomNum(min, max,) {
   min = 1;
   max = 20;
   min = Math.ceil(min);
   max = Math.floor(max);
   randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
   return randomNum.toString().padStart(2, '0');
};
getRandomNum();

//Функция для получение случайного фонового изображения с задержкой перед загрузкой:
function setBg() {
   let bgNum = randomNum.toString().padStart(2, '0')
   const img = new Image();
   if (getTimeOfDay) {
      img.src = `https://raw.githubusercontent.com/Crossroads30/Momentum-assets/assets/images/${timeOfDay}/${bgNum}.jpg`
   };
   img.onload = () => {
      body.style.backgroundImage = `url('https://raw.githubusercontent.com/Crossroads30/Momentum-assets/assets/images/${timeOfDay}/${bgNum}.jpg')`;
   };
};
setBg();

//Функция слайдера:----------------------------------------------
function getSlideNext() {
   if (randomNum == 20) {
      randomNum = 0;
   };
   String(randomNum += 1);
   setBg();
};
slideNext.addEventListener('click', getSlideNext);

function getSlidePrev() {
   if (randomNum == 1) {
      randomNum = 21;
   };
   String(randomNum -= 1);
   setBg();
};
slidePrev.addEventListener('click', getSlidePrev);

//установка фонового изображения при загрузке приложения:--------  
body.style.backgroundImage = setBg();

//функция погоды:------------------------------------------------
async function getWeather() {
   try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&${langWeather}&appid=921df159f336bbdaf99d7f2ef654240e&units=metric`;
      const res = await fetch(url)
      const data = await res.json()
      city.textContent = `${city.value}`;
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.floor(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      realFeel.textContent = `${feelsLike} ${Math.floor(data.main.feels_like)}°C`;
      wind.textContent = `${windSpeed} ${Math.floor(data.wind.speed)} м/с`;
      humidity.textContent = `${humid} ${data.main.humidity}%`;
      weatherError.textContent = '';
   } catch (e) {
      if (e) {
         weatherError.textContent = 'City not found!';
         temperature.textContent = '';
         weatherDescription.textContent = '';
         realFeel.textContent = '';
         wind.textContent = '';
         humidity.textContent = '';
      };
   };
};
getWeather();

//изменения погоды по названию городу:
city.addEventListener('change', getWeather);

//функция цитат:---------------------------------------------
async function getQuotes() {
   const quotes = langQuotes;
   const res = await fetch(quotes);
   const data = await res.json();
   let max = 10;
   let min = 0;
   min = Math.ceil(min);
   max = Math.floor(max);
   let randomQuotes = Math.floor(Math.random() * (max - min + 1)) + min;
   quotesText.textContent = `"${data[randomQuotes].text}"`;
   author.textContent = `${data[randomQuotes].author}`;
};
getQuotes();

//обновления цитат при клике:
quoteButton.addEventListener('click', getQuotes);

//функция плеера:-----------------------------------------
const audio = new Audio();

//добавление плей листа в html:
import playList from './playList.js';
playList.forEach((el) => {
   const li = document.createElement('li');
   li.classList.add('play-item');
   li.classList.add('play-item:hover');
   li.classList.add('play-item::before');
   li.textContent = el.title;
   playListContainer.append(li);
});

//воспроизведение и пауза:
function playAudio() {
   const playElements = Array.from(playListContainer.children);
   audio.src = playList[playNum].src;
   audio.currentTime = 0;

   playElements.forEach((el, i) => {
      if (!isPlay && i === playNum) {
         el.classList.add('selected');
      } else {
         el.classList.remove('selected');
      };
   });

   if (!isPlay) {
      audio.play();
      isPlay = true;
   } else if (isPlay) {
      audio.pause();
      isPlay = false;
   };
};
play.addEventListener('click', playAudio,);

//autoplay:
audio.onended = function () {
   playNext();
};

//стили для кнопки плей на паузе:
function toggleBtn() {
   play.classList.toggle('pause');
};
play.addEventListener('click', toggleBtn);

//переключение треков:
function playNext() {
   if (isPlay && playNum == playList.length - 1) {
      playNum = 0;
      audio.src = playList[playNum].src;
      audio.play();
   } else if (isPlay && playNum != playList.length - 1) {
      playNum += 1;
      audio.src = playList[playNum].src;
      audio.play();
   };

   const playElements = Array.from(playListContainer.children);
   playElements.forEach((el, i) => {
      if (isPlay && i === playNum) {
         el.classList.add('selected');
      } else {
         el.classList.remove('selected');
      };
   });
};

playNexty.addEventListener('click', playNext);

function playPrev() {
   if (isPlay && playNum == 0) {
      playNum = playList.length - 1;
      audio.src = playList[playNum].src;
      audio.play();
   } else if (isPlay && playNum != 0) {
      playNum -= 1;
      audio.src = playList[playNum].src;
      audio.play();
   };

   const playElements = Array.from(playListContainer.children);
   playElements.forEach((el, i) => {
      if (isPlay && i === playNum) {
         el.classList.add('selected');
      } else {
         el.classList.remove('selected');
      };
   });
};
playPrev();
playPrevy.addEventListener('click', playPrev);

//настройки:--------------------------------------------------
settings.addEventListener('click', function (e) {
   settingsWindow.classList.toggle('settings-window-active');
   e.stopPropagation();
});

document.addEventListener('click', (e) => {
   const withinBoundaries = e.composedPath().includes(settingsWindow);
   if (!withinBoundaries) {
      settingsWindow.classList.remove('settings-window-active');
   };
});

//перевод:-------------------------------------------------------
en.addEventListener('click', function () {
   currentDay = daysEn[date.getDay()];
   langDateTime = 'en-EN';
   langWeather = 'lang=en';
   feelsLike = 'Real feel:';
   windSpeed = 'Wind:';
   humid = 'Humidity:';
   city.value = 'Minsk';
   morning = 'Good morning';
   day = 'Good day';
   evening = 'Good evening';
   night = 'Good night';
   langQuotes = 'eng_data.json';
   userName.placeholder = '[ Your name ]';
   city.placeholder = 'City';
   en.style.color = '#279a04';
   en.style.opacity = '1';
   ru.style.color = '#605e54';
   ru.style.opacity = '0.6';
   getTimeOfDay();
   getWeather();
   showTime();
   getQuotes();
});

ru.addEventListener('click', function () {
   currentDay = daysRu[date.getDay()];
   langDateTime = 'ru-RU';
   langWeather = 'lang=ru';
   feelsLike = 'Ощущается как:';
   windSpeed = 'Скорость ветра:';
   humid = 'Влажность:';
   city.value = 'Минск';
   morning = 'Доброе утро';
   day = 'Добрый день';
   evening = 'Добрый вечер';
   night = 'Доброй ночи';
   langQuotes = 'data.json';
   userName.placeholder = '[ Ваше имя ]';
   ru.style.color = '#279a04';
   en.style.color = '#605e54';
   en.style.opacity = '0.6';
   ru.style.opacity = '1';
   getWeather();
   showTime();
   getTimeOfDay();
   getQuotes();
});

//скрыть, показать блоки
playerOn.addEventListener('click', function () {
   playerBlock.style.visibility = 'visible';
   playerOn.style.color = '#279a04'
   playerOff.style.color = '#605e54'
   playerOff.style.opacity = '0.6';
   playerOn.style.opacity = '1';
});
playerOff.addEventListener('click', function () {
   playerBlock.style.visibility = 'hidden';
   playerOff.style.color = '#279a04';
   playerOff.style.opacity = '1';
   playerOn.style.color = '#605e54';
   playerOn.style.opacity = '0.6';
});

weatherOn.addEventListener('click', function () {
   weatherBlock.style.visibility = 'visible';
   weatherOn.style.color = '#279a04'
   weatherOff.style.color = '#605e54'
   weatherOff.style.opacity = '0.6';
   weatherOn.style.opacity = '1';
});
weatherOff.addEventListener('click', function () {
   weatherBlock.style.visibility = 'hidden';
   weatherOff.style.color = '#279a04';
   weatherOff.style.opacity = '1';
   weatherOn.style.color = '#605e54';
   weatherOn.style.opacity = '0.6';
});

quotesOn.addEventListener('click', function () {
   quotesBlock.style.visibility = 'visible';
   quotesOn.style.color = '#279a04'
   quotesOff.style.color = '#605e54'
   quotesOff.style.opacity = '0.6';
   quotesOn.style.opacity = '1';
});
quotesOff.addEventListener('click', function () {
   quotesBlock.style.visibility = 'hidden';
   quotesOff.style.color = '#279a04';
   quotesOff.style.opacity = '1';
   quotesOn.style.color = '#605e54';
   quotesOn.style.opacity = '0.6';
});

greetOn.addEventListener('click', function () {
   greetBlock.style.visibility = 'visible';
   greetOn.style.color = '#279a04'
   greetOff.style.color = '#605e54'
   greetOff.style.opacity = '0.6';
   greetOn.style.opacity = '1';
});
greetOff.addEventListener('click', function () {
   greetBlock.style.visibility = 'hidden';
   greetOff.style.color = '#279a04';
   greetOff.style.opacity = '1';
   greetOn.style.color = '#605e54';
   greetOn.style.opacity = '0.6';
});