/* eslint-disable no-unused-vars */
import categoryService from "../services/category.service.js";

export const category = {
    namespaced: true,
    state: {
        categoryList: null,
        oneCategory: null,
    },
    getters: {
        categoryList: state => state.categorysList,
        oneCategory: state => state.oneCategory,
    },
    actions: {
        async categoryList({ commit }, params) {
            const data = await categoryService.getListCategory(params);
            commit('CATEGORYS_LIST', data);
        },
        async getCategory({ commit }, categoryId) {
            const data = await categoryService.getCategory(categoryId);
            commit('GET_CATEGORY', data);
        },
        async addCategory({ commit }, category) {
            await categoryService.createCategory(category);
        },
        async editCategory({ commit }, category) {
            await categoryService.editCategory(category);
        },
        async deleteCategory({ commit }, categoryId) {
            await categoryService.deleteCategory(categoryId);
        },
    },
    mutations: {
        CATEGORYS_LIST(state, data) {
            state.categorysList = data;
        },
        GET_CATEGORY(state, data) {
            state.oneCategory = data;
        }
    }
}