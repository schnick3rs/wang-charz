<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-row>

    <v-col :cols="12">
      <span>{{ item.source.book }}</span><span v-if="item.source.page">, pg. {{ item.source.page }}</span>
    </v-col>

    <v-col :cols="12" :sm="6" :md="6" :lg="5">

      <v-container class="caption">

        <v-row class="bg--red">
          <v-col>{{ item.name }}</v-col>
        </v-row>

        <v-row style="text-align: center;">
          <v-col class="bg--dark" style="text-align: left">Tier</v-col>
          <v-col>1</v-col>
          <v-col>2</v-col>
          <v-col>3</v-col>
          <v-col>4</v-col>
        </v-row>
        <v-row style="text-align: center;">
          <v-col class="bg--dark" style="text-align: left">Threat</v-col>
          <v-col v-for="clazz in item.classification">{{ clazz.substr(0,1) }}</v-col>
        </v-row>

        <!-- keywords -->
        <v-row></v-row>

        <!--  -->
        <v-row>
          <span
            class="pa-2"
            style="flex: 0 0 14.28%; max-width: 14.26%; text-align: center;"
            v-for="(value, key) in item.attributes"
            :key="key"
          >
            <span>{{ getAttributeByKey(key).short }}</span>
          </span>
        </v-row>
        <v-row>
          <span
            class="pa-2"
            style="flex: 0 0 14.28%; max-width: 14.26%; text-align: center;"
            v-for="(value, key) in item.attributes"
            :key="key"
          >
            <span>{{ value }}</span>
          </span>
        </v-row>

        <v-row class="bg--dark" justify="center" style="text-align: center;">
          <v-col :cols="3">Defence</v-col>
          <v-col :cols="3">Resilience</v-col>
          <v-col :cols="3">Wounds</v-col>
          <v-col :cols="3">Shock</v-col>
        </v-row>
        <v-row style="text-align: center;">
          <!-- -->
          <v-col :cols="3">{{item.traits.defence}}</v-col>
          <v-col :cols="3">{{item.traits.resilience}}</v-col>
          <v-col :cols="3">{{item.traits.wounds}}</v-col>
          <v-col :cols="3">{{item.traits.shock}}</v-col>
        </v-row>

        <v-row>
          <v-col>
            <strong>Skills:</strong> {{ skillsString }}
          </v-col>
        </v-row>

        <!-- Bonuses -->
        <v-row class="bg--dark" v-if="item.bonuses">
          <v-col style="text-transform: uppercase;">Bonuses</v-col>
        </v-row>
        <v-row v-if="item.bonuses">
          <v-col
            :cols="12" class="zebra"
            v-for="ability in item.bonuses" :key="ability.name"
          >
            <p class="body-2 mb-1">
              <strong>{{ ability.name }}:</strong> {{ ability.snippet }}
            </p>
          </v-col>
        </v-row>

        <!-- Abilities & Actions -->
        <v-row class="bg--dark">
          <v-col style="text-transform: uppercase;">Abilities</v-col>
        </v-row>
        <v-row v-if="item.actions">

          <v-col
            :cols="12" class="zebra"
          >
            <div >
              <p><strong style="text-transform: uppercase;">Actions:</strong></p>
              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th
                      v-for="header in attacksTable.headers"
                      :key="header.value"
                      :class="header.class"
                    >
                      {{ header.text }}
                    </th>
                  </tr>
                  </thead>

                  <tbody>
                  <tr
                    v-for="attack in attackActions"
                    :key="item.label"
                  >
                    <td class="text-left">
                      {{ attack.name }}
                    </td>
                    <td class="text-center">
                      <span v-if="attack.range === 1">melee</span>
                      <span v-else>{{ attack.range }} m</span>
                    </td>
                    <td class="text-center">
                      <div v-if="attack.damage">
                        <span v-if="item.type==='Melee Weapon'">{{ attack.damage.static }}*</span>
                        <span v-else>{{ attack.damage.static }}</span>
                        <span> + </span>
                        <span>{{ attack.damage.ed }} ED</span>
                      </div>
                    </td>
                    <td class="text-center">
                      <span>{{ attack.ap }}</span>
                    </td>
                    <td class="text-center">
                      <span>{{ attack.salvo }}</span>
                    </td>
                    <td class="text-left">
                      <span v-if="attack.traits && attack.traits.length >0">{{ attack.traits.join(', ') }}</span>
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
          </v-col>

          <v-col
            :cols="12" class="zebra"
            v-for="ability in nonAttackActions" :key="ability.name"
          >
            <p class="body-2 mb-1">
              <strong style="text-transform: uppercase;">{{ability.type}}:</strong>
              <strong>{{ ability.name }}</strong> {{ ability.snippet }}
            </p>
          </v-col>

        </v-row>

        <v-row class="bg--dark" justify="center" style="text-align: center;">
          <v-col :cols="3">Conviction</v-col>
          <v-col :cols="3">Resolve</v-col>
          <v-col :cols="3">Speed</v-col>
          <v-col :cols="3">Size</v-col>
        </v-row>
        <v-row style="text-align: center;">
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
      /*
      let skills = [];
      for (let [key, value] of Object.entries(this.item.skills)) {
        if ( key === 'default' ) {
          skills.push(`Default ${value}`);
        } else {
          skills.push(`${this.getSkillByKey(key).name}: ${value}`);
        }
      }
      */
      return this.item.skills.join(', ');
    },
    attackActions() {
      return this.item.actions.filter((action) => action.type.endsWith('weapon') === true);
    },
    nonAttackActions() {
      return this.item.actions.filter((action) => action.type.endsWith('weapon') === false);
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
    background-color: darkred;
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
