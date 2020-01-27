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
      <div class="hidden-xs-only">
        <img :src="getAvatar(species.key)" style="width:96px">
      </div>
    </v-card-title>

    <v-card-text class="pa-6">
      <p class="text-lg-justify">
        <strong>Build Point Cost:</strong> {{ species.cost }}
      </p>

      <p><v-divider /></p>

      <p class="text-lg-justify">
        <strong>Base Tier:</strong> {{ species.baseTier }}
      </p>

      <p class="text-lg-justify">
        <strong>Speed:</strong> {{ species.speed }}
      </p>

      <div v-if="species.speciesTraits">
        <span class="mt-2 grey--text">Abilities</span>
        <p><v-divider /></p>

        <span v-id="species.speciesTraits.length <= 0">No Abilities? At least your base tier is low...</span>

        <div
          v-for="speciesTrait in species.speciesTraits"
          class="text-lg-justify"
        >
          <p><strong>{{ speciesTrait.name }}:</strong> {{ speciesTrait.description ? speciesTrait.description : speciesTrait.snippet }}</p>

          <div v-if="manageMode && speciesTrait.options && speciesTrait.options.length > 0">
            <v-select
              :items="speciesTrait.options"
              v-model="speciesTrait.selected"
              item-value="name"
              item-text="name"
              @change="$emit('changeSpeciesTraitOption', speciesTrait)"
              dense
              solo
            ></v-select>
            <div
              v-if="speciesTrait.selected && speciesTrait.selected.length > 0"
              class="ml-4 mr-4"
            >
              <div v-html="speciesTrait.options.find((o)=>o.name === speciesTrait.selected).description"></div>
            </div>
          </div>

          <div
            v-if="manageMode && speciesTrait.name.indexOf('Honour the Chapter') >= 0"
          >
            <v-select
              v-model="species['chapter']"
              :items="astartesChapterRepository"
              label="Select your Chapter"
              item-value="name"
              item-text="name"
              class="ml-2 mr-2"
              dense
              solo
              @change="$emit('changeChapter', species['chapter'])"
            />

            <p
              v-for="tradition in getChapterTraditions(species['chapter'])"
              v-if="speciesTrait.name.indexOf('Honour the Chapter') >= 0 && species['chapter']"
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
      <v-btn color="success" right @click="$emit('select', species);">
        Select Species
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  name: 'SpeciesPreview',
  mixins: [
    SluggerMixin,
  ],
  props: {
    species: {
      type: Object,
      required: true,
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
      astartesChapterRepository: [],
    };
  },
  computed: {
  },
  async mounted() {
    if (this.manageMode) {
      const chaptersResponse = await this.$axios.get('/api/species/chapters/?source=core,coreab');
      this.astartesChapterRepository = chaptersResponse.data;
    }
  },
  methods: {
    getAvatar(key) {
      return `/img/icon/species/species_${key}_avatar.png`;
    },
    getChapterTraditions(chapterName) {
      const chapter = this.astartesChapterRepository.find((a) => a.name === chapterName) || [];
      if (chapter) {
        return chapter.beliefsAndTraditions;
      }
      return [];
    },
  },
};
</script>

<style scoped lang="css">

</style>
