/* eslint-disable no-unused-vars */
import roleService from "../services/role.service.js";

export const role = {
    namespaced: true,
    state: {
        rolesList: null,
        oneRole: null,
    },
    getters: {
        rolesList: state => state.rolesList,
        oneRole: state => state.oneRole,
    },
    actions: {
        async rolesList({ commit }, params) {
            const data = await roleService.getListRoles(params);
            commit('ROLES_LIST', data);
        },
        async getRole({ commit }, roleId) {
            const data = await roleService.getRole(roleId);
            commit('GET_ROLE', data);
        },
        async addRole({ commit }, roleName) {
            await roleService.createRole(roleName);
        },
        async editRole({ commit }, roleName) {
            await roleService.editRole(roleName);
        },
        async deleteRole({ commit }, roleId) {
            await roleService.deleteRole(roleId);
        },
    },
    mutations: {
        ROLES_LIST(state, data) {
            state.rolesList = data;
        },
        GET_ROLE(state, data) {
            state.oneRole = data;
        },
  }
}