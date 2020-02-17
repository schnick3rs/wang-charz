<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>

    <v-row justify="center">
      <v-col :cols="12" class="elevation-4 mb-2 pa-0 ma-0">
        <v-breadcrumbs
          :items="breadcrumbItems"
          class="pa-2"
        >
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item
              :nuxt="true"
              :to="item.to"
              :disabled="item.disabled"
              :exact="item.exact"
            >
              <img v-if="item.to == '/'" src="/favicon-16x16.png">
              {{ item.text }}
            </v-breadcrumbs-item>
          </template>

          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">

      <v-col :cols="3" :sm="2" :md="1">
        <v-avatar tile size="64">
          <img :src="avatar" >
        </v-avatar>
      </v-col>

      <!-- avatar, name, rank, tier, archetype, species -->
      <v-col :cols="8" :sm="6" :md="6">
        <v-row no-gutters>
          <v-col :cols="12">{{ characterName }}</v-col>
          <v-col :cols="12" class="caption">{{ [ speciesLabel, archetypeLabel ].join(' • ')  }}</v-col>
          <v-col :cols="12" class="caption">
            <span>{{ [ `Tier ${characterSettingTier}`, `Rank ${characterRank}`, `${campaignCustomXp} XP`].join(' • ') }}</span>
          </v-col>
          <v-col :cols="12" class="caption">
            <v-progress-linear :value="campaignCustomXp" height="2" color="red"></v-progress-linear>
          </v-col>
          <v-col :cols="12" class="caption" align="center">{{ keywords.join(' • ') }}</v-col>
        </v-row>
      </v-col>

      <!-- actions -->
      <v-col :cols="12" :sm="4" :md="5" align="right">
        <v-btn small outlined color="success" v-if="false">share</v-btn>
        <v-btn small outlined color="success" v-if="false">campaign</v-btn>
        <v-btn
          nuxt
          :to="`/forge/characters/${characterId}/builder/print`"
          color="success"
          target="_blank"
          outlined
          small
        >
          <v-icon left small>print</v-icon>
          Print
        </v-btn>
        <v-btn
          nuxt
          :to="`/forge/characters/${characterId}/builder/setting`"
          color="success"
          small
        >
          <v-icon left small>edit</v-icon>
          Edit
        </v-btn>
      </v-col>

    </v-row>

    <v-row justify="center" no-gutters>

      <!-- attributes and traits -->
      <v-col :cols="12" :sm="6" :md="3">

        <v-row no-gutters>
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
        </v-row>

        <v-row no-gutters>
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
        </v-row>

      </v-col>

      <!-- skills -->
      <v-col :cols="12" :sm="6" :md="3">
        <v-row no-gutters>
          <v-col :cols="12" class="pa-1">
          <v-card style="height: 612px;">
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
        </v-row>
      </v-col>

      <!-- actions, gear, feats, spells, ... -->
      <v-col :cols="12" :sm="12" :md="6" class="pa-1 ">
        <v-card>

          <v-tabs centered grow color="red">

            <!--  DNDBYOND
              Actions
                All, Attack, Action, Bonus Action, Reaction, Others, Limited Use
              Equipment
                All, Inventory, Attunement, Other Possessions
              Features & Traits
                All, Class, Race, Feats
              Description
                All, Background, Characteritics, Apperance
              Notes
                All, Orgs, Enemies, Backstory, other
              Extras
                Creatures na Vehicles
            -->

            <!-- W&G

              Actions
                All, Weapon, Powers, Other

              Wargear
                All, Weapons, Armour, Gear, Other Possessions

              Abilities & Traits
                All, Race, Archetype, Talents, Other

              Psychic Powers
                All, <Disciplines>

              Description
                All, (Background), Languages, Objectives, Keywords,

            -->

            <v-tab class="caption" key="actions" :href="`#tab-actions`">Weapons</v-tab>
            <v-tab class="caption" key="wargear" :href="`#tab-wargear`">Wargear</v-tab>
            <v-tab class="caption" key="abilities-talents" :href="`#tab-abilities-talents`">Abilities</v-tab>
            <v-tab class="caption" key="psychic-powers" :href="`#tab-psychic-powers`" v-if="psychicPowers.length > 0">Powers</v-tab>
            <v-tab class="caption" key="objectives" :href="`#tab-objectives`">Description</v-tab>

            <!-- actions (all, weapons, powers, other) -->
            <v-tab-item
              class="my-tab-item"
              key="actions"
              :value="`tab-actions`"
            >
              <div class="pa-2">
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
                        <span v-if="item.meta && item.meta.length > 0 && item.meta[0].range > 1">{{ item.meta[0].range }} m</span>
                        <span v-if="item.meta && item.meta.length > 0 && item.meta[0].range === 1">melee</span>
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
                      <td class="text-left pa-1 small">
                        <span v-if="item.meta && item.meta.length > 0 && item.meta[0].traits && item.meta[0].traits.length >0">{{ item.meta[0].traits.join(', ') }}</span>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
                <div class="mt-4">
                  <p
                    v-for="trait in weaponsTraitSet"
                    v-if="traitByName(trait)"
                    :key="trait"
                    class="body-2 mb-2 caption"
                  >
                    <strong>{{ traitByName(trait).name }}: </strong>
                    <span v-if="traitByName(trait).crunch">{{ traitByName(trait).crunch }}</span>
                    <span v-else>{{ traitByName(trait).description }}</span>
                  </p>
                </div>
              </div>
            </v-tab-item>

            <!-- wargear (All, Weapons, Armour, Gear, Other Possessions) -->
            <v-tab-item
              class="my-tab-item"
              key="wargear"
              :value="`tab-wargear`"
            >
              <div class="pa-2 pt-1 pb-1">
                <div v-for="gearItem in wargear.filter((w)=>!['Ranged Weapon','Melee Weapon'].includes(w.type))" :key="gearItem.name" class="caption">
                  <div v-if="gearItem.variant" style="display: inline;">
                    <strong >{{ gearItem.variant }}</strong>
                    <span> ({{ gearItem.name }})</span>
                  </div>
                  <strong v-else>{{ gearItem.name }}</strong>
                  <em v-if="gearItem.type"> • {{gearItem.type}}</em>
                  <span v-if="gearItem.source">
                    <em v-if="gearItem.source.key"> • {{ gearItem.source.key }}</em><em v-if="!isNaN(gearItem.source.page)">, pg. {{ gearItem.source.page }}</em>
                  </span>

                  <p class="mb-1">{{ gearItem.snippet ? gearItem.snippet : gearItem.description }}</p>

                  <div
                    v-if="gearItem.meta !== undefined && gearItem.meta.length > 0 && ['armour'].includes(gearItem.meta[0].type)"
                  >
                    <p
                      class="ml-3 mt-1 mb-2"
                      v-for="trait in gearItem.meta[0].traits"
                      v-if="traitByName(trait, true)"
                      :key="trait"
                    >
                      <strong>{{ trait }}: </strong>
                      {{ traitByName(trait, true).effect }}
                    </p>
                  </div>

                </div>

              </div>
            </v-tab-item>

            <!-- abilities (All, Race, Archetype, Talents, Other) -->
            <v-tab-item
              class="my-tab-item"
              key="abilities-talents"
              :value="`tab-abilities-talents`"
            >
              <div class="pa-2">

                <v-chip-group mandatory active-class="red--text" v-model="abilitySection.selection">
                  <v-chip
                    label
                    small
                    v-for="item in [`All`,`Species`, `Archetype`, `Talents`, `Other`]"
                    :key="item.toLowerCase()"
                    :value="item.toLowerCase()"
                  >
                    {{item}}
                  </v-chip>
                </v-chip-group>

                <div style="height: 505px; overflow-y: auto;">

                  <!-- species < abilities -->
                  <div v-show="abilitySection.selection === 'species' || (abilitySection.selection === 'all' && speciesAbilities.length > 0 )">
                    <div class="mb-1" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
                      <span class="body-2 red--text">Species</span>
                    </div>
                    <div v-for="ability in speciesAbilities" :key="ability.name" class="caption mb-2">
                      <strong>{{ ability.name }}</strong><em v-if="ability.source"> • {{ ability.source }}</em>
                      <div v-html="computeFormatedText(ability.effect)" />
                      <div v-if="ability.selectedOption" class="ml-1 pl-2" style="border-left: solid 3px lightgrey;">
                        <strong>{{ ability.selectedOption.name }}</strong>
                        <p>{{ability.selectedOption.effect}}</p>
                      </div>
                    </div>
                    <div v-if="speciesAbilities.length === 0" align="center" class="mt-2 mb-2">
                      <em>No abilities? Human eh?</em>
                    </div>
                  </div>

                  <!-- archetype < abilities -->
                  <div v-show="['all', 'archetype'].some(i=>i===abilitySection.selection)">
                    <div class="mb-1" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
                      <span class="body-2 red--text">Archetype</span>
                    </div>
                    <div v-for="ability in archetypeAbilities" :key="ability.name" class="caption">
                      <strong>{{ ability.name }}</strong><em v-if="ability.source"> • {{ ability.source }}</em>
                      <p v-html="computeFormatedText(ability.effect)" />
                    </div>
                  </div>

                  <!-- talents < abilities -->
                  <div v-show="['all', 'talents'].some(i=>i===abilitySection.selection)" >
                    <div class="mb-1" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
                      <span class="body-2 red--text">Talents</span>
                    </div>
                    <div v-if="talents.length > 0" v-for="talent in talents" :key="talent.name" class="caption">
                      <strong>{{ talent.name }}</strong><em> • Talent</em>
                      <p v-html="computeFormatedText(talent.description)" />
                    </div>
                    <div v-if="talents.length === 0" align="center" class="mt-2 mb-2">
                      <em>Knowledge is treason.</em>
                    </div>
                  </div>

                  <!-- talents (with faith) < abilities -->
                  <div v-if="false" v-show="['all', 'faith'].some(i=>i===abilitySection.selection)">
                    <div class="mb-1" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12); display: flex;">
                      <span class="body-2 red--text" style="flex: 1;">Faith</span>
                    </div>
                    <div v-if="talentsForFaith.length > 0" v-for="talent in talentsForFaith" :key="talent.name" class="caption">
                      <strong>{{ talent.name }}</strong><em> • Talent</em>
                      <p v-html="computeFormatedText(talent.description)" />
                    </div>
                    <div v-if="talentsForFaith.length === 0" align="center" class="mt-2 mb-2">
                      <em>The heretic does not live the imperial creed.</em>
                    </div>
                  </div>

                  <!-- other < abilities -->
                  <div v-show="['all', 'other'].some(i=>i===abilitySection.selection)">
                    <div class="mb-1" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
                      <span class="body-2 red--text">Other</span>
                    </div>
                    <div v-for="ability in otherAbilities" :key="ability.name" class="caption">
                      <strong>{{ ability.name }}</strong><em v-if="ability.source"> • {{ ability.source }}</em>
                      <p v-html="computeFormatedText(ability.effect)" />
                    </div>
                  </div>

                </div>

              </div>

            </v-tab-item>

            <!-- powers -->
            <v-tab-item
              class="my-tab-item"
              key="psychic-powers"
              :value="`tab-psychic-powers`"
            >
              <div class="pa-2">
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
              </div>
            </v-tab-item>

            <!-- objectives -->
            <v-tab-item
              class="my-tab-item"
              key="objectives"
              :value="`tab-objectives`"
            >
              <div class="pa-2">

                <v-chip-group mandatory active-class="red--text" v-model="descriptionSection.selection">
                  <v-chip
                    label
                    small
                    v-for="item in [`All`,`Objectives`,`Languages`,`Keywords`]"
                    :key="item.toLowerCase()"
                    :value="item.toLowerCase()"
                  >
                    {{item}}
                  </v-chip>
                </v-chip-group>

                <div style="height: 505px; overflow-y: auto;">

                  <!-- objectives < description -->
                  <div v-show="['all', 'objectives'].some(i=>i===descriptionSection.selection)">
                    <div class="mb-1" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
                      <span class="body-2 red--text">Objectives</span>
                      <v-icon small v-if="false" @click="objectiveEditorOpen">edit</v-icon>
                    </div>
                    <div
                      v-for="(objective, index) in objectives"
                      :key="objective.name"
                      class="pl-2 pr-2 pt-1 pb-1 caption"
                    >
                      <strong>{{ index+1 }}:</strong> {{ objective.text }}
                    </div>
                    <div v-if="false">
                      <span class="caption" @click="objectiveEditorOpen">+ Add/edit objectives</span>
                    </div>
                    <div style="display: flex;" justify="center" align v-if="objectiveEditorShow">
                      <v-textarea
                        flat
                        single-lined
                        dense
                        v-model="objectiveEditorValue"
                      ></v-textarea>
                    </div>
                  </div>

                  <!-- languages < description -->
                  <div v-show="['all', 'languages'].some(i=>i===descriptionSection.selection)">
                    <div class="mb-2" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
                      <span class="body-2 red--text">Languages</span>
                    </div>
                    <div
                      v-if="languages.length > 0"
                      class="caption"
                    >
                      {{ languages.map((l)=>l.name).join(' • ') }}
                    </div>
                  </div>

                  <!-- keywords < description -->
                  <div v-show="['all', 'keywords'].some(i=>i===descriptionSection.selection)">
                    <div class="mb-2" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
                      <span class="body-2 red--text">Keywords</span>
                    </div>
                    <div
                      v-for="keyword in keywords"
                      :key="keyword"
                      class="caption"
                    >
                      <strong>{{ keyword }}</strong>
                      <em> • {{ keywordCombinedRepository.find(i=>i.name===keyword) && keywordCombinedRepository.find(i=>i.name===keyword).type }}</em>
                      <p>
                        {{ keywordCombinedRepository.find(i=>i.name===keyword) && keywordCombinedRepository.find(i=>i.name===keyword).description }}
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              <v-row v-if="false" no-gutters>
                <v-col :cols="6" class="pa-1">
                  <v-card height="100%" class="flexcard">
                    <v-card-text>
                      <p class="caption">
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
                  </v-card>
                </v-col>

                <v-col :cols="6" class="pa-1">
                  <v-card height="100%" class="flexcard">
                    <v-card-text>
                      <p class="caption">
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
              </v-row>

            </v-tab-item>

          </v-tabs>

        </v-card>

      </v-col>

    </v-row>

  </div>

</template>

<script lang="js">
import BackgroundRepositoryMixin from '~/mixins/BackgroundRepositoryMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import SluggerMixin from '~/mixins/SluggerMixin';
import WargearTraitRepositoryMixin from '~/mixins/WargearTraitRepositoryMixin';
import KeywordRepository from '~/mixins/KeywordRepositoryMixin';

export default {
  name: 'in-app-view',
  //layout: '',
  mixins: [
    BackgroundRepositoryMixin,
    StatRepositoryMixin,
    SluggerMixin,
    WargearTraitRepositoryMixin,
    KeywordRepository,
  ],
  props: [],
  async asyncData({ params, $axios }) {
    const config = {
      params: { source: 'core,coreab,pax', },
    };
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
      breadcrumbItems: [
        { text: '', nuxt: true, exact: true, to: '/',
        },
        { text: 'Forge', nuxt: true, exact: true, to: '/forge/my-characters',
        },
        { text: 'Character', nuxt: true, exact: true, to: `/forge/characters/${params.id}`,
        },
      ],
    };
  },
  data() {
    return {
      objectiveEditorShow: false,
      objectiveEditorValue: '',
      attributeHeaders: [
        { text: 'Attribute', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'Rating', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Adjusted', sortable: false, align: 'center', class: 'small pa-1' },
      ],
      traitHeaders: [
        { text: 'Trait', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'Rating', sortable: false, align: 'center', class: 'small pa-1' },
      ],
      skillHeaders: [
        { text: 'Skill', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'Rating', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Att', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Total', sortable: false, align: 'center', class: 'small pa-1' },
      ],
      weaponHeaders: [
        { text: 'Name', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'Range', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Damage', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'AP', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Salvo', sortable: false, align: 'center', class: 'small pa-1' },
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
      descriptionSection: { selection: 'all' },
      abilitySection: { filter: 'all' },
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
    campaignCustomXp() {
      return this.$store.getters['characters/characterCampaignCustomXpById'](this.characterId);
    },

    speciesKey() {
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    speciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.characterId);
    },
    speciesAstartesChapter() {
      let chapter = this.$store.getters['characters/characterSpeciesAstartesChapterById'](this.characterId);
      if ( chapter && chapter.includes(' ') ) { // its an old chapter name, using CORE
        chapter = `core ${chapter}`.toLowerCase().replace(/\W/gm, '-');
      }
      return chapter;
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
    avatar() {
      const customAvatarUrl = this.$store.getters['characters/characterAvatarUrlById'](this.characterId);

      if ( customAvatarUrl ) {
        return customAvatarUrl;
      }

      if (this.archetypeKey !== undefined && !['Ratling', 'Ogryn'].includes(this.speciesLabel)) {
        return `/img/avatars/archetype/${this.archetypeKey}.png`;
      }

      if (this.speciesKey !== undefined) {
        return `/img/avatars/species/${this.speciesKey}.png`;
      }

      return '/img/avatars/species/core-human.png';
    },

    characterAttributesEnhanced() {
      let enhancedAttributes = this.$store.getters['characters/characterAttributesEnhancedById'](this.characterId);
      // enrich with (equipped) gear
      if ( this.armour ) {
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
      const finalTraits = this.traitRepository.map((t) => ({
        ...t,
        value: traits[t.key],
        enhancedValue: traitsEnhanced[t.key],
      }));
      return finalTraits;
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

    speciesAbilities(){
      const abilities = [];

      if (this.characterSpecies !== undefined && this.characterSpecies.speciesFeatures) {

          this.characterSpecies.speciesFeatures.forEach( (speciesTrait) => {
            // Honour the Chapter
            if (speciesTrait.name === 'Honour the Chapter') {
              const chapter = this.astartesChapterRepository.find((a) => a.key === this.speciesAstartesChapter) || [];
              const traditions = chapter.beliefsAndTraditions;
              if (traditions !== undefined) {
                traditions.forEach((t) => {
                  const tradition = {
                    name: t.name,
                    effect: t.effect,
                    source: chapter.name,
                  };
                  abilities.push(tradition);
                });
              }
            } else {
            // other abilities
              const ability = {
                name: speciesTrait.name,
                effect: speciesTrait.snippet ? speciesTrait.snippet : speciesTrait.description,
                source: this.speciesLabel,
                hint: this.speciesLabel,
              };
              if ( speciesTrait.options ) {
                const traitSelection = this.enhancements.find( (e) => e.source.startsWith(`species.${speciesTrait.name}.`));
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

      return abilities;
    },
    archetypeAbilities() {
      const abilities = [];
      const archetype = this.characterArchetype;

      if (archetype && archetype.archetypeFeatures) {
        archetype.archetypeFeatures.forEach( (item) => {
          const ability = {
            name: item.name,
            effect: item.snippet ? item.snippet : item.description,
            source: archetype.label,
            source: archetype.label,
            hint: archetype.label,
          };
          abilities.push(ability);
        });
      }
      return abilities;
    },

    otherAbilities() {
      const abilities = [];

      // keyword abilities
      this.keywords.forEach( k => {
        const keyword = this.keywordCombinedRepository.find( i => i.name === k );
        if ( keyword === undefined ) {
          console.warn(`Now keyword found for ${k}`);
        } else if ( keyword.effect ) {
          const keywordAbility = {
            name: keyword.effectLabel ? keyword.effectLabel : keyword.name,
            effect: keyword.effect,
            source: keyword.effectLabel ? `${keyword.name} Keyword` : `${keyword.type} Keyword`,
          };
          abilities.push(keywordAbility);
        }
      });

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
        this.customAbilities.filter( (a) => a.source && !a.source.startsWith('species.') ).forEach((item) => {
          const ability = {
            name: item.name,
            effect: item.effect,
          };
          abilities.push(ability);
        });
      }

      return abilities;
    },
    abilities() {
      const abilities = [
        ...this.speciesAbilities,
        ...this.archetypeAbilities,
        ...this.otherAbilities
      ];

      return abilities;
    },
    customAbilities() {
      return this.enhancements ? this.enhancements.filter( (i) => i.targetGroup === 'abilities' ) : [];
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
    talentsForFaith() {
      if ( this.talents.length > 0 ) {
        return this.talents.filter( talent => talent.tags.some( t => t === 'Faith' ) );
      }
      return [];
    },
    wargear() {
      const chargear = this.$store.getters['characters/characterWargearById'](this.characterId);
      const wargear = [];
      chargear.forEach((gear) => {
        console.log(`Searching for [${gear.name}] in repository...`);
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
      return this.wargear.filter((w) => !['Armour', 'Ranged Weapon', 'Melee Weapon'].includes(w.type));
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
    objectiveEditorOpen() {
      this.objectiveEditorValue = this.objectives.map((o) => o.text).join('\r\n');
      this.objectiveEditorShow = true;
    },
    addObjective(value) {
      console.info(`Add new objective: ${value}`);
      this.objectiveEditorShow = false;
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
    traitByName(name, withParanteris) {
      if ( withParanteris ) {
        // weaponsTraitSet = weaponsTraitSet.map((t) => t.split(/ ?\(/)[0]);
        name = name.split(/ ?\(/)[0];
      }
      // return this.combinedTraitsRepository.find( item => item.name.indexOf(prefix) >= 0);
      return this.wargearTraitRepository.find((item) => item.name === name);
    },
    computeSkillPool(skill) {
      const attribute = this.attributes.find((a) => a.name === skill.attribute);
      return attribute.enhancedValue + skill.enhancedValue;
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

<style scoped lang="scss">

  .page-title {
  }

  .small {
    height: 24px;
  }

  td.small {
    font-size: 12px;
  }

  .my-tabs-container {
    height: 620px;
    overflow: hidden;
  }

  .my-tab-item {
    height: 564px;
    overflow-y: auto;
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
