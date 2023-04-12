var now = new Date();
var nowHour = now.getHours();
const body = document.body;
const buttons = document.querySelectorAll("a.button");
const navTitle = document.querySelector(".nav-title");
const filterSection = document.getElementById("filter-section");
const importSection = document.getElementById("import-section");
const apiInputs = importSection.querySelectorAll("input");
const inputs = filterSection.getElementsByTagName("input");
const selects = filterSection.getElementsByTagName("select");
const filterButton = filterSection.getElementsByTagName("button")[0];
var onPhone = /Mobi/.test(navigator.userAgent);

document.addEventListener("DOMContentLoaded", function() {
    fetchProfiles(num_profiles=50);
  });

if (onPhone) {
    document.getElementById("DOB-input").removeAttribute("onfocus");
    document.getElementById("DOB-input").removeAttribute("onblur");
    document.getElementById("DOR-input").removeAttribute("onfocus");
    document.getElementById("DOR-input").removeAttribute("onblur");
  } 

const lightSwitchSounds = [
    "./assets/audio/light_switch_audio1.wav",
    "./assets/audio/light_switch_audio2.wav",
    "./assets/audio/light_switch_audio3.wav",
    "./assets/audio/light_switch_audio4.wav",
    "./assets/audio/light_switch_audio5.wav"];



// Profile code
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
  const genderDiv = createProfileInfoDiv("Gender", profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1));
  const ageDiv = createProfileInfoDiv("Age", profile.dob.age);
  const dobDiv = createProfileInfoDiv("Date of Birth", profile.dob.date.substr(0, 10));
  const dorDiv = createProfileInfoDiv("Date registered", profile.registered.date.substr(0, 10));
  const streetDiv = createProfileInfoDiv("Street", profile.location.street.name);
  const postcodeDiv = createProfileInfoDiv("Postcode", profile.location.postcode);
  const cityDiv = createProfileInfoDiv("City", profile.location.city);
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
  profileTextContainer.appendChild(cityDiv);
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

function fetchProfiles(num_profiles) {
  fetch(("https://randomuser.me/api/?results=" + num_profiles))
    .then(response => response.json())
    .then(data => {
      displayProfiles(data);
    })
    .catch(error => console.error(error));
}

function removeAllProfiles() {
  const profileCards = document.querySelectorAll(".profile-card");
  profileCards.forEach(card => {card.remove()})
}


// Filter code
function removeFilters() {
  document.querySelector("#first-name-input").value = "";
  document.querySelector("#last-name-input").value = "";
  document.querySelector("#gender-input").value = "all";
  document.querySelector("#age-input").value = "";
  document.querySelector("#DOB-input").value = "";
  document.querySelector("#DOR-input").value = "";
  document.querySelector("#street-input").value = "";
  document.querySelector("#postal-input").value = "";
  document.querySelector("#city-input").value = "";
  document.querySelector("#state-input").value = "";
  document.querySelector("#country-input").value = "";
  document.querySelector("#username-input").value = "";
  document.querySelector("#email-input").value = "";
}

function applyFilters() {
  const firstNameInput = document.querySelector("#first-name-input").value.trim().toLowerCase();
  const lastNameInput = document.querySelector("#last-name-input").value.trim().toLowerCase();
  const genderInput = document.querySelector("#gender-input").value.trim().toLowerCase();
  const ageInput = document.querySelector("#age-input").value;
  const dobInput = document.querySelector("#DOB-input").value;
  const dorInput = document.querySelector("#DOR-input").value;
  const streetInput = document.querySelector("#street-input").value.trim().toLowerCase();
  const postalInput = document.querySelector("#postal-input").value.trim().toLowerCase();
  const cityInput = document.querySelector("#city-input").value.trim().toLowerCase();
  const stateInput = document.querySelector("#state-input").value.trim().toLowerCase();
  let countryInput = document.querySelector("#country-input").value.trim().toLowerCase();
  const usernameInput = document.querySelector("#username-input").value.trim().toLowerCase();
  const emailInput = document.querySelector("#email-input").value.trim().toLowerCase();

  const profileCards = document.querySelectorAll(".profile-card");

  profileCards.forEach(card => {
    const name = card.querySelector(".profile-info:nth-child(1)").textContent.toLowerCase().split(": ")[1].trim();
    const gender = card.querySelector(".profile-info:nth-child(2)").textContent.toLowerCase().split(": ")[1].trim();
    const age = card.querySelector(".profile-info:nth-child(3)").textContent.split(": ")[1];
    const dob = card.querySelector(".profile-info:nth-child(4)").textContent.split(": ")[1];
    const dor = card.querySelector(".profile-info:nth-child(5)").textContent.split(": ")[1];
    const street = card.querySelector(".profile-info:nth-child(6)").textContent.toLowerCase().split(": ")[1].trim();
    const postal = card.querySelector(".profile-info:nth-child(7)").textContent.toLowerCase().split(": ")[1].trim();
    const city = card.querySelector(".profile-info:nth-child(8)").textContent.toLowerCase().split(": ")[1].trim();
    const state = card.querySelector(".profile-info:nth-child(9)").textContent.toLowerCase().split(": ")[1].trim();
    const country = card.querySelector(".profile-info:nth-child(10)").textContent.toLowerCase().split(": ")[1].trim();
    const username = card.querySelector(".profile-info:nth-child(11)").textContent.toLowerCase().split(": ")[1].trim();
    const email = card.querySelector(".profile-info:nth-child(13)").textContent.toLowerCase().split(": ")[1].trim();

    if (countryInput == "us" || countryInput == "usa") {
      countryInput = "united states";
    } else if (countryInput == "uk" || countryInput == "gb" || countryInput == "great britain") {
      countryInput = "united kingdom";
    } else if (countryInput == "uae") {
      countryInput = "united arab emirates";
    }
  
    if (!name.includes(firstNameInput)
        || !name.includes(lastNameInput)
        || (genderInput !== "all" && gender !== genderInput)
        || (ageInput !== "" && age !== ageInput)
        || (dobInput !== "" && dob !== dobInput)
        || (dorInput !== "" && dor !== dorInput)
        || !street.includes(streetInput)
        || !postal.includes(postalInput)
        || !city.includes(cityInput)
        || !state.includes(stateInput)
        || !country.includes(countryInput)
        || !username.includes(usernameInput)
        || !email.includes(emailInput)) {
      card.remove();
    }
  });
}

function formatDate(input) {
  let date = new Date(input.value);
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  input.value = year + "-" + month + "-" + day;
}


// Dark Mode code
if (nowHour >= 18 || nowHour < 8) {
  toggleDarkMode();
}

function playRandomSound(soundArray) {
    let randomIndex = Math.floor(Math.random() * soundArray.length);
    let lightSwitchSound = new Audio(soundArray[randomIndex]);
    lightSwitchSound.play();
  }
  
function darkMode() {
    playRandomSound(lightSwitchSounds);
    toggleDarkMode();
}

function toggleDarkMode() {
  body.classList.toggle("dark-mode");
  navTitle.classList.toggle("dark-mode");
  importSection.classList.toggle("dark-mode");

  buttons.forEach(button => {
    button.classList.toggle("dark-mode");
  });
  
  filterSection.classList.toggle("dark-mode");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.toggle("dark-mode");
  }
  filterSection.classList.toggle("dark-mode");
  for (let i = 0; i < selects.length; i++) {
    selects[i].classList.toggle("dark-mode");
  }
  apiInputs.forEach(input => {
    input.classList.toggle("dark-mode");
  });
  //filterButton.classList.toggle("dark-mode");
}


// Data Import code

function sendData() {
  const apiUrl = document.getElementById("api-url").value;
  const apiKey = document.getElementById("api-key").value;
  const profileCards = document.querySelectorAll(".profile-card-text-container");

  const data = [];

  profileCards.forEach((card) => {
    const name = card.querySelector(".profile-info:nth-child(1)").textContent.replace("Name: ", "");
    const gender = card.querySelector(".profile-info:nth-child(2)").textContent.replace("Gender: ", "");
    const age = card.querySelector(".profile-info:nth-child(3)").textContent.replace("Age: ", "");
    const dateOfBirth = card.querySelector(".profile-info:nth-child(4)").textContent.replace("Date of Birth: ", "");
    const dateRegistered = card.querySelector(".profile-info:nth-child(5)").textContent.replace("Date registered: ", "");
    const street = card.querySelector(".profile-info:nth-child(6)").textContent.replace("Street: ", "");
    const postcode = card.querySelector(".profile-info:nth-child(7)").textContent.replace("Postcode: ", "");
    const city = card.querySelector(".profile-info:nth-child(8)").textContent.replace("City: ", "");
    const state = card.querySelector(".profile-info:nth-child(9)").textContent.replace("State: ", "");
    const country = card.querySelector(".profile-info:nth-child(10)").textContent.replace("Country: ", "");
    const username = card.querySelector(".profile-info:nth-child(11)").textContent.replace("Username: ", "");
    const password = card.querySelector(".profile-info:nth-child(12)").textContent.replace("Password: ", "");
    const email = card.querySelector(".profile-info:nth-child(13)").textContent.replace("Email: ", "");
    const phone = card.querySelector(".profile-info:nth-child(14)").textContent.replace("Phone: ", "");

    data.push({
      name,
      gender,
      age,
      dateOfBirth,
      dateRegistered,
      street,
      postcode,
      city,
      state,
      country,
      username,
      password,
      email,
      phone
    });
  });
  
  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    }
  })
    .then(response => response.json())
    .then(result => {
      console.log("Success:", result);
    })
    .catch(error => {
      console.error("Error:", error);
    });
}