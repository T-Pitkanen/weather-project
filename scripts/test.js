//WeatherData

/*
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
});*/
