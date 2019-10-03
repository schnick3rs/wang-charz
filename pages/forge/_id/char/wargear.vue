<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-row justify="center" >

    <v-col :cols="12">

      <v-card
        @click="manageWargear = !manageWargear"
        class="mb-4"
        dark dense outlined
        :color=" manageWargear ? 'info' : '' "
      >
        <v-card-text>
          <v-icon>{{ manageWargear ? 'expand_less' : 'expand_more' }}</v-icon>
          Manage Wargear
        </v-card-text>
      </v-card>

      <v-list
        two-line
        avatar
        dense
        v-if="manageWargear && characterWargear"
      >

        <v-list-item
          v-for="gear in characterWargear"
          :key="gear.id"
        >

          <v-list-item-avatar tile>
            <img />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{gear.name}}</v-list-item-title>
            <v-list-item-subtitle>{{wargearSubtitle(gear)}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn outlined x-small color="error" @click="remove(gear)"><v-icon left>delete</v-icon>Remove</v-btn>
          </v-list-item-action>

        </v-list-item>

      </v-list>


    </v-col>

    <v-col :cols="12" >

      <v-card
        @click="startingWargearExpand = !startingWargearExpand"
        class="mb-4"
        dark dense outlined
        :color=" startingWargearExpand ? 'info' : '' "
      >
        <v-card-text>
          <v-icon>{{ startingWargearExpand ? 'expand_less' : 'expand_more' }}</v-icon>
          Add Starting Wargear
        </v-card-text>
      </v-card>

      <div v-if="startingWargearExpand">

        <div v-if="startingWargear && characterWargear.filter(g => g.source.startsWith('archetype')).length <= 0">

          <v-card
            v-for="gear in startingWargear.options"
            :key="gear.key"
            outlined dense
            class="mb-2"
          >

            <v-card-title>
              <span class="subtitle-1 mb-0">{{ gear.name }}</span>
            </v-card-title>

            <v-card-text v-if="gear.options && gear.options.length == 1 && gear.options[0].query">

              <wargear-select
                :item="gear.selected"
                :repository="wargearRepository.filter(gear.options[0].query)"
                @input="gear.selected = $event"
                class="mb-4"
              ></wargear-select>

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
            v-if="startingWargearExpand"
            block
            dense
            color="green"
            @click="addWargearToCharacter(startingWargear.options)"
          >Add starting wargear</v-btn>

        </div>

        <div v-else>
          <v-card>
            <v-card-text>
              <v-icon>help</v-icon>
              Starting Wargear has been added, remove all starting wargear from your inventory to reselct the starting wargear
            </v-card-text>
          </v-card>
        </div>

      </div>

    </v-col>

    <v-col :cols="12">

      <v-card
        @click="wargearSearchActive = !wargearSearchActive"
        class="mb-4"
        dark dense outlined
        :color=" wargearSearchActive ? 'info' : '' "
      >
        <v-card-text>
          <v-icon>{{ wargearSearchActive ? 'expand_less' : 'expand_more' }}</v-icon>
          Add additional Wargear
        </v-card-text>
      </v-card>

      <wargear-search
        v-if="wargearSearchActive"
        :repository="wargearRepository"
        @select="add"
      ></wargear-search>

    </v-col>

  </v-row>

</template>

<script lang="js">
import WargearRepositoryMixin from '~/mixins/WargearRepositoryMixin.js';
import WargearSearch from '~/components/forge/WargearSearch.vue';
import WargearSelect from '~/components/forge/WargearSelect.vue';

export default {
  name: 'Wargear',
  layout: 'forge',
  mixins: [WargearRepositoryMixin],
  components: { WargearSelect, WargearSearch },
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
    return {
      manageWargear: true,
      startingWargearExpand: true,
      wargearSearchActive: false,
    };
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
         var gear = {};
         gear = this.wargearRepository.find(wargear => wargear.name === chargear.name);
         if ( gear ) {
           gear.id = chargear.id;
           gear.source = chargear.source;
           characterWargear.push({
             id: chargear.id,
             name: chargear.name,
             type: this.wargearSubtitle(gear),
             source: chargear.source,
           });
         } else {
           characterWargear.push( {
             id: chargear.id,
             name: chargear.name,
             type: 'Misc',
             source: chargear.source,
           } );
         }
      });
      return characterWargear;
    },
  },
  methods: {
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
    add(gear) {
      this.$store.commit('addWargear', { name: gear.name, source: 'custom' });
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
