import { GET_PRODUCTS_URL } from './settings/api';

// const productCard = document.querySelector('.product-card');
const searchResults = document.querySelector('.searchResults');
const search = document.getElementById('search');

let products = [];
async function getProductsList() {
  const productSearchresponse = await fetch(GET_PRODUCTS_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const productSearchjson = await productSearchresponse.json();
  products = productSearchjson;
}
getProductsList();

search.addEventListener('keyup', () => {
  const searchInput = search.value.toLocaleLowerCase();
  console.log('searchInput', searchInput);

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchInput);
  });

  if (searchInput.length > 1) {
    searchResults.innerHTML = ' ';

    filteredProducts.forEach((product) => {
      const { title, id, media } = product;
      const card = document.createElement('li');
      card.innerHTML = `<div class="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-gray-50">
                          <div class="flex-shrink-0">
                            <img class="h-10 w-10 rounded-full" src="${media}" alt="">
                          </div>
                          <div class="min-w-0 flex-1">
                            <a href="single-product.html?id=${id}" class="focus:outline-none">
                              <span class="absolute inset-0" aria-hidden="true"></span>
                              <p class="text-sm font-medium text-gray-900">${title}</p>
                            </a>
                          </div>
                        </div>`;

      searchResults.appendChild(card);
    });
  } else {
    searchResults.innerHTML = ' ';
  }
});
