<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th
              v-for="header in headers"
              v-if="header.value !== 'salvo' || !isMelee"
              :key="header.value"
              :class="header.class"
            >
              {{ header.text }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td class="text-left">
              {{ name }}
            </td>
            <td class="text-center">
              <span v-if="['*','-'].includes(stats.range)">*</span>
              <span v-else-if="stats.range === 0">melee</span>
              <span v-else-if="stats.range === 1">melee</span>
              <span v-else-if="stats.range === 2">2</span>
              <span v-else>{{ stats.range/2 }} | {{ stats.range }} | {{ stats.range*1.5 }}</span>
            </td>
            <td class="text-center">
              <div v-if="stats.damage.static === '*'">
                <span>*</span>
              </div>
              <div v-else-if="stats.damage">
                <span v-if="isMelee">STR+{{ stats.damage.static }}</span>
                <span v-else>{{ stats.damage.static }}</span>
                <span> + </span>
                <span>{{ stats.damage.ed }} ED</span>
              </div>
            </td>
            <td class="text-center">
              <span>{{ stats.ap }}</span>
            </td>
            <td v-if="!isMelee" class="text-center">
              <span>{{ stats.salvo }}</span>
            </td>
            <td class="text-left">
              <span v-if="stats.traits && stats.traits.length >0">{{ stats.traits.join(', ') }}</span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div v-if="showTraits" class="mt-4">
      <div
        v-for="trait in stats.traits"
        v-if="traitByName(trait)"
        :key="trait"
        class="mb-3"
      >
        <strong>{{ traitByName(trait).name }}</strong>
        <div v-html="traitByName(trait).description"></div>
      </div>
    </div>
  </div>
</template>

<script>
import WargearTraitRepositoryMixin from '~/mixins/WargearTraitRepositoryMixin';

export default {
  name: 'DodSimpleWeaponStats',
  mixins: [WargearTraitRepositoryMixin],
  props: {
    name: {
      type: String,
      required: true,
    },
    stats: {
      type: Object,
      required: true,
    },
    showTraits: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'Name', value: 'name', class: 'text-left', align: 'left',
        },
        {
          text: 'Range', value: 'range', class: 'text-center', align: 'center',
        },
        {
          text: 'Damage', value: 'damage', class: 'text-center', align: 'center',
        },
        {
          text: 'AP', value: 'ap', class: 'text-center', align: 'center',
        },
        {
          text: 'Salvo', value: 'salvo', class: 'text-center', align: 'center',
        },
        {
          text: 'Traits', value: 'traits', class: 'text-left', align: 'left',
        },
      ],
    };
  },
  computed: {
    isMelee() {
      return this.stats.type === 'melee-weapon';
    },
  },
  methods: {
    traitByName(name) {
      const prefix = name.split('(')[0];
      return this.wargearTraitRepository.find((item) => item.name.includes(prefix));
    },
  },
};
</script>

<style scoped>

</style>
