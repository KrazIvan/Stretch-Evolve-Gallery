var now = new Date();
var nowHour = now.getHours();
const body = document.body;
const buttons = document.querySelectorAll("a.button");
const navTitle = document.querySelector(".nav-title");
const filterSection = document.getElementById("filter-section");
const inputs = filterSection.getElementsByTagName("input");
const filterButton = filterSection.getElementsByTagName("button")[0];
document.addEventListener("DOMContentLoaded", function() {
    fetchProfiles();
  });

const lightSwitchSounds = [
    "./assets/audio/light_switch_audio1.wav",
    "./assets/audio/light_switch_audio2.wav",
    "./assets/audio/light_switch_audio3.wav",
    "./assets/audio/light_switch_audio4.wav",
    "./assets/audio/light_switch_audio5.wav"];


const profilesContainer = document.querySelector(".profiles-container");

function createProfileInfoDiv(label, value) {
  const div = document.createElement("div");
  div.classList.add("profile-info");
  div.textContent = `${label}: ${value}`;
  return div;
}

function createProfileCard(profile) {
  const profileCard = document.createElement("div");
  profileCard.classList.add("profile-card");

  const profileImage = document.createElement("img");
  profileImage.classList.add("profile-image");
  profileImage.src = profile.picture.large;

  const profileTextContainer = document.createElement("div");
  profileTextContainer.classList.add("profile-card-text-container");

  const name = `${profile.name.title} ${profile.name.first} ${profile.name.last}`;
  const nameDiv = createProfileInfoDiv("Name", name);
  const genderDiv = createProfileInfoDiv("Gender", profile.gender);
  const ageDiv = createProfileInfoDiv("Age", profile.dob.age);
  const dobDiv = createProfileInfoDiv("Date of Birth", profile.dob.date);
  const dorDiv = createProfileInfoDiv("Date registered", profile.registered.date);
  const streetDiv = createProfileInfoDiv("Street", profile.location.street.name);
  const postcodeDiv = createProfileInfoDiv("Postcode", profile.location.postcode);
  const stateDiv = createProfileInfoDiv("State", profile.location.state);
  const countryDiv = createProfileInfoDiv("Country", profile.location.country);
  const usernameDiv = createProfileInfoDiv("Username", profile.login.username);
  const passwordDiv = createProfileInfoDiv("Password", profile.login.password);
  const emailDiv = createProfileInfoDiv("Email", profile.email);
  const phoneDiv = createProfileInfoDiv("Phone", profile.phone);

  profileTextContainer.appendChild(nameDiv);
  profileTextContainer.appendChild(genderDiv);
  profileTextContainer.appendChild(ageDiv);
  profileTextContainer.appendChild(dobDiv);
  profileTextContainer.appendChild(dorDiv);
  profileTextContainer.appendChild(streetDiv);
  profileTextContainer.appendChild(postcodeDiv);
  profileTextContainer.appendChild(stateDiv);
  profileTextContainer.appendChild(countryDiv);
  profileTextContainer.appendChild(usernameDiv);
  profileTextContainer.appendChild(passwordDiv);
  profileTextContainer.appendChild(emailDiv);
  profileTextContainer.appendChild(phoneDiv);

  profileCard.appendChild(profileImage);
  profileCard.appendChild(profileTextContainer);

  return profileCard;
}

function displayProfiles(data) {
  data.results.forEach(profile => {
    const profileCard = createProfileCard(profile);
    profilesContainer.appendChild(profileCard);
  });
}

function fetchProfiles() {
  fetch("https://randomuser.me/api/?results=50")
    .then(response => response.json())
    .then(data => {
      displayProfiles(data);
    })
    .catch(error => console.error(error));
}

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