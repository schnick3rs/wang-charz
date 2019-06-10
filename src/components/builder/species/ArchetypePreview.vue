<template lang="html">

  <v-card v-if="loaded && item">

    <v-card-title primary-title>
      <div>
        <h3 class="headline md0">{{ item.name }}</h3>
        <span class="subheading">{{ item.hint }}</span>
      </div>
    </v-card-title>

    <v-card-text>
      <p class="text-lg-justify"><strong>Build Point Cost:</strong> {{ item.cost }}</p>

      <span class="mt-2 grey--text">Prerequisites</span>
      <p><v-divider></v-divider></p>

      <p class="text-lg-justify"><strong>Tier:</strong> {{ item.tier }}</p>
      <p class="text-lg-justify"><strong>Species:</strong> {{ item.species }}</p>
      <p class="text-lg-justify"><strong>Attributes:</strong> {{ item.attributes }}</p>
      <p class="text-lg-justify"><strong>Skills:</strong> {{ item.skills }}</p>

      <span class="mt-2 grey--text">Benefits</span>
      <p><v-divider ></v-divider></p>

      <p class="text-lg-justify"><strong>Keywords:</strong> {{ item.keywords.split(',').join(', ') }}</p>

      <v-select
              v-model="item['selected']"
              v-for="keyword in item.keywords.split(',')"
              v-if="keyword.indexOf('<')>=0"
              :label="keyword +' Keyword'"
              :items="keywordOptions(keyword)"
              item-text="name"
              item-value="name"
              :hint="keywordHint(item['selected'], keyword)"
              persistent-hint
              solo
              dense
      ></v-select>

      <p class="text-lg-justify"><strong>Influence Bonus:</strong> {{ item.influence }}</p>

      <div v-if="item.abilities"
           v-for="ability in abilityObjects"
           class="text-lg-justify"
      >
        <p><strong>{{ ability.name }}:</strong> {{ ability.effect}}</p>

      </div>

      <p class="text-lg-justify"><strong>Wargear:</strong> {{ item.wargear }}</p>

      <p><v-divider></v-divider></p>
      <p>{{ item.description }}</p>

    </v-card-text>

    <v-card-actions v-if="actions">
      <v-btn color="primary" @click="$emit('select', archetype)" >Select Archetype</v-btn>
      <v-btn color="red" @click="$emit('reset')" >Cancel selection</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script lang="js">
  import ArchetypeRepository from '../../../mixins/ArchetypeRepositoryMixin';
  import KeywordRepository from '../../../mixins/KeywordRepositoryMixin';

  export default  {
    name: 'archetype-preview',
    mixins: [ ArchetypeRepository, KeywordRepository ],
    props: {
      item: {
        type: Object,
        required: true,
      },
      actions: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {

      }
    },
    methods: {
      keywordOptions(wildcard) {
        if ( wildcard === '<Any>' ) {
          // return all but the any keyword
          return this.keywordRepository.filter( k => k.name !== '<Any>' );
        }

        return this.keywordSubwordRepository.filter( k => k.placeholder === wildcard );
      },
      keywordHint(keyword, parentKeyword) {
        if ( this.loaded ) {
          let mergedKeywords = [ ...this.keywordRepository, ...this.keywordSubwordRepository ];

          let foundKeyword = mergedKeywords.find( k => k.name === keyword );
          if ( foundKeyword !== undefined ) {
            return foundKeyword.description;
          }

          foundKeyword = mergedKeywords.find( k => k.name === parentKeyword );
          if ( foundKeyword !== undefined ) {
            return foundKeyword.description;
          }

        }
        return '';
      },
    },
    computed: {
      loaded() { return (
        this.archetypeRepository !== undefined &&
        this.keywordRepository !== undefined &&
        this.keywordSubwordRepository !== undefined
      )},
      abilityObjects() {
        if ( this.archetypeAbilityRepository ) {
          let abilities = this.item.abilities ? this.item.abilities.split(',') : [];
          return this.archetypeAbilityRepository.filter( a => abilities.includes(a.name) );
        }
        return [];
      }
    }
  }
</script>

<style scoped lang="css">

</style>
