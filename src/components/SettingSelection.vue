<template lang="html">

  <section>

    <v-container grid-list-md>

      <v-layout justify-center row wrap>

        <v-flex xs12 sm10 md8 lg8>

          <v-card>

            <v-card-text>

              <p class="head">Setting Tier</p>

              <v-select
                      label="Select a fitting tier"
                      :value="settingTier"
                      :items="tierSelect.options"
                      @change="setSettingTier"
                      solo
                      dense
              >
              </v-select>

              <v-slider
                      label="Campaign Tier"
                      min="1" max="5"
                      :value="settingTier"
                      step="1"
                      ticks
                      tick-size="3"
                      thumb-label="always"
                      @change="setSettingTier"
              >
              </v-slider>

              <v-select
                      label="Allowed Species"
                      :value="species.map( s => s.name )"
                      :items="species"
                      item-text="name"
                      item-value="name"
                      chips
                      dense
                      box
                      multiple
                      deletable-chips
              ></v-select>

              <v-select
                      label="Excluded Archetypes"
                      :items="archetypeRepository"
                      item-text="name"
                      item-value="name"
                      chips
                      dense
                      box
                      multiple
                      deletable-chips
              ></v-select>

              <v-switch v-if="false"
                      v-model="setting.sources.isAllowHomebrews"
                      label="Allow homebrew content"
                      color="red"
              ></v-switch>

              <v-switch
                      v-if="false"
                      :disabled="!setting.sources.isAllowHomebrews"
                      v-model="setting.sources.content.allowAgentsOfTheThrone"
                      label="'Agents of the Golden Throne' fan content"
                      color="red"
              ></v-switch>
              <a v-if="false" href="https://docs.google.com/document/d/1VkOd-WGTXb_Lygm3BQYHX9eC2WzOczsD1kkG3fy4SIg/edit">Agents of the Golden Throne Homebrew</a>

            </v-card-text>

          </v-card>

        </v-flex>
      </v-layout>

      <v-layout justify-center row wrap>

        <v-flex xs12 sm6 md4 lg2 v-if="currentPage === 1" v-for="item in settingTemplateOptions">

          <v-card>
            <v-img v-if="false" :src="item.cover" height="150"></v-img>
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
  import SpeciesRepository from '../mixins/SpeciesRepositoryMixin';
  import ArchetypeRepository from '../mixins/ArchetypeRepositoryMixin';

  export default  {
    name: 'setting-selection',
    props: [],
    mixins: [ SpeciesRepository, ArchetypeRepository ],
    mounted() {

    },
    data() {
      return {
        currentPage: 1,
        setting: {
          name: '',
          tier: 3,
          species: { exclude: [] },
          archetypes: { exclude: [] },
          sources: {
            isAllowHomebrews: false,
            content: {
              allowAgentsOfTheThrone: false,
            },
          },
        },
        tierSelect: {
          // One among billions','stalwart Defenders','Elite Guardians','Heroic Operatives','Agents of Fate
          selected: 1,
          options: [
            { text: '1 - One among billions', value: 1 },
            { text: '2 - Stalwart Defenders', value: 2 },
            { text: '3 - Elite Guardians', value: 3 },
            { text: '4 - Heroic Operatives', value: 4 },
            { text: '5 - Agents of Fate', value: 5 },
          ],
        },
        settingTemplateOptions: [
          { name: "Custom", recommendedTiers: "1-5", cover: 'https://cdna.artstation.com/p/assets/images/images/011/151/588/large/diego-gisbert-llorens-b-g-cover-1-wip4a.jpg?1528118826' },
          { name: "Only War", recommendedTiers: "1", cover: 'https://40k.gallery/img/40K-artwork/40K-20170826114311.jpg' },
          { name: "Dark Heresy", recommendedTiers: "1-3", cover: 'https://www.fantasyflightgames.com/media/ffg_content/Dark-Heresy-2nd/core-book-previews/preview-3/Dark_HeresyII_wip7-Web.jpg' },
          { name: "Rogue Trader", recommendedTiers: "2-3", cover: 'https://i.pinimg.com/originals/4d/d9/ab/4dd9ab05a6c5dc62a09d61365303c34b.jpg' },
          { name: "Deathwatch", recommendedTiers: "3-4", cover: 'https://i.pinimg.com/originals/be/09/17/be0917ae8414dbfde3f973d8ba2956bb.jpg' },
          { name: "Black Crusade", recommendedTiers: "3-4", cover: 'https://warhammerart.com/wp-content/uploads/2018/11/13TH-BLACK-CRUSADE-04.jpg' },
        ]
      }
    },
    methods: {
      setSettingTier(event) {
        this.$store.commit('setSettingTier', {amount: event});
      }
    },
    computed: {
      species() {
        if (this.speciesRepository) {
          return this.speciesRepository;
        }
        return [];
      },
      settingTier() { return this.$store.getters.settingTier; },
    }
}
</script>

<style scoped lang="css">

</style>
