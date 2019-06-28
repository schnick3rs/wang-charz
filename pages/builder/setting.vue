<template lang="html">

  <v-layout justify-center row wrap>

    <v-flex xs12>

      <h1 class="headline">Campaign Tier</h1>
      <p>Define your campaign framework.</p>

      <v-select
        label="Select a fitting tier"
        :value="settingTier"
        :items="tierSelect.options"
        box
        dense
        @change="setSettingTier"
      />

      <v-select
        label="Allowed Species"
        :value="speciesRepository.map( s => s.name )"
        :items="speciesRepository"
        item-text="name"
        item-value="name"
        dense
        box
        multiple
        chips
        deletable-chips
        hint="Select at least one species"
      />

      <v-select
        label="Excluded Archetypes"
        :items="archetypeRepository"
        item-text="name"
        item-value="name"
        chips
        dense
        box
        multiple
        deletable-chips
        disabled
        hint="Select Archetypes that are not allowed to pick."
        persistent-hint
      />

      <h2 class="headline">Homebrews</h2>

      <p>Allow specific hombrew content.</p>

      <v-switch
        v-model="setting.sources.content.allowAgentsOfTheThrone"
        label="'Agents of the Golden Throne' fan supplement"
        color="primary"
      />
      <a v-if="false" href="https://docs.google.com/document/d/1VkOd-WGTXb_Lygm3BQYHX9eC2WzOczsD1kkG3fy4SIg/edit">Agents of the Golden Throne Homebrew</a>

      <v-card-actions>
        <v-btn block color="green" @click="applySetting()">
          Select Setting
        </v-btn>
      </v-card-actions>
    </v-flex>

    <v-flex v-if="false"
      v-for="item in settingTemplateOptions"
      :key="item.name"
      xs12
      sm6
      md4
      lg2
    >
      <v-card>
        <v-img v-if="false" :src="item.cover" height="150" />
        <v-card-title primary-title>
          <h3 class="title">
            {{ item.name }}
          </h3>
        </v-card-title>
        <v-card-text>
          <v-subheader>Recommended Tier: {{ item.recommendedTiers }}</v-subheader>
        </v-card-text>
        <v-card-actions>
          <v-btn>Select</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="js">
  import ArchetypeRepositoryMixin from '~/mixins/ArchetypeRepositoryMixin'

  import axios from 'axios'

  export default {
  name: 'Setting',
  layout: 'builder',
  mixins: [ ArchetypeRepositoryMixin ],
  props: [],
  data() {
    return {
      currentPage: 1,
      setting: {
        name: '',
        tier: 3,
        species: { exclude: [] },
        archetypes: { exclude: [] },
        sources: {
          isAllowHomebrews: false,
          content: {
            allowAgentsOfTheThrone: false
          }
        }
      },
      tierSelect: {
        // One among billions','stalwart Defenders','Elite Guardians','Heroic Operatives','Agents of Fate
        selected: 1,
        options: [
          { text: '1 - One among billions', value: 1 },
          { text: '2 - Stalwart Defenders', value: 2 },
          { text: '3 - Elite Guardians', value: 3 },
          { text: '4 - Heroic Operatives', value: 4 },
          { text: '5 - Agents of Fate', value: 5 }
        ]
      },
      settingTemplateOptions: [
        { name: 'Custom', recommendedTiers: '1-5', cover: 'https://cdna.artstation.com/p/assets/images/images/011/151/588/large/diego-gisbert-llorens-b-g-cover-1-wip4a.jpg?1528118826' },
        { name: 'Only War', recommendedTiers: '1', cover: 'https://40k.gallery/img/40K-artwork/40K-20170826114311.jpg' },
        { name: 'Dark Heresy', recommendedTiers: '1-3', cover: 'https://www.fantasyflightgames.com/media/ffg_content/Dark-Heresy-2nd/core-book-previews/preview-3/Dark_HeresyII_wip7-Web.jpg' },
        { name: 'Rogue Trader', recommendedTiers: '2-3', cover: 'https://i.pinimg.com/originals/4d/d9/ab/4dd9ab05a6c5dc62a09d61365303c34b.jpg' },
        { name: 'Deathwatch', recommendedTiers: '3-4', cover: 'https://i.pinimg.com/originals/be/09/17/be0917ae8414dbfde3f973d8ba2956bb.jpg' },
        { name: 'Black Crusade', recommendedTiers: '3-4', cover: 'https://warhammerart.com/wp-content/uploads/2018/11/13TH-BLACK-CRUSADE-04.jpg' }
      ]
    }
  },
  computed: {
    settingTier() { return this.$store.state.settingTier }
  },
  async asyncData({ params }) {
    const speciesResponse = await
    axios.get(`https://api.sheety.co/04c8f13a-c4ed-4f05-adad-7cf11db62151`)
    const speciesAbilitiesResponse = await
    axios.get(`https://api.sheety.co/a192e4d5-a73f-46c0-929e-f3eca3dde0a0`)
    return {
      speciesRepository: speciesResponse.data || [],
      speciesAbilitiesRepository: speciesAbilitiesResponse.data || []
    }
  },
  methods: {
    setSettingTier(event) {
      this.$store.commit('setSettingTier', { amount: event })
    },
    applySetting() {
      this.$store.commit('setSetting', { setting: this.setting });
      this.$router.push({ name: 'builder-char-species' });

    }
  }
}
</script>

<style scoped lang="css">

</style>
