<template lang="html">

  <section class="ascension-selection">

    <v-container grid-list-md>

      <v-layout justify-center row wrap>

        <v-flex xs12 sm10 md6 lg6
                v-for="ascension in ascensionRepository"
                :key="ascension.key"
        >

          <v-card >

            <v-card-title primary-title>
              <div>
                <div class="headline">{{ ascension.name }}</div>
                <span class="grey--text">{{ ascension.teaser }}</span>
              </div>
            </v-card-title>

            <v-card-text>
              <p class="text-lg-justify"><strong>Build Point Cost:</strong> (New Tier x {{ ascension.cost }})</p>

              <span class="mt-2 grey--text">Prerequisites</span>
              <v-divider class="mb-2"></v-divider>
              <p class="text-lg-justify"><strong>Minimum Campaign Tier:</strong> {{ ascension.minimumCampaignTier }}+</p>
              <p class="text-lg-justify"><strong>Attribute:</strong> {{ ascension.attributePrerequisites.length > 0 ? ascension.attributePrerequisites.join(', ') : 'none' }}</p>
              <p class="text-lg-justify"><strong>Skill:</strong> {{ ascension.skillPrerequisites.length > 0 ? ascension.skillPrerequisites.join(', ') : 'none' }}</p>

              <span class="mt-2 grey--text">Benefits</span>
              <v-divider class="mb-2"></v-divider>

              <p class="text-lg-justify"><strong>Keywords:</strong> {{ ascension.keywords.join(', ') }}</p>
              <v-select
                      v-model="ascension['selected']"
                      v-if="keyword.indexOf('<')>=0"
                      v-for="keyword in ascension.keywords"
                      :label="keyword +' Keyword'"
                      :items="keywordOptions(keyword)"
                      item-text="name"
                      item-value="name"
                      :hint="ascension['selected'] ? keywordRepository.find( k => k.name === ascension['selected'] ).description : ''"
                      persistent-hint
                      solo
                      dense
              ></v-select>

              <v-select
                      v-model="ascension['subSelected']"
                      v-if="ascension['selected'] && ascension['selected'].indexOf('<') >= 0"
                      label="Select sub keywords"
                      :items="subKeywordOptions(ascension['selected'])"
                      item-text="name"
                      item-value="name"
                      :hint="ascension['subSelected'] ? keywordSubwordRepository.find( k => k.name === ascension['subSelected'] ).description : ''"
                      persistent-hint
                      solo
                      dense
              >
              </v-select>

              <!-- selection for the sub keyword -->

              <v-divider class="mb-2"></v-divider>

              <p class="text-lg-justify"><strong>Influence Bonus:</strong> {{ ascension.influencePerTier }} per Tier ascended</p>

              <v-divider class="mb-2"></v-divider>

              <p class="text-lg-justify"><strong>Story Element:</strong> {{ ascension.storyElementText }}</p>
              <v-select v-if="ascension.storyElementOptions.length > 0" solo dense label="Story Element" :items="ascension.storyElementOptions.map( i => i.text )"></v-select>

              <v-divider class="mb-2"></v-divider>

              <p class="text-lg-justify"><strong>Wargear:</strong> {{ ascension.wargearText }}</p>
              <v-select v-if="ascension.wargearOptions.length > 0" solo dense label="Wargear" :items="ascension.wargearOptions.map( i => i.text )"></v-select>

              <v-divider class="mb-2"></v-divider>

            </v-card-text>

            <v-card-actions>
              <v-btn color="green">Select Ascension Package</v-btn>
            </v-card-actions>

          </v-card>

        </v-flex>

      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  import AscensionRepositoryMixin from '../mixins/AscensionRepositoryMixin';
  import KeywordRepositoryMixin from '../mixins/KeywordRepositoryMixin';

  export default  {
    name: 'ascension-selection',
    props: [],
    mixins: [
      AscensionRepositoryMixin,
      KeywordRepositoryMixin,
    ],
    data() {
      return {}
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

    }
}
</script>

<style scoped lang="css">
  .ascension-selection {

  }
</style>
