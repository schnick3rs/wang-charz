<template lang="html">
  <v-card>
    <v-card-title primary-title>
      <div>
        <h3 class="headline md0">
          {{ species.name }}
        </h3>
        <span class="subheading">{{ species.hint }}</span>
      </div>
    </v-card-title>

    <v-card-text>
      <p class="text-lg-justify">
        <strong>Build Point Cost:</strong> {{ species.cost }}
      </p>

      <p><v-divider /></p>

      <p class="text-lg-justify">
        <strong>Base Tier:</strong> {{ species.baseTier }}
      </p>
      <p class="text-lg-justify">
        <strong>Speed:</strong> {{ species.speed }}
      </p>
      <p class="text-lg-justify">
        <strong>Modifications:</strong> {{ species.attributes }}
      </p>
      <p class="text-lg-justify">
        <strong>Abilities:</strong> {{ species.abilities }}
      </p>

      <p v-if="species.abilities">
        <v-divider />
      </p>

      <div
        v-for="ability in abilityObjects"
        v-if="species.abilities"
        class="text-lg-justify"
      >
        <p><strong>{{ ability.name }}:</strong> {{ ability.effect }}</p>

        <v-select
          v-if="ability.name.indexOf('Honour the Chapter') >= 0"
          v-model="species['chapter']"
          label="Select your Chapter"
          dense
          solo
          :items="astartesChapterRepository"
          item-text="name"
          item-value="name"
        />

        <p
          v-for="tradition in getChapterTraditions(species['chapter'])"
          v-if="ability.name.indexOf('Honour the Chapter') >= 0 && species['chapter']"
        >
          <strong>{{ tradition.name }}:</strong> {{ tradition.effect }}
        </p>
      </div>

      <p><v-divider /></p>
      <blockquote class="blockquote font-italic">
        <p>"{{ species.description }}"</p>
        <span class="right">- from the Wrath & Glory Corerules -</span>
      </blockquote>
    </v-card-text>

    <v-card-actions v-if="actions">
      <v-btn color="primary" @click="$emit('select', species);">
        Select Species
      </v-btn>
      <v-btn color="red" @click="$emit('reset')">
        Cancel selection
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
  import axios from 'axios'
  import SpeciesRepositoryMixin from '~/mixins/SpeciesRepositoryMixin'

  export default {
  name: 'SpeciesPreview',
  mixins: [ SpeciesRepositoryMixin ],
  props: {
    species: {
      type: Object,
      required: true
    },
    actions: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      astartesChapterRepository: [
        { key: 'bloodAngles',
          name: 'Blood Angels',
          beliefsAndTraditions: [
            { name: 'Blood Frenzy', effect: 'When attacking in melee combat, a Blood Angels Space Marine may reroll up to Rank damage dice on every attack.' },
            { name: 'The Red Thirst', effect: 'After engaging in melee combat, Blood Angels must pass a Willpower test (DN 3). On a failure, the Blood Angels Space Marine feels a strong urge to drink the blood of the fallen—the player may choose how to respond to this urge. If the failure involves a complication, the Blood Angels Space Marine may not resist this urge. The Game Master may alter the DN based on how long it has been since the character has tasted blood.' } ]
        },
        { key: 'darkAngles',
          name: 'Dark Angels',
          beliefsAndTraditions: [

          ]
        },
        { key: 'imperialFists',
          name: 'Imperial Fists',
          beliefsAndTraditions: [
            { name: 'Blood Frenzy', effect: '' },
            { name: 'The Red Thirst', effect: '' }
          ]
        }
      ]
    }
  },
  computed: {
    abilityObjects() {
      if (this.speciesAbilitiesRepository) {
        const abilities = this.species.abilities ? this.species.abilities.split(',') : []
        return this.speciesAbilitiesRepository.filter(a => abilities.includes(a.name))
      }
      return []
    }
  },
  async asyncData({ params }) {
    const speciesResponse = await axios.get(`https://api.sheety.co/04c8f13a-c4ed-4f05-adad-7cf11db62151`)
    const speciesAbilitiesResponse = await axios.get(`https://api.sheety.co/a192e4d5-a73f-46c0-929e-f3eca3dde0a0`)
    return {
      speciesRepository: speciesResponse.data || [],
      speciesAbilitiesRepository: speciesAbilitiesResponse.data || []
    }
  },
  methods: {
    getChapterTraditions(chapterName) {
      const chapter = this.astartesChapterRepository.find(a => a.name === chapterName) || []
      if (chapter) {
        return chapter.beliefsAndTraditions
      }
      return []
    }
  }
}
</script>

<style scoped lang="css">

</style>
