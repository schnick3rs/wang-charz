<template>
  <v-row justify="center">

    <v-progress-circular v-if="!species" indeterminate color="success" size="128" width="12" />

    <v-col v-if="species" :xs="12">

      <div class="d-flex flex-no-wrap justify-space-between mb-2">
        <div>
            <h3 class="headline">{{ species.name }}</h3>
            <h4 class="subtitle-1 grey--text">{{ species.hint }}</h4>
            <v-btn
              small outlined
              color="primary"
              @click="doChangeSpeciesMode"
            >
              <v-icon small>settings</v-icon>
              change species
            </v-btn>
        </div>
        <v-avatar size="96" tile><img :src="avatar"></v-avatar>
      </div>

      <v-divider/>

      <div class="mt-2 body-2 text-lg-justify" style="color: rgba(0,0,0,0.6)">

        <p>
          <strong>XP Cost:</strong> {{ species.cost }}, incl. Stats ({{ species.costs.stats }} XP)
        </p>

        <p v-if="attributes">
          <strong>Attributes:</strong> {{ attributes }}
        </p>

        <p v-if="skills">
          <strong>Skills:</strong> {{ skills }}
        </p>

        <p>
          <strong>Speed:</strong> {{ species.speed }}
        </p>

      </div>

      <div v-if="species.speciesFeatures" class="body-2" style="color: rgba(0,0,0,0.6)">
        <span class="subtitle-1 mt-2">Abilities</span>
        <p><v-divider /></p>

        <span v-if="species.speciesFeatures.length <= 0">No Abilities? At least your xp cost are low...</span>

        <div
          v-for="feature in species.speciesFeatures"
          class="text-lg-justify"
        >
          <div>
            <strong>{{ feature.name }}</strong>
            <div v-if="feature.description" v-html="feature.description"></div>
            <p v-else>{{ feature.snippet }}</p>
            <v-alert
                v-if="feature.alerts"
                v-for="(alert, index) in feature.alerts"
                :key="index"
                :type="alert.type"
                dense
                text
            >{{alert.text}}</v-alert>
          </div>

          <div v-if="feature.options && feature.options.length > 0">
            <div v-for="inx in feature.selected.length">
              <v-select
                  :items="feature.options"
                  v-model="feature.selected[inx-1]"
                  item-value="name"
                  item-text="name"
                  @change="setSpeciesTraitOption(feature, inx-1)"
                  dense
                  solo
              ></v-select>
              <div
                  v-if="feature.selected[inx-1] && feature.selected[inx-1].length > 0"
                  class="ml-4 mr-4"
              >
                <div
                    v-if="feature.options.find((o)=>o.name === feature.selected[inx-1]).description"
                    v-html="feature.options.find((o)=>o.name === feature.selected[inx-1]).description"
                ></div>
                <p v-else>{{feature.options.find((o)=>o.name === feature.selected[inx-1]).snippet}}</p>
              </div>
            </div>
          </div>

          <div v-if="feature.psychicPowers">

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
            v-if="feature.name.indexOf('Honour the Chapter') >= 0 && chapterList"
          >
            <v-alert
              text border-left dense color="primary" class="caption"
            >
              <em>Some homebrews contain additional chapters. Click on the (+) after the homebrew to enable it's rules for this character:
                An Abundane of Aphocrypha
                <v-icon v-if="settingHomebrews.includes('aaoa')" small color="success">check_circle</v-icon>
                <v-icon v-else @click="enableHomebrew('aaoa')" small color="primary">add_circle</v-icon>
                <!--or
                Let the Galaxy Burn
                <v-icon v-if="settingHomebrews.includes('ltgb')" small color="success">check_circle</v-icon>
                <v-icon v-else @click="enableHomebrew('ltgb')" small color="primary">add_circle</v-icon>-->
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
              @change="updateAstartesChapter(species['chapter'])"
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

      </div>

    </v-col>
  </v-row>
</template>

<script>
import SpeciesPreview from '~/components/forge/SpeciesPreview.vue';
import SluggerMixin from '~/mixins/SluggerMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';

export default {
  name: 'Manage',
  components: {
    SpeciesPreview,
  },
  mixins: [
    SluggerMixin,
    StatRepositoryMixin,
  ],
  data() {
    return {
      loading: false,
      species: undefined,
      chapterList: undefined,
    };
  },
  computed: {
    characterSpeciesKey() {
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    characterSpeciesAstartesChapter() {
      return this.$store.getters['characters/characterSpeciesAstartesChapterById'](this.characterId);
    },
    enhancements() {
      return this.$store.getters['characters/characterEnhancementsById'](this.characterId);
    },
    psychicPowers() {
      return this.$store.getters['characters/characterPsychicPowersById'](this.characterId);
    },
    sources() {
      return [
        'core',
        'fspg',
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
    avatar() {
      if (this.species === undefined) return '';
      return `/img/avatars/species/${this.species.key}.png`;
    }
  },
  watch: {
    characterSpeciesKey: {
      handler(newVal) {
        if (newVal) {
          this.getSpecies(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getChapterList(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
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
    getSpecies: async function (key) {
      this.loading = true;
      let finalData = {};

      if ( key.startsWith('custom-')) {
        const speciesDetails = this.$store.getters['species/getSpecies'](key);
        finalData = speciesDetails;
      } else {
        const { data } = await this.$axios.get(`/api/species/${key}`);
        finalData = data;
      }

      finalData.speciesFeatures
        .filter((feature) => feature.options)
        .forEach((feature) => {
          const enhancements = this.enhancements
          .filter((modifier) => modifier.source.startsWith(`species.${feature.name}`) );
          if ( enhancements ) {
            enhancements.forEach((e) => {
              let foundInd = /\.(\d)\./.exec(e.source);
              if (foundInd) {
                feature.selected[foundInd[1]] = e.source.split('.').pop();
              }
            });
          } else {
            const enhancement = this.enhancements.find((modifier) => modifier.source.startsWith(`species.${feature.name}`) );
            if ( enhancement ) {
              feature.selected = enhancement.source.split('.').pop();
            }
          }
        });

      const chapter = this.characterSpeciesAstartesChapter;
      if (chapter) {
        finalData.chapter = chapter;
      }

      const featuresWithPowers = finalData.speciesFeatures.filter( (f) => f.psychicPowers !== undefined);
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

      this.loading = false;
      this.species = finalData;
    },
    resetSpecies() {
      this.selectedSpecies = undefined;
      this.$store.commit('characters/setCharacterSpecies', { id: this.characterId, species: { value: undefined, cost: 0 } });
    },
    doChangeSpeciesMode() {
      this.$router.push({
        name: 'forge-characters-id-builder-species-choose',
        params: { id: this.characterId },
      });
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
    enableHomebrew(sourceKey) {
      this.$store.commit('characters/enableSettingHomebrews', { id: this.characterId, content: sourceKey });
    },
    /**
     * clear previous option
     *
     * @param speciesTrait
     */
    setSpeciesTraitOption(speciesTrait, inx) {
      const id = this.characterId;
      const selectedOption =  speciesTrait.options.find( (o) => o.name === speciesTrait.selected[inx] );

      // dirty hack to cleanup aeldari path
      this.$store.commit('characters/clearCharacterEnhancementsBySource', { id, source: `species.${speciesTrait.name}.Path` });

      this.$store.commit('characters/clearCharacterEnhancementsBySource', { id, source: `species.${speciesTrait.name}.${inx}` });
      // the option has a snippet, that is thus added as a custom ability
      if ( selectedOption.snippet ) {
        const content = {
          modifications: [{
            name: selectedOption.name,
            targetGroup: 'abilities',
            targetValue: '',
            effect: selectedOption.snippet,
          }],
          source: `species.${speciesTrait.name}.${inx}.${selectedOption.name}`,
        };
        this.$store.commit('characters/addCharacterModifications', { id, content });
      }

      // the selected option has modifications that are saved as such
      if ( selectedOption.modifications ) {
        const content = {
          modifications: selectedOption.modifications,
          source: `species.${speciesTrait.name}.${inx}.${selectedOption.name}`,
        };
        this.$store.commit('characters/addCharacterModifications', { id, content });
      }
    },
    updateAstartesChapter(key) {
      const id = this.characterId;
      const chapter = this.chapterList.find((chapter) => chapter.key === key);

      const content = {
        speciesAstartesChapter: chapter.key,
      };
      this.$store.commit('characters/setCharacterSpeciesAstartesChapter', { id, ...content });

      this.$store.commit('characters/clearCharacterTalentsBySource', { id, source: `species.chapter.`, cascade: true });
      chapter.beliefsAndTraditions.forEach((bf) => {
        if (bf.modifications) {
          bf.modifications
          .filter( (m) => m.targetGroup === 'talents' )
          .forEach( (t) => {
            const talent = {
              name: t.meta.name,
              key: t.targetValue,
              cost: 0,
              placeholder: undefined,
              selected: undefined,
              source: `species.chapter.${chapter.key}`,
            };
            this.$store.commit('characters/addCharacterTalent', { id, talent });
          });
        }
      });
    },
  },
};
</script>

<style scoped>

</style>
