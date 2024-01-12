<template>

  <v-row>

    <!-- Ascension Dialog -->
    <v-dialog
      v-model="dialog"
      width="600px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <ascension-preview
        v-if="selectedPreview"
        :item="selectedPreview"
        :current-character-tier="effectiveCharacterTier"
        :max-target-tier="settingTier"
        choose-mode
        @select="selectPackageForChar"
        @cancel="dialog = false"
      />
    </v-dialog>

    <!-- ascension headline -->
    <v-col>
      <h1 class="headline">
        Select an Ascension Package
      </h1>

      <v-alert
        v-for="alert in alerts"
        :key="alert.key"
        :value="true"
        :type="alert.type"
        text dense
      >
        {{ alert.text }}
      </v-alert>
    </v-col>

    <!-- ascension options -->
    <v-col
      :cols="12"
    >
      <v-card>
        <v-list>
          <v-list-item
            v-for="item in ascensionPackagesList"
            :key="item.key"
            two-line
            @click.stop="openDialog(item)"
          >
            <v-list-item-avatar tile size="64">
              <img :alt="item.name" :src="`/img/avatars/ascension/${item.key}.png`" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
                <v-chip
                  v-if="item.source && !['core', 'coreab'].includes(item.source.key)"
                  color="info"
                  outlined
                  tags
                  x-small
                  label
                >
                  {{item.source.key.toUpperCase()}}
                </v-chip>
              </v-list-item-title>
              <v-list-item-subtitle>{{ item.hint }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn dense icon>
                <v-icon color="primary">
                  arrow_forward_ios
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>

  </v-row>

</template>

<script lang="js">
import AscensionPreview from '~/components/forge/AscensionPreview.vue';

export default {
  name: 'ascension-choose',
  components: {
    AscensionPreview,
  },
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      dialog: false,
      ascensionPackagesList: undefined,
      selectedPreview: undefined,
    };
  },
  computed: {
    sources() {
      return [
        'core',
        'fspg',
        'red1',
        'cos',
        ...this.settingHomebrews
      ];
    },
    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterArchetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    effectiveCharacterTier() {
      return this.$store.getters['characters/characterEffectiveTierById'](this.characterId);
    },
    alerts() {
      const alerts = [];
      if (!this.characterArchetypeLabel) {
        alerts.push({ type: 'warning', text: 'You need to select an Archetype first.' });
      }
      if (this.effectiveCharacterTier >= this.settingTier) {
        alerts.push({ type: 'warning', text: 'Your character already has reached a tier sufficient for the Campaign Tier.' });
      }
      return alerts;
    },
  },
  watch: {
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getAscensionPackageList(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    async getAscensionPackageList(sources) {
      const config = {
        params: {
          source: sources.join(','),
        },
      };
      const { data } = await this.$axios.get('/api/ascension-packages/', config);
      this.ascensionPackagesList = data.filter((item) => item.stub === undefined || item.stub === false);
    },
    openDialog(item) {
      this.selectedPreview = item;
      this.dialog = true;
    },

    /**
     * SET ASCENSION CHOICE
     */
    selectPackageForChar(ascensionPackage, targetTier) {
      const id = this.characterId;

      ascensionPackage.sourceTier = this.effectiveCharacterTier;
      ascensionPackage.targetTier = targetTier;

      const cost = ( ascensionPackage.costPerTier * targetTier ) + ascensionPackage.cost;
      const payload = {
        id,
        key: ascensionPackage.key,
        value: ascensionPackage.name,
        cost,
        sourceTier: ascensionPackage.sourceTier,
        targetTier,
      };
      this.$store.commit('characters/addCharacterAscensionPackage', payload);

      if (ascensionPackage.influenceBonus !== 0 || ascensionPackage.influencePerTier !== 0) {
        const tierDifference = ascensionPackage.targetTier - ascensionPackage.sourceTier;
        let influenceModifier = 0;
        if (ascensionPackage.influenceBonus !== 0) {
          influenceModifier += ascensionPackage.influenceBonus;
        }
        if (ascensionPackage.influencePerTier !== 0) {
          influenceModifier += tierDifference * ascensionPackage.influencePerTier;
        }
        if (influenceModifier > 0) {
          const modificationPayload = {
            name: ascensionPackage.name,
            targetGroup: 'traits',
            targetValue: 'influence',
            modifier: influenceModifier,
          };
          const content = { modifications: [modificationPayload], source: `ascension.${ascensionPackage.key}.influence`, };
          this.$store.commit('characters/setCharacterModifications', { id, content });
        }
      }

      let modifications = [];

      ascensionPackage.ascensionFeatures
      .filter( (feature) => feature.modifications !== undefined )
      .forEach( (feature) => {
          modifications = [ ...modifications, ...feature.modifications ];
      });

      modifications
      .filter( (m) => m.targetGroup === 'keywords' )
      .forEach( (k) => {
        const payload = {
          name: k.targetValue,
          source: `ascension.${ascensionPackage.key}.keywords`,
          type: 'keyword',
          replacement: undefined,
        };
        this.$store.commit('characters/addCharacterKeyword', { id: this.characterId, keyword: payload });
      });

      modifications
      .filter( (m) => m.targetGroup === 'talents' )
      .forEach( (t) => {
        const payload = {
          name: t.meta.name,
          key: t.targetValue,
          cost: 0,
          placeholder: undefined,
          selected: undefined,
          source: `ascension.${ascensionPackage.key}`,
        };
        this.$store.commit('characters/addCharacterTalent', { id: this.characterId, talent: payload });
      });

      {
        ascensionPackage.ascensionFeatures
        .filter( (feature) => feature.wargear !== undefined )
        .forEach( (feature) => {
          feature.wargear.forEach((wargear)=> {
            if ( wargear.options === undefined) {
              const payload = {
                id,
                name: wargear.name,
                source: `ascension.${ascensionPackage.key}.${feature.key}`,
              };
              this.$store.commit('characters/addCharacterWargear', payload);
            }
          });
        });
      }

      {
        ascensionPackage.ascensionFeatures
        .filter( (feature) => feature.psychicPowers !== undefined )
        .forEach( (feature) => {
          feature.psychicPowers.forEach((psychicPower)=>{
            if ( psychicPower.query && psychicPower.query.name ) {
              const payload = {
                id,
                name: psychicPower.query.name,
                cost: 0, // TODO for non free powers
                source: `ascension.${ascensionPackage.key}.${feature.key}`,
              };
              this.$store.commit('characters/addCharacterPsychicPower', payload);
            }
          });
        });
      }

      this.dialog = false;
      this.$router.push({
        name: 'forge-characters-id-builder-ascension-manage',
        params: { id },
      });
    },
  },
}
</script>

<style scoped lang="scss">
</style>
