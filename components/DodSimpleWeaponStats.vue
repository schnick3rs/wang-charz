<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>

    <v-simple-table dense>

      <template v-slot:default>

        <thead>
        <tr>
          <th
            v-if="header.value !== 'salvo' || !isMelee"
            v-for="header in headers"
            v-bind:key="header.value"
            v-bind:class="header.class"
          >
            {{ header.text }}
          </th>
        </tr>
        </thead>

        <tbody>

        <tr>
          <td class="text-left">{{ name }}</td>
          <td class="text-center">
            <span v-if="stats.range === 1">melee</span>
            <span v-else>{{ stats.range }} m</span>
          </td>
          <td class="text-center">
            <div v-if="stats.damage">
              <span v-if="isMelee">STR+{{ stats.damage.static }}</span>
              <span v-else>{{ stats.damage.static }}</span>
              <span> + </span>
              <span>{{ stats.damage.ed }} ED</span>
            </div>
          </td>
          <td class="text-center">
            <span>{{ stats.ap }}</span>
          </td>
          <td class="text-center" v-if="!isMelee">
            <span>{{ stats.salvo }}</span>
          </td>
          <td class="text-left">
            <span v-if="stats.traits && stats.traits.length >0">{{ stats.traits.join(', ') }}</span>
          </td>
        </tr>

        </tbody>

      </template>

    </v-simple-table>

    <div class="mt-4">

      <p
        v-for="trait in stats.traits"
        v-bind:key="trait"
        v-if="traitByName(trait)"
      >
        <strong>{{ traitByName(trait).name }}: </strong>
        {{ traitByName(trait).description }}
      </p>

    </div>

  </div>

</template>

<script>
import WargearTraitRepositoryMixin from '~/mixins/WargearTraitRepositoryMixin';

export default {
  name: "dod-simple-weapon-stats",
  mixins: [ WargearTraitRepositoryMixin ],
  props: {
    name: {
      type: String,
      required: true,
    },
    stats: {
      type: Object,
      required: true,
    },
    'show-traits': {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name', class: 'text-left', align: 'left' },
        { text: 'Range', value: 'range', class: 'text-center', align: 'center' },
        { text: 'Damage', value: 'damage', class: 'text-center', align: 'center' },
        { text: 'AP', value: 'ap', class: 'text-center', align: 'center' },
        { text: 'Salvo', value: 'salvo', class: 'text-center', align: 'center' },
        { text: 'Traits', value: 'traits', class: 'text-left', align: 'left' },
      ],
    }
  },
  computed: {
    isMelee() {
      return this.stats.type === 'melee-weapon'
    }
  },
  methods: {
    traitByName(name) {
      const prefix = name.split('(')[0];
      return this.wargearTraitRepository.find( item => item.name.indexOf(prefix) >= 0);
    },
  },
}
</script>

<style scoped>

</style>
