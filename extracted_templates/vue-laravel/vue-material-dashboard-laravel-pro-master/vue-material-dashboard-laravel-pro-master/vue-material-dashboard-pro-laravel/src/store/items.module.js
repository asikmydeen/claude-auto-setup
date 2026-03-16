/* eslint-disable no-unused-vars */
import itemsService from '../services/items.service';

const initialState = { items: null, item: null};

export const items = {
    namespaced: true,
    state: initialState,
    actions: {
        async getItems({ commit }, options) {
            const items = await itemsService.getItems(options);
            commit('getItemsSuccess', items);
        },

        async addItem({ commit }, newItem) {
            const item =  await itemsService.addItem(newItem);
            commit('getItemSuccess', item);
        },

        async deleteItem({ commit }, itemId) {
            await itemsService.deleteItem(itemId);
        },


        async getItem({ commit }, itemId) {
            const item = await itemsService.getItem(itemId);
            commit('getItemSuccess', item);
        },

        async editItem({ commit }, modifiedItem) {
            await itemsService.editItem(modifiedItem);
        },


        async uploadPic({ commit }, file) {
            const picURL = (await itemsService.uploadPic(file, this.state.items.item.id)).url;
            commit('successUpload', picURL);
        }


    },
    mutations: {
        getItemsSuccess(state, items) {
            state.items = items;
        },
        getItemSuccess(state, item) {
            state.item = item;
        },
        successUpload(state, picURL) {
            state.item.image = picURL;
        },
    },
    getters: {
        getItemsData(state) {
            return state.items?.data;
        },
        getItemsMeta(state) {
            return state.items?.meta.page;
        },
        getItem(state) {
            return state.item;
        },
        getImage(state){
            return state.item.image;
        },
        getId(state){
            return state.item.id;
        }

    }
}

