<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-layout justify-center row wrap>

    <v-flex xs12 v-if="startingWargear">

      <h1 class="headline">Select starting Wargear</h1>

      <v-card
        v-for="gear in startingWargear.options"
        :key="gear.key"
        class="mb-2"
      >

        <v-card-title>
          <span class="mb-0">{{ gear.name }}</span>
        </v-card-title>

        <v-card-text v-if="gear.options">

          <v-radio-group v-model="gear.selected" class="mt-0">
            <v-radio
              v-for="option in gear.options"
              :key="option.key"
              :label="option.name"
              :value="option.name"
            ></v-radio>
          </v-radio-group>

        </v-card-text>

      </v-card>

      <v-btn
        block
        dense
        color="green"
        @click="addWargearToCharacter(startingWargear.options)"
      >Add starting wargear</v-btn>

    </v-flex>

    <v-flex xs12>

      <h1 class="headline">Manage Wargear</h1>

      <v-list
        two-line
        dense
        v-if="characterWargear"
      >

        <v-list-tile
          v-for="gear in characterWargear"
          @click=""
        >

          <v-list-tile-content>
            <v-list-tile-title>{{gear}}</v-list-tile-title>
            <v-list-tile-sub-title>some • gear • text</v-list-tile-sub-title>
          </v-list-tile-content>


        </v-list-tile>

      </v-list>

    </v-flex>

  </v-layout>

</template>

<script lang="js">
  import axios from 'axios';

  export default {
  name: 'Wargear',
  layout: 'builder',
  props: [],
  async asyncData({ params }) {
    const wargearResponse = await axios.get(`https://api.sheety.co/cd93dfab-c658-4099-8a93-e6cc202b3488`);
    return {
      wargearRepository: wargearResponse.data || [],
    }
  },
  data() {
    return {
      archetypeWargearRepository: [
        {
          name: 'Sister of Battle',
          options: [
            { name: 'Sororitas Power Armour', } ,
            { name: 'Chaplet Ecclisiasticus', },
            {
              name: 'Either a boltgun OR a chainsword and bolt pistol.',
              selected: 'Boltgun',
              options: [
                { name: 'Boltgun', },
                { name: 'Chainsword and Bold pistol',  },
              ],
            },
            { name: 'Clothing (Sororitas vestments)'},
            { name: 'Writing kit'},
            { name: 'Copy of the Rule of the Soroitas'},
          ],
        },
        {
          name: 'Death Cult Assassin',
          options: [
            { name: 'Bodyglove', },
            { name: 'Death Cult Powerblade', },
            { name: 'Death Cult Powerblade', },
            { name: 'Knife', },
            { name: 'Laspistol', },
            { name: 'Doses of stimm', amount: 3, },
          ],
        },
        {
          name: 'Commissar',
          options: [
            { name: 'Flak coat', },
            { name: 'Bold pistol', },
            { name: 'Chain Sword', },
            { name: 'Guard issue mess kit', },
            { name: 'Blanket', },
            { name: 'Grooming kit', },
            { name: 'Uplifting Primer', },
            { name: 'Ration Packs', amount: 3, },
          ],
        },
      ],
    }
  },
  computed: {
    settingTier() { return this.$store.state.settingTier },
    characterArchetypeName() { return this.$store.state.archetype.value; },
    startingWargear() {
      return this.archetypeWargearRepository.find( i => i.name === this.characterArchetypeName );
    },
    characterWargear() {
      return this.$store.state.wargear || [];
    },
  },
  methods: {
    addWargearToCharacter(wargearOptions) {
      let finalWargear = [];

      wargearOptions.forEach( i => {
        if ( i.selected ) {
          if ( i.selected.indexOf(' and ') > 0 ) {
            i.selected.split(' and ').forEach( o => {
              finalWargear.push(o);
            })
          } else {
            finalWargear.push(i.selected);
          }
        } else {
          finalWargear.push(i.name);
        }
      });
      finalWargear.forEach( w => {
        this.$store.commit('addWargear', { name: w } );
      });
    }
  }
}
</script>

<style scoped lang="css">
</style>
