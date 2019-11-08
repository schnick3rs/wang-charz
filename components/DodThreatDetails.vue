<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-row justify="center">

    <v-col v-bind:cols="12" v-bind:md="12">
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

    <v-col v-bind:cols="12" v-bind:md="5">

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
    <v-col v-bind:cols="12" v-bind:md="11">

      <h4 class="title-1">Attacks</h4>

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
                class="text-left"
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

      </div>

      <div v-if="item.weaponTraits" v-for="weaponTrait in item.weaponTraits" class="pt-2">
        <p><strong>{{ weaponTrait.name }}:</strong> {{ weaponTrait.effect }}</p>
      </div>

    </v-col>

    <!-- Abilities -->
    <v-col v-bind:cols="12" v-bind:md="11">

      <h4>Special Abilities</h4>

      <div v-for="ability in item.specialAbilities">
        <p><strong>{{ ability.name }}:</strong> {{ ability.effect }}</p>
      </div>

    </v-col>

    <v-col v-bind:cols="12" v-bind:md="12">
      <h3 class="title">Description</h3>
      <p v-html="item.description" style="font-style: italic"></p>
    </v-col>

    <!-- Keywords -->
    <v-col v-bind:cols="12">
      <span>Keywords: </span>
      <v-chip v-for="keyword in item.keywords" v-bind:key="keyword" small label class="mr-2 mb-1 mt-1">{{ keyword }}</v-chip>
    </v-col>

  </v-row>

</template>

<script>
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';

export default {
  name: "dod-threat-details",
  mixins: [
    StatRepositoryMixin
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
          { text: 'Name', value: 'name' },
          { text: 'Range', value: 'range' },
          { text: 'Damage', value: 'damage' },
          { text: 'AP', value: 'ap' },
          { text: 'Salvo', value: 'salvo' },
          { text: 'Traits', value: 'traits' },
        ],
      }
    }
  }
}
</script>

<style scoped>

</style>
