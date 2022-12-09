import { ALL_USER_PRODUCTS_BASE, DELETE_PRODUCT_BASE } from './settings/api';
import { getUserName, getToken } from './utils/storage';

const allUserProductsContainer = document.getElementById('all-products-container');

const userName = getUserName();
const accessToken = getToken();

const ALL_USER_PRODUCTS_API = `${ALL_USER_PRODUCTS_BASE}/${userName}?_listings=true`;

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

    if (numberOfUserProducts === 0) {
      allUserProductsContainer.innerHTML = `<div class="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                                              <div class="flex">
                                                <div class="flex-shrink-0">
                                                  <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                                  </svg>
                                                </div>
                                                <div class="ml-3">
                                                  <p class="text-sm text-yellow-700">
                                                    No products published yet.
                                                  </p>
                                                </div>
                                              </div>
                                            </div>`;
    }

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

getUserActivity().then(() => {
  const deleteBtn = document.querySelectorAll('.delete-btn');
  deleteBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
      const productId = this.dataset.id;
      console.log(productId)
      deleteProductFunction(productId);
    });
  });
});

function deleteProductFunction(id) {
  const deleteProduct = async () => {
    let response = await fetch(`${DELETE_PRODUCT_BASE}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });
    console.log(response.status);
    console.log('Product deleted');

    const deleteSuccessMsg = document.getElementById('delete-success-message');

    deleteSuccessMsg.innerHTML = `<div class="rounded-md bg-green-50 p-4">
                                            <div class="flex">
                                              <div class="flex-shrink-0">
                                                <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                                                </svg>
                                              </div>
                                              <div class="ml-3">
                                                <h3 class="text-sm font-medium text-green-800">Congratulations!!</h3>
                                                <div class="mt-2 text-sm text-green-700">
                                                  <p>Product was deleted</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>`;

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  deleteProduct().then((x) => {
  });
}
