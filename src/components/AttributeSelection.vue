<template lang="html">

  <section class="attribute-selection">
    <h1>attribute-selection Component</h1>

    <v-container grid-list-md>

      <v-layout row>

        <v-flex xs3>

          <v-list >

            <v-list-tile v-for="(item, key) in attributes" >

              <v-list-tile-title>{{key}}</v-list-tile-title>

              <v-list-tile-content>
                <v-text-field box="true" v-model="attributes[key]" type="number" ></v-text-field>
              </v-list-tile-content>

            </v-list-tile>

          </v-list>

        </v-flex>

        <v-flex xs3>

          <v-list>

            <v-list-tile>
              <v-list-tile-title>Defence</v-list-tile-title>
              <v-list-tile-content><v-text-field readonly box="true" v-model="defenceValue" type="number" ></v-text-field></v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-title>Influence</v-list-tile-title>
              <v-list-tile-content><v-text-field readonly box="true" v-model="influenceValue" type="number" ></v-text-field></v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-title>Wealth</v-list-tile-title>
              <v-list-tile-content><v-text-field readonly box="true" v-model="wealthValue" type="number" ></v-text-field></v-list-tile-content>
            </v-list-tile>

          </v-list>

        </v-flex>

      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  export default  {
    name: 'attribute-selection',
    props: [],
    mounted() {

    },
    data() {
      return {
        campaign: {
          tier: 3
        },
        attributes: {
          strength: 4,
          agility: 3,
          toughness: 5,
          fellowship: 4,
          intellect: 4,
          initiative: 4,
        },
        traits: [
          "defence"
        ]
      }
    },
    methods: {
    },
    computed: {
      defenceValue: function() { return this.attributes.initiative - 1 },
      influenceValue: function() { return this.attributes.fellowship - 1 },
      wealthValue: function() { return this.campaign.tier },
    }
}
</script>

<style scoped lang="css">
  .attribute-selection {

  }
</style>
