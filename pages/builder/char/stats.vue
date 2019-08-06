<template lang="html">

  <v-layout justify-center row wrap>

    <v-flex xs12 >
      <h1 class="headline">Select Attributes & Skills</h1>
    </v-flex>

    <v-flex xs12>
      <v-alert
        v-for="alert in alerts"
        v-bind:key="alert.key"
        v-bind:type="alert.type"
        value="true"
      >
        {{ alert.text }}
        <v-btn color="primary" v-if="alert.key === 'prerequisites'" v-on:click="ensurePrerequisites">
          Increase stats to meet prerequisites.
          <v-icon right>library_add</v-icon>
        </v-btn>
      </v-alert>
    </v-flex>


    <v-flex xs12 md6>

      <v-card>

        <v-list dense>

          <v-list-tile
            v-for="attribute in attributeRepository"
            :key="attribute.key"
          >

            <v-list-tile-content>{{attribute.name}}:</v-list-tile-content>
            <v-list-tile-action>
              <v-layout row>
                <v-btn
                  icon
                  @click="decrementAttribute(attribute.key)"
                  :disabled="characterAttributes[attribute.key] <= 1"
                >
                  <v-icon color="red">remove_circle</v-icon>
                </v-btn>
                <span class="ml-3 mr-3">{{ characterAttributes[attribute.key] }}</span>
                <v-btn
                  icon
                  @click="incrementAttribute(attribute.key)"
                  :disabled="characterAttributes[attribute.key] >= attributeMaximumFor(attribute.name)"
                >
                  <v-icon color="green">add_circle</v-icon>
                </v-btn>
              </v-layout>
            </v-list-tile-action>

            <v-list-tile-action>{{ characterAttributesEnhanced[attribute.key] }}</v-list-tile-action>

          </v-list-tile>

          <v-divider></v-divider>

            <v-list-tile
              v-for="trait in traitRepository"
              :key="trait.key"

            >
              <v-list-tile-content>{{trait.name}}:</v-list-tile-content>
              <v-list-tile-action>{{characterTraits[trait.key]}}</v-list-tile-action>
              <v-list-tile-action>{{characterTraitsEnhanced[trait.key]}}</v-list-tile-action>

            </v-list-tile>


        </v-list>

      </v-card>

    </v-flex>

    <v-flex xs12 md6>

      <v-card>

        <v-list dense>

          <v-list-tile
            v-for="skill in skillRepository"
            :key="skill.key"
          >

            <v-list-tile-content>{{skill.name}}:</v-list-tile-content>
            <v-list-tile-action>

              <v-layout row>

                <v-btn icon @click="decrementSkill(skill.key)" :disabled="characterSkills[skill.key] <= 0">
                  <v-icon color="red">remove_circle</v-icon>
                </v-btn>

                <span class="ml-3 mr-3">{{characterSkills[skill.key]}}</span>

                <v-btn
                  icon
                  @click="incrementSkill(skill.key)"
                  :disabled="characterSkills[skill.key] >= skillMaximum"
                >
                  <v-icon :color="affordableSkillColor(characterSkills[skill.key])">add_circle</v-icon>
                </v-btn>

              </v-layout>

            </v-list-tile-action>

            <v-list-tile-action>{{characterSkills[skill.key]+characterAttributesEnhanced[skill.attribute.toLowerCase()]}}</v-list-tile-action>

          </v-list-tile>

        </v-list>

      </v-card>

    </v-flex>

  </v-layout>

</template>

<script lang="js">
  import { mapGetters } from 'vuex';
  import StatRepositoryMixin from '~/mixins/StatRepositoryMixin.js';
  import ArchetypeRepositoryMixin from '~/mixins/ArchetypeRepositoryMixin.js';

  export default {
  name: 'Stats',
  layout: 'builder',
  props: [],
  mixins: [ArchetypeRepositoryMixin,StatRepositoryMixin],
  data() {
    return {
      selectedAttribute: undefined,
    };
  },
  methods: {
    incrementSkill(skill) {
      const newValue = this.characterSkills[skill] + 1;
      this.$store.commit('setSkill', { key: skill, value: newValue });
    },
    decrementSkill(skill) {
      const newValue = this.characterSkills[skill] - 1;
      this.$store.commit('setSkill', { key: skill, value: newValue });
    },
    incrementAttribute(attribute) {
      const newValue = this.characterAttributes[attribute] + 1;
      this.$store.commit('setAttribute', { key: attribute, value: newValue });
    },
    decrementAttribute(attribute) {
      const newValue = this.characterAttributes[attribute] - 1;
      this.$store.commit('setAttribute', { key: attribute, value: newValue });
    },
    skillsByAttribute(attribute) {
      if (this.skillRepository !== undefined) {
        return this.skillRepository.filter(s => s.attribute === attribute);
      }
      return [];
    },
    traitsByAttribute(attribute) {
      if (this.traitRepository !== undefined) {
        return this.traitRepository.filter(t => t.attribute === attribute);
      }
      return [];
    },
    affordableSkillColor(currentSkillValue) {
      const skillNewValueCost = [0, 1, 2, 3, 4, 10, 12, 14, 24];
      const cost = skillNewValueCost[currentSkillValue + 1];
      return (cost <= this.remainingBuildPoints) ? 'green' : 'orange';
    },
    attributeMaximumFor(attributeName) {
      const usedSpecies = this.characterSpecies || 'Human';
      const attributeBaseMaximumByTier = [4,5,6,8,10]; //index 0 is tier 1
      const maxBySpecies = this.getAttributeMaximumForSpecies( usedSpecies, attributeName );
      const maxByTier = attributeBaseMaximumByTier[this.settingTier-1];
      return Math.min(maxBySpecies, maxByTier);
    },
    skillMaximumBy(tier) {
      return 3 + tier;
    },
    ensurePrerequisites(){
      const archetype = this.archetypeRepository.find( archetype => archetype.name == this.archetype );

      if ( archetype && archetype.prerequisites.length > 0 ) {
        archetype.prerequisites.forEach(prerequisite => {

          // { group: 'attributes', value: 'willpower', threshold: 3, }
          switch (prerequisite.group) {
            case 'attributes':
              const attributeValue = this.characterAttributesEnhanced[prerequisite.value];
              if (attributeValue < prerequisite.threshold) {
                this.$store.commit('setAttribute', { key: prerequisite.value, value: prerequisite.threshold });
              }
              break;
            case 'skills':
              const skillValue = this.characterSkills[prerequisite.value];
              if (skillValue < prerequisite.threshold) {
                this.$store.commit('setSkill', { key: prerequisite.value, value: prerequisite.threshold });
              }
              break;
          }

        });
      }
    },
  },
  computed: {
    alerts() {
      const alerts = [];

      // archetype prerequisites matched?
      if ( !this.archetypePrerequisitesValid ) {
        alerts.push({
          key: 'prerequisites',
          type: 'warning',
          text: 'Archetype prerequisites unfulfilled. Increase your attributes and skills accordingly.',
        });
      }

      // tree of learning valid?
      if ( !this.treeOfLearningValid ) {
        alerts.push({
          key: 'tree',
          type: 'warning',
          text: 'Tree of Learning violated. You must have at least as many skills learned as your highest skill value.'
        });
      }

      // bp for attributes valid?
      const attributeBpSpendLimitValid = this.attributeCosts <= this.maximumBuildPointsForAttributes;
      if ( !attributeBpSpendLimitValid ) {
        alerts.push({
          key: 'attributeSpending',
          type: 'warning',
          text: `Maximum allowed BP spending violated. You may only spend ${this.maximumBuildPointsForAttributes} BP for Tier ${this.settingTier}.`,
        });
      }

      return alerts;
    },
    archetypePrerequisitesValid() {
      const archetype = this.archetypeRepository.find( archetype => archetype.name == this.archetype );

      let fulfilled = true;
      if ( archetype && archetype.prerequisites.length > 0 ) {
        archetype.prerequisites.forEach( prerequisite => {

          // { group: 'attributes', value: 'willpower', threshold: 3, }
          switch (prerequisite.group) {
            case 'attributes':
              const attributeValue = this.characterAttributesEnhanced[prerequisite.value];
              if ( attributeValue < prerequisite.threshold ) {
                fulfilled = false;
              }
              break;
            case 'skills':
              const skillValue = this.characterSkills[prerequisite.value];
              if ( skillValue < prerequisite.threshold ) {
                fulfilled = false;
              }
              break;
          }

        });
      }
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
    ...mapGetters([
      'settingTier',
      'archetype',
      'attributeCosts',
      'remainingBuildPoints'
    ]),
    ...mapGetters({
      characterSpecies: 'species',
      characterAttributes: 'attributes',
      characterAttributesEnhanced: 'attributesEnhanced',
      characterTraits: 'traits',
      characterTraitsEnhanced: 'traitsEnhanced',
      characterSkills: 'skills',
    }),
  }
}
</script>

<style scoped lang="css">
</style>
