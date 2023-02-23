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
let imgArray = [
  'images/cloud.png',
  'images/rain.png',
  'images/sun.png',
  'images/night.png',
  'images/rocket.png',
  'images/snow.png'
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
const image = document.querySelector('.main-weather-image');
const temperature = document.querySelector('.main-temperature');
const mainWeather = document.querySelector('.main-weather');
const humidity = document.querySelector('.humidity');
const position = document.querySelector('.position');


// Aller chercher les infos de l'API
async function getWeatherData(long, lat){
  const results = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric&cnt=40&lang=fr`);

  const data = await results.json();
  
  console.log(data);

  mainInfo(data);
  weekInfo(data);
}


// Changer la date du jour en cours
let currentDate = document.querySelector(".current-date");

const currentDay = new Date().toLocaleDateString("fr-FR", {weekday: "long", day: "numeric", month: "long"});
function currentDayDate (e) {
    currentDate.innerHTML = e.toUpperCase();
}
currentDayDate(currentDay);

// Changer la date des autres jours
let plusOne = document.getElementById('plusOne');
let plusTwo = document.getElementById('plusTwo');
let plusThree = document.getElementById('plusThree');
let plusFour = document.getElementById('plusFour');
let plusFive = document.getElementById('plusFive');
let plusSix = document.getElementById('plusSix');
let plusSeven = document.getElementById('plusSeven');
let tomorrow = new Date();

function plusDate (plus) {
    tomorrow.setDate(tomorrow.getDate() + 1);
    let tomorrowString = tomorrow.toLocaleDateString("fr-FR", {weekday: "long", day: "numeric"});
    plus.innerHTML = tomorrowString.toLowerCase();
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
  setWeatherInfo(temperature, image, data.list[0].main.temp, data.list[0].weather[0].main)

  let weatherNiceDescription = data.list[0].weather[0].description;
  mainWeather.innerHTML = weatherNiceDescription;

  let mainHumidity = data.list[3].main.humidity;
  humidity.innerHTML = `${mainHumidity}% d'humidité`;

  let mainPosition = data.city.name;
  position.innerHTML = mainPosition;
}

// afficher les infos pour la semaine
function weekInfo(data){
  setWeatherInfo(plusOneTemp, plusOneImg, data.list[8].main.temp, data.list[8].weather[0].main);
  setWeatherInfo(plusTwoTemp, plusTwoImg, data.list[16].main.temp, data.list[16].weather[0].main);
  setWeatherInfo(plusThreeTemp, plusThreeImg, data.list[24].main.temp, data.list[24].weather[0].main);
  setWeatherInfo(plusForTemp, plusForImg, data.list[32].main.temp, data.list[32].weather[0].main);
  setWeatherInfo(plusFiveTemp, plusFiveImg, data.list[39].main.temp, data.list[39].weather[0].main);
}