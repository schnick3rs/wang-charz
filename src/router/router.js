import Vue from 'vue';
import VueRouter from "vue-router";

import Home from "../components/page/Home";

import SpeciesSelection from "../components/SpeciesSelection";
import ArchetypeSelection from "../components/ArchetypeSelection";
import AttributeSelection from "../components/AttributeSelection";
import SettingSelection from "../components/SettingSelection";
import BackgroundSelection from "../components/BackgroundSelection";
import TalentSelection from "../components/TalentSelection";
import StatsSelection from "../components/StatsSelection";
import AscensionSelection from "../components/AscensionSelection";
import WargearSelection from "../components/WargearSelection";
import ArchetypeManage from "../components/ArchetypeManage";

import AboutView from "../views/AboutView";
import LibraryView from "../views/LibraryView";

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { type: 'home' } },
  { path: '/about', name: 'About', meta: { type: 'page' }, component: AboutView, },


  // Builder
  { path: '/setting', name: 'Setting', meta: { type: 'builder' }, component: SettingSelection, },
  { path: '/char/species', name: 'Species', meta: { type: 'builder' }, component: SpeciesSelection },
  { path: '/char/archetype/select', name: 'Archetype', meta: { type: 'builder' }, component: ArchetypeSelection },
  { path: '/char/archetype/manage', name: 'Manage Archetype', meta: { type: 'builder' }, component: ArchetypeManage },
  { path: '/char/stats', name: 'Stats', meta: { type: 'builder' }, component: StatsSelection },
  { path: '/char/talents', name: 'Talents', meta: { type: 'builder' }, component: TalentSelection },
  { path: '/char/background', name: 'Background', meta: { type: 'builder' }, component: BackgroundSelection },
  { path: '/char/wargear', name: 'Wargear', meta: { type: 'builder' }, component: WargearSelection },
  { path: '/char/ascension', name: 'Ascension', meta: { type: 'builder' }, component: AscensionSelection },
  { path: '/char/psychic-powers', name: 'Psychic Powers', meta: { type: 'builder' }, component: AttributeSelection },

  // Library
  { path: '/library', name: 'Library', meta: { type: 'library' }, component: LibraryView, },
];

export default new VueRouter( { routes } );
