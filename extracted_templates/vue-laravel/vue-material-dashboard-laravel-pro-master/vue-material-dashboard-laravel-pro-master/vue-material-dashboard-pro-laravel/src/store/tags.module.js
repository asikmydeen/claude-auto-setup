/* eslint-disable no-unused-vars */
import tagsService from '../services/tags.service';

const initialState = { tags: null, tag: null };

export const tags = {
    namespaced: true,
    state: initialState,
    actions: {
        async getTags({ commit }, options) {
            const tags = await tagsService.getTags(options);
            commit('getTagsSuccess', tags);
        },

        async addTag({ commit }, newTag) {
            await tagsService.addTag(newTag);
        },

        async deleteTag({ commit }, tagId) {
            await tagsService.deleteTag(tagId);
        },

        async getTag({ commit }, tagId) {
            const tag = await tagsService.getTag(tagId);
            commit('getTagSuccess', tag);
        },

        async editTag({ commit }, modifiedTag) {
            await tagsService.editTag(modifiedTag); 
        },


    },
    mutations: {
        getTagsSuccess(state, tags) {
            state.tags = tags;
        },
        getTagSuccess(state, tag) {
            state.tag = tag;
        },
    },
    getters: {
        getTagsData(state) {
            return state.tags?.data;
        },
        getTagsMeta(state) {
            return state.tags?.meta;
        },
        getTag(state){
            return state.tag;
        }
    }
}

