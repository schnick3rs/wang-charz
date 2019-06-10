<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <section class="library">

    <v-container grid-list-md>

      <v-layout justify-center row wrap>

        <v-flex xs12 sm6 md5 lg5
          v-for="item in homebrewRepository"
        >

          <v-card >

            <v-card-title>
              <h2 class="headline">{{ item.name }}</h2>
              <span class="grey--text">{{ item.hint }}</span>
            </v-card-title>

            <v-card-text>
              <p><strong>Credit:</strong> {{ item.credit }}</p>
              <p>{{ item.abstract }}</p>
              <strong>Contains:</strong>
              <ul>
                <li v-for="parts in  item.contains">{{ parts }}</li>
              </ul>
            </v-card-text>

            <v-card-text>

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
        breadcrumbs: [
          {
            text: 'Dashboard',
            disabled: false,
            href: 'breadcrumbs_dashboard'
          },
          {
            text: 'Link 1',
            disabled: false,
            href: 'breadcrumbs_link_1'
          },
          {
            text: 'Link 2',
            disabled: true,
            href: 'breadcrumbs_link_2'
          }
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
  .library {

  }
</style>
