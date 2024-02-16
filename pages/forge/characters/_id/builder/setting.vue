<template lang="html">
  <v-row >

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
            <client-only>
              <croppa
                v-model="myCroppa"
                :file-size-limit="31457280"
                :width="300"
                :height="300"
                :prevent-white-space="myCroppaConfig.preventWhiteSpace"
              ></croppa>
            </client-only>
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
      <h2 class="title mb-2">
        <strong>Character</strong>
      </h2>

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
        hint="Add the XP earned by playing the game. Usually granted by the GM."
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
        hint="Set your Characters Rank, usually between 1-3."
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
      <h3 class="subtitle-1"><strong>Framework</strong></h3>
      <p class="body-2">Define your campaign framework.</p>

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

    <v-col :cols="12" :sm="7">
      <div>
        <h3 class="subtitle-1"><strong>House Rules</strong></h3>
        <p class="body-2">Allow specific house rules for this character.</p>
        <div>
          <div
            v-for="houserule in settingHouseruleSelectors"
            :key="houserule.key"
          >
            <v-select
              v-model="houserule.selected"
              :items="houserule.items"
              :label="houserule.name"
              dense
              outlined
              persistent-hint
              :hint="houserule.hint"
              @change="updateHouserules($event, houserule.key)"
            ></v-select>
          </div>
        </div>
      </div>
    </v-col>

    <v-col :cols="12">
      <div>

        <h3 class="subtitle-1"><strong>Official Publications</strong></h3>

        <p class="body-2">Enable specific content from official publications. (Some are auto-enabled)</p>

        <div
            v-for="homebrew in settingOfficialOptions.filter(i => i.show === true)"
            :key="homebrew.key"
        >
          <v-switch
              v-if="homebrew.optional"
              v-model="enabledHomebrews"
              :value="homebrew.key"
              :hint="homebrew.hint"
              persistent-hint
              color="primary"
              dense
              :disabled="homebrew.disabled"
              @change="updateHomebrew(homebrew)"
          >
            <template v-slot:label><span class="body-2">{{ homebrew.name }}</span></template>
          </v-switch>
          <v-switch
              v-else
              value
              input-value="true"
              :hint="homebrew.hint"
              persistent-hint
              color="primary"
              dense
              disabled
              @change="updateHomebrew(homebrew)"
          >
            <template v-slot:label><span class="body-2">{{ homebrew.name }}</span></template>
          </v-switch>

        </div>
      </div>
    </v-col>

    <v-col :cols="12">
      <div>

        <h3 class="subtitle-1"><strong>Homebrews</strong></h3>

        <p class="body-2">Allow specific homebrew content to be used for this character.</p>

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
          v-for="homebrew in settingHomebrewOptions.filter((h)=>h.enabled)"
          :key="homebrew.key"
        >
          <v-switch
            v-model="enabledHomebrews"
            :value="homebrew.key"
            :hint="homebrew.hint"
            persistent-hint
            color="primary"
            dense
            :disabled="!homebrew.enabled"
            @change="updateHomebrew(homebrew)"
          >
            <template v-slot:label><span class="body-2">{{ homebrew.name }}</span></template>
          </v-switch>
        </div>

        <div class="mt-4">
          <v-alert text border-left dense color="info" class="caption">
            The <a href="https://www.cubicle7games.com/wrath-glory-pdf-pre-order-live/>">revised edition by Cubicle 7 just came out</a> and thus, most of the homebrews are currently outdated. I have disabled them for now until they are updated to match the recent changes.
          </v-alert>
        </div>

        <div
          v-for="homebrew in settingHomebrewOptions.filter((h)=>!h.enabled)"
          :key="homebrew.key"
        >
          <v-switch
            v-model="enabledHomebrews"
            :value="homebrew.key"
            :hint="homebrew.hint"
            persistent-hint
            color="primary"
            dense
            :disabled="!homebrew.enabled"
            @change="updateHomebrew(homebrew)"
          >
            <template v-slot:label><span class="body-2">{{ homebrew.name }}</span></template>
          </v-switch>
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
      settingOfficialOptions: [
        {
          show: true,
          disabled: true,
          optional: false, // always active
          key: 'core',
          name: 'Wrath & Glory Core Rules',
          hint: 'Core Factions',
          nuxt: '',
          source: 'https://www.drivethrurpg.com/en/product/249388/warhammer-40-000-wrath-glory-core-rulebook?affiliate_id=466959',
        },
        {
          show: true,
          disabled: true,
          optional: false, // always active
          key: 'fspg',
          name: 'Forsaken System Player Guide',
          hint: 'Imperial Archeytypes',
          nuxt: 'https://www.drivethrurpg.com/en/product/303930/warhammer-40-000-wrath-glory-forsaken-system-player-s-guide?affiliate_id=466959',
          source: '',
        },
        {
          show: true,
          disabled: true,
          optional: false, // always active
          key: 'red1',
          name: 'Redacted Records I',
          hint: 'Some Talents',
          nuxt: 'https://www.drivethrurpg.com/en/product/343896/warhammer-40-000-wrath-glory-redacted-records?affiliate_id=466959',
          source: '',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'red2',
          name: 'Redacted Records II',
          hint: 'More Talents',
          nuxt: 'https://www.drivethrurpg.com/en/product/388102/warhammer-40-000-wrath-glory-redacted-records-2?affiliate_id=466959',
          source: '',
        },
        {
          show: true,
          disabled: true, // do not allow for now, but tease
          optional: true,
          key: 'aioe',
          name: 'Aeldari - Inheritance of Ember',
          hint: 'Aledari & Drukhari Content',
          nuxt: 'https://www.drivethrurpg.com/en/product/305327/warhammer-40-000-wrath-and-glory-aeldari-inheritance-of-embers?affiliate_id=466959',
          source: '',
        },
        {
          show: false,
          disabled: true,
          optional: true,
          key: 'afas',
          name: 'Affliction Ascendant',
          hint: '1st Company Veteran',
          nuxt: 'https://www.drivethrurpg.com/en/product/343904/Wrath--Glory--Affliction-Ascendant?affiliate_id=466959',
          source: '',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'tnh',
          name: 'The Null Hypothesis',
          hint: 'Add Sisters of Silence and gear.',
          nuxt: 'https://www.drivethrurpg.com/product/343894/Wrath--Glory--The-Null-Hypothesis?affiliate_id=466959',
          source: '',
        },
      ],
      settingHomebrewOptions: [
        {
          active: true,
          key: 'custom',
          name: '\'Your own Custom\' content',
          hint: 'You homebrew species.',
          enabled: true,
          nuxt: '',
          source: '',
        },
        {
          active: true,
          key: 'aaoa',
          name: '\'An Abundance of Apocrypha\' content',
          hint: 'Add Human Homeworlds, Squad, Pariah, more is on the way.',
          enabled: true,
          nuxt: '/vault/an-abundance-of-apocrypha',
          source: '',
        },
        {
          active: true,
          key: 'aotgt',
          name: '\'Agents of the Golden Throne\' content',
          hint: 'Add a Tier 4 Ascension',
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
          key: 'tog',
          name: '\'Tome of Glory\' content',
          hint: 'Add Chaos Archetypes.',
          enabled: true,
          nuxt: '/vault/tome-of-glory',
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
          enabled: true,
          nuxt: undefined,
          source: '',
        },
        {
          active: true,
          key: 'gohe',
          name: '\'Godless Heathens\' content',
          hint: 'Add Kroot and Jokaero Archetypes.',
          enabled: true,
          nuxt: undefined,
          source: '',
        },
        {
          active: true,
          key: 'soti',
          name: '\'Shadow of the Imperium Sandbox\' content',
          hint: 'Highly experimental!',
          enabled: true,
          nuxt: undefined,
          source: '',
        },
      ],
      enabledHomebrews: [],
      settingHouseruleSelectors: [
        /*{
          key: 'rank-advancement-type',
          name: 'Rank Advancement Type',
          hint: 'Choose if Rank increases by gained XP or by Milestone.',
          selected: 'xp',
          items: [
            { value: 'xp', text: 'XP' },
            { value: 'milestone', text: 'Milestone' },
          ],
        },*/
        {
          key: 'skill-attribute-advancement-costs',
          name: 'Skill & Attribute Advancement Costs Method',
          hint: 'Use regular advancement costs or legacy (v1) advancement costs, that favour skills.',
          selected: 'v15',
          items: [
            { value: 'v10', text: 'Legacy Flair (Cheaper skills)' },
            { value: 'v15', text: 'By the book (Revised Rules)' },
          ],
        },
      ],
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
    settingHouserules() {
      return this.$store.getters['characters/characterSettingHouserulesById'](this.characterId);
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
    settingHouserules: {
      handler(newVal) {
        if (newVal) {
          this.settingHouseruleSelectors.forEach((rules) => {
            rules.selected = newVal[rules.key];
          });
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
    },
    updateHouserules(value, key) {
      this.$store.commit('characters/setSettingHouserules', { id: this.characterId, houserule: { key, value} });
    },
  },
};
</script>

<style lang="scss">
  .croppa-container canvas {
    border: 0.5px dashed grey;
  }

  .text--keyword {
    color: rgb(244 64 52);
    font-weight: 600;
    font-family: serif;
    text-transform: uppercase;
  }
</style>
