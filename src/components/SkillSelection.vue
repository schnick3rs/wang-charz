<template lang="html">

  <section class="skill-selection">
    <h1>skill-selection Component</h1>

    <v-container grid-list-md text-xs-center>

      <v-layout row wrap>

        <v-flex xs12 sm6 md4 lg4 v-for="attribute in attributes">

          <v-card >

            <v-card-title>{{attribute.name}} - [{{characterAttributes[attribute.key]}}]</v-card-title>

            <v-card-text>

              <v-divider v-if="skillsByAttribute(attribute.name).length > 0"></v-divider>

              <v-list dense subheader two-line v-if="skillsByAttribute(attribute.name).length > 0">
                <v-subheader>Skills</v-subheader>

                <v-list-tile v-for="skill in skillsByAttribute(attribute.name)" @click="">
                  <v-list-tile-content>
                    <v-list-tile-title>{{skill.name}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{skill.description}}</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-avatar color="blue" tile size="24">
                      <span class="white--text headline">{{characterSkills[skill.key]}}</span>
                    </v-avatar>
                  </v-list-tile-action>

                  <v-list-tile-action>
                    <v-btn icon @click="incrementSkill(skill.key)" :disabled=" characterSkills[skill.key] >= 8">
                      <v-icon :color="affordableSkillColor(characterSkills[skill.key])">add_circle</v-icon>
                    </v-btn>
                  </v-list-tile-action>

                </v-list-tile>

              </v-list>

              <v-divider v-if="traitsByAttribute(attribute.name).length > 0"></v-divider>

              <v-list dense subheader v-if="traitsByAttribute(attribute.name).length > 0">
                <v-subheader>Traits</v-subheader>
                <v-list-tile v-for="trait in traitsByAttribute(attribute.name)">

                  <v-list-tile-content>
                    <v-list-tile-title>{{trait.name}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{trait.description}}</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-avatar color="blue" tile size="24">
                      <span class="white--text headline">{{characterTraits[trait.key]}}</span>
                    </v-avatar>
                  </v-list-tile-action>

                </v-list-tile>
              </v-list>

            </v-card-text>

          </v-card>

        </v-flex>

      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  import axios from 'axios';

  export default  {
  name: 'skill-selection',
  props: [],
  mounted() {
    console.info('Fetching from sheety.co ...');
    axios.get('https://api.sheety.co/ff93c641-c553-4379-85c0-ca2acd417333')
      .then((response) => {
        this.attributeRepository = response.data; // all attributes;
        console.log('Fetched attributes.')
      });
    axios.get('https://api.sheety.co/2d702477-7a22-4d71-9c25-6119ee216253')
      .then((response) => {
        this.traitRepository = response.data; // all traits;
        console.log('Fetched traits.')
      });
    axios.get('https://api.sheety.co/669365df-fa15-4003-ad7d-21d86e11b69a')
      .then((response) => {
        this.skillRepository = response.data; // all skills;
        console.log('Fetched skills.')
      });
  },
  data() {
    return {
      attributeRepository: undefined,
      traitRepository: undefined,
      skillRepository: undefined,
    }
  },
  methods: {
    incrementSkill(skill) {
      let newValue = this.characterSkills[skill] + 1;
      this.$store.commit('setSkill', {key: skill, value: newValue});
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
  },
  computed: {
    remainingBuildPoints() { return this.$store.getters.remainingBuildPoints; },
    characterAttributes() { return this.$store.getters.attributes; },
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
