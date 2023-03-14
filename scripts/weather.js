const timeEl = document.querySelector('#time');
const dateEl = document.querySelector('#date');
const others = document.querySelector('.others');
const local = document.querySelector('.local');
const cancun = document.querySelector('.cancun');
const madrid = document.querySelector('.madrid');
const newYork = document.querySelector('.newyork');

const APIkey = '6974a09c36ef8aaabfc009e4231a867d';
const cardsEl = document.querySelector('.glider');
const currentWeather = document.querySelector('.today-weather');

let cityEl = document.querySelector('#city');

let highlightEl = document.querySelector('.highlight-container');

//Getting the date and time
// setInterval(() => {
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

// return `${dayString}, ${hour}:${minute}`;

let localTime = now.getTime();
let localOffset = now.getTimezoneOffset() * 60000;
let utc = localTime + localOffset;

if (cancun) {
	let cancunTime = utc + 1000 * -18000;
	let nd = new Date(cancunTime);
	let cancunHours = nd.getHours();
	let cancunMinutes = nd.getMinutes();
	let cancunDay = days[nd.getDay()];
	let cancunMonth = months[nd.getMonth()];
	let cancunDayNro = nd.getUTCDate();

	cancunHours = cancunHours % 24;
	if (nd.getHours() < 10) {
		cancunHours = '0' + cancunHours;
	}
	if (nd.getMinutes() < 10) {
		cancunMinutes = '0' + cancunMinutes;
	}

	timeEl.innerHTML = `${cancunHours}:${cancunMinutes}`;
	dateEl.innerHTML = `${cancunDay}, ${cancunDayNro} ${cancunMonth} `;
} else if (madrid) {
	let maTime = utc + 1000 * 3600;
	let nd = new Date(maTime);
	let maHours = nd.getHours();
	let maMinutes = nd.getMinutes();
	let maDay = days[nd.getDay()];
	let maMonth = months[nd.getMonth()];
	let maDayNro = nd.getUTCDate();

	maHours = maHours % 24;
	if (nd.getHours() < 10) {
		maHours = '0' + maHours;
	}
	if (nd.getMinutes() < 10) {
		maMinutes = '0' + maMinutes;
	}

	timeEl.innerHTML = `${maHours}:${maMinutes}`;
	dateEl.innerHTML = `${maDay}, ${maDayNro} ${maMonth} `;
} else if (newYork) {
	let newYorkTime = utc + 1000 * -14400;
	let nd = new Date(newYorkTime);
	let newYorkHours = nd.getHours();
	let newYorkMinutes = nd.getMinutes();
	let newYorkDay = days[nd.getDay()];
	let newYorkMonth = months[nd.getMonth()];
	let newYorkDayNro = nd.getUTCDate();

	newYorkHours = newYorkHours % 24;
	if (nd.getHours() < 10) {
		newYorkHours = '0' + newYorkHours;
	}
	if (nd.getMinutes() < 10) {
		newYorkMinutes = '0' + newYorkMinutes;
	}

	timeEl.innerHTML = `${newYorkHours}:${newYorkMinutes}`;
	dateEl.innerHTML = `${newYorkDay}, ${newYorkMonth} ${newYorkDayNro} `;
}
// }, 1000);

//Getting data from weather api
function getWeatherData() {
	if (local) {
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
	} else if (cancun) {
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?units=metric&q=cancun&appid=${APIkey}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				showWeatherData(data);
			});
	} else if (madrid) {
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?units=metric&q=madrid&appid=${APIkey}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				showWeatherData(data);
			});
	} else if (newYork) {
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?units=metric&q=new%20york&appid=${APIkey}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				showWeatherData(data);
			});
	}
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

	switch (main) {
		case 'Clear':
			icon = '../assets/icons/sun.png';
			break;
		case 'Clouds':
			icon = '../assets/icons/cloud-computing.png';
			break;
		case 'Snow':
			icon = '../assets/icons/snow.png';
			break;
		case 'Thunderstorm':
			icon = '../assets/icons/storm.png';
			break;
		case 'Drizzle':
			icon = '../assets/icons/rain.png';
			break;
		case 'Rain':
			icon = '../assets/icons/rain.png';
			break;
	}

	if (others) {
		switch (main) {
			case 'Clear':
				icon = '../assets/icons/sun.png';
				break;
			case 'Clouds':
				icon = '../assets/icons/cloud-computing.png';
				break;
			case 'Snow':
				icon = '../assets/icons/snow.png';
				break;
			case 'Thunderstorm':
				icon = '../assets/icons/storm.png';
				break;
			case 'Drizzle':
				icon = '../assets/icons/rain.png';
				break;
			case 'Rain':
				icon = '../assets/icons/rain.png';
				break;
		}
	}

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
        
          <div class="max">
            <p>Highest:</p>
            <p id="max-temp">${temp_max_floor}</p>
            <span class="temp-unit">°C</span>
          </div>  
					<div class="min">
            <p>Lowest:</p>
            <p id="min-temp">${temp_min_floor}</p>
            <span class="temp-unit">°C</span>
          </div>
        </div>
      </div>
    `;
		} else if (i < 11) {
			futureForecast += `
				<div class="card">
					<h2 class="day-name">${formattedTime}</h2>
					<div class="card-icon">
						<img
							src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"
							alt=""
						/>
					</div>
					<div class="day-temp">
						<h2 class="temp">${futureTemp}</h2>
						<span class="temp-unit">°C</span>
						<span class="future-weather-desc">
							${data.list[i].weather[0].description}
						</span>
					</div>
				</div>`;
		}
	}

	cardsEl.innerHTML = futureForecast;
}

const form = document.querySelector('.search');
let input = document.querySelector('#query');

function searchCity(event) {
	event.preventDefault();

	let currentCity = input.value;

	fetch(
		`https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=6974a09c36ef8aaabfc009e4231a867d&units=metric`,
		{
			method: 'GET',
		}
	)
		.then((response) => response.json())
		.then((data) => {
			let timezone = data.city.timezone;
			let newTime = utc + 1000 * timezone;
			let nd = new Date(newTime);
			let newHours = nd.getHours();
			let newMinutes = nd.getMinutes();
			let newDay = days[nd.getDay()];
			let newMonth = months[nd.getMonth()];
			let newDayNro = nd.getUTCDate();

			timeEl.innerHTML = `${newHours}:${newMinutes}`;
			dateEl.innerHTML = `${newDay}, ${newDayNro} ${newMonth} `;
			showWeatherData(data);
		});
}

form.addEventListener('submit', searchCity);
