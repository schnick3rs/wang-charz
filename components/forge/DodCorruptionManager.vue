<template>
  <v-card>

    <v-card-title style="background-color: #262e37; color: #fff;" class="mb-4">
      Corruption Manager
      <v-spacer />
      <v-icon dark @click="$emit('cancel')">
        close
      </v-icon>
    </v-card-title>

    <v-card-text>

      <v-alert type="info" dense text class="caption">
        Check the <a href="https://www.drivethrurpg.com/product/249388/Wrath--Glory-Core-Rules?affiliate_id=466959" title="Buy Wrath 6 Glory using my affiliate link">Core Rules (Affiliate Link)</a> for details on Corruption (pg. 285) and Mutations (pg. 287).
      </v-alert>

      <h3>Overview</h3>
      <p>Watch how you corruption grows and what is responsible for your demise.</p>
      <v-progress-linear
        v-if="corruption"
        :value="corruption%5*20"
        color="primary"
        height="15"
        dark
      >
        <span>{{corruption%5}} / 5</span>
      </v-progress-linear>
      <v-progress-linear
        v-if="corruptionLevelProgress !== undefined"
        :value="corruption*4"
        :color=" corruptionLevelProgress > 0 ? 'error' : 'success'"
        height="25"
      >
        <span>Level {{corruptionLevel.level}} : {{corruptionLevel.label}}</span>
      </v-progress-linear>
      <span class="mt-1">
        You have accumulated <strong>{{corruption}}</strong> Corruption Points.
        <v-btn x-small color="primary" @click="showCorruptionModifiers = !showCorruptionModifiers">
          {{ showCorruptionModifiers ? 'Hide' : 'Show' }} details
        </v-btn>
      </span>
      <div class="mt-1" v-show="showCorruptionModifiers">
        <ul>
          <li v-for="item in modifiers">
            <strong>{{item.modifier}}</strong>, <em>{{item.hint ? item.hint : item.source}}</em>
            <v-btn
              v-if="item.id"
              icon x-small
              @click="removeCorruption(item.id)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </li>
        </ul>
      </div>

      <h3 class="mt-4">Add Corruption</h3>
      <p>In case some event or the GM causes some additional Corruption, you can add it here.</p>
      <v-row>
        <v-col :cols="12" :md="4">
          <v-text-field
            v-model="newCorruptionValue"
            type="number"
            dense outlined required
            label="Corruption Points"
            persistent-hint
            hint="Number of Corruption Points to gain"
          ></v-text-field>
        </v-col>
        <v-col :cols="12" :md="8">
          <v-text-field
            v-model="newCorruptionHint"
            type="text"
            dense outlined required
            label="Source"
            persistent-hint
            hint="A hint how you got this corruption"
            @click:append-outer="addCorruption"
            append-outer-icon="add"
          ></v-text-field>
        </v-col>
      </v-row>

      <h3>Add Mutations</h3>
      <p><strong>Roll</strong> (somewhat random) or <strong>select</strong> a new mutations if it´s appropriate, aka the Corruption is <em>to damn high</em> (see core, pg. 287).</p>

      <v-autocomplete
        outlined
        label="Search Mutation"
        persistent-hint
        class="mb-4"
        :hint="`D3 = ${rolledD3} -> D66 + ${mutationCount*10} = ${rolledD66}`"
        v-model="rolledMutation"
        :items="mutationsRepository"
        item-text="name"
        item-value="key"
        return-object
        clearable
        prepend-icon="casino"
        @click:prepend="rollRandomMutation"
        append-outer-icon="add"
        @click:append-outer="addMutation(rolledMutation, rolledMutation.selected)"
      >
        <template v-slot:item="data">
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name"></v-list-item-title>
            <v-list-item-subtitle>{{data.item.snippet}}</v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-autocomplete>

      <div v-if="rolledMutation">
        <span>
          <strong>{{rolledMutation.name}}</strong> • <em style="text-transform: capitalize">{{rolledMutation.severity}} Mutation</em>
          <em v-if="rolledMutation.source.key"> • {{ rolledMutation.source.key }}</em><em v-if="!isNaN(rolledMutation.source.page)">, pg. {{ rolledMutation.source.page }}</em>
        </span>
        <div v-html="rolledMutation.description"></div>
        <div v-if="rolledMutation.options" class="mt-2">
          <v-select
            v-model="rolledMutation.selected"
            :items="rolledMutation.options"
            item-value="key"
            item-text="name"
            label=""
            dense outlined return-object
            persistent-hint
            :hint="rolledMutation.selected ? rolledMutation.selected.snippet : 'Select one option'"
          >
          </v-select>
        </div>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer />
      <v-btn @click="$emit('cancel')" color="success">Close</v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import DiceRollerMixin from '~/mixins/DiceRollerMixin';
import MutationsMixin from '~/mixins/MutationsMixin';
import Template from '../Template';

export default {
  name: 'DodCorruptionManager',
  components: { Template },
  mixins: [
    DiceRollerMixin,
    MutationsMixin,
  ],
  props: {
    id: { type: String, required: true },
    corruption: { type: Number, default: 0 },
    modifiers: { type: Array, default() { return []; }},
    mutationCount: { type: Number, default: 0 },
  },
  data() {
    return {
      rolledD3: null,
      rolledD66: [],
      rolledMutation: null,
      newCorruptionValue: 0,
      newCorruptionHint: '',
      showCorruptionModifiers: false,
    };
  },
  mounted() {

  },
  computed: {
    corruptionLevel() {
      const corruptionValue = this.corruption;
      if (corruptionValue >= 26) {
        return this.corruptionLevelsRepository.find(c => c.level === 5);
      }
      return this.corruptionLevelsRepository.find(c => c.pointRange.includes(corruptionValue));
    },
    corruptionLevelStatus() {
      return this.corruptionLevel.label;
    },
    corruptionLevelProgress() {
      return this.corruptionLevel.level * 20;
    },
  },
  methods: {
    addCorruption(){
      const content = {
        modifications: [{
          name: 'Corruption',
          targetGroup: 'traits',
          targetValue: 'corruption',
          modifier: parseInt(this.newCorruptionValue),
          hint: this.newCorruptionHint,
        }],
        source: `custom`,
      };
      this.$store.commit('characters/addCharacterModifications', { id: this.id, content });
      this.newCorruptionValue = 0;
      this.newCorruptionHint = '';
    },
    removeCorruption(id) {
      this.$store.commit('characters/removeCharacterModificationById', { id: this.id, modificationId: id });
    },
    addMutation(mutation, selectedOption) {
      const id = this.id;
      const payload = {
        name: `${mutation.name}${selectedOption ? ' ('+selectedOption.name+')' : ''}`,
        key: mutation.key,
        selected: selectedOption ? selectedOption.key : null,
        source: `mutation.${mutation.key}${selectedOption ? '.'+selectedOption.key : ''}`,
      };
      this.$store.commit('characters/addCharacterMutation', { id, mutation: payload });
      // cleanup
      this.rolledD3 = null;
      this.rolledD66 = [];
      this.rolledMutation = null;
    },
    // Rolling Dice
    rollRandomMutation() {
      const d3 = this.rollD3();
      this.rolledD3 = null;
      let rolledMutation = null;
      this.rolledD66 = [];
      switch (d3) {
        case 1:
          this.rolledMutation = this.rollSubtileMutation(true);
          this.rolledD3 = `${d3} (Subtile)`;
          break;
        case 2:
          this.rolledMutation = this.rollMinorMutation(true);
          this.rolledD3 = `${d3} (Minor)`;
          break;
        case 3:
          this.rolledMutation = this.rollSevereMutation(true);
          this.rolledD3 = `${d3} (Major)`;
          break;
      }
    },
    rollSubtileMutation(addMutations = false) {
      let d66 = this.rollD66();
      d66 += addMutations ? this.mutationCount * 10 : 0;
      this.rolledD66.push(d66);
      if (d66 >= 61) {
        return this.rollMinorMutation();
      }
      return this.mutationsRepository
        .filter(mutation => mutation.severity == 'subtile')
        .find(mutation => mutation.roll.includes(d66));
    },
    rollMinorMutation(addMutations = false) {
      let d66 = this.rollD66();
      d66 += addMutations ? this.mutationCount * 10 : 0;
      this.rolledD66.push(d66);
      if (d66 >= 61) {
        return this.rollSevereMutation();
      }
      return this.mutationsRepository
        .filter(mutation => mutation.severity == 'minor')
        .find(mutation => mutation.roll.includes(d66));
    },
    rollSevereMutation(addMutations = false) {
      let d66 = this.rollD66();
      d66 += addMutations ? this.mutationCount * 10 : 0;
      this.rolledD66.push(d66);
      if (d66 >= 64) {
        d66 = 64;
      }
      return this.mutationsRepository
        .filter(mutation => mutation.severity == 'severe')
        .find(mutation => mutation.roll.includes(d66));
    },
  },
};
</script>

<style scoped>

</style>
