type WeatherData = {
    city: string;
    temperature: number;
    humidity: number;
    condition: string;
};

type WeatherResult = WeatherData | string;

function displayWeather(data: WeatherResult): void {
    const result = document.getElementById("weatherResult") as HTMLDivElement;

    if (typeof data === "string") {
        result.textContent = data;
    } else {
        result.innerHTML = `
            <strong>City:</strong> ${data.city}<br>
            <strong>Temperature:</strong> ${data.temperature} °C<br>
            <strong>Humidity:</strong> ${data.humidity}%<br>
            <strong>Condition:</strong> ${data.condition}
        `;
    }
}
