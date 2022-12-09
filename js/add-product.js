import { ADD_PRODUCT_API } from './settings/api';
import { getToken } from './utils/storage';

const createNewProductForm = document.getElementById('createNewProductForm');
const generalMessage = document.getElementById('generalMessage');
const productName = document.getElementById('productName');
const productDescription = document.getElementById('productDescription');
const tagOne = document.getElementById('tagOne');
const mediaOne = document.getElementById('mediaOne');
const biddingEnd = document.getElementById('biddingEnd');
// const productPrice = document.getElementById('productPrice');
const logInFormContainer = document.getElementById('logInFormContainer');

createNewProductForm.addEventListener('submit', function (event) {
  event.preventDefault();

  generalMessage.innerHTML = '';

  let isProductName = false;
  let isBiddingEnd = false;
  let approveCreateProduct = false;

  if (productName.value.trim().length > 3) {
    isProductName = true;
  } else {
    isProductName = false;
    generalMessage.innerHTML = `<div class="rounded-md bg-red-50 p-4">
                                  <div class="flex">
                                    <div class="flex-shrink-0">
                                      <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                                      </svg>
                                    </div>
                                    <div class="ml-3">
                                      <h3 class="text-sm font-medium text-red-800">Error! Product name must be at least 4 letters</h3>
                                    </div>
                                  </div>
                                </div>`;
  }

  if (biddingEnd.value) {
    isBiddingEnd = true;
  } else {
    isBiddingEnd = false;
    generalMessage.innerHTML += `<div class="rounded-md bg-red-50 p-4">
                                  <div class="flex">
                                    <div class="flex-shrink-0">
                                      <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                                      </svg>
                                    </div>
                                    <div class="ml-3">
                                      <h3 class="text-sm font-medium text-red-800">Error! Set time for auction to end</h3>
                                    </div>
                                  </div>
                                </div>`;
  }

  approveCreateProduct = isProductName && isBiddingEnd;

  let productData = {};

  if (approveCreateProduct) {
    productData = {
      title: productName.value,
      description: productDescription.value,
      tags: [tagOne.value],
      media: [mediaOne.value],
      endsAt: biddingEnd.value,
    };
  }

  console.log(productData);

  const accessToken = getToken();

  // if user is not logged in, tries to create a product -> show login form
  if (!accessToken) {
    logInFormContainer.classList.remove('hidden');
  }

  async function addNewProduct() {
    const response = await fetch(ADD_PRODUCT_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(productData),
    });

    console.log('response', response);
    if (response.status === 201) {
      const data = await response.json();
      console.log('product created');
      generalMessage.innerHTML = `<div class="rounded-md bg-green-50 p-4">
                                    <div class="flex">
                                      <div class="flex-shrink-0">
                                        <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                                        </svg>
                                      </div>
                                      <div class="ml-3">
                                        <h3 class="text-sm font-medium text-green-800">Congratulations!!</h3>
                                        <div class="mt-2 text-sm text-green-700">
                                          <p>You have successfully created your new product. You can find all of your listed products in <a href="#">My Products</a></p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>`;
    } else {
      const productCreateError = await response.json();
      console.log(productCreateError);
    }
    createNewProductForm.reset();
  }
  addNewProduct();
});
