import axios from 'axios';
import authHeader from './auth-header';
import Jsona from "jsona";
import qs from 'qs';

const API_URL = process.env.VUE_APP_API_BASE_URL;

const jsona = new Jsona();

async function getListItems(params){
  const response =  await axios.get(`${API_URL}/items?include=category,tags`, { 
    params: params,
    paramsSerializer: params => {
      return qs.stringify(params)
    },
    headers: authHeader()
  });

  return {data: jsona.deserialize(response.data), meta: response.data.meta?.page};
}

async function getItem(itemId){
  const response =  await axios.get(`${API_URL}/items/${itemId}?include=category,tags`, {headers: authHeader()});
  return jsona.deserialize(response.data);
}

async function editItem(item){

  const payload = jsona.serialize({
    stuff: item,
    includeNames: []
  });

  const response =  await axios.patch(`${API_URL}/items/${item.id}?include=category,tags`, payload, {headers: authHeader()});
  return jsona.deserialize(response.data);
}

async function createItem(item){

  const payload = jsona.serialize({
    stuff: item,
    includeNames: []
  });

  const response =  await axios.post(`${API_URL}/items?include=category,tags`, payload, {headers: authHeader()});
  return jsona.deserialize(response.data);
}

async function deleteItem(itemId){
  await axios.delete(`${API_URL}/items/${itemId}`, {headers: authHeader()});
}

async function uploadImageItem(item) {
    const payload = new FormData();
    payload.append("attachment", item.image);
  
    const response = await axios.post(`${API_URL}/uploads/items/${item.id}/image`, payload, { headers: authHeader() });
    return response.data.url;
  
  }

export default {
    getListItems,
    getItem,
    editItem,
    createItem,
    deleteItem,
    uploadImageItem
};