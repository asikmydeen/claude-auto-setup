import axios from 'axios';
import authHeader from './auth-header';
import Jsona from "jsona";
import qs from 'qs';

const API_URL = process.env.VUE_APP_API_BASE_URL;

const jsona = new Jsona();

async function getUsers(params) {
  const response =  await axios.get(`${API_URL}/users?include=roles`, { 
    params: params,
    paramsSerializer: params => {
      return qs.stringify(params)
    },
    headers: authHeader()
  });

  return {data: jsona.deserialize(response.data), meta: response.data.meta?.page};
}

async function getUser(userID) {
  const response = await axios.get(`${API_URL}/users/${userID}?include=roles`, { headers: authHeader() });
  return jsona.deserialize(response.data);
}

async function createUser(newUser) {
  const payload = jsona.serialize({
    stuff: newUser,
    includeNames: []
  });

  const response = await axios.post(`${API_URL}/users?include=roles`, payload, { headers: authHeader() });
  return jsona.deserialize(response.data);
}

async function updateUser(updateUser) {

  const payload = jsona.serialize({
    stuff: updateUser,
    includeNames: []
  });

  const response = await axios.patch(`${API_URL}/users/${updateUser.id}?include=roles.permissions`, payload, { headers: authHeader() });
  return jsona.deserialize(response.data);
}

async function deleteUser(userid) {
  await axios.delete(`${API_URL}/users/${userid}`, { headers: authHeader() });
}

async function uploadImageProfile(file) {
  const payload = new FormData();
  payload.append("attachment", file.image);

  const response = await axios.post(`${API_URL}/uploads/users/${file.id}/profile-image`, payload, { headers: authHeader() });
  return response.data.url;

}

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadImageProfile
};