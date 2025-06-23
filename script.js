const apiKey = '37f058a52c2af6df1e80e73ab15fa9e0'; // Ganti dengan kunci API OpenWeatherMap Anda
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const cityNameElement = document.getElementById('city-name');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        alert('Mohon masukkan nama kota!');
    }
});

async function getWeatherData(city) {
    try {
        // Menggunakan fetch untuk mengambil data dari OpenWeatherMap API
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        // Memeriksa apakah respons sukses (status code 200)
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Kota tidak ditemukan. Mohon cek kembali nama kota.');
            } else {
                throw new Error(`Terjadi kesalahan: ${response.statusText}`);
            }
        }

        const data = await response.json();
        displayWeatherData(data);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert(error.message); // Menampilkan pesan error ke pengguna
        clearWeatherData();
    }
}

function displayWeatherData(data) {
    cityNameElement.textContent = data.name;
    temperatureElement.textContent = `Suhu: ${data.main.temp}°C`;
    descriptionElement.textContent = `Cuaca: ${data.weather[0].description}`;
    humidityElement.textContent = `Kelembaban: ${data.main.humidity}%`;
    windSpeedElement.textContent = `Kecepatan Angin: ${data.wind.speed} m/s`;
}

function clearWeatherData() {
    cityNameElement.textContent = '';
    temperatureElement.textContent = '';
    descriptionElement.textContent = '';
    humidityElement.textContent = '';
    windSpeedElement.textContent = '';
}