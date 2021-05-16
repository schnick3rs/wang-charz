<template>
  <v-card>

    <v-card-title style="background-color: #262e37; color: #fff;" class="mb-4">
      Customize Trait: {{trait.name}}
      <v-spacer />
      <v-icon dark @click="$emit('cancel')">
        close
      </v-icon>
    </v-card-title>

    <v-card-text>
      <h3 class="mt-4">A history of {{ trait.name }}</h3>
      <p>Shows the modifiers and thus history of your changes.</p>
      <div class="mt-1" v-show="modifiers && modifiers.length > 0">
        <ul>
          <li v-for="item in modifiers">
            <strong>{{item.modifier}}</strong>,
            <em>{{item.hint ? item.hint : item.source}}</em>
            <v-btn
                v-if="item.id"
                icon x-small
                @click="removeModifier(item.id)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </li>
        </ul>
      </div>

      <h3 class="mt-4">Add {{ trait.name }} modifier</h3>
      <p>In case some event or the GM causes some additional (or substraction thereoff) {{ trait.name }}, you can add it here.</p>
      <v-row>
        <v-col :cols="12" :md="4">
          <v-text-field
              v-model="newValue"
              type="number"
              dense outlined required
              :label="`${trait.name} Points`"
              persistent-hint
              :hint="`Number of ${trait.name} to gain or lose`"
          ></v-text-field>
        </v-col>
        <v-col :cols="12" :md="8">
          <v-text-field
              v-model="newHint"
              type="text"
              dense outlined required
              label="Source"
              persistent-hint
              hint="A hint how you got this modifier"
              @click:append-outer="addWealth"
              append-outer-icon="mdi-plus-circle"
          ></v-text-field>
        </v-col>
      </v-row>

    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer />
      <v-btn @click="$emit('cancel')" color="success">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';

export default {
  name: 'WealthManager',
  mixins: [
      StatRepositoryMixin,
  ],
  props: {
    characterId: { type: String, required: true },
    characterTraits: Array,
    characterModifiers: Array,
    traitKey: { type: String, required: true },
  },
  data() {
    return {
      newValue: 0,
      newHint: '',
    };
  },
  computed: {
    trait() {
      return this.getTraitByKey(this.traitKey);
    },
    traitWealth() {
      return this.characterTraits.find((t)=>t.key === this.traitKey);
    },
    modifiers() {
      return this.characterModifiers.filter((e) => e.targetValue === this.traitKey);
    },
  },
  methods: {
    addWealth(){
      const id = this.characterId;
      const content = {
        modifications: [{
          name: this.trait.name,
          targetGroup: 'traits',
          targetValue: this.trait.key,
          modifier: parseInt(this.newValue),
          hint: this.newHint,
        }],
        source: `custom`,
      };
      this.$store.commit('characters/addCharacterModifications', { id, content });
      this.newValue = 0;
      this.newHint = '';
    },
    removeModifier(modificationId) {
      const id = this.characterId;
      this.$store.commit('characters/removeCharacterModificationById', { id, modificationId });
    },
  }
}
</script>

<style scoped>

</style>
