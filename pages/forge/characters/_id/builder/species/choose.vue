<template>

  <v-row justify="center">

    <v-col v-bind:cols="12">
      <h1 class="headline">Select a Species</h1>
    </v-col>

    <v-dialog
      v-model="speciesDialog"
      v-bind:fullscreen="$vuetify.breakpoint.xsOnly"
      width="600px"
      scrollable
    >
      <species-preview
        v-if="selectedSpecies"
        v-bind:species="selectedSpecies"
        chooseMode
        v-on:select="selectSpeciesForChar"
        v-on:cancel="speciesDialog = false"
      />
    </v-dialog>

    <v-col xs12>

      <v-progress-circular v-if="!speciesList" indeterminate color="success" size="128" width="12"></v-progress-circular>

      <v-card v-if="speciesList">
        <v-list>
          <v-list-item
            v-for="item in speciesList"
            v-bind:key="item.name"
            v-bind:disabled="item.baseTier > characterSettingTier"
            v-on:click.stop="updatePreview(item)"
          >

            <v-list-item-avatar tile>
              <img v-bind:src="getAvatar(item.name)" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{item.hint}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action class="d-none d-sm-inline">
              <v-chip pill color="green" text-color="white">
                <v-avatar left class="green darken-4">{{item.cost}}</v-avatar>
                BP
              </v-chip>
            </v-list-item-action>

            <v-list-item-action class="d-none d-sm-inline">
              <v-chip pill color="red" text-color="white">
                <v-avatar left class="red darken-4">{{item.baseTier}}</v-avatar>
                Tier
              </v-chip>
            </v-list-item-action>

          </v-list-item>
        </v-list>
      </v-card>
    </v-col>

  </v-row>

</template>

<script>
import SpeciesPreview from '~/components/forge/SpeciesPreview.vue';

export default {
  name: "choose",
  components: {
    SpeciesPreview,
  },
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      speciesList: undefined,
      selectedSpecies: undefined, // for he preview dialog box
      speciesDialog: false,
    }
  },
  watch: {
    'sources': {
      handler (newVal) {
        if ( newVal ) {
          this.getSpeciesList(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  computed: {
    sources() {
      return ['core','coreab'];
    },
    characterSettingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
  },
  methods: {
    async getSpeciesList(sources) {
      const config = {
        params: {
          source: sources.join(','),
        },
      };
      const { data } = await this.$axios.get(`/api/species/`, config);
      this.speciesList = data;
    },
    getAvatar(name) {
      const slug = name.toLowerCase().replace(/\s/gm, '-');
      return `/img/icon/species/species_${slug}_avatar.png`;
    },
    async updatePreview(item) {
      const slug = this.computeSlug(item.key);
      const speciesDetails = await this.$axios.get(`/api/species/${slug}`);
      this.selectedSpecies = speciesDetails.data;
      this.speciesDialog = true;
    },
    computeSlug(key) {
      return key.replace(/([a-z0-9][A-Z])/g, function (g) { return g[0] + '-' + g[1].toLowerCase() });
    },
    selectSpeciesForChar(species) {
      this.$store.commit('characters/setCharacterSpecies', { id: this.characterId, species: { value: species.name, cost: species.cost } });
      this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: { modifications: species.modifications, source: 'species' } });

      this.$store.commit('characters/clearCharacterKeywordsBySource', { id: this.characterId, source: 'species' });
      if ( species.keywords.length > 0 ) {
        species.keywords.forEach( keyword => {
          const payload = {
            name: keyword,
            source: 'species',
            type: 'keyword',
            replacement: undefined,
          };
          this.$store.commit('characters/addCharacterKeyword', { id: this.characterId, keyword: payload });
        });
      }

      this.speciesDialog = false;
      this.$router.push({
        name: `forge-characters-id-builder-species-manage`,
        params: { id: this.characterId }
      });
    },
  },
}
</script>

<style scoped>

</style>