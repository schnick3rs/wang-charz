<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row justify="center">
    <v-col :cols="12">
      <h1 class="headline">
        Select Attributes and Skills
      </h1>
    </v-col>

    <v-col :cols="12">
      <v-alert
        v-for="alert in alerts"
        :key="alert.key"
        :type="alert.type"
        :value="true"
      >
        {{ alert.text }}
        <v-btn v-if="alert.key === 'prerequisites'" color="primary" @click="ensurePrerequisites">
          Increase stats to meet prerequisites.
          <v-icon right>
            library_add
          </v-icon>
        </v-btn>
      </v-alert>
    </v-col>

    <v-col :cols="12" :md="6">
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
                    @click="incrementAttribute(attribute.key)"
                  >
                    <!--:disabled="characterAttributes[attribute.key] >= attributeMaximumFor(attribute.name)"-->
                    <v-icon color="green">
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
    </v-col>

    <v-col :cols="12" :md="6">
      <v-card>
        <v-simple-table dense>
          <template v-slot:default>
            <tbody>
              <tr
                v-for="skill in skillRepository"
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
                    <v-icon :color="affordableSkillColor(characterSkills[skill.key])">
                      add_circle
                    </v-icon>
                  </v-btn>
                </td>
                <td>{{ characterSkills[skill.key]+characterAttributesEnhanced[skill.attribute.toLowerCase()] }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="js">
import AscensionRepositoryMixin from '~/mixins/AscensionRepositoryMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';

export default {
  name: 'Stats',
  layout: 'forge',
  mixins: [
    AscensionRepositoryMixin,
    StatRepositoryMixin,
  ],
  props: [],
  data() {
    return {
      selectedAttribute: undefined,
      archetypeRepository: [],
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
          text: 'Archetype prerequisites unfulfilled. Increase your attributes and skills accordingly.',
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

      // bp for attributes valid?
      const attributeBpSpendLimitValid = this.characterAttributeCosts <= this.maximumBuildPointsForAttributes;
      if (!attributeBpSpendLimitValid) {
        alerts.push({
          key: 'attributeSpending',
          type: 'warning',
          text: `Maximum allowed BP spending violated. You spend ${this.characterAttributeCosts} BP but you may only spend ${this.maximumBuildPointsForAttributes} BP for Tier ${this.settingTier}.`,
        });
      }

      return alerts;
    },
    archetypePrerequisitesValid() {
      const archetype = this.archetypeRepository.find((archetype) => archetype.name == this.characterArchetypeLabel);

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
    // see core page 156
    maximumBuildPointsForAttributes() {
      const bpLimits = [0, 100, 100, 150, 200, 300];
      return bpLimits[this.settingTier];
    },
    skillMaximum() {
      return this.skillMaximumBy(this.settingTier);
    },
    // Character Data
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterArchetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
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
  },
  async asyncData({ params, $axios }) {
    const archetypeResponse = await $axios.get('/api/archetypes/?source=core,coreab');
    return {
      characterId: params.id,
      archetypeRepository: archetypeResponse.data,
    };
  },
  head() {
    return {
      title: 'Select Attributes & Skills',
    };
  },
  methods: {
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
      if (this.skillRepository !== undefined) {
        return this.skillRepository.filter((s) => s.attribute === attribute);
      }
      return [];
    },
    traitsByAttribute(attribute) {
      if (this.traitRepository !== undefined) {
        return this.traitRepository.filter((t) => t.attribute === attribute);
      }
      return [];
    },
    affordableSkillColor(currentSkillValue) {
      const skillNewValueCost = [0, 1, 2, 3, 4, 10, 12, 14, 24];
      const cost = skillNewValueCost[currentSkillValue + 1];
      return (cost <= this.remainingBuildPoints) ? 'green' : 'orange';
    },
    attributeMaximumFor(attributeName) {
      const usedSpecies = this.characterSpeciesLabel || 'Human';
      const attributeBaseMaximumByTier = [4, 5, 6, 8, 10]; // index 0 is tier 1
      const maxBySpecies = this.getAttributeMaximumForSpecies(usedSpecies, attributeName);
      const maxByTier = attributeBaseMaximumByTier[this.settingTier - 1];
      return Math.min(maxBySpecies, maxByTier);
    },
    skillMaximumBy(tier) {
      return 3 + tier;
    },
    ensurePrerequisites() {
      const archetype = this.archetypeRepository.find((archetype) => archetype.name == this.characterArchetypeLabel);

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
