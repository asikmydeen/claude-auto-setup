import axios from 'axios';
import authHeader from './auth-header';
import Jsona from "jsona";
import qs from 'qs';

const API_URL = process.env.VUE_APP_API_BASE_URL;

const jsona = new Jsona();

async function getListTags(params){
  const response =  await axios.get(`${API_URL}/tags`, { 
    params: params,
    paramsSerializer: params => {
      return qs.stringify(params)
    },
    headers: authHeader()
  });

  return {data: jsona.deserialize(response.data), meta: response.data.meta?.page};
}

async function getTag(tagId){
  const response =  await axios.get(`${API_URL}/tags/${tagId}`, {headers: authHeader()});
  return jsona.deserialize(response.data);
}

async function editTag(tag){

  const payload = jsona.serialize({
    stuff: tag,
    includeNames: []
  });

  const response =  await axios.patch(`${API_URL}/tags/${tag.id}`, payload, {headers: authHeader()});
  return jsona.deserialize(response.data);
}

async function createTag(tag){

  const payload = jsona.serialize({
    stuff: tag,
    includeNames: []
  });

  const response =  await axios.post(`${API_URL}/tags`, payload, {headers: authHeader()});
  return jsona.deserialize(response.data);
}

async function deleteTag(tagId){
  await axios.delete(`${API_URL}/tags/${tagId}`, {headers: authHeader()});
}

export default {
    getListTags,
    getTag,
    editTag,
    createTag,
    deleteTag
};