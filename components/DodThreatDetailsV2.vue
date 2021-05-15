<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-row>

    <v-col :cols="12" :sm="6" :md="6" :lg="5">

      <v-container class="caption">

        <v-row class="bg--red">
          <v-col>{{ item.name }}</v-col>
        </v-row>

        <v-row>
          <v-col class="bg--dark">Tier</v-col>
          <v-col>1</v-col>
          <v-col>2</v-col>
          <v-col>3</v-col>
          <v-col>4</v-col>
          <v-col>5</v-col>
        </v-row>
        <v-row>
          <v-col class="bg--dark">Threat</v-col>
          <v-col>T</v-col>
          <v-col>T</v-col>
          <v-col>T</v-col>
          <v-col>T</v-col>
          <v-col>T</v-col>
        </v-row>

        <!-- keywords -->
        <v-row></v-row>

        <!--  -->
        <v-row>
          <v-col
            :cols="1"
            v-for="(value, key) in item.attributes"
            :key="key"
          >
            <span>{{ getAttributeByKey(key).short }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            :cols="1"
            v-for="(value, key) in item.attributes"
            :key="key"
          >
            <span>{{ value }}</span>
          </v-col>
        </v-row>

        <v-row class="bg--dark" justify="center">
          <v-col :cols="3">Defence</v-col>
          <v-col :cols="3">Resillience</v-col>
          <v-col :cols="3">Wounds</v-col>
          <v-col :cols="3">Shock</v-col>
        </v-row>
        <v-row>
          <!-- -->
          <v-col :cols="3">{{item.traits.defence}}</v-col>
          <v-col :cols="3">{{item.traits.resilience.total}}</v-col>
          <v-col :cols="3">{{item.traits.wounds}}</v-col>
          <v-col :cols="3">{{item.traits.shock}}</v-col>
        </v-row>

        <v-row>
          <v-col>
            <strong>Skills:</strong> {{ skillsString }}
          </v-col>
        </v-row>

        <!-- Abilities -->
        <v-row class="bg--dark">
          <v-col>Abilities</v-col>
        </v-row>
        <v-row v-if="item.specialAbilities">
          <v-col
            :cols="12" class="zebra"
            v-for="ability in item.specialAbilities" :key="ability.name"
          >
            <p class="body-2 mb-2">
              <strong>{{ ability.name }}:</strong> {{ ability.effect }}
            </p>
          </v-col>
        </v-row>

        <v-row class="bg--light">
          <v-col>
            <strong>Determination:</strong> Spend 1 Ruin to roll {{ item.traits.soak }}d6.
          </v-col>
        </v-row>

        <v-row class="bg--dark" justify="center">
          <v-col :cols="3">Conviction</v-col>
          <v-col :cols="3">Resolve</v-col>
          <v-col :cols="3">Speed</v-col>
          <v-col :cols="3">Size</v-col>
        </v-row>
        <v-row>
          <v-col :cols="3">{{item.traits.conviction}}</v-col>
          <v-col :cols="3">{{item.traits.resolve}}</v-col>
          <v-col :cols="3">{{item.traits.speed}}</v-col>
          <v-col :cols="3">{{item.size}}</v-col>
        </v-row>

      </v-container>

    </v-col>

  </v-row>

</template>

<script>
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import WargearTraitRepositoryMixin from '~/mixins/WargearTraitRepositoryMixin';

export default {
  name: 'DodThreatDetails',
  mixins: [
    StatRepositoryMixin,
    WargearTraitRepositoryMixin,
  ],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      attacksTable: {
        headers: [
          { text: 'Name', value: 'name', class: 'text-left' },
          { text: 'Range', value: 'range', class: 'text-center' },
          { text: 'Damage', value: 'damage', class: 'text-center' },
          { text: 'AP', value: 'ap', class: 'text-center' },
          { text: 'Salvo', value: 'salvo', class: 'text-center' },
          { text: 'Traits', value: 'traits', class: 'text-left' },
        ],
      },
    };
  },
  computed: {
    skillsString() {
      let skills = [];
      for (let [key, value] of Object.entries(this.item.skills)) {
        if ( key === 'default' ) {
          skills.push(`Default ${value}`);
        } else {
          skills.push(`${this.getSkillByKey(key).name}: ${value}`);
        }
      }
      return skills.join(', ');
    },
    combinedTraitsRepository() {
      return (this.item.attackTraits)
        ? [
          ...this.wargearTraitRepository,
          ...this.item.attackTraits,
        ]
        : this.wargearTraitRepository;
    },
    attackTraitSet() {
      let attackTraitSet = [];
      const { item } = this;

      item.attacks.forEach((attack) => {
        if (attack.traits && attack.traits.length > 0) {
          attackTraitSet = [...attackTraitSet, ...attack.traits];
        }
      });
      attackTraitSet = attackTraitSet.map((t) => t.split(/ ?\(/)[0]);
      return [...new Set(attackTraitSet)].sort();
    },
  },
  methods: {
    traitByName(name) {
      // const prefix = name.split(/ ?\(/)[0];
      // return this.combinedTraitsRepository.find( item => item.name.indexOf(prefix) >= 0);
      return this.combinedTraitsRepository.find((item) => item.name === name);
    },
  },
};
</script>

<style scoped lang="scss">

  .bg--red {
    background-color: #F44336;
    color: white;
  }

  .bg--dark {
    background-color: #424242;
    color: white;
  }

  .bg--light {
    background-color: lightgray;
  }

  .zebra:nth-child(odd) {
    background-color: transparent;
  }

  .zebra:nth-child(even) {
    background-color: lightgray;
  }

</style>
