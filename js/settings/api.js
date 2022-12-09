const API_BASE = 'https://api.noroff.dev/api/v1/auction';

const GET_PRODUCTS_URL = `${API_BASE}/listings`;
const LOGIN_USER_API = `${API_BASE}/auth/login`;
const REGISTER_USER_API = `${API_BASE}/auth/register`;
const ADD_PRODUCT_API = `${API_BASE}/listings`;
const ALL_USER_PRODUCTS_BASE = `${API_BASE}/profiles`;
// const ALL_USER_PRODUCTS_API = `${API_BASE}/profiles/${userName}?_listings=true`;
const DELETE_PRODUCT_BASE = `${API_BASE}/listings`;
// ${API_BASE}/listings/${id}

export {
  API_BASE,
  GET_PRODUCTS_URL,
  LOGIN_USER_API,
  REGISTER_USER_API,
  ADD_PRODUCT_API,
  ALL_USER_PRODUCTS_BASE,
  DELETE_PRODUCT_BASE,
};
