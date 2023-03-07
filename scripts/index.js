import service from './service.js';

const pageProduct = document.querySelector('.page-product');
const itemContainer = document.querySelector('.item-container');
const products = service.getProducts();

let productsFromFile = await service.getProductsFromFile();

let productsFromFileNoAwait = service.getProductsFromFile();

service.getPokemon('pikachu').then((pokemon) => {
	const pokemonContainer = document.querySelector('.pokemon-container');

	console.log(pokemon);

	if (pokemonContainer) {
		pokemonContainer.innerHTML = `<div>

        <h1>${pokemon.name}</h1>
        <ol>
            
        ${pokemon.pokemon
					.map((poke) => {
						return `<li>${poke.pokemon.name}</li>`;
					})
					.join(' ')}

            
        
        </ol>
    </div>`;
	}
});
// const testPromise = service.myPromise();
// testPromise.then( (result) => {

//     console.log(result);

// }).catch( (err) => {

//     console.log(err, 'filen kunne ikke hentes');

// })

const productTmpl = (product) => `<div>
    <img src="${product.image}"></img>
    <h1>${product.title}</h1>
    <p>${product.description}</p>
    <span>Author:${product.author} </span>
    <div><a href="product.html?id=${product.id}">Gå til produkt</a></div>
</div>`;

const productDetailTmpl = (product) => `<div>
    <img src="${product.image}"></img>
    <h1>${product.title}</h1>
    <p>${product.description}</p>
    <span>Author:${product.author} </span>
</div>`;

if (itemContainer) {
	// console.log('productsFromFile', productsFromFile)

	// productsFromFileNoAwait.then( (result) => {

	//     console.log('result', result)
	//     itemContainer.innerHTML = '';
	//     result.forEach( (product) => {

	//         itemContainer.innerHTML += productTmpl(product);

	//     });

	// } )

	productsFromFile.forEach((product) => {
		itemContainer.innerHTML += productTmpl(product);
	});

	// productsFromFile.then(productsInJson => {

	//     console.log(productsInJson)

	//     productsInJson.forEach( (product) => {

	//         itemContainer.innerHTML += productTmpl(product);

	//     });

	// })

	// products.forEach( (product) => {

	//     itemContainer.innerHTML += productTmpl(product);

	// });
}

if (pageProduct) {
	let search = location.search;
	let productID = new URLSearchParams(search).get('id');

	const productContainer = document.querySelector('.product-container');
	const foundProduct = fileProducts.find((product) => product.id == productID);

	productContainer.innerHTML = productDetailTmpl(foundProduct);

	console.log('foundProduct', foundProduct);
}
