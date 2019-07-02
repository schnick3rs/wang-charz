<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-layout justify-center row wrap>

    <v-flex xs12 >
      <h1 class="headline">Select a Attributes & Skills</h1>
    </v-flex>

    <v-flex xs3>

      <v-card >

        <v-list>

          <v-list-tile
            v-for="attribute in attributeRepository"
            :key="attribute.key"
            @click="selectedAttribute = attribute"
          >
            {{attribute.name}}
          </v-list-tile>

        </v-list>

      </v-card>

    </v-flex>

    <v-flex xs5>

      <v-card v-if="selectedAttribute" dense>

        <v-card-title>

          <h4>{{ selectedAttribute.name }}</h4>
          <v-spacer></v-spacer>
          <v-btn icon @click="decrementAttribute(selectedAttribute.key)" :disabled="characterAttributes[selectedAttribute.key] <= 1">
            <v-icon>remove_circle</v-icon>
          </v-btn>
          <v-btn icon @click="incrementAttribute(selectedAttribute.key)" :disabled="characterAttributes[selectedAttribute.key] >= attributeMaximumFor(selectedAttribute.key)">
            <v-icon>add_circle</v-icon>
          </v-btn>
          <h4>
            <span class="align-end">
              <span>{{ characterAttributes[selectedAttribute.key] }}</span>
              <span v-if="characterAttributesEnhanced[selectedAttribute.key] !== characterAttributes[selectedAttribute.key]">
                ({{ characterAttributesEnhanced[selectedAttribute.key] }})
              </span>
            </span>
          </h4>
        </v-card-title>

        <v-divider></v-divider>

        <v-list dense>

          <v-list-tile
            v-for="skill in skillsByAttribute(selectedAttribute.name)"
            :key="skill.key"
          >

              <v-list-tile-content>{{skill.name}}:</v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon @click="decrementSkill(skill.key)" :disabled="characterSkills[skill.key] <= 0">
                  <v-icon color="red">remove_circle</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon @click="incrementSkill(skill.key)" :disabled="characterSkills[skill.key] >= skillMaximum">
                  <v-icon :color="affordableSkillColor(characterSkills[skill.key])">add_circle</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>{{characterSkills[skill.key]}}</v-list-tile-action>

          </v-list-tile>

        </v-list>

      </v-card>

    </v-flex>

    <v-flex xs4>

      <v-card v-if="selectedAttribute" dense>

        <v-list dense>

          <v-list-tile
            v-for="trait in traitsByAttribute(selectedAttribute.name)"
            :key="trait.key"

          >
                <v-list-tile-content>{{trait.name}}:</v-list-tile-content>
                <v-list-tile-action>{{characterTraitsEnhanced[trait.key]}}</v-list-tile-action>

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
  import axios from "axios";

  export default {
  name: 'Stats',
  layout: 'builder',
  props: [],
  async asyncData({ params }) {
    const attributeResponse = await axios.get(`https://api.sheety.co/ff93c641-c553-4379-85c0-ca2acd417333`);
    const skillResponse = await axios.get(`https://api.sheety.co/669365df-fa15-4003-ad7d-21d86e11b69a`);
    const traitResponse = await axios.get(`https://api.sheety.co/2d702477-7a22-4d71-9c25-6119ee216253`);
    return {
      attributeRepository: attributeResponse.data || [],
      skillRepository: skillResponse.data || [],
      traitRepository: traitResponse.data || [],
    };
  },
  data() {
    return {
      selectedAttribute: undefined,
    }
  },
  methods: {
    incrementSkill(skill) {
      let newValue = this.characterSkills[skill] + 1;
      this.$store.commit('setSkill', {key: skill, value: newValue});
    },
    decrementSkill(skill) {
      let newValue = this.characterSkills[skill] - 1;
      this.$store.commit('setSkill', {key: skill, value: newValue});
    },
    incrementAttribute(attribute) {
      let newValue = this.characterAttributes[attribute] + 1;
      this.$store.commit('setAttribute', {key: attribute, value: newValue});
    },
    decrementAttribute(attribute) {
      let newValue = this.characterAttributes[attribute] - 1;
      this.$store.commit('setAttribute', {key: attribute, value: newValue});
    },
    skillsByAttribute(attribute) {
      if ( this.skillRepository !== undefined ) {
        return this.skillRepository.filter(s => s.attribute === attribute);
      }
      return []
    },
    traitsByAttribute(attribute) {
      if ( this.traitRepository !== undefined ) {
        return this.traitRepository.filter(t => t.attribute === attribute);
      }
      return []
    },
    affordableSkillColor(currentSkillValue) {
      const skillNewValueCost = [0, 1, 2, 3, 4, 10, 12, 14, 24];
      let cost = skillNewValueCost[currentSkillValue+1];
      return (cost <= this.remainingBuildPoints) ? 'green' : 'orange';
    },
    attributeMaximumFor(attribute) {
      return 8;
    },
    skillMaximumBy(tier) {
      return 3+tier;
    },
  },
  computed: {
    treeOfLearningValid(){
      let valueOfHighestSkill = 0;
      let numberOfLearnedSkills = 0;
      for (const key in this.characterSkills) {
        if ( this.characterSkills[key] > valueOfHighestSkill ) {
          valueOfHighestSkill = this.characterSkills[key];
        }
        if ( this.characterSkills[key] > 0 ) {
          numberOfLearnedSkills++;
        }
      }
      return numberOfLearnedSkills >= valueOfHighestSkill;
    },
    skillMaximum() {
      return this.skillMaximumBy( this.settingTier );
    },
    settingTier() { return this.$store.state.settingTier; },
    remainingBuildPoints() { return this.$store.getters['remainingBuildPoints']; },
    characterAttributes() { return this.$store.state.attributes; },
    characterAttributesEnhanced() {      return this.$store.getters['attributesEnhanced']; },
    characterTraitsEnhanced() {      return this.$store.getters['traitsEnhanced']; },
    characterSkills() { return this.$store.state.skills; },
    characterTraits() { return this.$store.getters['traits']; },
  }
}
</script>

<style scoped lang="css">
</style>
