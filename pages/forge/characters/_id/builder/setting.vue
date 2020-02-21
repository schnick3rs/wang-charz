<template lang="html">
  <v-row justify="left">

    <v-dialog
      v-model="selectAvatarDialog"
      width="600px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >

      <v-card class="pa-0">

        <v-card-title style="background-color: #262e37; color: #fff;">
          <span>Confirm Portrait</span>
          <v-spacer />
          <v-icon dark @click="selectAvatarDialog = false">
            close
          </v-icon>
        </v-card-title>

        <v-card-text class="pt-4">

          <div>
            <no-ssr>
              <croppa
                v-model="myCroppa"
                :file-size-limit="31457280"
                :width="300"
                :height="300"
                :prevent-white-space="myCroppaConfig.preventWhiteSpace"
              ></croppa>
            </no-ssr>
          </div>
          <span class="caption">Drag and zoom (by scrolling) until it fits.</span>

          <div>
            <v-switch
              v-model="myCroppaConfig.preventWhiteSpace"
              label="Prevent whitespace, thus the image must be within borders."
              dense
            ></v-switch>
          </div>


        </v-card-text>

        <v-card-actions>
          <v-btn left outlined color="red" @click="selectAvatarDialog = false">
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn right color="green" @click="setNewAvatar">
            Select Portrait
          </v-btn>
        </v-card-actions>

      </v-card>

    </v-dialog>

    <v-col :cols="12" :sm="7">
      <h2 class="headline">
        Character
      </h2>
      <p>Some Notes on the character</p>

      <v-text-field
        label="Character Name"
        :value="characterName"
        dense
        outlined
        @input="setCharacterName"
      />

      <v-text-field
        :value="customXp"
        class="pb-2"
        label="Additional eXperience Points"
        hint="Add the XP earend by playing the game. Usually granted by the GM."
        dense
        outlined
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
        outlined
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

    <v-col :cols="12" :sm="5">
      <div class="mb-2">

        <!-- custom avatar -->
        <v-badge
          bordered
          overlap
          color="error"
          v-show="characterAvatarUrl"
        >
          <template v-slot:badge>
            <v-icon color="white" @click.stop="setCharacterAvatar(undefined)">close</v-icon>
          </template>
          <v-avatar
            size="86"
            tile
            @click="selectAvatarDialog = true"
          >
            <v-img :src="characterAvatarUrl" ></v-img>
          </v-avatar>
        </v-badge>

        <!-- placeholder -->
        <v-avatar
          size="86"
          tile
          @click="selectAvatarDialog = true"
          v-show="!characterAvatarUrl"
        >
          <v-img src="/img/avatar_placeholder_grey.png" ></v-img>
        </v-avatar>

        <em class="d-none">{{ characterAvatarUrl ? characterAvatarUrl.length : 0 }}</em>
        <div><a @click="selectAvatarDialog = true">change picture</a></div>
      </div>
    </v-col>

    <v-col :cols="12" :sm="7">
      <h2 class="headline">
        Framework
      </h2>
      <p>Define your campaign framework.</p>

      <v-select
        label="Select a fitting tier"
        :value="settingTier"
        :items="tierSelect.options"
        dense
        outlined
        @change="setSettingTier"
      />

      <v-text-field
        :value="settingTitle"
        class="pb-2"
        label="Describe your Setting or Campaign"
        hint="Only a few words"
        dense
        outlined
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
        outlined
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

    </v-col>

    <v-col :cols="12">
      <div>
        <h2 class="title">Homebrews</h2>
        <p>Allow specific homebrew content to be used for this character.</p>
        <div v-if="settingHomebrews.includes('aaoa') && settingHomebrews.includes('tea')">
          <v-alert
            text border-left dense color="warning" class="caption"
          >
            You selected two homebrews, the <em>Abundance of Apocrypha</em> and <em>The Emperors Angels</em>.
            Both introduce similar Astartes Archetypes, Wargear and Powers.
            This lead to duplicated entries and thus, <strong>it is NOT recommended to use both</strong> at the same time.
          </v-alert>
        </div>
        <div
          v-for="homebrew in settingHomebrewOptions.filter((h)=>h.active)"
          :key="homebrew.key"
        >
          <v-switch
            v-model="enabledHomebrews"
            :label="homebrew.name"
            :value="homebrew.key"
            :hint="homebrew.hint"
            persistent-hint
            color="primary"
            dense
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
        <v-img v-if="true" :src="item.cover" height="150" />
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
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      currentPage: 1,
      setting: {
        name: '',
        tier: 3,
        species: { exclude: [] },
        archetypes: { exclude: [] },
        homebrews: [],
      },
      avatar: '',
      selectAvatarDialog: false,
      myCroppa: {},
      myCroppaConfig: {
        preventWhiteSpace: true,
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
          active: false,
          key: 'aotgt',
          name: '\'Agents of the Golden Throne\' content (Fan supplement)',
          enabled: false,
          nuxt: '/vault/agents-of-the-golden-throne',
          source: 'https://docs.google.com/document/d/1VkOd-WGTXb_Lygm3BQYHX9eC2WzOczsD1kkG3fy4SIg/edit',
        },
        {
          active: true,
          key: 'pax',
          name: '\'Pax Imperialis\' content',
          hint: 'Add Beastman, Navigators and Untouchables and their respective archetypes.',
          enabled: false,
          nuxt: '/vault/pax-imperialis',
          source: 'https://docs.google.com/document/d/1VkOd-WGTXb_Lygm3BQYHX9eC2WzOczsD1kkG3fy4SIg/edit',
        },
        {
          active: true,
          key: 'aaoa',
          name: '\'An Abundance of Apocrypha\' content',
          hint: 'Add Human Homeworlds, Squad, Pariah, Beastman, Ork and Astartes Archetypes, Heretic Legion Chapters.',
          enabled: false,
          nuxt: '/vault/an-abundance-of-apocrypha',
          source: '',
        },
        {
          active: true,
          key: 'tea',
          name: '\'The Emperor´s Angels\' content',
          hint: 'Add Space Marine archetypes and Librarius Powers.',
          enabled: false,
          nuxt: '/vault/the-emperors-angels',
          source: '',
        },
        {
          active: true,
          key: 'lotn',
          name: '\'Legacy of the Necrontyr\' content',
          hint: 'Add Necron species and archetypes.',
          enabled: false,
          nuxt: '/vault/legacy-of-the-necrontyr',
          source: '',
        },
        {
          active: true,
          key: 'ltgb',
          name: '\'Let the Galaxy Burn\' content',
          hint: 'Add Heretic Astartes Chapters.',
          enabled: false,
          nuxt: '/vault/let-the-galaxy-burn',
          source: '',
        },
        {
          active: true,
          key: 'dod',
          name: '\'Doctors of Doom Sandbox\' content',
          hint: 'Add Chapter Houses and Roguish Archetypes.',
          enabled: false,
          nuxt: undefined,
          source: '',
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
    characterAvatarUrl() {
      return this.$store.getters['characters/characterAvatarUrlById'](this.characterId);
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
    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
  },
  watch: {
    settingHomebrews: {
      handler(newVal) {
        if (newVal) {
          this.enabledHomebrews = newVal;
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    setNewAvatar: function() {
      const url = this.myCroppa.generateDataUrl('jpg', 0.8);
      if (!url) {
        console.warn('no image');
        return undefined;
      }
      console.info(`Create an image with size: ${url.length}`);
      this.setCharacterAvatar(url);
      this.selectAvatarDialog = false;
    },
    setCharacterAvatar(url) {
      this.$store.commit('characters/setCharacterAvatar', { id: this.characterId, url: url });
      this.avatar = url;
    },
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
    updateHomebrew(event) {
      this.$store.commit('characters/setSettingHomebrews', { id: this.characterId, content: this.enabledHomebrews });
    }
  },
};
</script>

<style lang="scss">
  .croppa-container canvas {
    border: 0.5px dashed grey;
  }
</style>
