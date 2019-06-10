<template lang="html">

  <section class="library">

    <v-container grid-list-md>

      <v-layout justify-center row>

        <v-flex xs12 sm10 md6 lg4
          v-for="item in homebrewRepository"
        >

          <v-card >

            <v-card-title>
              <h2 class="headline">{{ item.name }}</h2>
              <span class="grey--text">{{ item.hint }}</span>
            </v-card-title>

            <v-card-text>
              <p><strong>Credit:</strong> {{ item.credit }}</p>
              <p><strong>Abstract:</strong> {{ item.abstract }}</p>
              <p><strong>Related Setting:</strong> {{ item.setting }}</p>
              <p><v-chip v-for="tag in  item.tags">{{ tag }}</v-chip></p>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" :href="item.url">Visit the document</v-btn>
            </v-card-actions>

          </v-card>

        </v-flex>

      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  import HomebrewRepository from '../mixins/HomebrewRepositoryMixin';

  export default  {
    name: 'library',
    mixins: [ HomebrewRepository ],
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
  .library {

  }
</style>
