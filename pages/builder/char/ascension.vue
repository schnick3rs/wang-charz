<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-layout justify-center row wrap>

    <v-dialog
      v-model="dialog"
      width="600px"
      scrollable
    >
      <ascension-preview
        v-if="selectedPreview"
        :item="selectedPreview"
        currentCharacterTier="2"
        chooseMode
        @select="selectPackageForChar"
        @cancel="dialog = false"
      ></ascension-preview>
    </v-dialog>

    <v-flex v-if="chooseMode">
      <h1 class="headline">Select an Ascension Package</h1>
    </v-flex>

    <v-flex
      xs12
      v-if="chooseMode"
    >

      <v-card
        v-for="ascension in ascensionRepository"
        :key="ascension.key"
        class="mb-4"
        hover
        @click.stop="openDialog(ascension)"
      >

        <v-card-title class="subheading">
          {{ascension.name}}
          <v-spacer></v-spacer>
          <v-btn dense icon>
            <v-icon color="primary">arrow_forward_ios</v-icon>
          </v-btn>
        </v-card-title>

      </v-card>

    </v-flex>

    <v-flex
      xs12
      v-if="characterAscension && manageMode"
    >

      <v-card class="mb-2">

        <v-card-title primary-title>
          <div>
            <div class="headline">{{ characterAscension.name }}</div>
            <span class="grey--text">{{ characterAscension.teaser }}</span>
          </div>
        </v-card-title>

        <v-card-text>
          <p class="text-lg-justify">
            <strong>Ascended Tier: </strong>{{ characterAscension.sourceTier }} => {{ characterAscension.targetTier }}
          </p>
          <p class="text-lg-justify">
            <strong>Build Point Cost: </strong>
            {{ characterAscension.targetTier * characterAscension.cost }}
            (New Tier x {{ characterAscension.cost }})
          </p>

          <span class="mt-2 grey--text">Benefits</span>
          <v-divider class="mb-2"></v-divider>

          <p class="text-lg-justify"><strong>Keywords:</strong> {{ characterAscension.keywords.join(', ') }}</p>
          <v-select
            v-model="characterAscension['selected']"
            v-if="keyword.indexOf('<')>=0"
            v-for="keyword in characterAscension.keywords"
            :key="keyword.key"
            :label="keyword +' Keyword'"
            :items="keywordOptions(keyword)"
            item-text="name"
            item-value="name"
            :hint="characterAscension['selected'] ? keywordRepository.find( k => k.name === characterAscension['selected'] ).description : ''"
            persistent-hint
            solo
            dense
          ></v-select>

          <v-select
            v-model="characterAscension['subSelected']"
            v-if="characterAscension['selected'] && characterAscension['selected'].indexOf('<') >= 0"
            label="Select sub keywords"
            :items="subKeywordOptions(characterAscension['selected'])"
            item-text="name"
            item-value="name"
            :hint="characterAscension['subSelected'] ? keywordSubwordRepository.find( k => k.name === characterAscension['subSelected'] ).description : ''"
            persistent-hint
            solo
            dense
          >
          </v-select>

          <!-- selection for the sub keyword -->

          <v-divider class="mb-2"></v-divider>

          <p class="text-lg-justify">
            <strong>Influence Bonus: </strong>
            {{ characterAscension.influencePerTier * (characterAscension.targetTier - characterAscension.sourceTier) }}
            ( {{characterAscension.influencePerTier}} per tier ascended)
          </p>

          <v-divider class="mb-2"></v-divider>

          <p class="text-lg-justify"><strong>Story Element:</strong> {{ characterAscension.storyElementText }}</p>
          <v-select v-if="characterAscension.storyElementOptions.length > 0" solo dense label="Story Element" :items="characterAscension.storyElementOptions.map( i => i.text )"></v-select>

          <v-divider class="mb-2"></v-divider>

          <p class="text-lg-justify"><strong>Wargear:</strong> {{ characterAscension.wargearText }}</p>
          <v-select v-if="characterAscension.wargearOptions.length > 0" solo dense label="Wargear" :items="characterAscension.wargearOptions.map( i => i.text )"></v-select>

        </v-card-text>

      </v-card>

      <v-card>
        <v-card-actions>
          <v-btn block flat color="primary">+ add another ascension package</v-btn>
        </v-card-actions>
      </v-card>

    </v-flex>

  </v-layout>

</template>

<script lang="js">
  import AscensionRepositoryMixin from '~/mixins/AscensionRepositoryMixin';
  import KeywordRepositoryMixin from '~/mixins/KeywordRepositoryMixin';
  import AscensionPreview from '~/components/builder/AscensionPreview.vue';

  export default {
  name: 'Archetype',
  layout: 'builder',
  props: [],
  mixins: [ AscensionRepositoryMixin, KeywordRepositoryMixin ],
  components: { AscensionPreview },
  data() {
    return {
      dialog: false,
      selectedPreview: undefined,
      chooseMode: true,
      manageMode: false,
      characterAscension: undefined,
    }
  },
  computed: {
  },
  methods: {
    openDialog(item) {
      this.selectedPreview = item;
      this.dialog = true;
    },
    selectPackageForChar(ascensionPackage, targetTier){
      let payload = {
        value: ascensionPackage.name,
        cost: ascensionPackage.cost * targetTier,
        targetTier: targetTier,
      };
      this.$store.commit('addAscension', payload);

      ascensionPackage['sourceTier'] = 2;
      ascensionPackage['targetTier'] = targetTier;
      this.characterAscension = ascensionPackage;

      this.chooseMode = false;
      this.manageMode = true;
      this.dialog = false;
    },
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
  }
}
</script>

<style scoped lang="css">
</style>
