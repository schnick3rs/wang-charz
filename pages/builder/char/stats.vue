<template lang="html">

  <v-layout justify-center row wrap>

    <v-flex xs12 >
      <h1 class="headline">Select a Attributes & Skills</h1>
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
              <v-btn
                icon
                @click="decrementAttribute(attribute.key)"
                :disabled="characterAttributes[attribute.key] <= 1"
              >
                <v-icon color="red">remove_circle</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action>{{ characterAttributes[attribute.key] }}</v-list-tile-action>
            <v-list-tile-action>
              <v-btn
                icon
                @click="incrementAttribute(attribute.key)"
                :disabled="characterAttributes[attribute.key] >= attributeMaximumFor(attribute.name)"
              >
                <v-icon color="green">add_circle</v-icon>
              </v-btn>
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
              <v-btn icon @click="decrementSkill(skill.key)" :disabled="characterSkills[skill.key] <= 0">
                <v-icon color="red">remove_circle</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action>{{characterSkills[skill.key]}}</v-list-tile-action>
            <v-list-tile-action>
              <v-btn
                icon
                @click="incrementSkill(skill.key)"
                :disabled="characterSkills[skill.key] >= skillMaximum"
              >
                <v-icon :color="affordableSkillColor(characterSkills[skill.key])">add_circle</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action>{{characterSkills[skill.key]+characterAttributesEnhanced[skill.attribute.toLowerCase()]}}</v-list-tile-action>

          </v-list-tile>

        </v-list>

      </v-card>

    </v-flex>

    <v-flex xs12>
      <v-alert :value="!treeOfLearningValid" type="warning">Tree of Learning violated. You must have at least as many skills learned as your highest skill value.</v-alert>
    </v-flex>

  </v-layout>

</template>

<script lang="js">
  import { mapGetters } from 'vuex';
  import StatRepositoryMixin from '~/mixins/StatRepositoryMixin.js';

  export default {
  name: 'Stats',
  layout: 'builder',
  props: [],
  mixins: [StatRepositoryMixin],
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
  },
  computed: {
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
      return this.skillMaximumBy(this.settingTier);
    },
    ...mapGetters([
      'settingTier',
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
