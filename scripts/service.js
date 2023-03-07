const service = {};

service.getProductsFromFile = async () => {
	return fetch('../data/products.json')
		.then((dataFromFile) => dataFromFile.json())
		.then((productsInJson) => {
			return productsInJson;
		});
};

service.getPokemon = (name) => {
	return fetch('https://pokeapi.co/api/v2/pokemon/' + name).then((response) =>
		response.json()
	);
};

service.myPromise = () => {
	return new Promise((resolve, reject) => {
		// reject('Der opstod en fejl')

		setTimeout(() => {
			resolve('Det gik rigtig godt!');
		}, 5000);
	});
};

service.getProducts = () => [
	{
		id: 0,
		title: 'product 1 mega',
		author: 'Anders',
		description: 'Beskrivelse',
		image: 'https://picsum.photos/300/300?1',
		additionalImages: [
			'https://picsum.photos/768/400?random=10',
			'https://picsum.photos/768/400?random=11',
			'https://picsum.photos/768/400?random=12',
			'https://picsum.photos/768/400?random=13',
		],
	},
	{
		id: 1,
		title: 'product 2 super',
		author: 'Anders',
		description: 'Beskrivelse',
		image: 'https://picsum.photos/300/300?2',
		additionalImages: [
			'https://picsum.photos/768/400?random=10',
			'https://picsum.photos/768/400?random=11',
			'https://picsum.photos/768/400?random=12',
			'https://picsum.photos/768/400?random=13',
		],
	},
];

export default service;
