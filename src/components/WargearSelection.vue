<template lang="html">

  <section class="wargear-selection">

    <v-container grid-list-md>

      <v-layout justify-center row wrap>

        <v-flex xs12 sm10 md8 lg8 >

          <v-card
                  v-for="gear in characterWargear"
                  :key="gear.key"
                  class="mb-2"
          >

            <v-card-title>
              <span class="mb-0">{{ gear.name }}</span>
            </v-card-title>

            <v-card-text v-if="gear.options">

                <v-radio-group v-model="gear.selected" class="mt-0">
                  <v-radio
                          v-for="option in gear.options"
                          :key="option.key"
                          :label="option.name"
                          :value="option.name"
                  ></v-radio>
                </v-radio-group>

            </v-card-text>

          </v-card>

        </v-flex>

      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  import WargearRepositoryMixin from '../mixins/WargearRepositoryMixin';

  export default  {
  name: 'wargear-selection',
  props: [],
  mixins: [ WargearRepositoryMixin ],
  mounted() {

  },
  data() {
    return {
      characterWargear: [
        { name: 'Sororitas Power Armour', },
        { name: 'Chaplet Ecclisiasticus', },
        {
          name: 'Either a boltgun OR a chainsword and bolt pistol.',
          selected: 'Boltgun',
          options: [
            { name: 'Boltgun', },
            { name: 'Chainsword and bold pistol',  },
          ],
        },
        { name: 'Clothing (Sororitas vestments)'},
        { name: 'Writing kit'},
        { name: 'Copy of the Rule of the Soroitas'},
      ],
      wargearSelectionOptions: [
        {  },
      ],
    }
  },
  methods: {

  },
  computed: {

  }
}
</script>

<style scoped lang="css">
  .wargear-selection {

  }
</style>
