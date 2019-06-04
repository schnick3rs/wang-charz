import Vue from 'vue';
import Vuex from 'vuex';
import './plugins/vuetify';
import App from './App.vue';
import VueRouter from "vue-router";

import SpeciesSelection from "./components/SpeciesSelection";
import ArchetypeSelection from "./components/ArchetypeSelection";
import AttributeSelection from "./components/AttributeSelection";
import SettingSelection from "./components/SettingSelection";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);

const routes = [
  { path: '/', component: SettingSelection},
  { path: '/char/species', component: SpeciesSelection},
  { path: '/char/archetype', component: ArchetypeSelection},
  { path: '/char/attributes', component: AttributeSelection},
];

const router = new VueRouter({
  routes
});

const store = new Vuex.Store({
  state: {
    setting: undefined,
    settingTier: 1,
    species: { value: "Adeptus Astartes", cost: 50 },
    archetype: { value: "Imperial Guardsman", cost: 0 },
  },
  getters: {
    settingTier(state) { return state.settingTier },
    getSpecies(state) { return state.species; },
    remainingBuildPoints(state) { return (state.settingTier * 100) - state.getSpendBuildingPoints; },
    getSpendBuildingPoints(state) {
      let spend = 0;
      spend += state.species.cost;
      spend += state.archetype.cost;
      return spend;
    }
  },
  mutations: {
    setSpecies (state, payload) {
      console.log(payload);
      state.species = payload;
    },
    setArchetype (state, payload) {
      console.log(payload);
      state.archetype = payload;
    },
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
