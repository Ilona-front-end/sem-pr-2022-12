import moment from 'moment';
import { GET_PRODUCT_BY_ID_BASE, BID_ON_PRODUCT_BASE, BID_HISTORY_BASE } from './settings/api';
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
  singleProductBids.innerHTML = `Bids made: ${bids} times`;
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

// bidding history
const biddingHistory = document.getElementById('biddingHistory');

const getBiddingHistory = async () => {
  const getBiddingHistoryResponse = await fetch(`${BID_HISTORY_BASE}/${productID}?_seller=true&_bids=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const getBiddingHistoryData = await getBiddingHistoryResponse.json();

  if (getBiddingHistoryResponse.status === 200) {
    const { bids } = getBiddingHistoryData;
    console.log('bids', bids);

    for (let i = 0; i < bids.length; i++) {
      const { amount, created, bidderName } = bids[i];
      const daysSinceCreatedBid = now.diff(created, 'days');

      biddingHistory.innerHTML += `<li>
                                    <div class="relative pb-8">
                                      <span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                      <div class="relative flex space-x-3">
                                        <div>
                                          <span class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                                            <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                                            </svg>
                                          </span>
                                        </div>
                                        <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                          <div>
                                            <p class="text-sm text-gray-500">${bidderName} <span class="font-medium text-gray-900"> used ${amount} credit(s)</span></p>
                                          </div>
                                          <div class="whitespace-nowrap text-right text-sm text-gray-500">
                                            <time datetime="">${daysSinceCreatedBid} days ago</time>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>`;
    }
  } else {
    console.log('error');
  }
};
getBiddingHistory();
