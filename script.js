const weatherForm = document.getElementById("weatherForm");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.getElementById("search").value;
  if (city) {
    try {
      getWeatherData(city);
    } catch (error) {
      console.log(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

function getWeatherData(city) {
  const apiKey = "8c9d13be08f9207fb89b1d62fe0775df";

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => displayWeatherData(data));

  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  fetch(forecastURL)
    .then((res) => res.json())
    .then((data) => displayHourlyForecast(data.list));
}

function displayHourlyForecast(data) {
  const hourlydata = data.slice(0, 8);
  const hourlyfocastContainer = document.getElementById("hourly-forcast");

  hourlydata.forEach((item) => {
    const date = new Date(item.dt_txt);
    const hour = date.getHours();
    const temp = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const forecastItem = document.createElement("div");

    forecastItem.innerHTML = `<div class="p-2 flex flex-col justify-center items-center gap-2">
    <p class=" font-semibold">${hour}:00</p>
    <img src="${iconURL}" alt="icon" class="w-12 h-12" />
    <p>${temp}°C</p>
    </div>`;

    hourlyfocastContainer.appendChild(forecastItem);
  });
}

function displayWeatherData(data) {
  const weatherDisplay = document.createElement("div");
  weatherDisplay.className =
    "max-w-[1440px] mt-6 bg-white shadow-lg rounded-lg";

  weatherDisplay.innerHTML = `<div class="p-8">
  <h1 class="text-2xl font-bold mt-2">${data.name}</h1>
  <p class="text-xl text-gray-800 font-semibold">${Math.round(
    data.main.temp - 273.15
  )}°C</p>
  <p class="capitalize mt-2">${data.weather[0].description}</p>
 <img src="https://openweathermap.org/img/wn/${
   data.weather[0].icon
 }@4x.png" alt="icon" class="max-auto w-[200px] h-[200px]"/>
</div>`;

  const card = document.getElementById("card");
  card.innerHTML = "";
  card.appendChild(weatherDisplay);
  document.getElementById("search").value = "";
}

function displayError(message) {
  const errorDisplay = document.createElement("div");
  errorDisplay.className = "text-red-500 text-center font-semibold text-2xl";

  errorDisplay.innerHTML = message;
  document.getElementById("card").appendChild(errorDisplay);
}
