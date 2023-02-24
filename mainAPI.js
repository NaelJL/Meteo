import {apiKey} from './apiKey.js';


// Alerte si la géolocalisation n'est pas activée
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(location => {
        const long = location.coords.longitude;
        const lat = location.coords.latitude;
        getWeatherData(long, lat)
    }, () => {
        alert("Vous avez refusé la géolocalisation, l'application ne peut fonctionner sans, veuillez l'activer.")
    })
}


// tableau des icones de météo
let imgArrayDay = [
  'images/cloud.png',
  'images/rain.png',
  'images/sun.png',
  'images/night.png',
  'images/rocket.png',
  'images/snow.png'
];
let imgArray = [
  'images/cloud-white.png',
  'images/rain-white.png',
  'images/sun-white.png',
  'images/night.png',
  'images/rocket.png',
  'images/snow-white.png'
];


// variables de la semaine
let plusOneTemp = document.querySelector("#plusOneTemp");
let plusTwoTemp = document.querySelector("#plusTwoTemp");
let plusThreeTemp = document.querySelector("#plusThreeTemp");
let plusForTemp = document.querySelector("#plusForTemp");
let plusFiveTemp = document.querySelector("#plusFiveTemp");
let plusOneImg = document.querySelector('#plusOneImg');
let plusTwoImg = document.querySelector('#plusTwoImg');
let plusThreeImg = document.querySelector('#plusThreeImg');
let plusForImg = document.querySelector('#plusForImg');
let plusFiveImg = document.querySelector('#plusFiveImg');
// variables du jour en cours
const currentBlocImg = document.querySelector('.current-bloc');
const temperature = document.querySelector('.main-temperature');
const mainWeather = document.querySelector('.main-weather');
const position = document.querySelector('.position');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');


// Aller chercher les infos de l'API
async function getWeatherData(long, lat){
  const results = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric&cnt=40&lang=fr`);

  const data = await results.json();
  
  console.log(data);

  mainInfo(data);
  mainPercents(data);
  weekInfo(data);
}


// Changer la date du jour en cours
let currentDay = document.querySelector(".current-day");
let currentDate = document.querySelector(".current-date");

const currentDayVar = new Date().toLocaleDateString("fr-FR", {weekday: "long"}).toUpperCase();
currentDay.innerHTML = `<span>${currentDayVar}</span>`;

const currentDateVar = new Date().toLocaleDateString("fr-FR", {day: "numeric", month: "long", year: "numeric"});
currentDate.innerHTML = currentDateVar;

// Changer la date des autres jours
let plusOne = document.getElementById('plusOne');
let plusTwo = document.getElementById('plusTwo');
let plusThree = document.getElementById('plusThree');
let plusFour = document.getElementById('plusFour');
let plusFive = document.getElementById('plusFive');
let plusSix = document.getElementById('plusSix');
let plusSeven = document.getElementById('plusSeven');
let tomorrow = new Date();

function plusDate (index) {
    tomorrow.setDate(tomorrow.getDate() + 1);
    let tomorrowString = tomorrow.toLocaleDateString("fr-FR", {weekday: "short", day: "numeric"});
    index.innerHTML = tomorrowString.toLowerCase();
}

plusDate(plusOne);
plusDate(plusTwo);
plusDate(plusThree);
plusDate(plusFour);
plusDate(plusFive);
plusDate(plusSix);
plusDate(plusSeven);


// fonction pour faciliter l'affichage de la température et de l'icone
function setWeatherInfo(element, elementImg, temperature, weatherDescription){
  element.innerHTML = `${Math.round(temperature)}°C`;

  switch(weatherDescription){
    case 'Clouds':
      elementImg.src = imgArray[0];
      break;
    case 'Rain':
      elementImg.src = imgArray[1];
      break;
    case 'Clear':
      elementImg.src = imgArray[2];
      break;
    case 'Snow':
      elementImg.src = imgArray[5];
      break;
    default:
      elementImg.src = imgArray[4];
      break;
  }
}

// afficher les infos du jour en cours
function mainInfo(data){
  temperature.innerHTML = `${Math.round(data.list[0].main.temp)}°C`;

  let weatherNiceDescription = data.list[0].weather[0].description;
  mainWeather.innerHTML = weatherNiceDescription;

  let mainPosition = data.city.name;
  position.innerHTML = mainPosition;

  switch(data.list[0].weather[0].main){
    case 'Clouds':
      currentBlocImg.style.backgroundImage = "url(images/clouds.gif)";
      break;
    case 'Rain':
      currentBlocImg.style.backgroundImage = "url(images/rain.gif)";
      break;
    case 'Clear':
      currentBlocImg.style.backgroundImage = "url(images/sun.gif)";
      break;
    case 'Snow':
      currentBlocImg.style.backgroundImage = "url(images/snow.gif)";
      break;
  }
}

// afficher les pourcentages pour le jour en cours
function mainPercents(data){
  let mainHumidity = data.list[0].main.humidity;
  humidity.innerHTML = `<span>Humidité :</span> ${mainHumidity}%`;

  let mainWindMeters = data.list[0].wind.speed;
  let mainWindKm = Math.round(mainWindMeters * 3.6);
  wind.innerHTML = `<span>Vent :</span> ${mainWindKm}km/h`;
}

// afficher les infos pour la semaine
function weekInfo(data){
  setWeatherInfo(plusOneTemp, plusOneImg, data.list[8].main.temp, data.list[8].weather[0].main);
  setWeatherInfo(plusTwoTemp, plusTwoImg, data.list[16].main.temp, data.list[16].weather[0].main);
  setWeatherInfo(plusThreeTemp, plusThreeImg, data.list[24].main.temp, data.list[24].weather[0].main);
  setWeatherInfo(plusForTemp, plusForImg, data.list[32].main.temp, data.list[32].weather[0].main);
  setWeatherInfo(plusFiveTemp, plusFiveImg, data.list[39].main.temp, data.list[39].weather[0].main);
}