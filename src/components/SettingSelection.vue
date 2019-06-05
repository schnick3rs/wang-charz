<template lang="html">

  <section class="setting-selection">
    <h1>setting-selection Component</h1>

    <v-container grid-list-md text-xs-center>

      <v-layout row wrap>

        <v-flex xs12 sm6 md4 lg2 v-if="currentPage === 1" v-for="item in settingTemplateOptions">

          <v-card>
            <v-img :src="item.cover" height="150"></v-img>
            <v-card-title primary-title>
              <h3 class="title">{{item.name}}</h3>
            </v-card-title>
            <v-card-text>
              <v-subheader>Recommended Tier: {{item.recommendedTiers}}</v-subheader>
            </v-card-text>
            <v-card-actions>
              <v-btn>Select</v-btn>
            </v-card-actions>
          </v-card>

        </v-flex>

        <v-flex v-if="currentPage === 1">
        </v-flex>

      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  export default  {
    name: 'setting-selection',
    props: [],
    mounted() {

    },
    data() {
      return {
        currentPage: 1,
        setting: {
          name: '',
          tier: 1,
          species: { exclude: [] },
          archetypes: { exclude: [] },
        },
        settingTemplateOptions: [
          { name: "Custom", recommendedTiers: "1-5", cover: 'https://cdna.artstation.com/p/assets/images/images/011/151/588/large/diego-gisbert-llorens-b-g-cover-1-wip4a.jpg?1528118826' },
          { name: "Only War", recommendedTiers: "1", cover: 'https://40k.gallery/img/40K-artwork/40K-20170826114311.jpg' },
          { name: "Dark Heresy", recommendedTiers: "1-2", cover: 'https://www.fantasyflightgames.com/media/ffg_content/Dark-Heresy-2nd/core-book-previews/preview-3/Dark_HeresyII_wip7-Web.jpg' },
          { name: "Rogue Trader", recommendedTiers: "2-3", cover: 'https://i.pinimg.com/originals/4d/d9/ab/4dd9ab05a6c5dc62a09d61365303c34b.jpg' },
          { name: "Deathwatch", recommendedTiers: "3-4", cover: 'https://i.pinimg.com/originals/be/09/17/be0917ae8414dbfde3f973d8ba2956bb.jpg' },
          { name: "Black Crusade", recommendedTiers: "2-3", cover: 'https://warhammerart.com/wp-content/uploads/2018/11/13TH-BLACK-CRUSADE-04.jpg' },
        ]
      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="css">
  .setting-selection {

  }
</style>
