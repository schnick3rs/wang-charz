<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row justify="center">
    <v-col :cols="12">
      <h3 class="headline" v-show="false">
        {{ item.name }}
      </h3>
      <h5 class="subtitle-2">
        <strong>Source: </strong>
        <span>{{ item.source.book }}</span><span v-if="item.source.page">, pg. {{ item.source.page }}</span>
      </h5>
    </v-col>

    <!-- Stats -->
    <v-col v-if="false" :cols="12" :md="8">
      <div class="attribute-box__container">
        <div class="attribute-box__value">
          {{ item.traits.defence }}
        </div>
        <div class="attribute-box__label">
          Defence
        </div>
      </div>
      <div class="attribute-box__container">
        <div class="attribute-box__value">
          {{ item.traits.resilience.total }}
        </div>
        <div class="attribute-box__label">
          Resilience
        </div>
      </div>
      <div class="attribute-box__container">
        <div class="attribute-box__value">
          {{ item.traits.soak }}
        </div>
        <div class="attribute-box__label">
          Soak
        </div>
      </div>
      <div class="attribute-box__container">
        <div class="attribute-box__value">
          {{ item.traits.maxWounds }}
        </div>
        <div class="attribute-box__label">
          Wounds
        </div>
      </div>
      <div class="attribute-box__container">
        <div class="attribute-box__value">
          {{ item.traits.resolve }}
        </div>
        <div class="attribute-box__label">
          Resolve
        </div>
      </div>
    </v-col>

    <v-col v-if="item.attributes" :cols="12" :md="3">
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(value, key) in item.attributes"
              :key="key"
            >
              <td>{{ getAttributeByKey(key).name }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <v-col v-if="item.traits" :cols="12" :md="6">
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(value, key) in item.traits"
              :key="key"
            >
              <td>{{ getTraitByKey(key).name }}</td>
              <td v-if="key==='resilience'">
                {{ value.total }} ( {{ value.armourRating }} {{ value.armourName }})
              </td>
              <td v-else>
                {{ value }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <v-col v-if="item.skills" :cols="12" :md="3">
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(value, key) in item.skills"
              :key="key"
            >
              <td v-if="key==='default'">
                Default
              </td>
              <td v-else>
                {{ getSkillByKey(key).name }}
              </td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>

    <!-- Attacks -->
    <v-col v-if="item.attacks" :cols="12">
      <h4 class="subtitle-1">
        Attacks
      </h4>
      <v-divider />
      <div>
        <p class="body-2" v-html="item.attackOptions" />
      </div>

      <div>
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
                v-for="attack in item.attacks"
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

        <div class="mt-4">
          <p
            v-for="trait in attackTraitSet"
            v-if="traitByName(trait)"
            :key="trait"
            class="body-2 mb-2"
          >
            <strong>{{ traitByName(trait).name }}: </strong>
            <span v-if="traitByName(trait).crunch">{{ traitByName(trait).crunch }}</span>
            <span v-else>{{ traitByName(trait).description }}</span>
          </p>
        </div>
      </div>
    </v-col>

    <!-- Abilities -->
    <v-col v-if="item.specialAbilities" :cols="12">
      <h4 class="subtitle-1">
        Special Abilities
      </h4>
      <v-divider />
      <div
        v-for="ability in item.specialAbilities"
        :key="ability.name"
      >
        <p class="body-2 mb-2">
          <strong>{{ ability.name }}:</strong> {{ ability.effect }}
        </p>
      </div>
    </v-col>

    <v-col v-if="item.variants" :cols="12">
      <h4 class="subtitle-1">
        Variants: {{ item.variants.name }}
      </h4>
      <v-divider />
      <div
        v-for="variantOption in item.variants.options"
        :key="variantOption.name"
      >
        <p class="body-2 mb-2">
          <strong>{{ variantOption.name }}:</strong> {{ variantOption.effect }}
        </p>
      </div>
    </v-col>

    <v-col v-if="item.description" :cols="12">
      <h4 class="subtitle-1">
        Description
      </h4>
      <v-divider />
      <p style="font-style: italic" v-html="item.description" />
    </v-col>

    <!-- Keywords -->
    <v-col v-if="item.keywords" :cols="12" :md="9">
      <span>Keywords: </span>
      <v-chip v-for="keyword in item.keywords" :key="keyword" small label class="mr-2 mb-1 mt-1">
        {{ keyword }}
      </v-chip>
    </v-col>

    <v-col :cols="12" :md="3" style="font-style: italic">
      <span class="caption">{{ item.source.book }}</span><span v-if="item.source.page" class="caption">, pg. {{ item.source.page }}</span>
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
  .attribute-box {

    &__container {
      box-sizing: border-box;
      display: block;
      width: 64px;
      align-content: center;
      border: 3px double orangered;
      padding: 0;
      height: 64px;
      float: left;
      margin: 2px;
      border-radius: 10px;
    }

    &__value {
      justify-content: center;
      font-size: 25px;
      font-weight: 600;
      display: flex;
    }

    &__label {
      display: flex;
      justify-content: center;
      font-size: 12px;
    }

  }
</style>
