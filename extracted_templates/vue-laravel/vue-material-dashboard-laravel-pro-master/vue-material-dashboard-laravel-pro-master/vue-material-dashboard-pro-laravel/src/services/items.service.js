import axios from 'axios';
import authHeader from './auth-header';
import Jsona from "jsona";

const API_URL = process.env.VUE_APP_API_BASE_URL;
const dataFormatter = new Jsona();

export default {
    async getItems(options) {
        const response = await axios.get(API_URL + "/items?include=category,tags", { headers: authHeader(), params: options });
        const meta = (dataFormatter.deserialize(response)).meta
        const data = dataFormatter.deserialize(response.data)
        return { data, meta };
    },

    async addItem(item) {
        item.type = "items"
        item.relationshipNames = ['category', 'tags']
        const newJson = dataFormatter.serialize({ stuff: item })
        const response = await axios.post(API_URL + "/items", newJson, { headers: authHeader() });
        return dataFormatter.deserialize(response.data);
    },

    async deleteItem(itemId) {
        await axios.delete(API_URL + "/items/" + itemId, { headers: authHeader() });
    },

    async getItem(itemId) {
        const response = await axios.get(API_URL + "/items/" + itemId + "?include=category,tags", { headers: authHeader() });
        return dataFormatter.deserialize(response.data);
    },

    async editItem(item) {
        item.type = "items"
        item.relationshipNames = ['category', 'tags']
        const newJson = dataFormatter.serialize({ stuff: item })
        const response = await axios.patch(API_URL + "/items/" + item.id, newJson, { headers: authHeader() });
        return dataFormatter.deserialize(response.data);
    },

    async uploadPic(file, itemId) {
        const postUrl = API_URL + "/uploads/items/"+itemId+ "/image";
        const response = await axios.post(postUrl,
            { attachment: file },
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return response.data;
    }
}




