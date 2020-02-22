<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <div class="page page--din-a-4">
      <!-- grid list with low margin -->
      <v-container>
        <v-row no-gutters>
          <v-col :cols="12" style="text-align: center;">
            <h1 class="headline" >
              {{ characterName }}
            </h1>
            <span class="caption" >
              {{ [ `Rank ${characterRank}`, speciesLabel, archetypeLabel, `Tier ${characterSettingTier}` ].join(' • ') }}
            </span>
            <span class="sexy_line" />
            <span class="caption mb-2">
              {{ keywords.join(' • ') }}
            </span>
          </v-col>

          <!-- attributes and traits -->
          <v-col :cols="4">
            <v-col :cols="12" class="pa-1">
              <v-card>
                <v-toolbar color="red" dark dense height="32">
                  <v-toolbar-title>Attributes</v-toolbar-title>
                </v-toolbar>

                <v-simple-table
                  dense
                >
                  <thead>
                    <tr>
                      <th v-for="header in attributeHeaders">
                        {{ header.text }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in attributes">
                      <td class="text-left pa-1 small">
                        {{ item.name }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.value }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.enhancedValue }}
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card>
            </v-col>

            <v-col :cols="12" class="pa-1">
              <v-card>
                <v-toolbar color="red" dark dense height="32">
                  <v-toolbar-title>Traits</v-toolbar-title>
                </v-toolbar>

                <v-simple-table
                  :headers="traitHeaders"
                  :items="groupedTraits"
                  dense
                >
                  <tbody>
                    <tr v-for="item in groupedTraits">
                      <td class="text-left pa-1 small">
                        <span>{{ item.name }}</span>
                        <span v-if="item.name === 'Wounds'" style="float: right;">
                          {{ '☐'.repeat( Math.ceil(item.enhancedValue/2) ) }}
                          •
                          {{ '☐'.repeat( Math.floor(item.enhancedValue/2) ) }}
                        </span>
                        <span v-if="item.name === 'Shock'" style="float: right;">{{ '☐'.repeat(item.enhancedValue) }}</span>
                        <em v-if="item.name==='Resilience' && armour.length>0">
                          @{{ armour[0].name }} ({{ armour[0].meta[0].armourRating }})
                        </em>
                      </td>
                      <td v-if="item.name==='Resilience'" class="text-center pa-1 small">
                        {{ item.enhancedValue + ( armour.length>0 ? armour[0].meta[0].armourRating : 0 ) }}
                      </td>
                      <td v-else class="text-center pa-1 small">
                        {{ item.enhancedValue }}
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>

                <v-data-table
                  v-if="false"
                  :headers="traitHeaders"
                  :items="traits.filter(i=>i.type === 'Combat')"
                  hide-footer
                  hide-actions
                >
                  <template v-slot:items="props">
                    <tr>
                      <td class="text-left pa-1 small">
                        {{ item.name }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.enhancedValue }}
                      </td>
                    </tr>
                  </template>
                </v-data-table>

                <v-data-table
                  v-if="false"
                  :headers="traitHeaders"
                  :items="traits.filter(i=>i.type === 'Mental')"
                  hide-footer
                  hide-actions
                >
                  <template v-slot:items="props">
                    <tr>
                      <td class="text-left pa-1 small">
                        {{ item.name }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.enhancedValue }}
                      </td>
                    </tr>
                  </template>
                </v-data-table>

                <v-data-table
                  v-if="false"
                  :headers="traitHeaders"
                  :items="traits.filter(i=>i.type === 'Social')"
                  hide-footer
                  hide-actions
                >
                  <template v-slot:items="props">
                    <tr>
                      <td class="text-left pa-1 small">
                        {{ item.name }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.enhancedValue }}
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-col>

          <!-- skills -->
          <v-col :cols="4">
            <v-col :cols="12" class="pa-1">
              <v-card>
                <v-toolbar color="red" dark dense height="32">
                  <v-toolbar-title>Skills</v-toolbar-title>
                </v-toolbar>

                <v-simple-table
                  dense
                >
                  <thead>
                    <tr>
                      <th v-for="header in skillHeaders">
                        {{ header.text }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in skills">
                      <td class="text-left pa-1 small">
                        {{ item.name }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.value }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.attribute.substring(0,3) }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ computeSkillPool(item) }}
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card>
            </v-col>
          </v-col>

          <v-col :cols="4">
            <v-row justify="center" no-gutters>
              <v-col :cols="12" class="pa-1">
                <v-card >
                  <v-toolbar color="red" dark dense height="32">
                    <v-toolbar-title>Objectives</v-toolbar-title>
                  </v-toolbar>

                  <v-card-text
                    v-for="(objective, index) in objectives"
                    :key="objective.name"
                    class="pl-2 pr-2 pt-1 pb-1 caption"
                  >
                    <strong>{{ index+1 }}:</strong> {{ objective.text }}
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col :cols="12" class="pa-1">
                <v-card >
                  <v-card-text class="pa-1 pl-2 pr-2">
                    <p class="caption mb-1">
                      Spend one <strong>Wrath</strong> to:
                    </p>
                    <ul class="pl-3">
                      <li class="caption">
                        Re-roll failures once on a test
                      </li>
                      <li class="caption">
                        Re-roll failures once on a soak attempt
                      </li>
                      <li class="caption">
                        Add +1 to a Defiance check
                      </li>
                      <li class="caption">
                        Make a narrative declaration
                      </li>
                      <li class="caption">
                        As an Action: restore 1d3+1 Shock
                      </li>
                    </ul>
                  </v-card-text>

                  <v-card-text class="pa-1 pl-2 pr-2">
                    <p class="caption mb-1">
                      Spend one <strong>Glory</strong> to:
                    </p>
                    <ul class="pl-3">
                      <li class="caption">
                        Add +1d to a test after any re-rolls
                      </li>
                      <li class="caption">
                        Add +1 damage to a successful attack
                      </li>
                      <li class="caption">
                        Increase the severity of a Critical Hit
                      </li>
                      <li class="caption">
                        Seize the Initiative
                      </li>
                    </ul>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col :cols="12" class="pa-1">
                <v-card>
                  <v-toolbar color="red" dark dense height="32">
                    <v-toolbar-title>Languages</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <p>{{ languages.map((l)=>l.name).join(' • ') }}</p>
                  </v-card-text>
                </v-card>
              </v-col>

            </v-row>
          </v-col>


          <v-col :cols="12">
            <v-card>
              <v-toolbar color="red" dark dense height="32">
                  <v-toolbar-title>Weapons</v-toolbar-title>
              </v-toolbar>

              <v-data-table
                :headers="weaponHeaders"
                :items="weapons"
                hide-default-footer
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td class="text-left pa-1 small">
                      {{ item.name }}
                    </td>
                    <td class="text-center pa-1 small">
                      <div v-if="item.meta && item.meta.length > 0 && item.meta[0].damage">
                        <span v-if="item.type==='Melee Weapon'">{{ item.meta[0].damage.static + characterAttributesEnhanced.strength }}*</span>
                        <span v-else>{{ item.meta[0].damage.static }}</span>
                        <span> + </span>
                        <span>{{ item.meta[0].damage.ed }} ED</span>
                      </div>
                    </td>
                    <td class="text-center pa-1 small">
                      <span v-if="item.meta && item.meta.length > 0">{{ item.meta[0].ap }}</span>
                    </td>
                    <td class="text-center pa-1 small">
                      <span v-if="item.meta && item.meta.length > 0">{{ item.meta[0].salvo < 0 ? '-' : item.meta[0].salvo }}</span>
                    </td>
                    <td class="text-center pa-1 small">
                      <span v-if="item.meta && item.meta.length > 0 && item.meta[0].range > 1">{{ item.meta[0].range }} m</span>
                      <span v-if="item.meta && item.meta.length > 0 && item.meta[0].range === 1">melee</span>
                    </td>
                    <td class="text-left pa-1 small">
                      <span v-if="item.meta && item.meta.length > 0 && item.meta[0].traits && item.meta[0].traits.length >0">{{ item.meta[0].traits.join(', ') }}</span>
                    </td>
                  </tr>
                </template>
              </v-data-table>

              <div class="ma-1">
                <p
                  v-for="trait in weaponsTraitSet"
                  v-if="traitByName(trait)"
                  :key="trait"
                  class="body-2 mb-1 caption"
                >
                  <strong>{{ traitByName(trait).name }}: </strong>
                  <span v-if="traitByName(trait).crunch">{{ traitByName(trait).crunch }}</span>
                  <span v-else>{{ traitByName(trait).description }}</span>
                </p>
              </div>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="page page--din-a-4">
      <!-- grid list with low margin -->
      <v-container>
        <v-row justify="center" no-gutters>
          <v-col :cols="12">
            <v-row justify="left" no-gutters>


              <!-- powers -->
              <v-col :cols="12" class="pa-1">
                <v-card v-if="psychicPowers.length > 0">
                  <v-toolbar color="red" dark dense height="32">
                    <v-toolbar-title>Psychic Powers</v-toolbar-title>
                  </v-toolbar>

                  <v-data-table
                    :headers="psychicPowersHeaders"
                    :items="psychicPowers"
                    hide-default-footer
                  >
                    <template v-slot:item="{ item }">
                      <tr>
                        <td class="text-left pa-1 small">
                          {{ item.name }}
                        </td>
                        <td class="text-center pa-1 small">
                          {{ item.crunch_difficulty_number }}
                        </td>
                        <td class="text-center pa-1 small">
                          {{ item.crunch_activation }}
                        </td>
                        <td class="text-center pa-1 small">
                          {{ item.crunch_duration }}
                        </td>
                        <td class="text-center pa-1 small">
                          {{ item.crunch_range }}
                        </td>
                        <td class="text-center pa-1 small">
                          {{ item.crunch_multi_target }}
                        </td>
                        <td class="text-left pa-1 small">
                          {{ item.effect }}
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-card>
              </v-col>

              <!-- abilities -->

              <v-col :cols="6" class="pa-1">
                <v-card>
                  <v-toolbar color="red" dark dense height="32">
                    <v-toolbar-title>Abilities</v-toolbar-title>
                  </v-toolbar>

                  <v-card-text v-for="ability in abilities" :key="ability.name" class="pa-1 caption">
                    <strong>{{ ability.name }}</strong><em v-if="ability.source">  • {{ ability.source }}</em>
                    <br>
                    <span v-html="computeFormatedText(ability.effect)" />
                  </v-card-text>

                </v-card>
              </v-col>

              <v-col :cols="6">
                <v-col v-if="talents.length > 0" :cols="12" class="pa-1">
                  <v-card>
                    <v-toolbar color="red" dark dense height="32">
                      <v-toolbar-title>Talents</v-toolbar-title>
                    </v-toolbar>

                    <v-card-text v-for="talent in talents" :key="talent.name" class="pa-1 caption">
                      <strong>{{ talent.name }}:</strong> <span v-html="computeFormatedText(talent.description)" />
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col v-if="gear.length > 0" :cols="12" class="pa-1">
                  <v-card>
                    <v-toolbar color="red" dark dense height="32">
                      <v-toolbar-title>Gear</v-toolbar-title>
                    </v-toolbar>

                    <v-card-text v-for="gearItem in gear" :key="gearItem.name" class="pa-1 caption">
                      <div v-if="gearItem.variant" style="display: inline;">
                        <strong >{{ gearItem.variant }}</strong>
                        <span> ({{ gearItem.name }})</span>
                      </div>
                      <strong v-else>{{ gearItem.name }}</strong>
                      <em v-if="gearItem.type"> • {{gearItem.type}}</em>
                      <span v-if="gearItem.source">
                        <em v-if="gearItem.source.key"> • {{ gearItem.source.key }}</em><em v-if="!isNaN(gearItem.source.page)">, pg. {{ gearItem.source.page }}</em>
                      </span>
                      <p class="mb-0">{{ gearItem.snippet ? gearItem.snippet : gearItem.description }}</p>

                      <div
                        v-if="gearItem.meta !== undefined && gearItem.meta.length > 0 && ['armour'].includes(gearItem.meta[0].type)"
                      >
                          <p
                            class="ml-3 mt-2 mb-0"
                            v-for="trait in gearItem.meta[0].traits"
                            v-if="traitByName(trait, true)"
                            :key="trait"
                          >
                            <strong>{{ trait }}: </strong>
                            {{ traitByName(trait, true).effect }}
                          </p>
                      </div>

                    </v-card-text>
                  </v-card>
                </v-col>
              </v-col>

            </v-row>
          </v-col>


        </v-row>
      </v-container>
    </div>

  </div>
</template>

<script lang="js">
import BackgroundRepositoryMixin from '~/mixins/BackgroundRepositoryMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import WargearTraitRepositoryMixin from '~/mixins/WargearTraitRepositoryMixin';

export default {
  name: 'Print',
  layout: 'print',
  components: {},
  mixins: [
    BackgroundRepositoryMixin,
    StatRepositoryMixin,
    WargearTraitRepositoryMixin,
  ],
  props: [],
  data() {
    return {
      attributeHeaders: [
        { text: 'Attribute', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'Rating', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Adjusted', sortable: false, align: 'center', class: 'small pa-1' },
      ],
      traitHeaders: [
         { text: 'Trait', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'Rating', sortable: false, align: 'center', class: 'small pa-1',
        },
      ],
      skillHeaders: [
        { text: 'Skill', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'Val', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Att', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Total', sortable: false, align: 'center', class: 'small pa-1' },
      ],
      weaponHeaders: [
        { text: 'Name', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'Damage', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'AP', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Salvo', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Range', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Traits', sortable: false, align: 'left', class: 'small pa-1' },
      ],
      psychicPowersHeaders: [
         { text: 'Name', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'DN', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Activation', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Duration', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Range', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Multi-Target', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Effect', sortable: false, align: 'left', class: 'small pa-1' },
      ],
      //
      characterSpecies: undefined,
      characterArchetype: undefined,
    };
  },
  computed: {
    characterName() {
      return this.$store.getters['characters/characterNameById'](this.characterId);
    },
    characterSettingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterRank() {
      return this.$store.getters['characters/characterCampaignCustomRankById'](this.characterId);
    },


    speciesKey() {
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    speciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.characterId);
    },
    speciesAstartesChapter() {
      return this.$store.getters['characters/characterSpeciesAstartesChapterById'](this.characterId);
    },

    archetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    archetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    characterBackgroundKey() {
      return this.$store.getters['characters/characterBackgroundKeyById'](this.characterId);
    },

    keywords() {
      return this.$store.getters['characters/characterKeywordsFinalById'](this.characterId);
    },

    languages() {
      return this.$store.getters['characters/characterLanguagesById'](this.characterId);
    },

    characterAttributesEnhanced() {
      let enhancedAttributes = this.$store.getters['characters/characterAttributesEnhancedById'](this.characterId);
      // enrich with (equipped) gear
      if ( this.armour && this.armour.length > 0 ) {
        const armour = this.armour[0];
        const traits = armour.meta[0].traits;
        let poweredString = traits.find((trait)=>trait.includes('Powered'));
        if (poweredString) {
          const trait = this.normalizeTrait(poweredString);
          if ( trait.variant) {
            enhancedAttributes.strength = parseInt(enhancedAttributes.strength) + parseInt(trait.variant);
          }
        }
      }

      return enhancedAttributes;
    },
    attributes() {
      const attributes = this.$store.getters['characters/characterAttributesById'](this.characterId);
      return this.attributeRepository.map((a) => ({
        ...a,
        value: attributes[a.name.toLowerCase()],
        enhancedValue: this.characterAttributesEnhanced[a.name.toLowerCase()],
      }));
    },
    traits() {
      const traits = this.$store.getters['characters/characterTraitsById'](this.characterId);
      const traitsEnhanced = this.$store.getters['characters/characterTraitsEnhancedById'](this.characterId);
      return this.traitRepository.map((t) => ({
        ...t,
        value: traits[t.key],
        enhancedValue: traitsEnhanced[t.key],
      }));
    },
    groupedTraits() {
      return [
        ...this.traits.filter((i) => i.type === 'Combat'),
        ...this.traits.filter((i) => i.type === 'Mental'),
        ...this.traits.filter((i) => i.type === 'Social'),
      ];
    },
    skills() {
      const skills = this.$store.getters['characters/characterSkillsById'](this.characterId);
      return this.skillRepository.map((s) => ({
        ...s,
        value: skills[s.key],
        enhancedValue: skills[s.key],
      }));
    },
    enhancements() {
      return this.$store.getters['characters/characterEnhancementsById'](this.characterId);
    },

    abilities() {
      const abilities = [];

      // species
      const species = this.characterSpecies;
      if (species && species.speciesFeatures) {
        species.speciesFeatures.forEach( (feature) => {
          // Honour the Chapter
          if (feature.name === 'Honour the Chapter') {
            const chapter = this.astartesChapterRepository.find((a) => a.name === this.speciesAstartesChapter) || [];
            const traditions = chapter.beliefsAndTraditions;
            if (traditions !== undefined) {
              traditions.forEach((t) => {
                const tradition = {
                  name: t.name,
                  effect: t.effect,
                  source: this.speciesAstartesChapter,
                };
                abilities.push(tradition);
              });
            }
          } else {
            // other abilities
            const ability = {
              name: feature.name,
              effect: feature.snippet ? feature.snippet : feature.description,
              source: this.speciesLabel,
              hint: this.speciesLabel,
            };
            if ( feature.options ) {
              const traitSelection = this.enhancements.find( (e) => e.source.startsWith(`species.${feature.name}.`));
              if ( traitSelection && traitSelection.effect ) {
                ability['selectedOption'] = {
                  name: traitSelection.name,
                  effect: traitSelection.effect,
                };
              }
            }
            abilities.push(ability);
          }
        });
      }

      // archetype
      const archetype = this.characterArchetype;
      if (archetype && archetype.archetypeFeatures) {
        archetype.archetypeFeatures.forEach( (item) => {
          const ability = {
            name: item.name,
            effect: item.snippet ? item.snippet : item.description,
            source: archetype.label,
            hint: archetype.label,
          };
          abilities.push(ability);
        });
      }

      if (this.keywords.find( k => k ==='Adeptus Mechanicus')) {
        abilities.push({
          name: 'Data is Currency',
          effect:
            'Characters with the Adeptus Mechanicus keyword may use Intellect ' +
            'in place of Fellowship when calculating Influence.',
          source: 'Adeptus Mechanicus'
        });
      }

      // background abilities
      if (this.characterBackgroundKey) {
        const background = this.backgroundRepository
          .filter((b) => b.key === this.characterBackgroundKey)
          .map((b) => ({
            name: b.name,
            effect: b.bonus,
            source: 'Background',
          }));
        abilities.push(background[0]);
      }

      // other
      if (this.customAbilities) {
        this.customAbilities.forEach((item) => {
          const ability = {
            name: item.name,
            effect: item.effect,
            source: 'Ascension?',
          };
          abilities.push(ability);
        });
      }

      return abilities;
    },
    customAbilities() {
      const characterEnhancements = this.$store.getters['characters/characterEnhancementsById'](this.characterId);
      return characterEnhancements ? characterEnhancements.filter( (i) => i.targetGroup === 'abilities' ) : [];
    },
    talents() {
      const characterTalents = this.$store.getters['characters/characterTalentsById'](this.characterId);
      const finalTalents = [];
      characterTalents.forEach((charTalent) => {
        const rawTalent = this.talentRepository.find((t) => t.name === charTalent.name);
        rawTalent.source = undefined;
        if (charTalent.selected) {
          rawTalent.name = rawTalent.name.replace(/(<.*>)/, `[${charTalent.selected}]`);
        }
        finalTalents.push(rawTalent);
      });
      return finalTalents;
    },
    wargear() {
      const chargear = this.$store.getters['characters/characterWargearById'](this.characterId);
      const wargear = [];
      chargear.forEach((gear) => {
        const foundGear = this.wargearRepository.find((w) => gear.name.localeCompare(w.name, 'en', {sensitivity: 'accent'}) === 0 );
        if (foundGear) {
          wargear.push({ ...foundGear, variant: gear.variant });
        } else {
          wargear.push({ name: gear.name, variant: gear.variant, type: 'Misc' });
        }
      });
      return wargear;
    },
    weapons() {
      return this.wargear.filter((w) => ['Ranged Weapon', 'Melee Weapon'].includes(w.type));
    },
    armour() {
      return this.wargear.filter((w) => ['Armour'].includes(w.type));
    },
    gear() {
      return this.wargear.filter((w) => !['Ranged Weapon', 'Melee Weapon'].includes(w.type));
    },
    psychicPowers() {
      const powers = this.$store.getters['characters/characterPsychicPowersById'](this.characterId).map((p) => p.name);
      const items = [];
      powers.forEach((name) => {
        const power = this.psychicPowersRepository.find((power) => power.name === name);
        items.push(power);
      });
      return items;
    },
    objectives() {
      if (this.characterArchetype && this.objectiveRepository) {
        const objectiveList = this.objectiveRepository.find((o) => o.group === this.characterArchetype.group);
        if (objectiveList) {
          return objectiveList.objectives.map((o) => ({ text: o }));
        }
      }
      return [];
    },
    weaponsTraitSet() {
      let weaponsTraitSet = [];
      const { weapons } = this;

      weapons.forEach((weapon) => {
        // item.meta[0].traits
        if (weapon.meta[0] && weapon.meta[0].traits && weapon.meta[0].traits.length > 0) {
          weaponsTraitSet = [...weaponsTraitSet, ...weapon.meta[0].traits];
        }
      });
      weaponsTraitSet = weaponsTraitSet.map((t) => t.split(/ ?\(/)[0]);
      return [...new Set(weaponsTraitSet)].sort();
    },
  },
  async asyncData({ params, $axios }) {
    const sourceFilter = '?source=core,coreab';
    const talentResponse = await $axios.get('/api/talents/');
    const wargearResponse = await $axios.get('/api/wargear/');
    const psychicPowersResponse = await $axios.get('/api/psychic-powers/');
    const objectiveResponse = await $axios.get('/api/archetypes/objectives/');
    const chaptersResponse = await $axios.get('/api/species/chapters/');

    return {
      characterId: params.id,
      astartesChapterRepository: chaptersResponse.data,
      objectiveRepository: objectiveResponse.data,
      psychicPowersRepository: psychicPowersResponse.data,
      talentRepository: talentResponse.data,
      wargearRepository: wargearResponse.data,
    };
  },
  head() {
    return {
      // title: [this.name, this.species, this.archetype].join(' • '),
      title: this.characterName,
      // titleTemplate: '%s | W&G Character Sheet',
    };
  },
  watch: {
    speciesKey: {
      handler(newVal) {
        if (newVal && newVal !== 'unknown') {
          this.loadSpecies(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    archetypeKey: {
      handler(newVal) {
        if (newVal) {
          this.loadArchetype(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    async loadSpecies(key) {
      if ( key ) {
        const { data } = await this.$axios.get(`/api/species/${key}`);
        this.characterSpecies = data;
      }
    },
    async loadArchetype(key) {
      if ( key ) {
        const { data } = await this.$axios.get(`/api/archetypes/${key}`);
        this.characterArchetype = data;
      }
    },
    computeSkillPool(skill) {
      const attribute = this.attributes.find((a) => a.name === skill.attribute);
      return attribute.enhancedValue + skill.enhancedValue;
    },
    normalizeTrait(traitString) {
      const regex = /(\w+) ?\(?(\w+)?\)?/m;
      let trait = traitString.match(regex);
      let traitFromRep = this.wargearTraitRepository.find((item) => item.name === trait[1]);
      return {
        ...traitFromRep,
        variant: trait[2],
      };
    },
    traitByName(name, withParantesis = false) {
      if ( withParantesis ) {
        name = name.split(/ ?\(/)[0];
      }
      return this.wargearTraitRepository.find((item) => item.name === name);
    },
    computeFormatedText(text) {
      if ( text === undefined ) {
        return text;
      }
      const rank = this.characterRank;
      let computed = text;

      // computed = computed.replace(/(1d3\+Rank Shock)/g, `<strong>1d3+${rank} Shock</strong>`);
      computed = computed.replace(/(\d+ Faith)/g, '<strong>$1</strong>');
      computed = computed.replace(/(\d+ meters)/g, '<strong>$1</strong>');
      computed = computed.replace(/(\d+ metres)/g, '<strong>$1</strong>');
      computed = computed.replace(/15 \+ Rank meters/g, `<strong data-hint="15 + Rank meters">${15 + rank} meters</strong>`);
      computed = computed.replace(/15 \+ Rank metres/g, `<strong>${15 + rank} metres</strong>`);
      computed = computed.replace(/\+½ Rank/g, `<strong data-hint="+½ Rank">+${Math.round(rank / 2)}</strong>`);
      computed = computed.replace(/\+ ?Rank/g, `<strong data-hint="+ Rank">+${rank}</strong>`);

      return computed;
    },
  },
};
</script>

<style scoped lang="css">

  .page {
    page-break-inside: avoid;
  }

  .page--din-a-4 {
    height: 297mm;
    width: 220mm;
    overflow: hidden;
  }

  .page-title {
  }

  .small {
    height: 24px;
  }

  td.small {
    font-size: 12px;
  }

  .sexy_line{
    display:block;
    border:none;
    color:white;
    height:1px;
    background:black;
    background: -webkit-gradient(radial, 50% 50%, 0, 50% 50%, 350, from(#000), to(#fff));
  }
</style>
