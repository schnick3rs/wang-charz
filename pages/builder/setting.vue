<template lang="html">

  <v-row justify-center row wrap>

    <v-col :cols="12">

      <h1 class="headline">Character</h1>
      <p>Some Notes on the character</p>

      <v-text-field
        label="Character Name"
        v-bind:value="characterName"
        v-on:input="setCharacterName"
        dense
      />

      <h1 class="headline">Framework</h1>
      <p>Define your campaign framework.</p>

      <v-select
        label="Select a fitting tier"
        :value="settingTier"
        :items="tierSelect.options"
        dense
        @change="setSettingTier"
      />

      <v-select
        v-if="false"
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
        readonly
        hint="Select at least one species"
      />

      <v-select
        v-if="false"
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

      <div v-if="false">

        <h2 class="title">Homebrews</h2>

        <p>Allow specific hombrew content.</p>

        <div
          v-for="homebrew in settingHomebrewOptions"
          v-bind:key="homebrew.key"
        >

          <v-switch
            v-model="enabledHomebrews"
            v-bind:label="homebrew.name"
            v-bind:value="homebrew.key"
            v-on:change="updateHomebrew(homebrew)"
            color="primary"
            class="mt-0 mb-0"
          />

        </div>

      </div>

      <v-card-actions>
        <v-btn
          left
          outlined
          color="red"
          @click="clearState()"
        >
          Fresh Character
        </v-btn>
        <v-spacer/>
        <v-btn
          right
          color="green"
          @click="applySetting()"
        >
          Select Setting
        </v-btn>

      </v-card-actions>
    </v-col>

    <v-col
      v-if="false"
      v-for="item in settingTemplateOptions"
      :key="item.name"
      :cols="12"
      :sm="6"
      :md="4"
      :lg="2"
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
    </v-col>

  </v-row>

</template>

<script lang="js">
import SpeciesRepositoryMixin from '~/mixins/SpeciesRepositoryMixin.js';
import ArchetypeRepositoryMixin from '~/mixins/ArchetypeRepositoryMixin.js';
import { mapGetters } from 'vuex';

export default {
  name: 'Setting',
  layout: 'builder',
  mixins: [SpeciesRepositoryMixin, ArchetypeRepositoryMixin],
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
        },
      },
      tierSelect: {
        // One among billions','stalwart Defenders','Elite Guardians','Heroic Operatives','Agents of Fate
        selected: 1,
        options: [
          { text: '1 - One among billions', value: 1 },
          { text: '2 - Stalwart Defenders', value: 2 },
          { text: '3 - Elite Guardians', value: 3 },
          { text: '4 - Heroic Operatives', value: 4 },
          { text: '5 - Agents of Fate', value: 5 },
        ],
      },
      settingTemplateOptions: [
        { name: 'Custom', recommendedTiers: '1-5', cover: 'https://cdna.artstation.com/p/assets/images/images/011/151/588/large/diego-gisbert-llorens-b-g-cover-1-wip4a.jpg?1528118826' },
        { name: 'Only War', recommendedTiers: '1', cover: 'https://40k.gallery/img/40K-artwork/40K-20170826114311.jpg' },
        { name: 'Dark Heresy', recommendedTiers: '1-3', cover: 'https://www.fantasyflightgames.com/media/ffg_content/Dark-Heresy-2nd/core-book-previews/preview-3/Dark_HeresyII_wip7-Web.jpg' },
        { name: 'Rogue Trader', recommendedTiers: '2-3', cover: 'https://i.pinimg.com/originals/4d/d9/ab/4dd9ab05a6c5dc62a09d61365303c34b.jpg' },
        { name: 'Deathwatch', recommendedTiers: '3-4', cover: 'https://i.pinimg.com/originals/be/09/17/be0917ae8414dbfde3f973d8ba2956bb.jpg' },
        { name: 'Black Crusade', recommendedTiers: '3-4', cover: 'https://warhammerart.com/wp-content/uploads/2018/11/13TH-BLACK-CRUSADE-04.jpg' },
      ],
      settingHomebrewOptions: [
        {
          active: true,
          key: 'dodScumPsyker',
          name: 'Scum Psyker (Doctors of Doom Homebrew)',
          enabled: false,
          source: undefined,
        },
        {
          active: true,
          key: 'agentsOfTheGoldenThrone',
          name: '\'Agents of the Golden Throne\' content (Fan supplement)',
          enabled: false,
          nuxt: '/vault/agents-of-the-golden-throne',
          source: 'https://docs.google.com/document/d/1VkOd-WGTXb_Lygm3BQYHX9eC2WzOczsD1kkG3fy4SIg/edit',
        },
      ],
      enabledHomebrews: [],
    };
  },
  computed: {
    ...mapGetters({
      characterName: 'name',
      settingTier: 'settingTier',
    }),
  },
  methods: {
    setCharacterName(name){
      this.$store.commit('setName', name);
    },
    setSettingTier(event) {
      this.$store.commit('setSettingTier', { amount: event });
    },
    applySetting() {
      this.$store.commit('setSetting', { setting: this.setting });
      this.$router.push({ name: 'builder-char-species' });
    },
    clearState() {
      this.$store.commit('resetState');
    },
    updateHomebrew(homebrew) {
      const enabled = this.enabledHomebrews.includes(homebrew.key);
      if ( enabled ) {
        this.$store.commit('addHomebrewContent', { key: homebrew.key});
      } else {
        this.$store.commit('removeHomebrewContent', { key: homebrew.key});
      }
    },
  },
};
</script>

<style scoped lang="css">

</style>
