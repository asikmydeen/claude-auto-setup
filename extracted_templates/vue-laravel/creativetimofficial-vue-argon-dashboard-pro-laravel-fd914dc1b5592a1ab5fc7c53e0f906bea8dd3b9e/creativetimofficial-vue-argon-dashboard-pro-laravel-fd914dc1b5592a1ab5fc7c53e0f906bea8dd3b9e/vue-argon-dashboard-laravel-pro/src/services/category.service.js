import axios from 'axios';
import authHeader from './auth-header';
import Jsona from "jsona";
import qs from 'qs';

const API_URL = process.env.VUE_APP_API_BASE_URL;

const jsona = new Jsona();

async function getListCategory(params) {
    const response =  await axios.get(`${API_URL}/categories`, { 
        params: params,
        paramsSerializer: params => {
          return qs.stringify(params)
        },
        headers: authHeader()
    });

    return {data: jsona.deserialize(response.data), meta: response.data.meta?.page};
}

async function getCategory(categoryId) {
    const response = await axios.get(`${API_URL}/categories/${categoryId}`, { headers: authHeader() });
    return jsona.deserialize(response.data);
}

async function editCategory(category) {

    const payload = jsona.serialize({
        stuff: category,
        includeNames: []
    });

    const response = await axios.patch(`${API_URL}/categories/${category.id}`, payload, { headers: authHeader() });
    return jsona.deserialize(response.data);
}

async function createCategory(category) {

    const payload = jsona.serialize({
        stuff: category,
        includeNames: []
    });

    const response = await axios.post(`${API_URL}/categories`, payload, { headers: authHeader() });
    return jsona.deserialize(response.data);
}

async function deleteCategory(categoryId) {
    await axios.delete(`${API_URL}/categories/${categoryId}`, { headers: authHeader() });
}

export default {
    getListCategory,
    getCategory,
    editCategory,
    createCategory,
    deleteCategory
};