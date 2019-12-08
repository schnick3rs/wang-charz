import Vue from 'vue';

Vue.filter('kebab', (val) => val.toLowerCase().replace(/\W/gm, '-'));
