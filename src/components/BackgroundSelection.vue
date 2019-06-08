<template lang="html">

  <section class="background-selection">

    <v-container grid-list-md>

      <v-layout justify-center row wrap>

        <v-flex xs12 sm10 md8 lg8>

          <v-card>

            <v-card-text>

              <v-select
                      v-model="backgroundSelect.selected"
                      :label="backgroundSelect.label"
                      :items="backgroundSelect.options"
                      dense
                      solo
              >
              </v-select>

            </v-card-text>

          </v-card>

        </v-flex>

      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  export default  {
    name: 'background-selection',
    props: [],
    mounted() {

    },
    data() {
      return {
        backgroundSelect: {
          label: 'Select a background',
          selected: undefined,
          options: [
            { text: 'Origin - +3 Shock', value: 'origin-shock', hint: 'A hero’s home may be their defining trait.' },
            { text: 'Origin - +1 Wound', value: 'origin-wounds', hint: 'A hero’s home may be their defining trait.' },
            { text: 'Keyword - Close connections and valuable contacts', value: 'keyword', hint: '' },
            { text: 'Accomplishment - +1 Influence', value: 'accomplishment-influence', hint: '' },
            { text: 'Accomplishment - +2 Wealth', value: 'accomplishment-wealth', hint: '' },
            { text: 'Goal - Gain glory fo objectives', value: 'goal', hint: '' },
          ]
        },
      }
    },
    methods: {
      subSelection(background) {
        return this[background].options;
      }
    },
    computed: {

    }
}
</script>

<style scoped lang="css">
  .background-selection {

  }
</style>
