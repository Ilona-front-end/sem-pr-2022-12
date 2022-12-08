import { ALL_USER_PRODUCTS_BASE } from './settings/api';
import { getUserName, getToken } from './utils/storage';

const allUserProductsContainer = document.getElementById('all-products-container');

const userName = getUserName();
const accessToken = getToken();

const ALL_USER_PRODUCTS_API = `${ALL_USER_PRODUCTS_BASE}${userName}?_listings=true`;

async function getUserActivity() {
  const singleUserProductsResponse = await fetch(ALL_USER_PRODUCTS_API, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
  });

  if (singleUserProductsResponse.status === 200) {
    const singleUserProducts = await singleUserProductsResponse.json();
    // console.log('singleUserProducts', singleUserProducts);
    allUserProductsContainer.innerHTML = ' ';
    const userProductsListing = singleUserProducts.listings;
    console.log('userProductsListing', userProductsListing);

    const numberOfUserProducts = userProductsListing.length;
    console.log('numberOfUserProducts', numberOfUserProducts);

    for (let i = 0; i < numberOfUserProducts; i++) {
      // const created = userProductsListing[i];
      allUserProductsContainer.innerHTML += `<div class="py-4 mt-4">
                                              <div class="flex space-x-3">
                                                <div class="flex-1 space-y-1">
                                                  <div class="flex items-center justify-between">
                                                    <h3 class="text-sm font-medium text-cyan-700">${userProductsListing[i].title}</h3>
                                                    <p class="text-sm text-gray-500">Date: ----- </p>
                                                  </div>
                                                  <p class="text-sm text-gray-500">${userProductsListing[i].description}</p>
                                                  <button data-id="${userProductsListing[i].id}" type="button" class="delete-btn float-right inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Delete</button>
                                                </div>
                                              </div>
                                            </div>`;
    }
  } else {
    const singleUserProductsError = await singleUserProductsResponse.json();
    allUserProductsContainer.innerHTML += 'Error';
  }
}
getUserActivity();