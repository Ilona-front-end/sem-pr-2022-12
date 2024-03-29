import { ALL_USER_PRODUCTS_BASE, DELETE_PRODUCT_BASE } from './settings/api';
import { getUserName, getToken } from './utils/storage';

const allUserProductsContainer = document.getElementById(
  'all-products-container'
);

const userName = getUserName();
const accessToken = getToken();

const ALL_USER_PRODUCTS_API = `${ALL_USER_PRODUCTS_BASE}/${userName}?_listings=true`;

async function getUserActivity() {
  const singleUserProductsResponse = await fetch(ALL_USER_PRODUCTS_API, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (singleUserProductsResponse.status === 200) {
    const singleUserProducts = await singleUserProductsResponse.json();
    allUserProductsContainer.innerHTML = ' ';
    const userProductsListing = singleUserProducts.listings;
    const numberOfUserProducts = userProductsListing.length;
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
      const endsAt = new Date(userProductsListing[i].endsAt).toLocaleString();

      allUserProductsContainer.innerHTML += `<div class="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 border-b border-gray-400">
                                              <!-- Product -->
                                              <div class="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
                                                <!-- Product image -->
                                                <div class="lg:col-span-4 lg:row-end-1">
                                                  <div
                                                    class="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100"
                                                  >
                                                    <img
                                                      src="${userProductsListing[i].media[0]}"
                                                      alt="Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles."
                                                      class="object-cover object-center"
                                                    />
                                                  </div>
                                                </div>

                                                <!-- Product details -->
                                                <div
                                                  class="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none"
                                                >
                                                  <div class="flex flex-col-reverse">
                                                    <div class="mt-4">
                                                      <h1
                                                        class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
                                                      >
                                                        ${userProductsListing[i].title}
                                                      </h1>

                                                      <h2 id="information-heading" class="sr-only">
                                                        Product information
                                                      </h2>
                                                      <p class="mt-2 text-sm text-gray-500">
                                                        <time datetime="${userProductsListing[i].endsAt}">Bidding ends: ${endsAt}</time>
                                                      </p>
                                                    </div>

                                                    <div>
                                                      <h3 class="sr-only">Reviews</h3>
                                                      <div class="flex items-center">
                                                        <svg
                                                          class="text-yellow-400 h-5 w-5 flex-shrink-0"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          viewBox="0 0 20 20"
                                                          fill="currentColor"
                                                          aria-hidden="true"
                                                        >
                                                          <path
                                                            fill-rule="evenodd"
                                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                            clip-rule="evenodd"
                                                          />
                                                        </svg>

                                                        <svg
                                                          class="text-yellow-400 h-5 w-5 flex-shrink-0"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          viewBox="0 0 20 20"
                                                          fill="currentColor"
                                                          aria-hidden="true"
                                                        >
                                                          <path
                                                            fill-rule="evenodd"
                                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                            clip-rule="evenodd"
                                                          />
                                                        </svg>

                                                        <svg
                                                          class="text-yellow-400 h-5 w-5 flex-shrink-0"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          viewBox="0 0 20 20"
                                                          fill="currentColor"
                                                          aria-hidden="true"
                                                        >
                                                          <path
                                                            fill-rule="evenodd"
                                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                            clip-rule="evenodd"
                                                          />
                                                        </svg>

                                                        <svg
                                                          class="text-yellow-400 h-5 w-5 flex-shrink-0"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          viewBox="0 0 20 20"
                                                          fill="currentColor"
                                                          aria-hidden="true"
                                                        >
                                                          <path
                                                            fill-rule="evenodd"
                                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                            clip-rule="evenodd"
                                                          />
                                                        </svg>

                                                        <svg
                                                          class="text-gray-300 h-5 w-5 flex-shrink-0"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          viewBox="0 0 20 20"
                                                          fill="currentColor"
                                                          aria-hidden="true"
                                                        >
                                                          <path
                                                            fill-rule="evenodd"
                                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                            clip-rule="evenodd"
                                                          />
                                                        </svg>
                                                      </div>
                                                      <p class="sr-only">4 out of 5 stars</p>
                                                    </div>
                                                  </div>

                                                  <p class="mt-6 text-gray-500">${userProductsListing[i].description}</p>

                                                  <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                                    <button 
                                                      type="button"
                                                      class="invisible flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                                    >
                                                      Edit
                                                    </button>
                                                    <button data-id="${userProductsListing[i].id}"
                                                      type="button"
                                                      class="delete-btn flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 py-3 px-8 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                                    >
                                                      Delete
                                                    </button>
                                                  </div>

                                                  <div class="mt-10 border-t border-gray-200 pt-10">
                                                    <h3 class="text-sm font-medium text-gray-900">Highlights</h3>
                                                    <div class="prose prose-sm mt-4 text-gray-500">
                                                      <ul role="list">
                                                        <li>Lorem ipsum dolor sit amet.</li>
                                                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing.</li>
                                                      </ul>
                                                    </div>
                                                  </div>

                                                  <div class="mt-10 border-t border-gray-200 pt-10">
                                                    <h3 class="text-sm font-medium text-gray-900">Share</h3>
                                                    <ul role="list" class="mt-4 flex items-center space-x-6">
                                                      <li>
                                                        <a
                                                          href="#"
                                                          class="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                                                        >
                                                          <span class="sr-only">Share on Facebook</span>
                                                          <svg
                                                            class="h-5 w-5"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            aria-hidden="true"
                                                          >
                                                            <path
                                                              fill-rule="evenodd"
                                                              d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                                              clip-rule="evenodd"
                                                            />
                                                          </svg>
                                                        </a>
                                                      </li>
                                                      <li>
                                                        <a
                                                          href="#"
                                                          class="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                                                        >
                                                          <span class="sr-only">Share on Instagram</span>
                                                          <svg
                                                            class="h-6 w-6"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                            aria-hidden="true"
                                                          >
                                                            <path
                                                              fill-rule="evenodd"
                                                              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                                              clip-rule="evenodd"
                                                            />
                                                          </svg>
                                                        </a>
                                                      </li>
                                                      <li>
                                                        <a
                                                          href="#"
                                                          class="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                                                        >
                                                          <span class="sr-only">Share on Twitter</span>
                                                          <svg
                                                            class="h-5 w-5"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            aria-hidden="true"
                                                          >
                                                            <path
                                                              d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                                                            />
                                                          </svg>
                                                        </a>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </div>

                                                <div class="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
                                                  <div>
                                                    <div class="border-b border-gray-200">
                                                      <div
                                                        class="-mb-px flex space-x-8"
                                                        aria-orientation="horizontal"
                                                        role="tablist"
                                                      >
                                                        <button
                                                          id="tab-reviews"
                                                          class="border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300 whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                                                          aria-controls="tab-panel-reviews"
                                                          role="tab"
                                                          type="button"
                                                        >
                                                          Customer Reviews
                                                        </button>
                                                      </div>
                                                    </div>

                                                    <!-- 'Customer Reviews'  -->
                                                    <div
                                                      id="tab-panel-reviews"
                                                      class="-mb-10"
                                                      aria-labelledby="tab-reviews"
                                                      role="tabpanel"
                                                      tabindex="0"
                                                    >
                                                      <h3 class="sr-only">Customer Reviews</h3>

                                                      <div class="flex space-x-4 text-sm text-gray-500">
                                                        <div class="flex-none py-10">
                                                          <img
                                                            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                                                            alt=""
                                                            class="h-10 w-10 rounded-full bg-gray-100"
                                                          />
                                                        </div>
                                                        <div class="py-10">
                                                          <h3 class="font-medium text-gray-900">Jørgen Halden</h3>
                                                          <p><time datetime="2022-12-18">Des 18, 2022</time></p>

                                                          <div class="mt-4 flex items-center">
                                                            <svg
                                                              class="text-yellow-400 h-5 w-5 flex-shrink-0"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              viewBox="0 0 20 20"
                                                              fill="currentColor"
                                                              aria-hidden="true"
                                                            >
                                                              <path
                                                                fill-rule="evenodd"
                                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                                clip-rule="evenodd"
                                                              />
                                                            </svg>

                                                            <svg
                                                              class="text-yellow-400 h-5 w-5 flex-shrink-0"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              viewBox="0 0 20 20"
                                                              fill="currentColor"
                                                              aria-hidden="true"
                                                            >
                                                              <path
                                                                fill-rule="evenodd"
                                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                                clip-rule="evenodd"
                                                              />
                                                            </svg>

                                                            <svg
                                                              class="text-yellow-400 h-5 w-5 flex-shrink-0"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              viewBox="0 0 20 20"
                                                              fill="currentColor"
                                                              aria-hidden="true"
                                                            >
                                                              <path
                                                                fill-rule="evenodd"
                                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                                clip-rule="evenodd"
                                                              />
                                                            </svg>

                                                            <svg
                                                              class="text-yellow-400 h-5 w-5 flex-shrink-0"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              viewBox="0 0 20 20"
                                                              fill="currentColor"
                                                              aria-hidden="true"
                                                            >
                                                              <path
                                                                fill-rule="evenodd"
                                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                                clip-rule="evenodd"
                                                              />
                                                            </svg>

                                                            <svg
                                                              class="text-yellow-400 h-5 w-5 flex-shrink-0"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              viewBox="0 0 20 20"
                                                              fill="currentColor"
                                                              aria-hidden="true"
                                                            >
                                                              <path
                                                                fill-rule="evenodd"
                                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                                clip-rule="evenodd"
                                                              />
                                                            </svg>
                                                          </div>
                                                          <p class="sr-only">5 out of 5 stars</p>

                                                          <div class="prose prose-sm mt-4 max-w-none text-gray-500">
                                                            <p>
                                                              Consectetur adipiscing elit. Cras id congue massa, sit amet luctus risus. Suspendisse ac fermentum felis, eget mollis risus. Quisque non nisi quis erat mattis venenatis ornare non magna.
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>

                                                      <div class="flex space-x-4 text-sm text-gray-500">
                                                        <div class="flex-none py-10">
                                                          <img
                                                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                                                            alt=""
                                                            class="h-10 w-10 rounded-full bg-gray-100"
                                                          />
                                                        </div>
                                                        <div class="py-10 border-t border-gray-200">
                                                          <h3 class="font-medium text-gray-900">Kjell Inge</h3>
                                                          <p><time datetime="20212-12-19">Des 19, 2022</time></p>

                                                          <div class="mt-4 flex items-center">
                                                            <svg
                                                              class="text-yellow-400 h-5 w-5 flex-shrink-0"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              viewBox="0 0 20 20"
                                                              fill="currentColor"
                                                              aria-hidden="true"
                                                            >
                                                              <path
                                                                fill-rule="evenodd"
                                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                                clip-rule="evenodd"
                                                              />
                                                            </svg>

                                                            <svg
                                                              class="text-yellow-400 h-5 w-5 flex-shrink-0"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              viewBox="0 0 20 20"
                                                              fill="currentColor"
                                                              aria-hidden="true"
                                                            >
                                                              <path
                                                                fill-rule="evenodd"
                                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                                clip-rule="evenodd"
                                                              />
                                                            </svg>

                                                            <svg
                                                              class="text-yellow-400 h-5 w-5 flex-shrink-0"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              viewBox="0 0 20 20"
                                                              fill="currentColor"
                                                              aria-hidden="true"
                                                            >
                                                              <path
                                                                fill-rule="evenodd"
                                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                                clip-rule="evenodd"
                                                              />
                                                            </svg>

                                                            <svg
                                                              class="text-yellow-400 h-5 w-5 flex-shrink-0"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              viewBox="0 0 20 20"
                                                              fill="currentColor"
                                                              aria-hidden="true"
                                                            >
                                                              <path
                                                                fill-rule="evenodd"
                                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                                clip-rule="evenodd"
                                                              />
                                                            </svg>

                                                            <svg
                                                              class="text-yellow-400 h-5 w-5 flex-shrink-0"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              viewBox="0 0 20 20"
                                                              fill="currentColor"
                                                              aria-hidden="true"
                                                            >
                                                              <path
                                                                fill-rule="evenodd"
                                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                                clip-rule="evenodd"
                                                              />
                                                            </svg>
                                                          </div>
                                                          <p class="sr-only">5 out of 5 stars</p>

                                                          <div class="prose prose-sm mt-4 max-w-none text-gray-500">
                                                            <p>
                                                              Integer ullamcorper cursus dolor lacinia consectetur. 
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <div
                                                      id="tab-panel-faq"
                                                      class="text-sm text-gray-500"
                                                      aria-labelledby="tab-faq"
                                                      role="tabpanel"
                                                      tabindex="0">
                                                      <h3 class="sr-only">Frequently Asked Questions</h3>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>`;
    }
  } else {
    const singleUserProductsError = await singleUserProductsResponse.json();
    allUserProductsContainer.innerHTML = `<div class="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                                              <div class="flex">
                                                <div class="flex-shrink-0">
                                                  <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                                  </svg>
                                                </div>
                                                <div class="ml-3">
                                                  <p class="text-sm text-yellow-700">
                                                    Log in to see your products.
                                                  </p>
                                                </div>
                                              </div>
                                            </div>`;
  }
}

getUserActivity().then(() => {
  const deleteBtn = document.querySelectorAll('.delete-btn');
  deleteBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
      const productId = this.dataset.id;
      deleteProductFunction(productId);
    });
  });
});

function deleteProductFunction(id) {
  const deleteProduct = async () => {
    let response = await fetch(`${DELETE_PRODUCT_BASE}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const deleteSuccessMsg = document.getElementById('delete-success-message');

    deleteSuccessMsg.innerHTML = `<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                                    <div class="fixed inset-0 z-10 overflow-y-auto">
                                      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                        <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                          <div>
                                            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                              <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                              </svg>
                                            </div>
                                            <div class="mt-3 text-center sm:mt-5">
                                              <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Congratulations</h3>
                                              <div class="mt-2 mb-4">
                                                <p class="text-sm text-gray-500">Product was deleted. You will be redirected to products list in few seconds</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>`;

    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };
  deleteProduct().then((x) => { });
}
