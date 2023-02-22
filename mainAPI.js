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



// Aller chercher les infos de l'API
let apiKey = "6b4c12a10aea5dd6de38459c8cb1606a";

async function getWeatherData(long, lat){

  const results = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&lang=fr&appid=${apiKey}`);
  const data = await results.json()
  console.log(data);

  populateMainInfo(data)
  // handleDays(data.daily)
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
    tomorrowString = tomorrow.toLocaleDateString("fr-FR", {weekday: "long", day: "numeric"});
    plus.innerHTML = tomorrowString.toLowerCase();
}

plusDate(plusOne);
plusDate(plusTwo);
plusDate(plusThree);
plusDate(plusFour);
plusDate(plusFive);
plusDate(plusSix);
plusDate(plusSeven);



// tableau des images de météo associées
let imgArray = [
  'images/cloud.png',
  'images/rain.png',
  'images/sun.png',
  'images/night.png',
  'images/rocket.png'
];



// afficher les résultats de l'API
function populateMainInfo(data){
  let mainTemperatureK = data.main.temp;
  let mainTemperatureC = mainTemperatureK - 273.15;
  let mainTemperature = Math.round(mainTemperatureC);
  temperature.innerHTML = `${mainTemperature}°C`;

  let weatherDescription = data.weather[0].description;
  mainWeather.innerHTML = weatherDescription;

  if(weatherDescription === 'pluie'){
    image.src = imgArray[1];
  } else if(weatherDescription === 'couvert'){
    image.src = imgArray[0];
  } else if(weatherDescription === 'soleil'){
    image.src = imgArray[2];
  } else {
    image.src = imgArray[4];
  }

  let mainHumidity = data.main.humidity;
  humidity.innerHTML = `${mainHumidity}% d'humidité`;

  let mainPosition = data.name;
  position.innerHTML = mainPosition;
}
  


let daysName = document.querySelectorAll(".day-name")
let daysTemperature = document.querySelectorAll(".temperature")
let li = document.querySelectorAll('li');

function handleDays(data){
    li.forEach((day, index) => {
      
    })
}