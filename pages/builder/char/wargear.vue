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

        <v-card-text v-if="gear.options && gear.options.length == 1 && gear.options[0].query">
          <v-select
            :items="wargearRepository.filter(gear.options[0].query)"
            v-model="gear.selected"
            item-value="name"
            item-text="name"
          ></v-select>

        </v-card-text>

        <v-card-text v-else-if="gear.options">

          <v-radio-group
            v-model="gear.selected"
            class="mt-0"
          >
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
          :key="gear.key"
        >

          <v-list-tile-content>
            <v-list-tile-title>{{gear}}</v-list-tile-title>
            <v-list-tile-sub-title>{{wargearSubtitle(gear)}}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn flat small color="red" @click="remove(gear)">Remove</v-btn>
          </v-list-tile-action>

        </v-list-tile>

      </v-list>

    </v-flex>

  </v-layout>

</template>

<script lang="js">
  import WargearRepositoryMixin from '~/mixins/WargearRepositoryMixin.js';

  export default {
  name: 'Wargear',
  layout: 'builder',
  props: [],
  mixins: [WargearRepositoryMixin],
  data() {
    return {
      archetypeWargearRepository: [
        {
          name: 'Commissar',
          options: [
            { name: 'Flak Coat' },
            { name: 'Bold pistol' },
            { name: 'Chain Sword' },
            { name: 'Guard issue mess kit' },
            { name: 'Blanket' },
            { name: 'Grooming kit' },
            { name: 'Uplifting Primer' },
            { name: 'Ration Packs', amount: 3 },
          ],
        },
        {
          name: 'Imperial Guardsman',
          options: [
            { name: 'Flak Armour' },
            { name: 'Lasgun' },
            { name: 'Knife' },
            { name: 'Guard issue mess kit' },
            { name: 'Blanket' },
            { name: 'Grooming kit' },
            { name: 'Uplifting Primer' },
            { name: 'Ration Packs', amount: 3 },
          ],
        },
        {
          name: 'Tempestus Scion',
          options: [
            { name: 'Carapace Armour' },
            { name: 'Hot-Shot Lasgun' },
            { name: 'Grav-chute' },
            { name: 'Knife' },
            { name: 'Guard issue mess kit' },
            { name: 'Blanket' },
            { name: 'Grooming kit' },
            { name: 'Uplifting Primer' },
            { name: 'Ration Packs', amount: 3 },
          ],
        },
        {
          name: 'Inquisitorial Acolyte',
          options: [
            { name: 'Flak Armour' },
            {
              name: 'Range weapon of value 5 or less of up to Uncommon rarity (must have the Imperium keyword',
              selected: undefined,
              options: [
                {
                  query: item => (
                    item.value <= 5
                      && ['Uncommon'].includes(item.rarity)
                      && item.keywords.split(',').includes('Imperium')
                      && item.type === 'Ranged'
                  ),
                },
              ],
            },
            { name: 'Knife' },
          ],
        },
        {
          name: 'Inquisitorial Adept',
          options: [
            { name: 'Flak Armour' },
            { name: 'Laspistol' },
            { name: 'Knife' },
            { name: 'Auto quill' },
            { name: 'Data-slate' },
            { name: 'Ancient Records', amount: 3 },
          ],
        },
        {
          name: 'Inquisitor',
          options: [
            {
              name: 'Choice of Flak Coat, Ignatus Power Armour or Light Power Armour',
              selected: undefined,
              options: [
                { name: 'Flak Coat' },
                { name: 'Ignatus Power Armour' },
                { name: 'Light Power Armour' },
              ],
            },
            {
              name: 'Ranged weapon up to availability 7 and rarity Very Rare.',
              selected: undefined,
              options: [
                {
                  query: item => (
                    item.value <= 7
                      && ['Uncommon', 'Common', 'Rare', 'Very Rare'].includes(item.rarity)
                      && item.type.includes('Ranged')
                  ),
                },
              ],
            },
            {
              name: 'Melee weapon up to availability 7 and rarity Very Rare.',
              selected: undefined,
              options: [
                {
                  query: item => (
                    item.value <= 7
                      && ['Uncommon', 'Common', 'Rare', 'Very Rare'].includes(item.rarity)
                      && item.type.includes('Melee')
                  ),
                },
              ],
            },
            { name: 'Symbol of authority' },
          ],
        },
        {
          name: 'Rogue Trader',
          options: [
            {
              name: 'Choice of Flak Coat, carapace armour or Light Power Armour',
              selected: undefined,
              options: [
                { name: 'Flak Coat' },
                { name: 'Carapace Armour' },
                { name: 'Light Power Armour' },
              ],
            },
            {
              name: 'Ranged weapon up to value Tier+4 and rarity Rare.',
              selected: undefined,
              options: [
                {
                  query: item => (
                    item.value <= this.settingTier + 4
                      && ['Uncommon', 'Common', 'Rare'].includes(item.rarity)
                      && item.type.includes('Ranged')
                  ),
                },
              ],
            },
            {
              name: 'Melee weapon up to value Tier+4 and rarity Rare.',
              selected: undefined,
              options: [
                {
                  query: item => (
                    item.value <= this.settingTier + 4
                      && ['Uncommon', 'Common', 'Rare'].includes(item.rarity)
                      && item.type.includes('Melee')
                  ),
                },
              ],
            },
            { name: 'Imperial Frigate' },
          ],
        },
        {
          name: 'Sanctioned Psyker',
          options: [
            { name: 'Laspistol' },
            { name: 'Knife' },
            { name: 'Guard issue mess kit' },
            { name: 'Blanket' },
            { name: 'Grooming kit' },
            { name: 'Uplifting Primer' },
            { name: 'Ration Packs', amount: 3 },
          ],
        },
        {
          name: 'Sister of Battle',
          options: [
            { name: 'Sororitas Power Armour' },
            { name: 'Chaplet Ecclisiasticus' },
            {
              name: 'Either a boltgun OR a chainsword and bolt pistol.',
              selected: 'Boltgun',
              options: [
                { name: 'Boltgun' },
                { name: 'Chainsword and Bold pistol' },
              ],
            },
            { name: 'Clothing (Sororitas vestments)' },
            { name: 'Writing kit' },
            { name: 'Copy of the Rule of the Soroitas' },
          ],
        },
        {
          name: 'Death Cult Assassin',
          options: [
            { name: 'Bodyglove' },
            { name: 'Death Cult Powerblade' },
            { name: 'Death Cult Powerblade' },
            { name: 'Knife' },
            { name: 'Laspistol' },
            { name: 'Doses of stimm', amount: 3 },
          ],
        },
      ],
    };
  },
  computed: {
    settingTier() { return this.$store.state.settingTier; },
    characterArchetypeName() { return this.$store.state.archetype.value; },
    startingWargear() {
      return this.archetypeWargearRepository.find(i => i.name === this.characterArchetypeName);
    },
    characterWargear() {
      return this.$store.state.wargear.map(i => i.name);
    },
  },
  methods: {
    addWargearToCharacter(wargearOptions) {
      const finalWargear = [];

      wargearOptions.forEach((i) => {
        if (i.options) {
          if (i.selected) {
            if (i.selected.indexOf(' and ') > 0) {
              i.selected.split(' and ').forEach((o) => {
                finalWargear.push(o);
              });
            } else {
              finalWargear.push(i.selected);
            }
          }
        } else {
          finalWargear.push(i.name);
        }
      });
      finalWargear.forEach((w) => {
        this.$store.commit('addWargear', { name: w });
      });
    },
    wargearSubtitle(gear) {
      const item = this.wargearRepository.find(i => i.name === gear);
      if (item) {
        return `${item.type} • ${item.keywords.split(',').join(' • ')}`;
      }
      return '';
    },
    remove(gear) {
      this.$store.commit('removeWargear', { name: gear });
    },
  },
};
</script>

<style scoped lang="css">
</style>
