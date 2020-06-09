<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row justify="center">
    <v-col :cols="12">
      <h1 class="headline">
        Select Attributes and Skills
        <span>
          <v-icon v-if="alerts && alerts.length <= 0">error_outline</v-icon>
          <v-btn color="warning" v-else-if="showAlerts" @click="showAlerts = !showAlerts" small><v-icon small left>error</v-icon> Hide warnings</v-btn>
          <v-btn color="warning" v-else @click="showAlerts = !showAlerts" outlined small>
            <v-icon small left>error_outline</v-icon>show {{alerts.length}} warning{{ alerts.length > 1 ? 's' : '' }}
          </v-btn>
          <v-btn color="primary" @click="resetStats" outlined small>reset Stats</v-btn>
        </span>
      </h1>
    </v-col>

    <v-progress-circular v-if="!archetype" indeterminate color="success" size="128" width="12" />

    <v-col :cols="12" v-if="showAlerts">
      <v-alert
        v-for="alert in alerts"
        :key="alert.key"
        :type="alert.type"
        :value="true"
        text
        dense
        border="left"
      >
        {{ alert.text }}
        <v-btn v-if="alert.key === 'prerequisites'" color="primary" @click="ensurePrerequisites" small>
          Increase stats to fit the archetype.
          <v-icon right small>
            library_add
          </v-icon>
        </v-btn>
      </v-alert>
    </v-col>

    <v-col :cols="12" :md="6" v-if="archetype">
      <v-card>
        <v-simple-table dense>
          <template v-slot:default>
            <tbody>
              <tr
                v-for="attribute in attributeRepository"
                :key="attribute.key"
              >
                <td>{{ attribute.name }}</td>
                <td>
                  <v-btn
                    icon
                    :disabled="characterAttributes[attribute.key] <= 1"
                    @click="decrementAttribute(attribute.key)"
                  >
                    <v-icon color="red">
                      remove_circle
                    </v-icon>
                  </v-btn>
                  {{ characterAttributes[attribute.key] }}
                  <v-btn
                    icon
                    :disabled="characterAttributes[attribute.key] >= attributeMaximumFor(attribute.name)"
                    @click="incrementAttribute(attribute.key)"
                  >
                    <!--"-->
                    <v-icon :color="affordableAttributeColor(characterAttributes[attribute.key])">
                      add_circle
                    </v-icon>
                  </v-btn>
                </td>
                <td>{{ characterAttributesEnhanced[attribute.key] }}</td>
              </tr>

              <tr
                v-for="trait in traitRepository"
                :key="trait.key"
              >
                <td>{{ trait.name }}:</td>
                <td>{{ characterTraits[trait.key] }}</td>
                <td>{{ characterTraitsEnhanced[trait.key] }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col >

    <v-col :cols="12" :md="6" v-if="archetype">
      <v-card>
        <v-simple-table dense>
          <template v-slot:default>
            <tbody>
              <tr
                v-for="skill in finalSkillRepository"
                :key="skill.key"
              >
                <td>{{ skill.name }}</td>
                <td>
                  <v-btn icon :disabled="characterSkills[skill.key] <= 0" @click="decrementSkill(skill.key)">
                    <v-icon color="red">
                      remove_circle
                    </v-icon>
                  </v-btn>
                  {{ characterSkills[skill.key] }}
                  <v-btn
                    icon
                    :disabled="characterSkills[skill.key] >= skillMaximum"
                    @click="incrementSkill(skill.key)"
                  >
                    <v-icon
                      :color="affordableSkillColor(characterSkills[skill.key])"
                    >
                      add_circle
                    </v-icon>
                  </v-btn>
                </td>
                <td>{{ computeSkillPool(skill) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>

  </v-row>
</template>

<script lang="js">
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';

export default {
  name: 'Stats',
  layout: 'forge',
  mixins: [
    StatRepositoryMixin,
  ],
  props: [],
  async asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      selectedAttribute: undefined,
      showAlerts: false,
      archetype: undefined,
      species: undefined,
      loading: false,
    };
  },
  head() {
    return {
      title: 'Select Attributes & Skills',
    };
  },
  computed: {
    alerts() {
      const alerts = [];

      // archetype prerequisites matched?
      if (!this.archetypePrerequisitesValid) {
        alerts.push({
          key: 'prerequisites',
          type: 'warning',
          text: 'Your attributes are lower than the picked archetype `demands`.',
        });
      }

      // tree of learning valid?
      if (!this.treeOfLearningValid) {
        alerts.push({
          key: 'tree',
          type: 'warning',
          text: 'Tree of Learning violated. You must have at least as many skills learned as your highest skill value.',
        });
      }

      return alerts;
    },
    archetypePrerequisitesValid() {
      const archetype = this.archetype;

      let fulfilled = true;
      if (archetype && archetype.prerequisites.length > 0) {
        archetype.prerequisites.forEach((prerequisite) => {
          // { group: 'attributes', value: 'willpower', threshold: 3, }
          switch (prerequisite.group) {
            case 'attributes':
              const attributeValue = this.characterAttributesEnhanced[prerequisite.value];
              if (attributeValue < prerequisite.threshold) {
                fulfilled = false;
              }
              break;
            case 'skills':
              const skillValue = this.characterSkills[prerequisite.value];
              if (skillValue < prerequisite.threshold) {
                fulfilled = false;
              }
              break;
          }
        });
      }

      if (this.ascensionPackages) {
        // this.ascensionPackages.
      }
      // const ascensions = this.

      return fulfilled;
    },
    treeOfLearningValid() {
      let valueOfHighestSkill = 0;
      let numberOfLearnedSkills = 0;
      for (const key in this.characterSkills) {
        if (this.characterSkills[key] > valueOfHighestSkill) {
          valueOfHighestSkill = this.characterSkills[key];
        }
        if (this.characterSkills[key] > 0) {
          numberOfLearnedSkills++;
        }
      }
      return numberOfLearnedSkills >= valueOfHighestSkill;
    },
    skillMaximum() {
      return 8;
    },
    // Character Data
    remainingBuildPoints() {
      return this.$store.getters['characters/characterRemainingBuildPointsById'](this.characterId);
    },
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterSpeciesKey() {
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    characterArchetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    characterAttributeCosts() {
      return this.$store.getters['characters/characterAttributeCostsById'](this.characterId);
    },
    characterAttributes() {
      return this.$store.getters['characters/characterAttributesById'](this.characterId);
    },
    characterAttributesEnhanced() {
      return this.$store.getters['characters/characterAttributesEnhancedById'](this.characterId);
    },
    characterSkills() {
      return this.$store.getters['characters/characterSkillsById'](this.characterId);
    },
    characterTraits() {
      return this.$store.getters['characters/characterTraitsById'](this.characterId);
    },
    characterTraitsEnhanced() {
      return this.$store.getters['characters/characterTraitsEnhancedById'](this.characterId);
    },
    characterCustomSkills() {
      return this.$store.getters['characters/characterCustomSkillsById'](this.characterId);
    },
    finalSkillRepository() {
      return [
        ...this.skillRepository,
        ...this.characterCustomSkills,
      ];
    },
    settingHouserules() {
      return this.$store.getters['characters/characterSettingHouserulesById'](this.characterId);
    },
  },
  watch: {
    characterSpeciesKey: {
      handler(newVal) {
        if (newVal && newVal !== 'unknown') {
          this.loadSpecies(newVal);
        }
      },
      immediate: true,
    },
    characterArchetypeKey: {
      handler(newVal) {
        if (newVal && newVal !== 'unknown') {
          this.loadArchetype(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    async loadArchetype(key) {
      this.loading = true;
      if (key === 'advanced') {
        this.archetype = { prerequisites: [] };
      } else {
        const { data } = await this.$axios.get(`/api/archetypes/${key}`);
        this.archetype = data;
      }
      this.loading = false;
    },
    async loadSpecies(key) {
      this.loading = true;
      const { data } = await this.$axios.get(`/api/species/${key}`);
      this.loading = false;
      this.species = data;
    },
    resetStats() {
      this.$store.commit('characters/resetCharacterStats', { id: this.characterId });
    },
    incrementSkill(skill) {
      const newValue = this.characterSkills[skill] + 1;
      this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: skill, value: newValue } });
    },
    decrementSkill(skill) {
      const newValue = this.characterSkills[skill] - 1;
      this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: skill, value: newValue } });
    },
    incrementAttribute(attribute) {
      const newValue = this.characterAttributes[attribute] + 1;
      this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
    },
    decrementAttribute(attribute) {
      const newValue = this.characterAttributes[attribute] - 1;
      this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
    },
    skillsByAttribute(attribute) {
      if (this.finalSkillRepository !== undefined) {
        return this.finalSkillRepository.filter((s) => s.attribute === attribute);
      }
      return [];
    },
    traitsByAttribute(attribute) {
      if (this.traitRepository !== undefined) {
        return this.traitRepository.filter((t) => t.attribute === attribute);
      }
      return [];
    },
    affordableAttributeColor(currentValue) {
      const attributeNewValueCost = {
        //   [0, 1, 2, 3,  4,  5,  6,  7,  8,  9, 10, 11, 12],
        v10: [0, 0, 4, 6,  8, 15, 18, 21, 32, 36, 40, 55, 72],
        v15: [0, 0, 4, 6, 10, 15, 20, 25, 30, 35, 40, 45, 50],
      };
      const costKey = this.settingHouserules['skill-attribute-advancement-costs'] ? this.settingHouserules['skill-attribute-advancement-costs'] : 'v15';
      const cost = attributeNewValueCost[costKey][currentValue + 1];
      return this.isAffordable(cost) ? 'green' : 'orange';
    },
    affordableSkillColor(currentSkillValue) {
      const skillNewValueCost = {
        //   [0, 1, 2, 3, 4,  5,  6,  7,  8],
        v10: [0, 1, 2, 3, 4, 10, 12, 14, 24],
        v15: [0, 2, 4, 6, 8, 10, 12, 14, 16],
      };
      const costKey = this.settingHouserules['skill-attribute-advancement-costs'] ? this.settingHouserules['skill-attribute-advancement-costs'] : 'v15';
      const cost = skillNewValueCost[costKey][currentSkillValue + 1];
      return this.isAffordable(cost) ? 'green' : 'orange';
    },
    isAffordable(cost) {
      return cost <= this.remainingBuildPoints;
    },
    attributeMaximumFor(name) {
      if (this.species && this.species.attributeMaximums) {
        return this.species.attributeMaximums.find((attribute) => attribute.name === name).value;
      }
      return 8;
    },
    computeSkillPool(skill) {
      const attribute = this.characterAttributesEnhanced[skill.attribute.toLowerCase()];
      if (attribute) {
        return attribute + this.characterSkills[skill.key];
      }
      return this.characterSkills[skill.key];
    },
    ensurePrerequisites() {
      const archetype = this.archetype;

      if (archetype && archetype.prerequisites.length > 0) {
        archetype.prerequisites.forEach((prerequisite) => {
          // { group: 'attributes', value: 'willpower', threshold: 3, }
          switch (prerequisite.group) {
            case 'attributes':
              const attributeValue = this.characterAttributesEnhanced[prerequisite.value];
              if (attributeValue < prerequisite.threshold) {
                this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: prerequisite.value, value: prerequisite.threshold } });
              }
              break;
            case 'skills':
              const skillValue = this.characterSkills[prerequisite.value];
              if (skillValue < prerequisite.threshold) {
                this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: prerequisite.value, value: prerequisite.threshold } });
              }
              break;
          }
        });
      }
    },
  },
};
</script>

<style scoped lang="css">
</style>
