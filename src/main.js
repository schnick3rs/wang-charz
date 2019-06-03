import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from "vue-router";
import Home from "./components/Home";
import SpeciesSelection from "./components/SpeciesSelection";
import ArchetypeSelection from "./components/ArchetypeSelection";

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home},
  { path: '/char/species', component: SpeciesSelection},
  { path: '/char/archetype', component: ArchetypeSelection}
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
