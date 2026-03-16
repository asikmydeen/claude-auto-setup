import axios from 'axios';
import authHeader from './auth-header';
import Jsona from "jsona";

const API_URL = process.env.VUE_APP_API_BASE_URL;
const dataFormatter = new Jsona();

export default {
    async getTags(params) {
        const response = await axios.get(API_URL + "/tags", { headers: authHeader(), params: params });
        return { data: dataFormatter.deserialize(response.data), meta: response.data.meta?.page };
    },

    async addTag(tag) {
        tag.type = "tags"
        const newJson = dataFormatter.serialize({ stuff: tag })
        const response = await axios.post(API_URL + "/tags", newJson, { headers: authHeader() });
        return dataFormatter.deserialize(response.data);
    },

    async deleteTag(tagId) {
        await axios.delete(API_URL + "/tags/" + tagId, { headers: authHeader() });
    },

    async getTag(tagId) {
        const response = await axios.get(API_URL + "/tags/" + tagId, { headers: authHeader() });
        return dataFormatter.deserialize(response.data);
    },

    async editTag(tag) {
        tag.type = "tags"
        const newJson = dataFormatter.serialize({ stuff: tag })
        const response = await axios.patch(API_URL + "/tags/" + tag.id, newJson, { headers: authHeader() });
        return dataFormatter.deserialize(response.data);
    },
}




