import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import Vuex from 'vuex';
import MainContainer from './MainContainer.vue';
import {
    fetchCategories, pushCategory,
    fetchBooks, pushBook
} from './service';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        categories: [],
        books: []
    },
    getters: {
        categories: state => state.categories,
        books: state => state.books
    },
    mutations: {
        setCategories: (state, payload) => {
            state.categories = payload.categories;
        },
        setBooks: (state, payload) => {
            state.books = payload.books;
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
        },
        initBooks: async ({commit}) => {
            const resp = await fetchBooks();
            commit('setBooks', {books: resp.data});
        },
        setBooks: async ({dispatch}, newBook) => {
            const resp = await pushBook(newBook.file, newBook.thumb);
            console.log(resp);
            dispatch('initBooks');
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