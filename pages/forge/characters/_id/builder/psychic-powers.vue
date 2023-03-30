<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row justify="center">
    <v-col>
      <h1 class="headline">
        Manage Powers
        <span>
          <v-icon v-if="alerts && alerts.length <= 0">error_outline</v-icon>
          <v-btn color="warning" v-else-if="showAlerts" @click="showAlerts = !showAlerts" small><v-icon small left>error</v-icon> Hide warnings</v-btn>
          <v-btn color="warning" v-else @click="showAlerts = !showAlerts" outlined small>
            <v-icon small left>error_outline</v-icon>show {{alerts.length}} warning{{ alerts.length > 1 ? 's' : '' }}
          </v-btn>
        </span>
      </h1>
    </v-col>

    <v-col :cols="12" v-if="showAlerts">
      <v-alert
        v-for="alert in alerts"
        :key="alert.key"
        :value="true"
        :type="alert.type"
        text
        dense
        border="left"
      >
        {{ alert.text }}
      </v-alert>
    </v-col>

    <v-col :cols="12">
      <v-card>
        <v-card-text>
          <v-chip
            v-for="item in characterPowers"
            :key="item.name"
            :close="item.cost !== 0"
            class="mr-2"
            @click:close="removePower(item.name)"
          >
            {{ item.name }}
          </v-chip>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col :cols="12">
      <v-chip-group
        v-model="selectedDisciplines"
        active-class="primary--text"
        column
        multiple
      >
        <v-chip
          v-for="filter in disciplines"
          :key="filter.key"
          :value="filter.name"
          :disabled="!allowedDisciplines.includes(filter.name)"
          filter
          small
          label
        >
          {{ filter.name }}
          <em v-if="filter.source !== 'core'" class="ml-1">({{filter.source}})</em>
        </v-chip>
      </v-chip-group>
    </v-col>

    <v-col :cols="12">
      <v-switch
        v-model="grantAllAccess"
        color="primary"
        label="Allow all access"
        hint="This is a workaround to access all powers"
        persistent-hint
        class="pl-2"
      />
    </v-col>

    <v-col :cols="12">
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="searchQuery"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          />
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="filteredPowers"
          :search="searchQuery"
          :items-per-page="-1"
          sort-by="name"
          item-key="key"
          hide-default-footer
        >
          <template v-slot:item.source.key="{ item }">
            <v-chip
                :color="item.source && ['fspg'].includes(item.source.key) ? 'success' : 'info'"
                outlined
                tags
                x-small
                label
            >
              {{item.source.key.toUpperCase()}}
            </v-chip>
          </template>
          <template v-slot:item.learn="{ item }">
            <span>
              <v-btn
                :disabled="characterPowers.map(i=>i.name).includes(item.name)"
                :color="affordableColor(item.cost)"
                :dark="!characterPowers.map(i=>i.name).includes(item.name)"
                x-small
                @click="addPower(item)"
              >
                add
              </v-btn>
            </span>
          </template>

          <template v-slot:no-results>
            <div class="text-lg-center">
              Your search for "{{ searchQuery }}" found no results.
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="js">
import PsychicDisciplineMixin from '~/mixins/PsychicDisciplineMixin';

export default {
  name: 'PsychicPowers',
  layout: 'forge',
  mixins: [
    PsychicDisciplineMixin,
  ],
  props: [],
  head() {
    return {
      title: 'Select Psychic Powers',
    };
  },
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      searchQuery: '',
      headers: [
        {
          text: 'Name',
          value: 'name',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Cost',
          value: 'cost',
          align: 'center',
          sortable: true,
        },
        {
          text: 'Discipline',
          value: 'discipline',
          sortable: true,
        },
        {
          text: 'Effect',
          value: 'effect',
          sortable: false,
        },
        {
          text: 'Learn',
          align: 'center',
          value: 'learn',
          sortable: false,
        },
      ],
      grantAllAccess: false,
      selectedDisciplines: [],
      species: undefined,
      archetype: undefined,
      psychicPowersList: undefined,
      loading: false,
      showAlerts: false,
    };
  },
  computed: {
    sources() {
      return [
        'core',
        'fspg',
        'red1',
        'cos',
        // 'tnh',
        ...this.settingHomebrews
      ];
    },
    disciplines() {
      return this.disciplinesRepository.filter((d)=>this.sources.includes(d.source));
    },
    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
    characterSpeciesKey() {
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    characterArchetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    characterEnhancements() {
      return this.$store.getters['characters/characterEnhancementsById'](this.characterId);
    },
    characterAccessibleDisciplines() {
      let disciplines = [];
      if (this.characterEnhancements) {
        return this.characterEnhancements.filter((e)=> e.targetGroup === 'psychicDisciplines');
      }
      return disciplines;
    },
    alerts() {
      const alerts = [];

      if (!this.isPsychic && !this.isNavigator) {
        const alert = {
          type: 'warning',
          text: 'You need to either possess the Psychic Keyword or have at least learned one rank in the Psychic Mastery skill.',
        };
        alerts.push(alert);
      }
      return alerts;
    },
    isPsychic() {
      const skills = this.$store.getters['characters/characterSkillsById'](this.characterId);
      const keywords = this.$store.getters['characters/characterKeywordsRawById'](this.characterId);
      const hasSkill = skills.psychicMastery > 0;
      const hasKeyword = keywords.some( (k) => k.name === 'Psyker');
      return (hasSkill || hasKeyword);
    },
    isNavigator() { // from the PAX Homebrew
      const key = this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
      return key === 'pax-navigator';
    },
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    maximumMinorPowers() { return this.settingTier; },
    maximumDisciplinePowers() { return Math.max(1, this.settingTier - 1); },
    maximumPsychicPowers() { return this.settingTier + 3; },
    characterPowers() {
      return this.$store.getters['characters/characterPsychicPowersById'](this.characterId);
    },
    allowedDisciplines() {
      let access = [];

      if (this.grantAllAccess) {
        return this.disciplines.map((d)=>d.name);
      }

      if(this.species && this.species.speciesFeatures) {
        this.species.speciesFeatures
          .filter((f)=> f.psychicDisciplines)
          .map((f)=> f.psychicDisciplines)
          .forEach((disciplines) => access = [ ...access, ...disciplines]);
      }

      if(this.archetype && this.archetype.archetypeFeatures) {
        this.archetype.archetypeFeatures
        .filter((f)=> f.psychicDisciplines)
        .map((f)=> f.psychicDisciplines)
        .forEach((disciplines) => access = [ ...access, ...disciplines]);
      }

      // TODO if there is no discipline access and the psyker keyword -> allow Minor
      access.push('Minor');

      this.characterAccessibleDisciplines.map((d) => d.targetValue).forEach((discipline) => {
        access = [ ...access, discipline ];
      });

      access = [...new Set(access)].sort();
      return access;
    },
    filteredPowers() {
      if (this.psychicPowersList === undefined) {
        return [];
      }

      let filteredPowers = this.psychicPowersList;

      if (this.selectedDisciplines.length > 0) {
        filteredPowers = filteredPowers.filter((p) => this.selectedDisciplines.includes(p.discipline));
      } else {
        filteredPowers = filteredPowers.filter((p) => this.allowedDisciplines.includes(p.discipline));
      }
      // filteredTalents = filteredTalents.filter( t => !this.characterTalents.includes(t.name) );

      return filteredPowers;
    },
    remainingBuildPoints() {
      return this.$store.getters['characters/characterRemainingBuildPointsById'](this.characterId);
    },
  },
  watch: {
    settingHomebrews: {
      handler(newVal) {
        if (newVal) {
          this.getPsychicPowers(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    characterSpeciesKey: {
      handler(newVal) {
        if (newVal) {
          this.getSpecies(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    characterArchetypeKey: {
      handler(newVal) {
        if (newVal) {
          this.getArchetype(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    affordableColor(cost) {
      return (cost <= this.remainingBuildPoints) ? 'green' : 'grey';
    },
    async getSpecies(key) {
      this.loading = true;
      const { data } = await this.$axios.get(`/api/species/${key}`);
      this.loading = false;
      this.species = data;
    },
    async getArchetype(key) {
      this.loading = true;
      const { data } = await this.$axios.get(`/api/archetypes/${key}`);
      this.loading = false;
      this.archetype = data;
    },
    async getPsychicPowers(sources) {
      const config = {
        params: { source: this.sources.join(','), },
      };
      this.loading = true;
      const { data } = await this.$axios.get('/api/psychic-powers/', config);
      this.loading = false;
      this.psychicPowersList = data;
    },
    addPower(power) {
      this.$store.commit('characters/addCharacterPsychicPower', { id: this.characterId, key: power.key, name: power.name, cost: power.cost });
    },
    removePower(powerName) {
      this.$store.commit('characters/removeCharacterPsychicPower', { id: this.characterId, name: powerName });
    },
    toggleDisciplineFilter(name) {
      if (this.selectedDisciplines.includes(name)) {
        this.selectedDisciplines = this.selectedDisciplines.filter((d) => d !== name);
      } else {
        this.selectedDisciplines.push(name);
      }
    },
  },
};
</script>

<style scoped lang="css">
</style>
