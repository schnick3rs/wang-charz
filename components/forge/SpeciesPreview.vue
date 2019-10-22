<template lang="html">
  <v-card>

    <v-card-title v-if="chooseMode" style="background-color: #262e37; color: #fff;">
      <span>Confirm Species</span>
      <v-spacer></v-spacer>
      <v-icon dark @click="$emit('cancel')">close</v-icon>
    </v-card-title>
    
    <v-divider v-if="chooseMode"></v-divider>

    <v-card-title primary-title >
      <div>
        <h3 class="headline md0">
          {{ species.name }}
          <v-btn
            v-if="manageMode"
            small outlined
            color="primary"
            @click="$emit('changeSpecies')"
          >
            <v-icon>settings</v-icon>
            change species
          </v-btn>
        </h3>
        <span class="subtitle-1 grey--text">{{ species.hint }}</span>
      </div>
      <v-spacer></v-spacer>
      <div class="hidden-xs-only">
        <img :src="getAvatar(species.name)" style="width:96px" />
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

      <p class="text-lg-justify">
        <strong>Attribute Modifications:</strong> {{ species.attributes || 'None' }}
      </p>

      <div v-if="species.abilities">

        <span class="mt-2 grey--text">Abilities</span>
        <p><v-divider></v-divider></p>

        <div
          v-for="ability in abilityObjects"
          v-if="species.abilities"
          class="text-lg-justify"
        >
          <p><strong>{{ ability.name }}:</strong> {{ ability.effect }}</p>

          <div
            v-if="manageMode && ability.name.indexOf('Honour the Chapter') >= 0"
          >

            <v-select
              v-model="species['chapter']"
              v-bind:items="astartesChapterRepository"
              v-on:change="$emit('changeChapter', species['chapter'])"
              label="Select your Chapter"
              item-value="name"
              item-text="name"
              class="ml-2 mr-2"
              dense
              solo
            />

            <p
              v-if="ability.name.indexOf('Honour the Chapter') >= 0 && species['chapter']"
              v-for="tradition in getChapterTraditions(species['chapter'])"
              v-bind:key="tradition.key"
              class="ml-4 mr-4"
            >
              <strong>{{ tradition.name }} <span v-if="tradition.origin">({{tradition.origin}})</span>:</strong>
              {{ tradition.effect }}
            </p>

          </div>

        </div>

        <div v-if="false">
          <p><v-divider /></p>
          <blockquote class="blockquote font-italic" >
            <p>"{{ species.description }}"</p>
            <span class="right">- from the Wrath &quot; Glory Corerules -</span>
          </blockquote>
        </div>

      </div>

    </v-card-text>

    <v-divider v-if="chooseMode"></v-divider>
    <v-card-actions v-if="chooseMode">
      <v-btn outlined color="red" left @click="$emit('cancel')">
        Cancel
      </v-btn>
      <v-spacer/>
      <v-btn color="green" right @click="$emit('select', species);">
        Select Species
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
import SpeciesRepositoryMixin from '~/mixins/SpeciesRepositoryMixin';

export default {
  name: 'SpeciesPreview',
  mixins: [SpeciesRepositoryMixin],
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
    return {}
  },
  computed: {
    abilityObjects() {
      if (this.speciesAbilitiesRepository) {
        const abilities = this.species.abilities ? this.species.abilities.split(',') : [];
        return this.speciesAbilitiesRepository.filter(a => abilities.includes(a.name));
      }
      return [];
    },
  },
  methods: {
    getAvatar(name) {
      const slug = name.toLowerCase().replace(/\s/gm, '-');
      return `/img/icon/species/species_${slug}_avatar.png`;
    },
    getChapterTraditions(chapterName) {
      const chapter = this.astartesChapterRepository.find(a => a.name === chapterName) || [];
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