<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-row justify-center row wrap>

    <v-col v-bind:cols="12" v-if="startingWargear && characterWargear.filter(g => g.source.startsWith('archetype')).length <= 0">

      <h1 class="headline">Select starting Wargear</h1>

      <v-card
        v-for="gear in startingWargear.options"
        :key="gear.key"
        class="mb-2"
      >

        <v-card-title>
          <span class="subtitle-1 mb-0">{{ gear.name }}</span>
        </v-card-title>

        <v-card-text v-if="gear.options && gear.options.length == 1 && gear.options[0].query">
          <v-select
            :items="wargearRepository.filter(gear.options[0].query)"
            v-model="gear.selected"
            item-value="name"
            item-text="name"
          ></v-select>

        </v-card-text>

        <v-card-text v-else-if="gear.options">

          <v-radio-group
            v-model="gear.selected"
            class="mt-0"
          >
            <v-radio
              v-for="option in gear.options"
              :key="option.key"
              :label="option.name"
              :value="option.name"
            ></v-radio>
          </v-radio-group>

        </v-card-text>

      </v-card>

      <v-btn
        block
        dense
        color="green"
        @click="addWargearToCharacter(startingWargear.options)"
      >Add starting wargear</v-btn>

    </v-col>

    <v-col v-bind:cols="12">

      <h1 class="headline">Manage Wargear</h1>

      <v-list
        two-line
        avatar
        dense
        v-if="characterWargear"
      >

        <v-list-item
          v-for="gear in characterWargear"
          :key="gear.name"
        >

          <v-list-item-avatar tile>
            <img />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{gear.name}}</v-list-item-title>
            <v-list-item-subtitle>{{wargearSubtitle(gear)}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn text small color="red" @click="remove(gear)">Remove</v-btn>
          </v-list-item-action>

        </v-list-item>

      </v-list>

    </v-col>

  </v-row>

</template>

<script lang="js">
  import WargearRepositoryMixin from '~/mixins/WargearRepositoryMixin.js';

  export default {
  name: 'Wargear',
  layout: 'builder',
  mixins: [WargearRepositoryMixin],
  props: [],
  head() {
    return {
      title: 'Select Wargear',
    }
  },
  async asyncData({ params, $axios, error }) {
    const response = await $axios.get(`/api/wargear/`);
    const wargearRepository = response.data;
    return {
      wargearRepository: wargearRepository,
    };
  },
  data() {
    return {};
  },
  computed: {
    settingTier() { return this.$store.state.settingTier; },
    characterArchetypeName() { return this.$store.state.archetype.value; },
    startingWargear() {
      return this.archetypeWargearRepository.find(i => i.name === this.characterArchetypeName);
    },
    characterWargear() {
      const characterWargear = [];
      this.$store.state.wargear.forEach(chargear => {
         let gear = this.wargearRepository.find(wargear => wargear.name === chargear.name);
         if ( gear ) {
           gear.id = chargear.id;
           gear.source = chargear.source;
           characterWargear.push(gear);
         } else {
           characterWargear.push( {
             id: chargear.id,
             name: chargear.name,
             type: 'Misc',
             source: chargear.source,
           });
         }
      });
      return characterWargear;
    },
  },
  methods: {
    getAvatar(name) {
      const slug = name.toLowerCase().replace(/\s/gm, '-');
      return `/img/icon/wargear/wargear_${slug}_avatar.png`;
    },
    addWargearToCharacter(wargearOptions) {
      const finalWargear = [];

      wargearOptions.forEach((i) => {
        if (i.options) {
          if (i.selected) {
            if (i.selected.indexOf(' and ') > 0) {
              i.selected.split(' and ').forEach((o) => {
                finalWargear.push(o);
              });
            } else {
              finalWargear.push(i.selected);
            }
          }
        } else {
          finalWargear.push(i.name);
        }
      });
      finalWargear.forEach((w) => {
        this.$store.commit('addWargear', { name: w, source: 'archetype' });
      });
    },
    remove(gear) {
      this.$store.commit('removeWargear', { id: gear.id });
    },
    wargearSubtitle(item) {
      //const item = this.wargearRepository.find(i => i.name === gear);
      if (item) {
        let tags = [item.type];
        if ( item.subtype ) {
          tags.push(item.subtype);
        }
        return tags.filter(t=> t!== undefined).join(' • ');
      }
      return '';
    },
  },
};
</script>

<style scoped lang="css">
</style>
