const apiKey = "a5a42eef640dc2cf5a0e8a6451da7ea5";
var pastSearches = [];
var count = 0;

function currentForecast() {
  var cityName = document.querySelector(".cityEntry");
  if (!cityName.value) {
    // Display an error message or handle the case when the city name is not provided
    return;
  }

  var requestURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName.value +
    "&units=imperial&appid=" +
    apiKey;

  fetch(requestURL)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(function (data) {
      var forecastData = data.list;

      // Display current forecast
      var currentWeather = forecastData[0].weather[0];
      document.getElementById("city").textContent = cityName.value;
      document.getElementById("temperature").textContent = forecastData[0].main.temp;
      document.getElementById("wind").textContent = forecastData[0].wind.speed;
      document.getElementById("humidity").textContent = forecastData[0].main.humidity;

      // Display current weather image
      var currentWeatherImage = document.getElementById("currentWeatherImage");
      currentWeatherImage.innerHTML = ""; // Clear previous image
      var currentWeatherIcon = document.createElement("img");
      currentWeatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + currentWeather.icon + ".png");
      currentWeatherImage.appendChild(currentWeatherIcon);

      // Display 5-day forecast
      var forecastSection = document.getElementById("forecastBoxes");
      forecastSection.innerHTML = ""; // Clear previous forecast boxes

      var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      for (var i = 0; i < 5; i++) {
        var forecastBox = document.createElement("div");
        forecastBox.classList.add("forecastBox");

        var date = new Date(forecastData[i * 8].dt_txt);
        var day = days[date.getDay()];
        var dateText = day + ", " + date.toLocaleDateString();
        var daySpan = document.createElement("span");
        daySpan.classList.add("day");
        daySpan.textContent = dateText;
        forecastBox.appendChild(daySpan);

        var iconImg = document.createElement("img");
        iconImg.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastData[i * 8].weather[0].icon + ".png");
        forecastBox.appendChild(iconImg);

        var infoContainer = document.createElement("div");
        infoContainer.classList.add("infoContainer");

        var tempSpan = document.createElement("span");
        tempSpan.classList.add("temperature");
        tempSpan.textContent = "Temperature: " + forecastData[i * 8].main.temp;
        infoContainer.appendChild(tempSpan);

        var windSpan = document.createElement("span");
        windSpan.classList.add("wind");
        windSpan.textContent = "Wind: " + forecastData[i * 8].wind.speed;
        infoContainer.appendChild(windSpan);

        var humiditySpan = document.createElement("span");
        humiditySpan.classList.add("humidity");
        humiditySpan.textContent = "Humidity: " + forecastData[i * 8].main.humidity;
        infoContainer.appendChild(humiditySpan);

        forecastBox.appendChild(infoContainer);

        forecastSection.appendChild(forecastBox);
      }
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}

function write() {
  count++;
  var cityName = document.querySelector(".cityEntry");
  if (count > 1) {
    var entryList = document.getElementById("entryList");
    var entryButton = document.createElement("button");
    entryButton.textContent = cityName.value;
    entryButton.addEventListener("click", function () {
      cityName.value = entryButton.textContent;
      currentForecast();
    });
    entryList.appendChild(entryButton);
  }
}

document.getElementById("form").addEventListener("submit", write);
document.getElementById("form").addEventListener("submit", currentForecast);

