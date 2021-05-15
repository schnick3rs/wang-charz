<template>
  <v-card>

    <v-card-title style="background-color: #262e37; color: #fff;" class="mb-4">
      Wealth & Asset Manager
      <v-spacer />
      <v-icon dark @click="$emit('cancel')">
        close
      </v-icon>
    </v-card-title>

    <v-card-text>

      <div class="mt-1" v-show="modifiers && modifiers.length > 0">
        <ul>
          <li v-for="item in modifiers">
            <strong>{{item.modifier}}</strong>, <em>{{item.hint ? item.hint : item.source}}</em>
            <v-btn
                v-if="item.id"
                icon x-small
                @click="removeWealth(item.id)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </li>
        </ul>
      </div>

      <h3 class="mt-4">Add Wealth</h3>
      <p>In case some event or the GM causes some additional Wealth, you can add it here.</p>
      <v-row>
        <v-col :cols="12" :md="4">
          <v-text-field
              v-model="newValue"
              type="number"
              dense outlined required
              label="Wealth Points"
              persistent-hint
              hint="Number of Wealth Points to gain"
          ></v-text-field>
        </v-col>
        <v-col :cols="12" :md="8">
          <v-text-field
              v-model="newHint"
              type="text"
              dense outlined required
              label="Source"
              persistent-hint
              hint="A hint how you got this wealth"
              @click:append-outer="addWealth"
              append-outer-icon="add"
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
export default {
  name: 'WealthManager',
  props: {
    characterId: { type: String, required: true },
    characterTraits: Array,
    characterModifiers: Array,
  },
  data() {
    return {
      newValue: 0,
      newHint: '',
    };
  },
  computed: {
    characterWealth() {
      return this.$store.getters['characters/characterWealthPointsById'](this.characterId);
    },
    traitWealth() {
      return this.characterTraits.find((t)=>t.key==='wealth');
    },
    modifiers() {
      return this.characterModifiers.filter((e) => e.targetValue === 'wealth');
    },
  },
  methods: {
    addWealth(){
      const content = {
        modifications: [{
          name: 'Wealth',
          targetGroup: 'traits',
          targetValue: 'wealth',
          modifier: parseInt(this.newValue),
          hint: this.newHint,
        }],
        source: `custom`,
      };
      this.$store.commit('characters/addCharacterModifications', { id: this.characterId, content });
      this.newValue = 0;
      this.newHint = '';
    },
    removeWealth() {

    },
  }
}
</script>

<style scoped>

</style>
