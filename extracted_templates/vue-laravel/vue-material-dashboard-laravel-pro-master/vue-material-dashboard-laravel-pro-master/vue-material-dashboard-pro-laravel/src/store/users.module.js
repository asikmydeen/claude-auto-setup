/* eslint-disable no-unused-vars */
import usersService from '../services/users.service';

const initialState = { users: null, user: null };

export const users = {
    namespaced: true,
    state: initialState,
    actions: {
        async getUsers({ commit }, options) {
            const users = await usersService.getUsers(options);
            commit('getUsersSuccess', users);
        },

        async addUser({ commit }, newUser) {
            const user = await usersService.addUser(newUser);
            commit('getUserSuccess', user);
        },

        async deleteUser({ commit }, userId) {
            await usersService.deleteUser(userId);
        },


        async getUser({ commit }, userId) {
            const user = await usersService.getUser(userId);
            commit('getUserSuccess', user);
        },

        async editUser({ commit }, modifiedUser) {
            await usersService.editUser(modifiedUser); 
        },

        async uploadPic({ commit }, file) {
            const picURL = (await usersService.uploadPic(file, this.state.users.user.id)).url;
            commit('successUpload', picURL);
         },


    },
    mutations: {
        getUsersSuccess(state, users) {
            state.users = users;
        },
        successUpload(state, picURL){
            state.user.profile_image = picURL;
        },
        getUserSuccess(state,user){
            state.user = user;
        }

    },
    getters: {
        getUsersData(state) {
            return state.users?.data;
        },
        getUsersMeta(state) {
            return state.users?.meta;
        },
        getUser(state){
            return state.user
        },
        getImage(state){
            return state.user.profile_image
        },
    }
}

