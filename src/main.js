import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import MainContainer from './MainContainer.vue';

const app = new Vue({
    el: '#app',
    template: '<main-container />',
    components: {
        MainContainer
    }
});

console.log(app);