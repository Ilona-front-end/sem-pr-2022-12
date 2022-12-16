import moment from 'moment';
import { GET_PRODUCT_BY_ID_BASE, BID_ON_PRODUCT_BASE } from './settings/api';
import { getToken } from './utils/storage';

const paramstring = window.location.search;
const searchParam = new URLSearchParams(paramstring);
const productID = searchParam.get('id');

const accessToken = getToken();

if (!accessToken) {
  location.href = '/index.html';
}

const singleProductImg = document.querySelector('.singleProductImg');
const singleProductTitle = document.querySelector('.singleProductTitle');
const singleProductCreated = document.querySelector('.singleProductCreated');
const singleProductDescription = document.querySelector('.singleProductDescription');
const singleProductTags = document.querySelector('.singleProductTags');
const singleProductEndsAt = document.querySelector('.singleProductEndsAt');
const singleProductBids = document.querySelector('.singleProductBids');

let now = moment(new Date());

const getProductById = async () => {
  const getProductByIdResponse = await fetch(`${GET_PRODUCT_BY_ID_BASE}/${productID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const getProductByIdData = await getProductByIdResponse.json();

  const { media, title, created, description, tags, endsAt } = getProductByIdData;
  const bids = getProductByIdData._count.bids;

  const daysSinceCreated = now.diff(created, 'days');
  const endsAtDate = moment(endsAt).format('lll');

  document.title = `${title}`;
  singleProductImg.src = `${media}`;
  singleProductImg.alt = `${title}`;
  singleProductTitle.innerHTML = `${title}`;
  singleProductCreated.innerHTML = `Created ${daysSinceCreated} days ago`;
  singleProductDescription.innerHTML = `Description: ${description}`;
  singleProductTags.innerHTML = `Tags: ${tags}`;
  singleProductEndsAt.innerHTML = `Ends at: ${endsAtDate}`;
  singleProductBids.innerHTML = `Bids: ${bids}`;
};
getProductById();

const addBidToProductBtn = document.getElementById('addBidToProductBtn');
const doBidOnProductInput = document.getElementById('doBidOnProductInput');
const doBidOnProductBtn = document.getElementById('doBidOnProductBtn');
const bidInput = document.getElementById('bidInput');
const messageToUser = document.querySelector('.messageToUser');

addBidToProductBtn.addEventListener('click', () => {
  addBidToProductBtn.classList.add('hidden');
  doBidOnProductInput.classList.remove('hidden');
  doBidOnProductBtn.classList.remove('hidden');
});

doBidOnProductBtn.addEventListener('click', async () => {
  const bidInputValue = bidInput.value;

  const bidAmount = {
    'amount': parseInt(bidInputValue)
  };

  async function executeBidding() {
    const bidResponse = await fetch(`${BID_ON_PRODUCT_BASE}/${productID}/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(bidAmount),
    });
    if (bidResponse.status === 200) {
      messageToUser.innerHTML = `<div class="rounded-md bg-green-50 p-4">
                                  <div class="flex">
                                    <div class="flex-shrink-0">
                                      <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                                      </svg>
                                    </div>
                                    <div class="ml-3">
                                      <h3 class="text-sm font-medium text-green-800">Congratulations!!</h3>
                                      <div class="mt-2 text-sm text-green-700">
                                        <p>You just make a bid on this product</p>
                                        <p>Keep track on how many credits you have left in <a href="profile.html" class="underline"> Profile</a></p>
                                      </div>
                                    </div>
                                  </div>
                                </div>`;

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } else {
      const bidError = await bidResponse.json();
      messageToUser.innerHTML = `<div class="rounded-md bg-red-50 p-4">
                                  <div class="flex">
                                    <div class="flex-shrink-0">
                                      <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                                      </svg>
                                    </div>
                                    <div class="ml-3">
                                      <h3 class="text-sm font-medium text-red-800">${bidError.errors[0].message}</h3>
                                    </div>
                                  </div>
                                </div>`;
    }
  }
  executeBidding();
});
