<template lang="html">
  <v-row justify="center">
    <v-col :cols="12" :sm="6">
      <h2 class="headline">
        Character
      </h2>
      <p>Some Notes on the character</p>

      <v-text-field
        label="Character Name"
        :value="characterName"
        dense
        filled
        @input="setCharacterName"
      />

      <v-text-field
        :value="customXp"
        class="pb-2"
        label="Additional eXperience Points"
        hint="Add the XP earend by playing the game. Usually granted by the GM."
        dense
        filled
        persistent-hint
        type="number"
        @input="setCustomXp"
      />

      <v-text-field
        :value="characterCustomRank"
        class="pb-2"
        label="Rank"
        hint="Set your Characters Rank, usually between 1-5."
        dense
        filled
        persistent-hint
        type="number"
        @input="setCustomRank"
      />

      <v-slider
        v-if="false"
        :min="1"
        :max="5"
        :thumb-size="24"
        :value="characterCustomRank"
        class="pt-6"
        label="Rank"
        step="1"
        ticks
        thumb-label="always"
        @input="setCustomRank"
      />
    </v-col>

    <v-col :cols="12" :sm="6">
      <h2 class="headline">
        Framework
      </h2>
      <p>Define your campaign framework.</p>

      <v-select
        label="Select a fitting tier"
        :value="settingTier"
        :items="tierSelect.options"
        dense
        filled
        @change="setSettingTier"
      />

      <v-text-field
        :value="settingTitle"
        class="pb-2"
        label="Describe your Setting or Campaign"
        hint="Only a few words"
        dense
        filled
        persistent-hint
        @input="setSettingTitle"
      />

      <v-select
        v-if="false"
        label="Allowed Species"
        :value="speciesRepository.map( s => s.name )"
        :items="speciesRepository"
        item-text="name"
        item-value="name"
        dense
        filled
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
        <h2 class="title">
          Homebrews
        </h2>

        <p>Allow specific homebrew content.</p>

        <div
          v-for="homebrew in settingHomebrewOptions"
          :key="homebrew.key"
        >
          <v-switch
            v-model="enabledHomebrews"
            :label="homebrew.name"
            :value="homebrew.key"
            color="primary"
            class="mt-0 mb-0"
            @change="updateHomebrew(homebrew)"
          />
        </div>
      </div>
    </v-col>

    <v-col :cols="12" />

    <v-col
      v-for="item in settingTemplateOptions"
      v-if="false"
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

export default {
  name: 'Setting',
  layout: 'forge',
  mixins: [],
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
      settingPlayMode: false,
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
    customXp() {
      return this.$store.getters['characters/characterCampaignCustomXpById'](this.characterId);
    },
    characterCustomRank() {
      return this.$store.getters['characters/characterCampaignCustomRankById'](this.characterId);
    },
    characterName() {
      return this.$store.getters['characters/characterNameById'](this.characterId);
    },
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    settingTitle() {
      return this.$store.getters['characters/characterSettingTitleById'](this.characterId);
    },
  },
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  methods: {
    setCharacterName(name) {
      this.$store.commit('characters/setCharacterName', { id: this.characterId, name });
    },
    setCustomXp(xp) {
      this.$store.commit('characters/setCustomXp', { id: this.characterId, xp });
    },
    setCustomRank(rank) {
      this.$store.commit('characters/setCustomRank', { id: this.characterId, rank });
    },
    setSettingTier(tier) {
      this.$store.commit('characters/setSettingTier', { id: this.characterId, tier });
    },
    setSettingTitle(title) {
      this.$store.commit('characters/setSettingTitle', { id: this.characterId, title });
    },
  },
};
</script>

<style scoped lang="css">

</style>
