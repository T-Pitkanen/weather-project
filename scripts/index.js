const timeEl = document.querySelector('#time');
const dateEl = document.querySelector('#date');
const tempEl = document.querySelector('#temp');
const APIkey = '6974a09c36ef8aaabfc009e4231a867d';
const cardsEl = document.querySelector('#weather-cards');
const currentWeather = document.querySelector('.today-weather');

let cityEl = document.querySelector('#city');
let weatherIcon = document.querySelector('.weather-icon');
let highlightEl = document.querySelector('.highlight-container');
let descEl = document.querySelector('.weather-description');

//Getting the date and time
setInterval(() => {
	let now = new Date();
	let hour = now.getHours();
	let minute = now.getMinutes();

	let days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'October',
		'November',
		'December',
	];

	hour = hour % 24;
	if (hour < 10) {
		hour = '0' + hour;
	}
	if (minute < 10) {
		minute = '0' + minute;
	}

	let dayString = days[now.getDay()];
	let monthString = months[now.getMonth()];
	let dayNro = now.getUTCDate();

	timeEl.innerHTML = `${hour}:${minute}`;
	dateEl.innerHTML = `${dayString}, ${dayNro} ${monthString} `;

	return `${dayString}, ${hour}:${minute}`;
}, 1000);

//Getting data from weather api
function getWeatherData() {
	navigator.geolocation.getCurrentPosition((success) => {
		let { latitude, longitude } = success.coords;

		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIkey}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				showWeatherData(data);
			});
	});
}
getWeatherData();

//adding the data into the website
function showWeatherData(data) {
	let city = data.city.name;
	let country = data.city.country;
	let temp = Math.floor(data.list[0].main.temp);
	let wind = data.list[0].wind.speed;
	let { temp_min, temp_max, feels_like, humidity, pressure } =
		data.list[0].main;
	let { main } = data.list[0].weather[0];
	let icon = '';

	let temp_min_floor = Math.floor(temp_min);
	let temp_max_floor = Math.floor(temp_max);
	let feels_like_floored = Math.floor(feels_like);

	icon =
		main === 'Clear'
			? 'assets/icons/sun.png'
			: main === 'Clouds'
			? 'assets/icons/cloud-computing.png'
			: main === 'Snow'
			? 'assets/icons/snow.png'
			: main === 'Thunderstorm'
			? 'assets/icons/storm.png'
			: main === 'Drizzle' || main === 'Rain'
			? 'assets/icons/rain.png'
			: 'assets/icons/foggy.png';

	cityEl.innerHTML = `${city}, ${country}`;

	highlightEl.innerHTML = `<div class="card2">
							<h4 class="card-heading">Feels Like</h4>
							<div class="content">
								<p class="fl-temp">${feels_like_floored}</p>
								<span class="fl-temp-unit">°C</span>
							</div>
						</div>
						<div class="card2">
							<h4 class="card-heading">Wind</h4>
							<div class="content">
								<p class="wind">${wind}</p>
								<span class="wind-unit">m/s</span>
							</div>
						</div>
						<div class="card2">
							<h4 class="card-heading">Humidity</h4>
							<div class="content">
								<p class="humidity">${humidity}</p>
								<span class="humidity-unit">%</span>
							</div>
						</div>
						<div class="card2">
							<h4 class="card-heading">Pressure</h4>
							<div class="content">
								<p class="pressure">${pressure}</p>
							</div>`;

	let futureForecast = '';

	for (let i = 0; i < data.list.length; i++) {
		let dt = data.list[i].dt;
		let futureDates = new Date(dt * 1000);
		let hours = futureDates.getHours();

		let formattedTime = hours + ':00';
		let futureTemp = Math.floor(data.list[i].main.temp);

		if (i === 0) {
			// Display current weather data
			currentWeather.innerHTML = `
      <div class="weather-icon">
        <img src="${icon}" class="icon-large" id="icon" alt="" />
      </div>
      <div class="temperature">
        <h1 id="temp">${temp}</h1>
        <span class="temp-unit">°C</span>
      </div>
      <div class="weather-description">
        <div class="description">
          <p id="description">${main}</p>
        </div>
        <div class="min-max">
          <div class="min">
            <p>Lowest:</p>
            <p id="min-temp">${temp_min_floor}</p>
            <span class="temp-unit">°C</span>
          </div>
          <div class="max">
            <p>Highest:</p>
            <p id="max-temp">${temp_max_floor}</p>
            <span class="temp-unit">°C</span>
          </div>
        </div>
      </div>
    `;
		} else if (i < 6) {
			// Display weather forecast for next few days
			futureForecast += `
      <div class="card">
        <h2 class="day-name">${formattedTime}</h2>
        <div class="card-icon">
          <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="" />
        </div>
        <div class="day-temp">
          <h2 class="temp">${futureTemp}</h2>
          <span class="temp-unit">°C</span>
        </div>
      </div>
    `;
		}
	}

	// Set the innerHTML of cardsEl to the weather forecast for the next few days
	cardsEl.innerHTML = futureForecast;
}
