<template lang="html">

  <section class="archetype-selection">

    <v-container grid-list-md>

      <v-layout justify-center row wrap>

        <v-flex xs12 sm10 md6 lg6>

          <v-card>

            <v-card-title primary-title v-if="archetype">
              <div>
                <div class="headline">{{ archetype.name }}</div>
                <span class="grey--text">{{ archetype.teaser }}</span>
              </div>
            </v-card-title>

            <v-card-text>
              <p class="text-lg-justify"><strong>Build Point Cost:</strong> {{ archetype.cost }}</p>

              <span class="mt-2 grey--text">Prerequisites</span>
              <v-divider class="mb-2"></v-divider>
              <p class="text-lg-justify"><strong>Tier:</strong> {{ archetype.tier }}</p>
              <p class="text-lg-justify"><strong>Species:</strong> {{ archetype.species }}</p>
              <p class="text-lg-justify"><strong>Attribute:</strong> {{ archetype.attribute || 'none' }}</p>
              <p class="text-lg-justify"><strong>Skill:</strong> {{ archetype.skill || 'none' }}</p>

              <span class="mt-2 grey--text">Benefits</span>
              <v-divider class="mb-2"></v-divider>
              <p class="text-lg-justify"><strong>Keywords:</strong> {{ archetype.keywords }}</p>

              <v-select
                      v-for="keyword in archetype.keywords.split(',')"
                      v-if="keyword.indexOf('<')>=0"
                      v-model="archetype['selected']"
                      :label="keyword +' Keyword'"
                      :items="subKeywordOptions(keyword)"
                      item-text="name"
                      item-value="name"
                      :hint="archetype['selected'] ? keywordSubwordRepository.find( k => k.name === archetype['selected'] ).description : ''"
                      persistent-hint
                      solo
                      dense
              ></v-select>

              <p class="text-lg-justify"><strong>Influence Bonus:</strong> +{{ archetype.influence }}</p>

              <p class="text-lg-justify" v-if="archetype.abilities"><strong>{{ archetype.abilities }}:</strong></p>

              <p class="text-lg-justify"><strong>Wargear:</strong> {{ archetype.wargear }}</p>

            </v-card-text>

          </v-card>

        </v-flex>

      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  import ArchetypeRepositoryMixin from '../mixins/ArchetypeRepositoryMixin';
  import KeywordRepositoryMixin from '../mixins/KeywordRepositoryMixin';

  export default  {
    name: 'archetype-manage',
    props: [],
    mixins: [ ArchetypeRepositoryMixin, KeywordRepositoryMixin ],
    data() {
      return {
        publicPath: process.env.BASE_URL,
      }
    },
    methods: {
      keywordOptions(wildcard) {
        if ( wildcard === '<Any>' ) {
          // return all but the any keyword
          return this.keywordRepository.filter( k => k.name !== '<Any>' );
        } else {
          return this.keywordRepository.filter( k => k.name === wildcard );
        }
      },
      subKeywordOptions(placeholder) {
        return this.keywordSubwordRepository.filter( k => k.placeholder === placeholder );
      },
    },
    computed: {
      characterArchetype() { return this.$store.getters.archetype; },
      archetype() {
        if ( this.archetypeRepository !== undefined ) {
          return this.archetypeRepository.find( a => a.name === this.characterArchetype );
        }
        return {};
      },
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
}
</script>

<style scoped lang="css">
  .archetype-selection {

  }
</style>
