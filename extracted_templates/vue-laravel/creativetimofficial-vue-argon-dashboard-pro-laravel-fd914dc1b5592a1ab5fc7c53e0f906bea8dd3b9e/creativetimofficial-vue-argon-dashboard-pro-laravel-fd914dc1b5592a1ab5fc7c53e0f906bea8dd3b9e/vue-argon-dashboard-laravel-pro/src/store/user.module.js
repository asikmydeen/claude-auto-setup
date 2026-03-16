/* eslint-disable no-unused-vars */
import userService from "../services/user.service.js";

export const user = {
    namespaced: true,
    state: {
        users: null,
        user: null,
        imageProfile: null
    },
    getters: {
        users: state => state.users,
        user: state => state.user,
        imageProfile: state => state.imageProfile,
    },
    actions: {
        async getUsers({ commit }, params) {
            const data = await userService.getUsers(params);
            commit('LIST_USERS', data);
        },

        async getUser({ commit }, userID) {
            const data = await userService.getUser(userID);
            commit('GET_USER', data);
        },

        async createUser({ commit }, newUser) {
            const data = await userService.createUser(newUser);
            commit('GET_USER', data);
        },

        async updateUser({ commit }, updateUser) {
            await userService.updateUser(updateUser);
        },
        async deleteUser({ commit }, userid) {
            await userService.deleteUser(userid);
        },

        async uploadImageProfile({ commit }, file) {
            const data = await userService.uploadImageProfile(file);
            commit('UPLOAD_IMAGE_PROFILE', data);
        },
    },
    mutations: {
        LIST_USERS(state, data) {
            state.users = data;
        },
        GET_USER(state, data) {
            state.user = data;
        },
        UPLOAD_IMAGE_PROFILE(state, data) {
            state.imageProfile = data;
        },
    }
}