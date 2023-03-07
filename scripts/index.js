let temp = document.querySelector('#temp');

let currentCity = '';
let currentDate = '';
let currentTime = '';
let lat = '';
let long = '';

//Getting the date and time
function getDateTime() {
	const dateContainer = document.querySelector('#date-time');

	let now = new Date(),
		hour = now.getHours(),
		minute = now.getMinutes();

	let days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	hour = hour % 24;
	if (hour < 10) {
		hour = '0' + hour;
	}
	if (minute < 10) {
		minute = '0' + minute;
	}

	

	let dayString = days[now.getDay()];

	dateContainer.innerHTML = `${dayString}, ${hour}:${minute}`;

	return `${dayString}, ${hour}:${minute}`;
}

//WeatherData

const tempContainer = document.querySelector('#temp');
const cityContainer = document.querySelector('#city');
const form = document.querySelector('.search');

form.addEventListener('submit', function (event) {
	event.preventDefault();

	let input = document.querySelector('#query');
	let inputValue = input.value;
	console.log(inputValue);

	currentCity = inputValue;

	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=6974a09c36ef8aaabfc009e4231a867d&units=metric`,
		{
			method: 'GET',
		}
	)
		.then((response) => response.json())
		.then((data) => {
			temp = data.main.temp;
			tempContainer.innerHTML = temp;
			cityContainer.innerHTML = currentCity;
		});
});
