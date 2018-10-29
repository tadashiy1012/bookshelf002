import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import Vuex from 'vuex';
import MainContainer from './MainContainer.vue';
import {fetchCategories, pushCategory} from './service';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        categories: []
    },
    getters: {
        categories: state => state.categories
    },
    mutations: {
        setCategories: (state, payload) => {
            state.categories = payload.categories
        }
    },
    actions: {
        initCategories: async ({commit}) => {
            const resp = await fetchCategories();
            commit('setCategories', {categories: resp.data});
        },
        setCategories: async ({dispatch}, newCategory) => {
            const resp = await pushCategory(newCategory);
            console.log(resp);
            dispatch('initCategories');
        }
    }
});

const app = new Vue({
    el: '#app',
    template: '<main-container />',
    components: {
        MainContainer
    },
    store,
    created: function() {
        this.$store.dispatch('initCategories');
    }
});

console.log(app);