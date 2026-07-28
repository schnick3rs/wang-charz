
<template>

  <div v-show="tabs.some(i => i === selection) && myFilter.length > 0">

    <div class="mb-1" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
      <span class="body-2 red--text">{{ header }}</span>
    </div>

    <div
        v-for="gearItem in myFilter"
        :key="gearItem.id"
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

      <p v-if="gearItem.snippet" class="mb-1">{{ gearItem.snippet }}</p>
      <div v-else class="mb-1" v-html="gearItem.description"></div>

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
  },
  computed: {
    tabs() {
      return [
          'all',
          this.tabName
      ]
    }
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
  }
})
</script>