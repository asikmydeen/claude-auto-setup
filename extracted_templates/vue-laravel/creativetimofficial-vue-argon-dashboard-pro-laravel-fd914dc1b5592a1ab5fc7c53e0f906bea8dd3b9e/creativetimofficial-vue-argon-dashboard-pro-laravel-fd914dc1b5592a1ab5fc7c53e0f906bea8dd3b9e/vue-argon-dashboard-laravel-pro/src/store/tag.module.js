/* eslint-disable no-unused-vars */
import tagService from "../services/tag.service.js";

export const tag = {
    namespaced: true,
    state: {
        tagsList: null,
        oneTag: null,
    },
    getters: {
        tagsList: state => state.tagsList,
        oneTag: state => state.oneTag,
    },
    actions: {
        async tagsList({ commit }, params) {
            const data = await tagService.getListTags(params);
            commit('TAGS_LIST', data);
        },
        async getTag({ commit }, tagId) {
            const data = await tagService.getTag(tagId);
            commit('GET_TAG', data);
        },
        async addTag({ commit }, tag) {
            await tagService.createTag(tag);
        },
        async editTag({ commit }, tag) {
            await tagService.editTag(tag);
        },
        async deleteTag({ commit }, tagId) {
            await tagService.deleteTag(tagId);
        },
    },
    mutations: {
        TAGS_LIST(state, data) {
            state.tagsList = data;
        },
        GET_TAG(state, data) {
            state.oneTag = data;
        },
  }
}