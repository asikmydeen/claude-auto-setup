/* eslint-disable no-unused-vars */
import itemService from "../services/item.service.js";

export const item = {
    namespaced: true,
    state: {
        itemsList: null,
        oneItem: null,
        image: null,
    },
    getters: {
        itemsList: state => state.itemsList,
        oneItem: state => state.oneItem,
        image: state => state.image,
    },
    actions: {
        async itemsList({ commit }, params) {
            const data = await itemService.getListItems(params);
            commit('ITEMS_LIST', data);
        },
        async getItem({ commit }, itemId) {
            const data = await itemService.getItem(itemId);
            commit('GET_ITEM', data);
        },
        async addItem({ commit }, item) {
            const data = await itemService.createItem(item);
            commit('GET_ITEM', data);
        },
        async editItem({ commit }, item) {
            await itemService.editItem(item);
        },
        async deleteItem({ commit }, itemId) {
            await itemService.deleteItem(itemId);
        },
        async uploadImageItem({ commit }, item) {
            const data = await itemService.uploadImageItem(item);
            commit('UPLOAD_IMAGE_ITEM', data);
        },
    },
    mutations: {
        ITEMS_LIST(state, data) {
            state.itemsList = data;
        },
        GET_ITEM(state, data) {
            state.oneItem = data;
        },
        UPLOAD_IMAGE_ITEM(state, data) {
            state.image = data;
        },
  }
}