// Alerte si la géolocalisation n'est pas activée
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(location => {
        const long = location.coords.longitude;
        const lat = location.coords.latitude;
    }, () => {
        alert("Vous avez refusé la géolocalisation, l'application ne peut fonctionner sans, veuillez l'activer.")
    })
}

// HEADER --------------------------------------------------------------------

// CHANGER LA TEMPERATURE ALEATOIREMENT
// tableau de températures
let tempArray = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 60, 100];
// aller chercher la variable de la température à modifier
const temp = document.querySelector('.main-temperature');
// créer la variable qui contiendra l'index aléatoire
let varRandomTemp = 0;
// créer la fonction qui appelle un index alétoire et l'affiche
function randomTemp () {
    // créer la variable qui choisira un index aléatoire
    let random = Math.floor(Math.random() * tempArray.length);
    // modifier la variable
    varRandomTemp = tempArray[random];
    // l'afficher dans la case
    temp.innerHTML = `${varRandomTemp}°C`;
};
// appeler la fonction
randomTemp();


// CHANGER L'IMAGE EN FONCTION DE LA TEMPERATURE
// tableau d'images
let imgArray = [
    'images/cloud.png',
    'images/rain.png',
    'images/sun.png',
    'images/night.png',
    'images/rocket.png'
];
// aller chercher la variable de l'image à modifier
const image = document.querySelector('.main-weather-image');
// créer la fonction qui affiche l'image sous conditions
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
// appeler la fonction
showImage();


// CHANGER LE JOUR AUTOMATIQUEMENT
// quel jour sommes-nous
const currentDay = new Date().toLocaleDateString("fr-FR", {weekday: "long"})
// aller chercher la variable du jour à modifier
const currentDate = document.querySelector(".current-date");
// créer la fonction qui modifie la valeur du jour en cours
function currentDayDate (e) {
    currentDate.innerHTML = e.toUpperCase();
}
// appeler cette fonction
currentDayDate(currentDay);


// NAV ------------------------------------------------------------------------

// CHANGER LA TEMPERATURE ALEATOIREMENT POUR CHAQUE CLASS
// tableau de température récupéré
// aller chercher les variables de température à modifier => renvoit un tableau
const tempNav = document.querySelectorAll('.temperature');
// créer la variable qui contiendra l'index aléatoire
let varRandomTempNav = 0;
// parcourir le tableau de class pour appliquer la variable modifiée
tempNav.forEach((element) => {
    // créer un nombre aléatoire
    let randomNav = Math.floor(Math.random() * tempArray.length);
    // modifier la variable en lui appliquant l'index issu du nombre aléatoire
    varRandomTempNav = tempArray[randomNav];
    // modifier le DOM en affichant la variable
    element.innerHTML = `${varRandomTempNav}°C`;
});


// MODIFER L'IMAGE ALEATOIREMENT
// tableau des images récupéré
// aller chercher les variables de l'image à modifier
const imageNav = document.querySelectorAll('.weather-image');
// pour chaque élément du tableau de class
imageNav.forEach ((element) => {
    // on attribue un nombre aléatoire en fonction du tableau d'images
    let randomImageNav = Math.floor(Math.random() * imgArray.length);
    // on change l'image aléatoirement
    element.src = imgArray[randomImageNav];
})
