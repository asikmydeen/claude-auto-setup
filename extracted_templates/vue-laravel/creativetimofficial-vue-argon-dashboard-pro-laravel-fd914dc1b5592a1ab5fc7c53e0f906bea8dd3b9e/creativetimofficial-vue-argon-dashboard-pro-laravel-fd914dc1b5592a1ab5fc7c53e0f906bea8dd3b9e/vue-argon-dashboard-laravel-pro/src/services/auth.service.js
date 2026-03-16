import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_BASE_URL;

const headers = {
  Accept: "application/vnd.api+json",
  "Content-Type": "application/vnd.api+json",
};

async function login(user) {
  const response = await axios.post(API_URL + '/login',
  {
    email: user.email,
    password: user.password
  }, {headers});

  if (response.data.access_token) {
    localStorage.setItem('access_token', response.data.access_token);
  }
  return response.data;
}

async function logout() {
  try {
    await axios.post(API_URL + '/logout', {}, {headers: authHeader()});
  } finally {
    localStorage.removeItem('access_token');
  }
}

async function register(user) {

  const response = await axios.post(API_URL + '/register',
  {
    name: user.name,
    email: user.email,
    password: user.password,
    password_confirmation: user.confirm_password,
  }, {headers});

  if (response.data.access_token) {
    localStorage.setItem('access_token', response.data.access_token);
  }
  return response.data;
}

async function forgotPassword(data) {
  await axios.post(API_URL + '/password-forgot', data, {headers});
}

async function resetPassword(data) {
  await axios.post(API_URL + '/password-reset', data, {headers});
}

export default {
  login,
  logout,
  register,
  forgotPassword,
  resetPassword
};