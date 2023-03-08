const timeEl = document.querySelector('#time');
const dateEl = document.querySelector('#date');
const tempEl = document.querySelector('#temp');
const APIkey = '6974a09c36ef8aaabfc009e4231a867d';
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
	tempEl.innerHTML = `${temp}`;

	highlightEl.innerHTML = `<div class="card2">
							<h4 class="card-heading">Feels Like</h4>
							<div class="content">
								<p class="fl-temp">${feels_like}</p>
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

	descEl.innerHTML = `<div class="description">
						<p id="description"> ${main}</p>
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
					</div>`;

	weatherIcon.innerHTML = `<img src="${icon}" class="icon-large" id="icon" alt="" />`;
}
