<template lang="html">

  <section class="ascension-selection">

    <v-container grid-list-md>

      <v-layout justify-center row wrap>

        <v-flex xs6 md6 lg4
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
              <v-select v-for="keyword in ascension.keywords" v-if="keyword.indexOf('<')>=0" box dense :label="keyword +' Keyword'" :items="keywordOptions(keyword).map( i => i.text )"></v-select>

              <p class="text-lg-justify"><strong>Influence Bonus:</strong> {{ ascension.influencePerTier }} per Tier ascended</p>

              <p class="text-lg-justify"><strong>Story Element:</strong> {{ ascension.storyElementText }}</p>
              <v-select v-if="ascension.storyElementOptions.length > 0" box dense label="Story Element" :items="ascension.storyElementOptions.map( i => i.text )"></v-select>

              <p class="text-lg-justify"><strong>Wargear:</strong> {{ ascension.wargearText }}</p>
              <v-select v-if="ascension.wargearOptions.length > 0" box dense label="Wargear" :items="ascension.wargearOptions.map( i => i.text )"></v-select>

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
  export default  {
    name: 'ascension-selection',
    props: [],
    mounted() {

    },
    data() {
      return {
        ascensionRepository: [
          {
            key: 'stayTheCourse',
            name: 'Stay The Course',
            teaser: 'Overcome struggles, build alliances, acquire equipment.',
            cost: 10,
            minimumCampaignTier: 2,
            attributePrerequisites: [],
            skillPrerequisites: [ 'required +1' ],
            keywords: [ '<Any>', '<Ordo>' ],
            influencePerTier: 1,
            storyElementText: 'The character gains their choice of either 3 Corruption points or a Memorable Injury (see page 233) of their choice and the +1D Bonus to Intimidation that comes with it from the Table 4-4: Memorable Injury.',
            storyElementOptions: [
              { text: '3 Corruption Points' },
              { text: 'Memorable Injury' }
            ],
            wargearText: 'Select either two items of Rare Wargear or one item of Very Rare Wargear with a value equal or lesser than 3 + the new Tier. This may include cybernetics.',
            wargearOptions: [
              { text: 'two items of Rare Wargear' },
              { text: 'one item of Very Rare Wargear' }
            ],
          },
          {
            key: 'psychicRevelations',
            name: 'Psychic Revelations',
            teaser: 'Tap into the warp, awaken powers, lure the Immaterium.',
            cost: 10,
            minimumCampaignTier: 2,
            attributePrerequisites: [ 'Willpower 3' ],
            skillPrerequisites: [],
            keywords: [ 'Psyker' ],
            influencePerTier: 1,
            storyElementText: 'The character gains the smite psychic power. They also may choose one Minor Psychic power per Tier ascended and may purchase powers from one Discipline of their choice. The character must purchase the Psychic Mastery Skill.',
            storyElementOptions: [],
            wargearText: 'None',
            wargearOptions: [],
          },
        ],
        keywordRepository: [
          { text: 'Ordo Maleus', wildcard: '<Ordo>' },
          { text: 'Ordo Hereticus', wildcard: '<Ordo>' },
          { text: 'Blood Angles', wildcard: '<Chapter>' },
        ]
      }
    },
    methods: {
      keywordOptions(wildcard) {

        if ( wildcard === '<Any>' ) {
          return this.keywordRepository;
        } else {
          return this.keywordRepository.filter( k => k.wildcard === wildcard );
        }
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
