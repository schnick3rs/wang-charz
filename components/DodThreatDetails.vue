<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-row justify="center">

    <v-col v-bind:cols="12">
      <h3 class="headline">{{ item.name }}</h3>
    </v-col>

    <!-- Stats -->
    <v-col v-bind:cols="12" v-bind:md="3">

      <v-simple-table dense>

        <template v-slot:default>

          <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
          </tr>
          </thead>

          <tbody>

          <tr
            v-for="(value, key) in item.attributes"
            v-bind:key="key"
          >
            <td>{{ getAttributeByKey(key).name }}</td>
            <td>{{ value }}</td>
          </tr>

          </tbody>

        </template>

      </v-simple-table>

    </v-col>
    <v-col v-bind:cols="12" v-bind:md="6">

      <v-simple-table dense>

        <template v-slot:default>

          <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
          </tr>
          </thead>

          <tbody>

          <tr
            v-for="(value, key) in item.traits"
            v-bind:key="key"
          >
            <td>{{ getTraitByKey(key).name }}</td>
            <td v-if="key==='resilience'">{{ value.total }} ( {{ value.armourRating }} {{ value.armourName }})</td>
            <td v-else>{{ value }}</td>
          </tr>

          </tbody>

        </template>

      </v-simple-table>

    </v-col>
    <v-col v-bind:cols="12" v-bind:md="3">

      <v-simple-table dense>

        <template v-slot:default>

          <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
          </tr>
          </thead>

          <tbody>

          <tr
            v-for="(value, key) in item.skills"
            v-bind:key="key"
          >
            <td v-if="key==='default'">Default</td>
            <td v-else>{{ getSkillByKey(key).name }}</td>
            <td>{{ value }}</td>
          </tr>

          </tbody>

        </template>

      </v-simple-table>

    </v-col>

    <!-- Attacks -->
    <v-col v-bind:cols="12" >

      <h4 class="subtitle-1">Attacks</h4>

      <div>
        <p v-html="item.attackOptions"></p>
      </div>

      <div>

        <v-simple-table dense>

          <template v-slot:default>

            <thead>
            <tr>
              <th
                v-for="header in attacksTable.headers"
                v-bind:key="header.value"
                v-bind:class="header.class"
              >
                {{ header.text }}
              </th>
            </tr>
            </thead>

            <tbody>

            <tr
              v-for="attack in item.attacks"
              v-bind:key="item.label"
            >
              <td class="text-left">{{ attack.name }}</td>
              <td class="text-center">
                <span v-if="attack.range === 1">melee</span>
                <span v-else>{{ attack.range }} m</span>
              </td>
              <td class="text-center">
                <div v-if="attack.damage">
                  <span v-if="item.type==='Melee Weapon'">{{ attack.damage.static }}*</span>
                  <span v-else>{{ attack.damage.static }}</span>
                  <span> + </span>
                  <span>{{ attack.damage.ed }} ED</span>
                </div>
              </td>
              <td class="text-center">
                <span>{{ attack.ap }}</span>
              </td>
              <td class="text-center">
                <span>{{ attack.salvo }}</span>
              </td>
              <td class="text-left">
                <span v-if="attack.traits && attack.traits.length >0">{{ attack.traits.join(', ') }}</span>
              </td>
            </tr>

            </tbody>

          </template>
        </v-simple-table>

        <div class="mt-4">

          <p
            v-for="trait in attackTraitSet"
            v-bind:key="trait"
            v-if="traitByName(trait)"
            class="body-2 mb-2"
          >
            <strong>{{ traitByName(trait).name }}: </strong>
            <span v-if="traitByName(trait).crunch">{{ traitByName(trait).crunch }}</span>
            <span v-else>{{ traitByName(trait).description }}</span>
          </p>

        </div>

      </div>

    </v-col>

    <!-- Abilities -->
    <v-col v-bind:cols="12" >

      <h4 class="subtitle-1">Special Abilities</h4>

      <div v-for="ability in item.specialAbilities">
        <p><strong>{{ ability.name }}:</strong> {{ ability.effect }}</p>
      </div>

    </v-col>

    <v-col v-bind:cols="12" v-if="item.description">
      <h4 class="subtitle-1">Description</h4>
      <p v-html="item.description" style="font-style: italic"></p>
    </v-col>

    <!-- Keywords -->
    <v-col v-bind:cols="12" v-bind:md="9">
      <span>Keywords: </span>
      <v-chip v-for="keyword in item.keywords" v-bind:key="keyword" small label class="mr-2 mb-1 mt-1">{{ keyword }}</v-chip>
    </v-col>
    <v-col v-bind:cols="12" v-bind:md="3" style="font-style: italic">
      <span class="caption">{{ item.source.book }}</span><span class="caption" v-if="item.source.page">, pg. {{ item.source.page }}</span>
    </v-col>

  </v-row>

</template>

<script>
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import WargearTraitRepositoryMixin from '~/mixins/WargearTraitRepositoryMixin';

export default {
  name: "dod-threat-details",
  mixins: [
    StatRepositoryMixin,
    WargearTraitRepositoryMixin,
  ],
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      attacksTable: {
        headers: [
          { text: 'Name', value: 'name', class: 'text-left' },
          { text: 'Range', value: 'range', class: 'text-center' },
          { text: 'Damage', value: 'damage', class: 'text-center' },
          { text: 'AP', value: 'ap', class: 'text-center' },
          { text: 'Salvo', value: 'salvo', class: 'text-center' },
          { text: 'Traits', value: 'traits', class: 'text-left' },
        ],
      }
    }
  },
  methods: {
    traitByName(name) {
      const prefix = name.split(/ ?\(/)[0];
      return this.combinedTraitsRepository.find( item => item.name.indexOf(prefix) >= 0);
    },
  },
  computed: {
    combinedTraitsRepository() {
      return (this.item.attackTraits)
        ? [
          ...this.wargearTraitRepository,
          ...this.item.attackTraits,
        ]
        : this.wargearTraitRepository;
    },
    attackTraitSet() {
      let attackTraitSet = [];
      const item = this.item;

      item.attacks.forEach( attack => {
        if ( attack.traits && attack.traits.length > 0) {
          attackTraitSet = [ ...attackTraitSet, ...attack.traits ];
        }
      });

      return [...new Set(attackTraitSet)].sort();
    },
  }
}
</script>

<style scoped>

</style>
