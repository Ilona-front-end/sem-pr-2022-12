import { GET_PRODUCT_BY_ID_BASE } from './settings/api';
import { getToken, getUserName } from './utils/storage';
import moment from "moment";

const paramstring = window.location.search;
const searchParam = new URLSearchParams(paramstring);
const productID = searchParam.get("id");

const accessToken = getToken();

if (!accessToken) {
  location.href = "/index.html";
}

const singleProductContainer = document.getElementById('singleProductContainer');
const singleProductImg = document.querySelector('.singleProductImg');
const singleProductTitle = document.querySelector('.singleProductTitle');
const singleProductCreated = document.querySelector('.singleProductCreated');
const singleProductDescription = document.querySelector('.singleProductDescription');
const singleProductTags = document.querySelector('.singleProductTags');
const singleProductEndsAt = document.querySelector('.singleProductEndsAt');
const singleProductBids = document.querySelector('.singleProductBids');

let now = moment(new Date());

const getProductById = async () => {
  const response = await fetch(`${GET_PRODUCT_BY_ID_BASE}/${productID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  // console.log(response, 'response');
  // console.log(data, 'data');

  const { media, title, created, description, tags, endsAt } = data;
  const bids = data._count.bids;

  const daysSinceCreated = now.diff(created, "days");
  // const minutesSinceUpdate = now.diff(updated, "minutes");
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
