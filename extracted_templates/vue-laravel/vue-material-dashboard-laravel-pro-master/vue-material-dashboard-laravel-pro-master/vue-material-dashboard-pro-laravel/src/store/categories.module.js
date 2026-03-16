/* eslint-disable no-unused-vars */
import categoriesService from '../services/categories.service';

const initialState = { categories: null, category: null};

export const categories = {
    namespaced: true,
    state: initialState,
    actions: {
        async getCategories({ commit }, options) {
            const categories = await categoriesService.getCategories(options);
            commit('getCategoriesSuccess', categories);
        },

        async addCategory({ commit }, newCategory) {
            await categoriesService.addCategory(newCategory);
        },

        async deleteCategory({ commit }, categoryId) {
            await categoriesService.deleteCategory(categoryId);
        },

        async getCategory({ commit }, categoryId) {
            const category = await categoriesService.getCategory(categoryId);
            commit('getCategorySuccess', category)
        },

        async editCategory({ commit }, modifiedCategory) {
            await categoriesService.editCategory(modifiedCategory); 
        },


    },
    mutations: {
        getCategoriesSuccess(state, categories) {
            state.categories = categories;
        },
        getCategorySuccess(state, category) {
            state.category = category;
        },
    },
    getters: {
        getCategoriesData(state) {
            return state.categories?.data;
        },
        getCategoriesMeta(state) {
            return state.categories?.meta;
        },
        getCategory(state){
            return state.category;
        }
    }
}

