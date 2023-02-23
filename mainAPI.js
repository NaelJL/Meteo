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



// tableau des images de météo associées
let imgArray = [
  'images/cloud.png',
  'images/rain.png',
  'images/sun.png',
  'images/night.png',
  'images/rocket.png',
  'images/snow.png'
];



// variables des jours pour la température  
let daysName = document.querySelectorAll(".day-name");
let daysTemperature = document.querySelectorAll(".temperature");
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



// Aller chercher les infos de l'API
async function getWeatherData(long, lat){
  const results = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric&cnt=40&lang=fr`);

  const data = await results.json();
  
  console.log(data);

  mainInfo(data);
  weekInfo(data);
}



// aller chercher dans le document HTML
const image = document.querySelector('.main-weather-image');
const temperature = document.querySelector('.main-temperature');
const mainWeather = document.querySelector('.main-weather');
const humidity = document.querySelector('.humidity');
const position = document.querySelector('.position');

const imageNav = document.querySelectorAll('.weather-image');



// Changer le jour actuel
let currentDate = document.querySelector(".current-date");

const currentDay = new Date().toLocaleDateString("fr-FR", {weekday: "long", day: "numeric", month: "long"});
function currentDayDate (e) {
    currentDate.innerHTML = e.toUpperCase();
}
currentDayDate(currentDay);



// Changer les autres jours
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



// afficher les résultats de l'API pour la jour en cours
function mainInfo(data){
  let mainTemperature = Math.round(data.list[0].main.temp);
  temperature.innerHTML = `${mainTemperature}°C`;

  let weatherNiceDescription = data.list[0].weather[0].description;
  mainWeather.innerHTML = weatherNiceDescription;

  let weatherDescription = data.list[0].weather[0].main;
  if(weatherDescription === 'Rain'){
    image.src = imgArray[1];
  } else if(weatherDescription === 'Clouds'){
    image.src = imgArray[0];
  } else if(weatherDescription === 'Clear'){
    image.src = imgArray[2];
  } else if(weatherDescription === 'Snow'){
    image.src = imgArray[5];
  } else {
    image.src = imgArray[4];
  }

  let mainHumidity = data.list[3].main.humidity;
  humidity.innerHTML = `${mainHumidity}% d'humidité`;

  let mainPosition = data.city.name;
  position.innerHTML = mainPosition;
}
  


// afficher les résultats de l'API pour la semaine
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

function weekInfo(data){
  setWeatherInfo(plusOneTemp, plusOneImg, data.list[8].main.temp, data.list[8].weather[0].main);
  setWeatherInfo(plusTwoTemp, plusTwoImg, data.list[16].main.temp, data.list[16].weather[0].main);
  setWeatherInfo(plusThreeTemp, plusThreeImg, data.list[24].main.temp, data.list[24].weather[0].main);
  setWeatherInfo(plusForTemp, plusForImg, data.list[32].main.temp, data.list[32].weather[0].main);
  setWeatherInfo(plusFiveTemp, plusFiveImg, data.list[39].main.temp, data.list[39].weather[0].main);
}

// function weekInfo(data){
//   let plusOneTemperature = Math.round(data.list[8].main.temp);
//   plusOneTemp.innerHTML = `${plusOneTemperature}°C`;

//   let weatherDescriptionOne = data.list[8].weather[0].main;
//   if(weatherDescriptionOne === 'Rain'){
//     plusOneImg.src = imgArray[1];
//   } else if(weatherDescriptionOne === 'Clouds'){
//     plusOneImg.src = imgArray[0];
//   } else if(weatherDescriptionOne === 'Clear'){
//     plusOneImg.src = imgArray[2];
//   } else if(weatherDescriptionOne === 'Snow'){
//     plusOneImg.src = imgArray[5];
//   } else {
//     plusOneImg.src = imgArray[4];
//   }

//   let plusTwoTemperature = Math.round(data.list[16].main.temp);
//   plusTwoTemp.innerHTML = `${plusTwoTemperature}°C`;

//   let weatherDescriptionTwo = data.list[16].weather[0].main;
//   if(weatherDescriptionTwo === 'Rain'){
//     plusTwoImg.src = imgArray[1];
//   } else if(weatherDescriptionTwo === 'Clouds'){
//     plusTwoImg.src = imgArray[0];
//   } else if(weatherDescriptionTwo === 'Clear'){
//     plusTwoImg.src = imgArray[2];
//   } else if(weatherDescriptionTwo === 'Snow'){
//     plusTwoImg.src = imgArray[5];
//   } else {
//     plusTwoImg.src = imgArray[4];
//   }

//   let plusThreeTemperature = Math.round(data.list[24].main.temp);
//   plusThreeTemp.innerHTML = `${plusThreeTemperature}°C`;

//   let weatherDescriptionThree = data.list[24].weather[0].main;
//   if(weatherDescriptionThree === 'Rain'){
//     plusThreeImg.src = imgArray[1];
//   } else if(weatherDescriptionThree === 'Clouds'){
//     plusThreeImg.src = imgArray[0];
//   } else if(weatherDescriptionThree === 'Clear'){
//     plusThreeImg.src = imgArray[2];
//   } else if(weatherDescriptionThree === 'Snow'){
//     plusThreeImg.src = imgArray[5];
//   } else {
//     plusThreeImg.src = imgArray[4];
//   }

//   let plusForTemperature = Math.round(data.list[32].main.temp);
//   plusForTemp.innerHTML = `${plusForTemperature}°C`;

//   let weatherDescriptionFor = data.list[32].weather[0].main;
//   if(weatherDescriptionFor === 'Rain'){
//     plusForImg.src = imgArray[1];
//   } else if(weatherDescriptionFor === 'Clouds'){
//     plusForImg.src = imgArray[0];
//   } else if(weatherDescriptionFor === 'Clear'){
//     plusForImg.src = imgArray[2];
//   } else if(weatherDescriptionFor === 'Snow'){
//     plusForImg.src = imgArray[5];
//   } else {
//     plusForImg.src = imgArray[4];
//   }

//   let plusFiveTemperature = Math.round(data.list[39].main.temp);
//   plusFiveTemp.innerHTML = `${plusFiveTemperature}°C`;

//   let weatherDescriptionFive = data.list[39].weather[0].main;
//   if(weatherDescriptionFive === 'Rain'){
//     plusFiveImg.src = imgArray[1];
//   } else if(weatherDescriptionFive === 'Clouds'){
//     plusFiveImg.src = imgArray[0];
//   } else if(weatherDescriptionFive === 'Clear'){
//     plusFiveImg.src = imgArray[2];
//   } else if(weatherDescriptionFive === 'Snow'){
//     plusFiveImg.src = imgArray[5];
//   } else {
//     plusFiveImg.src = imgArray[4];
//   }
// }
