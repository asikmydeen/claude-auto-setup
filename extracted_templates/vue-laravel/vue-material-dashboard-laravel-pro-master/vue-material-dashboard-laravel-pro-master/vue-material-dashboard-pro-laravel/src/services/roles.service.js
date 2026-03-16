import axios from 'axios';
import authHeader from './auth-header';
import Jsona from "jsona"

const API_URL = process.env.VUE_APP_API_BASE_URL;
const dataFormatter = new Jsona();
export default  {

  async getRoles(params) {
    const response = await axios.get(API_URL + "/roles", { headers: authHeader(), params: params });
    return {data: dataFormatter.deserialize(response.data), meta: response.data.meta?.page};
  },

  async getRole(roleId) {
    const response = await axios.get(API_URL + "/roles/" + roleId, { headers: authHeader() });
    const role = dataFormatter.deserialize(response.data)
    return role;

  },

  async addRole(role) {

    role.type = "roles"
    const newJson = dataFormatter.serialize({ stuff: role })
    const response = await axios.post(API_URL + "/roles", newJson, { headers: authHeader() });
    const newRole = dataFormatter.deserialize(response.data)
    return newRole;

  },

  async deleteRole(roleId) {

    const response = await axios.delete(API_URL + "/roles/" + roleId, { headers: authHeader() });
    return dataFormatter.deserialize(response.data)

  },

  async editRole(role) {

    role.type = "roles"
    const newJson = dataFormatter.serialize({ stuff: role })
    const response = await axios.patch(API_URL + "/roles/" + role.id, newJson, { headers: authHeader() });
    const modifiedRole = dataFormatter.deserialize(response.data)
    return modifiedRole;

  }
}
