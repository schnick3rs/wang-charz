
<template>

  <div v-show="tabs.some(i => i === selection) && myFilter.length > 0">

    <div class="mb-1" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
      <span class="body-2 red--text">{{ header }}</span>
    </div>

    <div
        v-for="gearItem in myFilter"
        :key="gearItem.id"
        class="mb-1"
    >
      <div v-if="gearItem.variant" style="display: inline;">
        <strong >{{ gearItem.variant }}</strong>
        <span> ({{ gearItem.name }})</span>
      </div>
      <strong v-else>{{ gearItem.name }}</strong>
      <em v-if="gearItem.type"> • {{gearItem.type}}</em>
      <span v-if="gearItem.source">
                        <em v-if="gearItem.source.key"> • {{ gearItem.source.key }}</em><em v-if="!isNaN(gearItem.source.page)">, pg. {{ gearItem.source.page }}</em>
                      </span>

      <div v-if="gearItem.description" class="small" v-html="computeFormatedText(gearItem.description)"></div>
      <p v-else-if="gearItem.snippet" class="mb-1" v-html="computeFormatedText(gearItem.snippet)"></p>

      <div
          v-if="gearItem.meta !== undefined && gearItem.meta.length > 0 && ['armour'].includes(gearItem.meta[0].type)"
      >
        <p
            v-for="trait in gearItem.meta[0].traits" v-if="traitByName(trait, true)"
            :key="trait"
            class="ml-1 pl-2 mb-1"
            style="border-left: solid 3px lightgrey;"
        >
          <strong>{{ trait }}: </strong>
          {{ traitByName(trait, true).crunch }}
        </p>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import WargearTraitRepositoryMixin from '~/mixins/WargearTraitRepositoryMixin';

export default defineComponent({
  name: "WargearTabContent",
  mixins: [
    WargearTraitRepositoryMixin,
  ],
  props: {
    header: String,
    tabName: String,
    myFilter: Array,
    selection: String,
    wargear: Array,
    rank: {
      type: Number,
      default: () => 1,
    }
  },
  computed: {
    tabs() {
      return [
          'all',
          this.tabName
      ]
    },
  },
  methods: {
    traitByName(name, withParanteris) {
      let traitName = name;
      if ( withParanteris ) {
        // weaponsTraitSet = weaponsTraitSet.map((t) => t.split(/ ?\(/)[0]);
        traitName = traitName.split(/ ?\(/)[0];
      }
      // return this.combinedTraitsRepository.find( item => item.name.indexOf(prefix) >= 0);
      return this.wargearTraitRepository.find((item) => item.name === traitName);
    },
    computeFormatedText(text) {
      if ( text === undefined ) {
        return text;
      }
      const rank = this.rank;
      let computed = text;

      // computed = computed.replace(/(1d3\+Rank Shock)/g, `<strong>1d3+${rank} Shock</strong>`);
      computed = computed.replace(/(\d+) Faith/g, '<em>$1 Faith</em>');
      computed = computed.replace(/(\d+ meters)/g, '<strong>$1</strong>');
      computed = computed.replace(/(\d+ metres)/g, '<strong>$1</strong>');
      computed = computed.replace(/15 \+Rank metres/g, `<strong title="15 +Rank meters">${15 + rank} meters</strong>`);
      computed = computed.replace(/15 \+Rank meters/g, `<strong title="15 +Rank meters">${15 + rank} meters</strong>`);
      computed = computed.replace(/15\+Double Rank metres/g, `<strong>${15 + (2*rank)} metres</strong>`);
      computed = computed.replace(/1\+Rank/g, `<strong>${(rank)+1}</strong>`);
      computed = computed.replace(/2\+Rank/g, `<strong>${(rank)+2}</strong>`);
      computed = computed.replace(/1\+Double Rank/g, `<strong>+${(2*rank)+1}</strong>`);
      computed = computed.replace(/2\+Double Rank/g, `<strong>${(2*rank)+2}</strong>`);
      computed = computed.replace(/3\+Double Rank/g, `<strong>${(2*rank)+3}</strong>`);
      computed = computed.replace(/15\+Double Rank/g, `<strong>${(2*rank)+15}</strong>`);
      computed = computed.replace(/20\+Double Rank/g, `<strong>${(2*rank)+20}</strong>`);
      computed = computed.replace(/\+Rank/g, `<strong>+${rank}</strong>`);
      computed = computed.replace(/\+Double Rank/g, `<strong>+${2*rank}</strong>`);
      computed = computed.replace(/10 ?x ?Rank/g, `<strong>${10*rank}</strong>`);
      computed = computed.replace(/10 ?x ?Double Rank/g, `<strong>${10*2*rank}</strong>`);
      computed = computed.replace(/ Double Rank/g, ` <strong>${2*rank}</strong>`);

      return computed;
    },
  }
})
</script>

<style lang="scss">
.small > p {
  margin-bottom: 0;
}
</style>