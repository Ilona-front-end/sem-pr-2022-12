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
      const { title, id } = product;
      const card = document.createElement('a');
      card.href = `single-product.html?id=${id}`;
      card.innerHTML = `<div>
                          <h3>${title}</h3>
                        </div>`;
      searchResults.appendChild(card);
    });
  } else {
    searchResults.innerHTML = ' ';
  }
});
