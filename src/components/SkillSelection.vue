<template lang="html">

  <section class="skill-selection">
    <h1>skill-selection Component</h1>

    <v-container grid-list-md text-xs-center>

      <v-layout row wrap>

        <v-flex xs12 sm6 md4 lg4 v-for="attribute in attributes">

          <v-card >

            <v-card-title>{{attribute}}</v-card-title>

            <v-card-text>

              <v-divider></v-divider>

              <v-list dense subheader two-line>
                <v-subheader>Skills</v-subheader>

                <v-list-tile v-for="skill in skillsByAttribute(attribute)" @click="">
                  <v-list-tile-content>
                    <v-list-tile-title>{{skill.name}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{skill.description}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

              </v-list>

              <v-divider v-if="traitsByAttribute(attribute).length > 0"></v-divider>

              <v-list dense subheader>
                <v-subheader>Traits</v-subheader>
                <v-list-tile v-for="trait in traitsByAttribute(attribute)">{{trait.name}}</v-list-tile>
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
     axios.get('https://api.sheety.co/669365df-fa15-4003-ad7d-21d86e11b69a')
      .then((response) => {
        this.skillRepository = response.data; // all talents;
      });
    axios.get('https://api.sheety.co/2d702477-7a22-4d71-9c25-6119ee216253')
      .then((response) => {
        this.traitRepository = response.data; // all talents;
      });
  },
  data() {
    return {
      skillRepository: undefined,
      traitRepository: undefined,
    }
  },
  methods: {
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
  },
  computed: {
    attributes: function() {
      if ( this.skillRepository !== undefined ) {
        return [...new Set(this.skillRepository.map(item => item.attribute))]
      }
      return []
    }
  }
}
</script>

<style scoped lang="css">
  .skill-selection {

  }
</style>
