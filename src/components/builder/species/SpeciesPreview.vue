<template lang="html">

  <v-card v-if="loaded">

    <v-card-title primary-title>
      <div>
        <h3 class="headline md0">{{ species.name }}</h3>
        <span class="subheading">{{ species.hint }}</span>
      </div>
    </v-card-title>

    <v-card-text>
      <p class="text-lg-justify"><strong>Build Point Cost:</strong> {{ species.cost }}</p>

      <p><v-divider></v-divider></p>

      <p class="text-lg-justify"><strong>Base Tier:</strong> {{ species.baseTier }}</p>
      <p class="text-lg-justify"><strong>Speed:</strong> {{ species.speed }}</p>
      <p class="text-lg-justify"><strong>Modifications:</strong> {{ species.attributes }}</p>
      <p class="text-lg-justify"><strong>Abilities:</strong> {{ species.abilities }}</p>

      <p v-if="species.abilities"><v-divider></v-divider></p>

      <div v-if="species.abilities"
           v-for="ability in abilityObjects"
           class="text-lg-justify"
      >
        <p><strong>{{ ability.name }}:</strong> {{ ability.effect}}</p>

        <v-select
                v-model="species['chapter']"
                v-if="ability.name.indexOf('Honour the Chapter') >= 0"
                label="Select your Chapter"
                dense
                solo
                :items="astartesChapterRepository"
                item-text="name"
                item-value="name"
        ></v-select>

        <p v-if="ability.name.indexOf('Honour the Chapter') >= 0 && species['chapter']"
           v-for="tradition in getChapterTraditions(species['chapter'])"
        >
          <strong>{{ tradition.name }}:</strong> {{ tradition.effect }}
        </p>

      </div>

      <p><v-divider></v-divider></p>
      <p>{{ species.description }}</p>
    </v-card-text>

    <v-card-actions v-if="actions">
      <v-btn color="primary" @click="$emit('select', species);" >Select Species</v-btn>
      <v-btn color="red" @click="$emit('reset')" >Cancel selection</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script lang="js">
  import SpeciesRepository from '../../../mixins/SpeciesRepositoryMixin';

  export default  {
    name: 'species-preview',
    mixins: [ SpeciesRepository ],
    props: {
      species: {
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
      getChapterTraditions(chapterName) {
        let chapter = this.astartesChapterRepository.find(a=>a.name === chapterName) || [];
        if ( chapter ) {
          return chapter.beliefsAndTraditions;
        }
        return [];
      },
    },
    computed: {
      loaded() { return this.speciesRepository !== undefined && this.speciesAbilitiesRepository !== undefined; },
      abilityObjects() {
        if ( this.speciesAbilitiesRepository ) {
          let abilities = this.species.abilities ? this.species.abilities.split(',') : [];
          return this.speciesAbilitiesRepository.filter( a => abilities.includes(a.name) );
        }
        return [];
      }
    }
  }
</script>

<style scoped lang="css">

</style>
