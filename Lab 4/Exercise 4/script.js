let lastCity = null;
let lastResult = null;

function getWeather() {

    const city = document.getElementById("cityInput").value.trim();
    const spinner = document.getElementById("spinner");
    const resultDiv = document.getElementById("weatherResult");
    const errorDiv = document.getElementById("errorMsg");

    resultDiv.innerHTML = "";
    errorDiv.innerHTML = "";

    if (city === "") {
        errorDiv.innerHTML = "Please enter a city name.";
        return;
    }

    const cityLower = city.toLowerCase();

    // ✅ Cache check (case insensitive)
    if (cityLower === lastCity && lastResult !== null) {
        displayWeather(lastResult);
        return;
    }

    spinner.classList.remove("hidden");

    const apiKey = "3eb32e13ee866f5a1bc55ff778bb4931";
    const url = `https://home.openweathermap.org/api_keys`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function () {

        spinner.classList.add("hidden");

        const data = JSON.parse(xhr.responseText);

        if (xhr.status === 200 && parseInt(data.cod) === 200) {

            // ✅ Save to cache
            lastCity = cityLower;
            lastResult = data;

            displayWeather(data);

        } else {
            errorDiv.innerHTML = data.message || "Error fetching weather data.";
        }
    };

    xhr.onerror = function () {
        spinner.classList.add("hidden");
        errorDiv.innerHTML = "Network error. Please check connection.";
    };

    xhr.send();
}

function displayWeather(data) {

    const resultDiv = document.getElementById("weatherResult");

    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const condition = data.weather[0].description;

    resultDiv.innerHTML = `
        <h3>${data.name}</h3>
        <p>🌡 Temperature: ${temperature} °C</p>
        <p>💧 Humidity: ${humidity}%</p>
        <p>🌥 Condition: ${condition}</p>
    `;
}
