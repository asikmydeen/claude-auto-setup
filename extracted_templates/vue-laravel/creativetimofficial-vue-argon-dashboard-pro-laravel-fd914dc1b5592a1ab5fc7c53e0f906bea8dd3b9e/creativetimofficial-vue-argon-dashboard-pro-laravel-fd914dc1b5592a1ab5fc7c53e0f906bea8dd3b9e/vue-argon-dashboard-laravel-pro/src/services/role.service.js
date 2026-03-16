import axios from 'axios';
import authHeader from './auth-header';
import Jsona from "jsona";
import qs from 'qs';

const API_URL = process.env.VUE_APP_API_BASE_URL;

const jsona = new Jsona();

async function getListRoles(params){
  const response =  await axios.get(`${API_URL}/roles`, { 
      params: params,
      paramsSerializer: params => {
        return qs.stringify(params)
      },
      headers: authHeader()
  });
  
  return {data: jsona.deserialize(response.data), meta: response.data.meta?.page};
}

async function getRole(roleId){
  const response =  await axios.get(`${API_URL}/roles/${roleId}`, {headers: authHeader()});
  return jsona.deserialize(response.data);
}

async function editRole(roleName){

  const payload = jsona.serialize({
    stuff: roleName,
    includeNames: []
  });

  const response =  await axios.patch(`${API_URL}/roles/${roleName.id}`, payload, {headers: authHeader()});
  return jsona.deserialize(response.data);
}

async function createRole(roleName){

  const payload = jsona.serialize({
    stuff: roleName,
    includeNames: []
  });

  const response =  await axios.post(`${API_URL}/roles`, payload, {headers: authHeader()});
  return jsona.deserialize(response.data);
}

async function deleteRole(roleId){
  await axios.delete(`${API_URL}/roles/${roleId}`, {headers: authHeader()});
}

export default {
    getListRoles,
    getRole,
    editRole,
    createRole,
    deleteRole
};