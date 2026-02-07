const API_KEY = "4c975ae4146e1346ca92ca94c54c8287";

const cityInput = document.getElementById("cityInput");
const button = document.getElementById("getWeatherBtn");
const result = document.getElementById("weatherResult");

button.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        result.textContent = "Please enter a city name.";
        return;
    }

    fetchWeather(city);
});

function fetchWeather(city) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    )
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                result.textContent = "City not found.";
                return;
            }

            const weather = {
                city: data.name,
                temperature: data.main.temp,
                humidity: data.main.humidity,
                condition: data.weather[0].description
            };

            result.innerHTML = `
                <strong>City:</strong> ${weather.city}<br>
                <strong>Temperature:</strong> ${weather.temperature} °C<br>
                <strong>Humidity:</strong> ${weather.humidity}%<br>
                <strong>Condition:</strong> ${weather.condition}
            `;
        })
        .catch(() => {
            result.textContent = "Network error. Try again later.";
        });
}
