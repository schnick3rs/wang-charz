<template lang="html">

  <section class="home">

    <v-container grid-list-md>

      <v-layout justify-center row wrap>

        <v-flex xs12 sm6 md6 lg6>

            <v-card @click="$router.push( { name: 'Setting'} )" class="hover-card">

              <v-img src="/artwork_mechanicus_aertist-alexboca.jpg" >
              </v-img>
              <v-layout pa-2 column fill-height class="lightbox text-lg-right">
                  <div class="subheading">
                    ©
                    <a target="_blank" href="https://www.deviantart.com/alexboca/art/Warhammer-40k-526852492">Artwork</a>
                    by
                    <a target="_blank" href="https://www.deviantart.com/alexboca">AlexBoca</a>
                  </div>
              </v-layout>

              <v-card-title>
                <h1 class="headline">Wrath & Glory - Character Builder</h1>
              </v-card-title>

              <v-card-text>
                Define your setting and campaign tier, and start building your character.
              </v-card-text>

            </v-card>

        </v-flex>

      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  export default  {
    name: 'home',
    props: [],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="css">
  .hover-card {
    cursor: pointer;
  }
  .hover-card:hover {
    -webkit-box-shadow: 0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12) !important;
    box-shadow: 0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12) !important;
  }
</style>
