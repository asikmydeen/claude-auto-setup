import axios from 'axios';
import authHeader from './auth-header';
import Jsona from "jsona";

const API_URL = process.env.VUE_APP_API_BASE_URL;
const dataFormatter = new Jsona();

export default {
    async getUsers(params) {
        const response = await axios.get(API_URL + "/users?include=roles", { headers: authHeader(), params: params });
        return { data: dataFormatter.deserialize(response.data), meta: response.data.meta.page };
    },

    async addUser(user) {
        user.type = "users"
        user.relationshipNames=['roles']

        const newJson = dataFormatter.serialize({ stuff: user })
        const response = await axios.post(API_URL + "/users", newJson, { headers: authHeader() });
        return dataFormatter.deserialize(response.data);
    },

    async deleteUser(userId) {
        await axios.delete(API_URL + "/users/" + userId, { headers: authHeader() });
    },

    async getUser(userId) {
        const response = await axios.get(API_URL + "/users/" + userId + "?include=roles", { headers: authHeader() });
        return dataFormatter.deserialize(response.data);
    },

    async editUser(user) {
        user.type = "users"
        const newJson = dataFormatter.serialize({ stuff: user })
        const response = await axios.patch(API_URL + "/users/" + user.id + "?include=roles", newJson, { headers: authHeader() });
        return dataFormatter.deserialize(response.data);
    },

    async uploadPic(pic, userId) {
        const postUrl = API_URL + "/uploads/users/" + userId + "/profile-image";
        const response = await axios.post(postUrl,
          { attachment: pic },
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return response.data;
      }
}




