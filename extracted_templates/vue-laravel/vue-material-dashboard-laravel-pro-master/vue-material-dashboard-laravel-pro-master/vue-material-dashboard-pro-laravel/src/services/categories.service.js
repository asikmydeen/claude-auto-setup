import axios from 'axios';
import authHeader from './auth-header';
import Jsona from "jsona";

const API_URL = process.env.VUE_APP_API_BASE_URL;
const dataFormatter = new Jsona();

export default {
    async getCategories(params) {
        const response = await axios.get(API_URL + "/categories", { headers: authHeader(), params: params });
        return { data: dataFormatter.deserialize(response.data), meta: response.data.meta?.page };
    },

    async addCategory(category) {
        category.type = "categories"
        const newJson = dataFormatter.serialize({ stuff: category })
        const response = await axios.post(API_URL + "/categories", newJson, { headers: authHeader() });
        return dataFormatter.deserialize(response.data);
    },

    async deleteCategory(categoryId) {
        await axios.delete(API_URL + "/categories/" + categoryId, { headers: authHeader() });
    },

    async getCategory(categoryId) {
        const response = await axios.get(API_URL + "/categories/" + categoryId, { headers: authHeader() });
        return dataFormatter.deserialize(response.data);
    },

    async editCategory(category) {
        category.type = "categories"
        const newJson = dataFormatter.serialize({ stuff: category })
        const response = await axios.patch(API_URL + "/categories/" + category.id, newJson, { headers: authHeader() });
        return dataFormatter.deserialize(response.data);
    },
}




