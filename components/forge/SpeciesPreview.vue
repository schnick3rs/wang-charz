<template lang="html">
  <v-card>

    <v-card-title v-if="chooseMode" style="background-color: #262e37; color: #fff;">
      <span>Confirm Species</span>
      <v-spacer />
      <v-icon dark @click="$emit('cancel')">
        close
      </v-icon>
    </v-card-title>

    <v-divider v-if="chooseMode" />

    <v-card-title primary-title>
      <div>
        <h3 class="headline md0">
          {{ species.name }}
          <v-btn
            v-if="manageMode"
            small
            outlined
            color="primary"
            @click="$emit('changeSpecies')"
          >
            <v-icon>settings</v-icon>
            change species
          </v-btn>
        </h3>
        <span class="subtitle-1 grey--text">{{ species.hint }}</span>
      </div>
      <v-spacer />
      <div >
        <img :src="getAvatar(species.key)" style="width:96px">
      </div>
    </v-card-title>

    <v-divider v-if="chooseMode" />

    <v-card-text class="pa-6">
      <p class="text-lg-justify">
        <strong>XP Cost:</strong> {{ species.cost }}, incl. Stats ({{ species.costs.stats }} XP)
      </p>

      <p><v-divider /></p>

      <p class="text-lg-justify" v-if="attributes">
        <strong>Attributes:</strong> {{attributes}}
      </p>

      <p class="text-lg-justify" v-if="skills">
        <strong>Skills:</strong> {{skills}}
      </p>

      <p class="text-lg-justify">
        <strong>Speed:</strong> {{ species.speed }}
      </p>

      <div v-if="species.speciesFeatures">
        <span class="mt-2 grey--text">Abilities</span>
        <p><v-divider /></p>

        <span v-if="species.speciesFeatures.length <= 0">No Abilities? At least your xp cost are low...</span>

        <div
          v-for="feature in species.speciesFeatures"
          class="text-lg-justify"
        >
          <div
            v-if="feature.description"
          >
            <strong>{{feature.name}}</strong><div v-html="feature.description"></div>
          </div>
          <p v-else><strong>{{feature.name}}: </strong>{{feature.snippet}}</p>

          <div v-if="manageMode && feature.options && feature.options.length > 0">
            <v-select
              :items="feature.options"
              v-model="feature.selected"
              item-value="name"
              item-text="name"
              @change="$emit('changeSpeciesTraitOption', feature)"
              dense
              solo
            ></v-select>
            <div
              v-if="feature.selected && feature.selected.length > 0"
              class="ml-4 mr-4"
            >
              <div
                v-if="feature.options.find((o)=>o.name === feature.selected).description"
                v-html="feature.options.find((o)=>o.name === feature.selected).description"
              ></div>
              <p v-else>{{feature.options.find((o)=>o.name === feature.selected).snippet}}</p>
            </div>
          </div>

          <div v-if="manageMode && feature.psychicPowers">

            <div v-for="selections in feature.psychicPowers" :key="selections.name">
              <v-select
                v-if="selections.options"
                v-model="selections.selected"
                :readonly="selections.options.length <= 1"
                :items="selections.options"
                item-value="name"
                item-text="name"
                persistent-hint
                dense
                solo
                class="ml-2 mr-2"
                @change="updatePsychicPowers(selections)"
              />
            </div>
          </div>

          <div
            v-if="manageMode && feature.name.indexOf('Honour the Chapter') >= 0 && chapterList"
          >
            <v-alert
              v-if="false"
              text border-left dense color="primary" class="caption"
            >
              <em>Some homebrews contain additional chapters. Click on the (+) after the homebrew to enable it's rules for this character:
                An Abundane of Aphocrypha
                <v-icon v-if="settingHomebrews.includes('aaoa')" small color="success">check_circle</v-icon>
                <v-icon v-else @click="enableHomebrew('aaoa')" small color="primary">add_circle</v-icon>
                or
                Let the Galaxy Burn
                <v-icon v-if="settingHomebrews.includes('ltgb')" small color="success">check_circle</v-icon>
                <v-icon v-else @click="enableHomebrew('ltgb')" small color="primary">add_circle</v-icon>
              </em>
            </v-alert>
            <v-select
              v-model="species['chapter']"
              :items="chapterList"
              label="Select your Chapter"
              item-value="key"
              item-text="label"
              class="ml-2 mr-2"
              dense
              solo
              @change="$emit('changeChapter', species['chapter'])"
            />

            <p
              v-for="tradition in getChapterTraditions(species['chapter'])"
              v-if="feature.name.indexOf('Honour the Chapter') >= 0 && species['chapter']"
              :key="tradition.key"
              class="ml-4 mr-4"
            >
              <strong>{{ tradition.name }} <span v-if="tradition.origin">({{ tradition.origin }})</span>:</strong>
              {{ tradition.effect }}
            </p>
          </div>
        </div>

        <div v-if="false">
          <p><v-divider /></p>
          <blockquote class="blockquote font-italic">
            <p>"{{ species.description }}"</p>
            <span class="float-right">- from the Wrath &quot; Glory Corerules -</span>
          </blockquote>
        </div>
      </div>
    </v-card-text>

    <v-divider v-if="chooseMode" />
    <v-card-actions v-if="chooseMode">
      <v-btn outlined color="red" left @click="$emit('cancel')">
        Cancel
      </v-btn>
      <v-spacer />
      <v-btn color="success" right @click="$emit('select', species)">
        Select Species
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
import SluggerMixin from '~/mixins/SluggerMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';

export default {
  name: 'SpeciesPreview',
  mixins: [
    SluggerMixin,
    StatRepositoryMixin,
  ],
  props: {
    characterId: {
      type: String,
      required: true,
    },
    species: {
      type: Object,
      required: true,
    },
    psychicPowers: {
      type: Array,
      required: false,
      default: () => [],
    },
    manageMode: {
      type: Boolean,
      default: false,
    },
    chooseMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chapterList: undefined,
    };
  },
  computed: {
    sources() {
      return [
        'core',
        ...this.settingHomebrews
      ];
    },
    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
    attributes() {
      if (this.species === undefined || this.species.prerequisites === undefined) return undefined;
      return this.species.prerequisites.filter(pre => pre.group === 'attributes').map(pre => `${this.getAttributeByKey(pre.value).name} ${pre.threshold}`).join(', ');
    },
    skills() {
      if (this.species === undefined || this.species.prerequisites === undefined) return undefined;
      return this.species.prerequisites.filter(pre => pre.group === 'skills').map(pre => `${this.getSkillByKey(pre.value).name} ${pre.threshold}`).join(', ');
    },
  },
  watch: {
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getChapterList(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  async mounted() {
    const featuresWithPowers = this.species.speciesFeatures.filter( (f) => f.psychicPowers !== undefined);
    if ( featuresWithPowers ) {
      featuresWithPowers.forEach( (feature) => {
        feature.psychicPowers.forEach( (powerSelections) => {
          this.getPsychicPowerOptions(powerSelections);
          const found = this.psychicPowers.find( (p) => p.source && p.source === `species.${powerSelections.name}`);
          if ( found ) {
            console.info(`Power ${found.name} found for the species feature ${feature.name} / power ${powerSelections.name}.`);
            powerSelections.selected = found.name;
          }
        });
      });
    }
  },
  methods: {
    async getChapterList(sources) {
      const config = {
        params: {
          source: sources.join(','),
        },
      };
      const { data } = await this.$axios.get('/api/species/chapters/', config);
      this.chapterList = data;
    },
    enableHomebrew(sourceKey) {
      this.$store.commit('characters/enableSettingHomebrews', { id: this.characterId, content: sourceKey });
    },
    getPsychicPowerOptions(psychicPowerSelection) {
      const config = {
        params: {
          ...psychicPowerSelection.query,
          fields: 'id,name,effect,discipline,cost',
        },
      };

      this.$axios.get('/api/psychic-powers/', config)
        .then( (response) => {
          psychicPowerSelection.options = response.data;
        });
    },
    getAvatar(key) {
      return `/img/avatars/species/${key}.png`;
    },
    getChapterTraditions(chapterKey) {
      if ( this.chapterList ) {
        const chapter = this.chapterList.find((a) => a.key === chapterKey) || [];
        if (chapter) {
          return chapter.beliefsAndTraditions;
        }
      }
      return [];
    },
    updatePsychicPowers(option) {
      this.$store.commit('characters/clearCharacterPsychicPowersBySource',
        { id: this.characterId, source: `species.${option.name}` });
      this.$store.commit('characters/addCharacterPsychicPower', {
        id: this.characterId,
        name: option.selected,
        cost: option.free ? 0 : option.options.find((o)=>o.name === option.selected).cost,
        source: `species.${option.name}`,
      });

      // SPECIAL for Eldar
      if ( option.name === 'psychosensitive') {
        const payload = {
          name: 'Psyker',
          source: 'species',
          type: 'keyword',
          replacement: undefined,
        };
        this.$store.commit('characters/addCharacterKeyword', { id: this.characterId, keyword: payload });
      }
    },
  },
};
</script>

<style scoped lang="css">

</style>
