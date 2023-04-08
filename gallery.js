var now = new Date();
var nowHour = now.getHours();
const body = document.body;
const buttons = document.querySelectorAll("a.button");
const navTitle = document.querySelector(".nav-title");
const filterSection = document.getElementById("filter-section");
const inputs = filterSection.getElementsByTagName("input");
const filterButton = filterSection.getElementsByTagName("button")[0];

const lightSwitchSounds = [
    "./assets/audio/light_switch_audio1.wav",
    "./assets/audio/light_switch_audio2.wav",
    "./assets/audio/light_switch_audio3.wav",
    "./assets/audio/light_switch_audio4.wav",
    "./assets/audio/light_switch_audio5.wav"];

if (nowHour >= 18 || nowHour < 8) {
    body.classList.toggle("dark-mode");
    navTitle.classList.toggle("dark-mode");
  
    buttons.forEach(button => {
      button.classList.toggle("dark-mode");
    });
    
    filterSection.classList.toggle("darkmode");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.toggle("darkmode");
    }

    filterButton.classList.toggle("darkmode");
}

function playRandomSound(soundArray) {
    var randomIndex = Math.floor(Math.random() * soundArray.length);
    var lightSwitchSound = new Audio(soundArray[randomIndex]);
    lightSwitchSound.play();
  }
  
function darkMode() {
    playRandomSound(lightSwitchSounds);

    body.classList.toggle("dark-mode");
    navTitle.classList.toggle("dark-mode");
  
    buttons.forEach(button => {
      button.classList.toggle("dark-mode");
    });
    
    filterSection.classList.toggle("darkmode");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.toggle("darkmode");
    }

    filterButton.classList.toggle("darkmode");
}