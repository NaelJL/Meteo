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



// Changer la température aléatoirement
let tempArray = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 60, 100];
const temp = document.querySelector('.main-temperature');
let varRandomTemp = 0;
function randomTemp () {
    let random = Math.floor(Math.random() * tempArray.length);
    varRandomTemp = tempArray[random];
    temp.innerHTML = `${varRandomTemp}°C`;
};
randomTemp();


// Changer l'image en fonction de la température
let imgArray = [
    'images/cloud.png',
    'images/rain.png',
    'images/sun.png',
    'images/night.png',
    'images/rocket.png'
];
const image = document.querySelector('.main-weather-image');
function showImage () {
    if (varRandomTemp <= 10) {
        image.src = imgArray[1];
    } else if (varRandomTemp > 10 && varRandomTemp <= 20) {
        image.src = imgArray[0];
    } else if (varRandomTemp > 20 && varRandomTemp < 45) {
        image.src = imgArray[2];
    } else if (varRandomTemp === 100) {
        image.src = imgArray[4];
    } else {
        image.src = imgArray[3];
    }
};
showImage();


// Changer le jour actuel
let currentDate = document.querySelector(".current-date");
const currentDay = new Date().toLocaleDateString("fr-FR", {weekday: "long", day: "numeric", month: "long"});
function currentDayDate (e) {
    currentDate.innerHTML = e.toUpperCase();
}
currentDayDate(currentDay);


// Changer les autres jours
let plusOne = document.querySelector('.plusOne');
let plusTwo = document.querySelector('.plusTwo');
let plusThree = document.querySelector('.plusThree');
let plusFour = document.querySelector('.plusFour');
let plusFive = document.querySelector('.plusFive');
let plusSix = document.querySelector('.plusSix');
let plusSeven = document.querySelector('.plusSeven');
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


// Changer la température aléatoirement pour chaque class
const tempNav = document.querySelectorAll('.temperature');
let varRandomTempNav = 0;
tempNav.forEach((element) => {
    let randomNav = Math.floor(Math.random() * tempArray.length);
    varRandomTempNav = tempArray[randomNav];
    element.innerHTML = `${varRandomTempNav}°C`;
});


// Changer l'image aléatoirement pour chaque class
const imageNav = document.querySelectorAll('.weather-image');
imageNav.forEach ((element) => {
    let randomImageNav = Math.floor(Math.random() * imgArray.length);
    element.src = imgArray[randomImageNav];
})
