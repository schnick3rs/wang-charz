<template lang="html">

  <section class="skill-selection">

    <v-container grid-list-md text-xs-center>

      <v-layout row wrap>

        <v-flex xs12>
          <v-alert :value="!treeOfLearningValid" type="warning">Tree of Learning violated. You must have at least as many skills learned as your highest skill value.</v-alert>
        </v-flex>

        <v-flex xs12 sm6 md4 lg4 v-for="attribute in attributes">

          <v-card >

            <v-card-title>
              <h4>{{ attribute.name }}</h4>
              <v-spacer></v-spacer>
              <v-btn icon @click="decrementAttribute(attribute.key)" :disabled="characterAttributes[attribute.key] <= 1">
                <v-icon>remove_circle</v-icon>
              </v-btn>
              <v-btn icon @click="incrementAttribute(attribute.key)" :disabled="characterAttributes[attribute.key] >= attributeMaximumFor(attribute.key)">
                <v-icon>add_circle</v-icon>
              </v-btn>
              <h4><span class="align-end">{{ characterAttributes[attribute.key] }} / {{ characterAttributesEnhanced[attribute.key] }}</span></h4>
            </v-card-title>

            <v-divider></v-divider>

            <v-list dense>
              <div v-for="skill in skillsByAttribute(attribute.name)">
                <v-list-tile >
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
              </div>
            </v-list>

            <v-divider></v-divider>

            <v-list dense>
              <div v-for="trait in traitsByAttribute(attribute.name)">
                <v-list-tile >
                  <v-list-tile-content>{{trait.name}}:</v-list-tile-content>
                  <v-list-tile-action>{{characterTraits[trait.key]}}</v-list-tile-action>
                </v-list-tile>
              </div>
            </v-list>

          </v-card>

        </v-flex>

      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  import AttributeRepositoryMixin from '../mixins/AttributeRepositoryMixin';
  import TraitRepositoryMixin from '../mixins/TraitRepositoryMixin';
  import SkillRepositoryMixin from '../mixins/SkillRepositoryMixin';

  export default  {
  name: 'skill-selection',
  props: [],
  mixins: [
    AttributeRepositoryMixin,
    TraitRepositoryMixin,
    SkillRepositoryMixin,
  ],
  data() {
    return {}
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
  },
  computed: {
    treeOfLearningValid(){
      let valueOfhighestKey = 0;
      let numberOfLearendSkills = 0;
      for (var key in this.characterSkills) {
        if ( this.characterSkills[key] > valueOfhighestKey ) {
          valueOfhighestKey = this.characterSkills[key];
        }
        if ( this.characterSkills[key] > 0 ) {
          numberOfLearendSkills++;
        }
      }
      return numberOfLearendSkills >= valueOfhighestKey;
    },
    skillMaximum() {
      return this.skillMaximumBy( this.settingTier );
    },
    settingTier() { return this.$store.getters.settingTier; },
    remainingBuildPoints() { return this.$store.getters.remainingBuildPoints; },
    characterAttributes() { return this.$store.getters.attributes; },
    characterAttributesEnhanced() {      return this.$store.getters.attributesEnhanced; },
    characterSkills() { return this.$store.getters.skills; },
    characterTraits() { return this.$store.getters.traits; },
    attributes() {
      if ( this.attributeRepository !== undefined ) {
        return this.attributeRepository;
      }
      return []
    },
  }
}
</script>

<style scoped lang="css">
  .skill-selection {

  }
</style>
