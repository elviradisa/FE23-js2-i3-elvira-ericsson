//Elvira Ericsson - FE23
//
//Dummy Website
//
//Inlämningsuppgift 3
document.addEventListener('DOMContentLoaded', fetchAllProducts);

const header = {
    "Content-type": "application/json; charset=UTF-8"
}

const options = {
    method: 'GET',
    headers: header
}

type Product = {
    images: string[];
    title: string;
    description: string;
    rating: number;
    stock: number;
    category: string;   
}

function fetchAllProducts() {
    const productsURL:string = 'https://dummyjson.com/products'; 

    fetch(productsURL, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('HTTP error');
            }
        })
        .then(data => {
            displayProducts({results: data.products});
        })
        .catch(error => {
            console.log('Could not fetch products:', error);
        });
}

const form = document.querySelector('#form') as HTMLFormElement;
const productCard = document.querySelector('.productCard');
console.log(productCard);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchInput = document.querySelector('#searchInput') as HTMLInputElement;
    const inputValue = searchInput.value;
    const productURL:string = `https://dummyjson.com/products/search?q=${inputValue}`;

    fetch(productURL, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error ('HTTP error');
            }
        })
        .then(data => {
            if (productCard) {
                const productsHTML = data.products.map((product: Product) => createProducts(product)).join('');
                productCard.innerHTML = productsHTML;
            }
        })
        .catch(error => {
            console.log('Could not display product:', error);
        })
        form.reset();
})

function createProducts (product: Product):string {
    const imgURL = product.images.length > 0 ? product.images[0] : 'src/media/placeholder.jpeg';
    const lowStock = product.stock < 10 ? 'Only a few left!' : '';

    return `
    <div class="product">
        <img src="${imgURL}" alt="${product.title}" class="productImage">
        <h2 class="productTitle">${product.title}</h2>
        <p class="productDescription pFont">${product.description}</p>
        <p class="productRating pFont">Rating: ${product.rating}</p>
        <p class="productStock pFont">In stock: ${product.stock}</p>
        <p class="lowstock pFont">${lowStock}</p>
        <p class="productCategory pFont">Category: ${product.category}</p>
        <div><button class="cartButton pFont">Add to cart</button></div>
    </div>
  `;
}

function displayProducts (data: {results: Product[]}):void {
    let allProductsHTML = data.results.map(product => createProducts(product)).join('');
    
    const productContainer = document.querySelector('.productCard');
    if (productContainer !== null) {
        productContainer.innerHTML = allProductsHTML;
    } else {
        console.log('Element not found');
    }
}
