/* eslint-disable no-unused-vars */
import rolesService from '../services/roles.service';

const initialState = { roles: null, role: null };

export const roles = {
    namespaced: true,
    state: initialState,
    actions: {
        async getRoles({ commit }, options) {
            const roles = await rolesService.getRoles(options);
            commit('getRolesSuccess', roles);
        },
        async deleteRole({ commit }, roleId) {
            await rolesService.deleteRole(roleId);

        },
        async editRole({ commit }, modifiedRole) {
            await rolesService.editRole(modifiedRole);
        },
        async addRole({ commit }, newRole) {
            await rolesService.addRole(newRole);
        },

        async getRole({ commit }, roleId) {
            const role = await rolesService.getRole(roleId);
            commit('getRoleSuccess', role)
        },

    },
    mutations: {
        getRolesSuccess(state, roles) {
            state.roles = roles;
        },
        getRoleSuccess(state, role) {
            state.role = role;
        },
    },
    getters: {
        getRolesData(state) {
            return state.roles?.data;
        },
        getRolesMeta(state) {
            return state.roles?.meta;
        },
        getRole(state){
            return state.role;
        }
    }
};