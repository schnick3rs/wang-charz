import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from "vue-router";
import SpeciesSelection from "./components/SpeciesSelection";
import ArchetypeSelection from "./components/ArchetypeSelection";
import AttributeSelection from "./components/AttributeSelection";
import SettingSelection from "./components/SettingSelection";

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/', component: SettingSelection},
  { path: '/char/species', component: SpeciesSelection},
  { path: '/char/archetype', component: ArchetypeSelection},
  { path: '/char/attributes', component: AttributeSelection},
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
