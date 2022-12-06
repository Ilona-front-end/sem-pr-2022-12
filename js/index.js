import { API_BASE_URL, GET_PRODUCTS_URL } from './settings/api';

const allProductsContainer = document.getElementById('all-products-container');
const noImgProductsContainer = document.getElementById(
  'no-img-products-container'
);

(async function getProducts() {
  const response = await fetch(GET_PRODUCTS_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();

  console.log(json);

  allProductsContainer.innerHTML = '';

  if (json.length === 0) {
    allProductsContainer.innerHTML = 'No products to show';
  } else {
    json.map((product) => {
      if (product.media.length > 0) {
        allProductsContainer.innerHTML += `
                                            <div class="group relative border-r border-b border-gray-200 p-4 sm:p-6">
                                              <div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                                                <img
                                                  src="${product.media[0]}"
                                                  alt="product"
                                                  class="h-full w-full object-cover object-center"/>
                                              </div>
                                              <div class="pt-10 pb-4 text-center">
                                                <h3 class="text-sm font-medium text-gray-900">
                                                  <a href="#">
                                                    <span aria-hidden="true" class="absolute inset-0"></span>
                                                    ${product.title}
                                                  </a>
                                                </h3>
                                                <div class="mt-3 flex flex-col items-center">
                                                  <p class="mt-1 text-sm text-gray-500">Tags: ${product.tags}</p>
                                                  <p class="mt-1 text-sm text-gray-500">Bids: ${product._count.bids}</p>
                                                </div>
                                                <p class="mt-4 text-base font-medium text-gray-900">Ends: ${product.endsAt}</p>
                                              </div>
                                            </div>
                                          `;
      } else {
        noImgProductsContainer.innerHTML += `
                                            <div class="group relative border-r border-b border-gray-200 p-4 sm:p-6">
                                              <div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                                                <img
                                                  src="${product.media[0]}"
                                                  alt="product"
                                                  class="h-full w-full object-cover object-center"/>
                                              </div>
                                              <div class="pt-10 pb-4 text-center">
                                                <h3 class="text-sm font-medium text-gray-900">
                                                  <a href="#">
                                                    <span aria-hidden="true" class="absolute inset-0"></span>
                                                    ${product.title}
                                                  </a>
                                                </h3>
                                                <div class="mt-3 flex flex-col items-center">
                                                  <p class="mt-1 text-sm text-gray-500">Tags: ${product.tags}</p>
                                                  <p class="mt-1 text-sm text-gray-500">Bids: ${product._count.bids}</p>
                                                </div>
                                                <p class="mt-4 text-base font-medium text-gray-900">Ends: ${product.endsAt}</p>
                                              </div>
                                            </div>
                                            `;
      }
    });
  }
})().catch((error) => {
  console.log(error);
});
