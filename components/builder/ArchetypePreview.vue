<template lang="html">

  <v-card v-if="item">

    <v-card-title primary-title>
      <div>
        <h3 class="headline md0">
          {{ item.name }}
          <v-btn v-if="manageMode" flat icon @click="$emit('change')">
            <v-icon>settings</v-icon>
          </v-btn>
        </h3>
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
              :key="keyword.key"
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

      <div v-if="false">
        <p><v-divider></v-divider></p>
        <blockquote class="blockquote font-italic">
          <p>"{{ item.description }}"</p>
          <span class="right">- from the Wrath & Glory Corerules -</span>
        </blockquote>
      </div>

    </v-card-text>

    <v-card-actions v-if="chooseMode">
      <v-btn block color="green" @click="$emit('select', item)" >Select Archetype</v-btn>
      <v-btn block color="red" @click="$emit('cancel')" >Cancel</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script lang="js">
  import ArchetypeRepository from '~/mixins/ArchetypeRepositoryMixin';
  import KeywordRepository from '~/mixins/KeywordRepositoryMixin';

  export default  {
    name: 'archetype-preview',
    mixins: [ ArchetypeRepository, KeywordRepository ],
    props: {
      item: {
        type: Object,
        required: true,
      },
      manageMode: {
        type: Boolean,
        default: false
      },
      chooseMode: {
        type: Boolean,
        default: false
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
      loaded() { return true; },
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
