require('./bootstrap');

window.Vue = require('vue');

Vue.component('pagination', require('laravel-vue-pagination'));
Vue.component('products-list', require('./components/ProductsList.vue').default);

const app = new Vue({
    el: '#app',
});