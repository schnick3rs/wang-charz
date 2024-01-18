<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <div>

    <!-- Keyword editor -->
    <v-dialog
      v-model="keywordsEditorDialog"
      width="600px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-form ref="keywordForm" v-model="keywordFormValid">
        <v-card>
          <v-card-title style="background-color: #262e37; color: #fff;">
            Edit Custom Keyword
            <v-spacer />
            <v-icon dark @click="closeKeywordsSettings">close</v-icon>
          </v-card-title>
          <v-card-text class="pt-4">

            <v-text-field
              label="Keyword Name"
              v-model="customKeyword.name"
              dense required
              class="mb-4"
              :rules="[v => !!v || 'A name is required']"
            ></v-text-field>

            <v-textarea
              label="Description"
              v-model="customKeyword.description"
              dense
              class="mb-2"
              :required="!keywordCombinedRepository.find(k=>k.name===customKeyword.name)"
              :disabled="keywordCombinedRepository.find(k=>k.name===customKeyword.name)"
            ></v-textarea>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer />
            <v-btn small right color="success" @click="saveCustomKeyword" :disabled="!keywordFormValid">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <!-- Custom Skills -->
    <v-dialog
      v-model="skillsEditorDialog"
      width="600px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <v-card-title style="background-color: #262e37; color: #fff;">
          Edit Custom Skill
          <v-spacer />
          <v-icon dark @click="closeSkillsSettings">close</v-icon>
        </v-card-title>
        <v-card-text class="pt-4">
          <v-text-field v-model="customSkill.name" dense label="Skill Name"></v-text-field>
          <v-select
            v-model="customSkill.attribute"
            :items="attributeRepository"
            item-value="name" item-text="name"
            dense label="Accosiated Attribute"
          ></v-select>
          <v-textarea v-model="customSkill.description" dense label="Description"></v-textarea>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer />
          <v-btn small right color="success" @click="saveCustomSkill">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Corruption -->
    <v-dialog
      v-model="showCorruptionManagerDialog"
      width="800px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <dod-corruption-manager
        :id="characterId"
        :corruption="traits.find((t)=>t.key==='corruption').adjustedRating"
        :modifiers="characterEnhancements.filter((e) => e.targetValue === 'corruption')"
        @cancel="showCorruptionManagerDialog = false"
      ></dod-corruption-manager>
    </v-dialog>

    <!-- Wealth -->
    <v-dialog
        v-model="showContextDialog"
        width="800px"
        scrollable
        :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <component
            v-if="contextDialogComponent"
            :is="contextDialogComponent"
            :character-id="characterId"
            :character-traits="traits"
            :character-modifiers="characterEnhancements"
            :trait-key="contextDialogTraitKey"
            @cancel="hideContextDialog"
        ></component>
      </v-card>
    </v-dialog>

    <dod-default-breadcrumbs :items="breadcrumbItems" />

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
          <v-col :cols="12" class="caption">{{ [ archetypeLabel, speciesLabel ].join(' • ')  }}</v-col>
          <v-col :cols="12" class="caption">
            <span>{{ [ `Tier ${characterSettingTier}`, `Rank ${characterRank}`, `${campaignCustomXp} XP`].join(' • ') }}</span>
          </v-col>
          <v-col :cols="12" class="caption">
            <v-progress-linear :value="campaignCustomXp" height="2" color="red"></v-progress-linear>
          </v-col>
          <v-col :cols="12" class="caption text--keyword" align="center">{{ keywordStrings.join(' • ') }}</v-col>
        </v-row>
      </v-col>

      <!-- actions -->
      <v-col :cols="12" :sm="4" :md="5" align="right">
        <v-btn small outlined color="success" v-if="false">share</v-btn>
        <v-btn small outlined color="success" v-if="false">campaign</v-btn>
        <v-btn small outlined color="primary" v-if="false">
          <v-icon left small>group</v-icon> Regroup
        </v-btn>
        <v-btn
          color="primary"
          outlined small
          @click="doRespite"
        >
          <v-icon left small>fireplace</v-icon>
          Respite
        </v-btn>
        <v-btn
          nuxt :to="`/forge/characters/${characterId}/builder/print`"
          color="success"
          target="_blank"
          outlined small
        >
          <v-icon left small>print</v-icon>
          Print
        </v-btn>
        <v-btn
          nuxt :to="`/forge/characters/${characterId}/builder/setting`"
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
      <v-col :cols="12" :sm="6" :md="6" :lg="3" >

        <v-row no-gutters>
         <v-col :cols="12" class="pa-1">
          <v-card>
            <v-card-title style="background-color: hsl(4, 90%, 58%); color: #fff;" class="body-1 pt-1 pb-1">
              <h2 class="subtitle-1">Attributes</h2>
            </v-card-title>

            <v-simple-table dense>
              <thead>
                <tr>
                  <th v-for="header in attributeHeaders" :class="header.class">
                    {{ header.text }}
                  </th>
                </tr>
              </thead>
              <tbody>
              <tr v-for="item in attributes" :key="item.key">
                <td class="text-left pa-1 small">{{ item.name }}</td>
                <td class="text-center pa-1 small">{{ item.rating }}</td>
                <td class="text-center pa-1 small">{{ item.adjustedRating }}</td>
                <td class="text-center pa-1 small">
                  <v-tooltip bottom v-if="item.modifiers.length > 0">
                    <template v-slot:activator="{ on }">
                      <v-avatar
                        :color="valueHintColor(item)"
                        size="12"
                        v-on="on"
                      >
                        <v-icon dark small>{{valueHintIcon(item)}}</v-icon>
                      </v-avatar>
                    </template>
                    <div v-for="(modifier, index) in item.modifiers" :key="index">{{modifier}}</div>
                  </v-tooltip>
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
            <v-card-title style="background-color: hsl(4, 90%, 58%); color: #fff;" class="body-1 pt-1 pb-1">
              <h2 class="subtitle-1">Traits</h2>
            </v-card-title>

            <v-simple-table
              :headers="traitHeaders"
              :items="groupedTraits"
              dense
            >
              <tbody>
                <tr v-for="item in groupedTraits">
                  <td class="text-left pa-1 small">
                    <span>
                      {{ item.name }}
                    </span>
                    <span v-if="['Corruption'].includes(item.name)">
                      <v-btn x-small icon @click="showCorruptionManagerDialog = true">
                        <v-hover>
                          <v-icon
                            slot-scope="{ hover }"
                            :color="`${ hover ? 'primary' : '' }`"
                          >settings</v-icon>
                        </v-hover>
                      </v-btn>
                    </span>
                    <span v-if="['Wealth', 'Influence'].includes(item.name)">
                      <v-btn x-small icon @click="showContext(item.key)">
                        <v-hover>
                          <v-icon
                              slot-scope="{ hover }"
                              :color="`${ hover ? 'primary' : '' }`"
                          >settings</v-icon>
                        </v-hover>
                      </v-btn>
                    </span>
                    <div v-if="['Wealth','Max Shock','Max Wounds'].includes(item.name)" style="float: right;">
                      <div style="flex-wrap: wrap; display: flex;" v-if="item.adjustedRating > 0">
                          <div
                            v-for="pointIndex in item.adjustedRating"
                            class="resource-box"
                            :class="{ 'resource-box--filled': pointIndex <= item.spend }"
                            @click="toggleResource(item, pointIndex)"
                          ></div>
                        </div>
                    </div>
                  </td>
                  <td class="text-center pa-1 small">
                    {{ item.adjustedRating }}<span v-if="item.alternativeRating">/{{ item.alternativeRating }}</span><span v-if="item.conditionalAdjustment !== 0">/{{ item.adjustedRating+item.conditionalAdjustment }}</span>
                  </td>
                  <td>
                    <!-- each modifier contains the BASE of the compution, thus we begin at > 1 -->
                    <v-tooltip bottom v-if="item.modifiers.length > 0 || item.alternativeRating">
                      <template v-slot:activator="{ on }">
                        <v-avatar
                          :color="valueHintColor(item)"
                          size="12"
                          v-on="on"
                        >
                          <v-icon dark small>{{valueHintIcon(item)}}</v-icon>
                        </v-avatar>
                      </template>
                      <div>{{item.baseHelp}}</div>
                      <div v-for="modifier in item.modifiers.filter((m) => m.condition === null)">
                        {{modifier.valueString}} • {{modifier.provider}} ({{modifier.category}})
                      </div>
                      <div v-if="item.modifiers.find((m) => m.condition !== null)">
                        <div><strong>Conditional modifiers:</strong></div>
                        <div v-for="modifier in item.modifiers.filter((m) => m.condition !== null)">
                          {{modifier.valueString}} {{modifier.condition}} • {{modifier.provider}} ({{modifier.category}})
                        </div>
                      </div>
                    </v-tooltip>
                  </td>
                </tr>
              </tbody>

            </v-simple-table>

          </v-card>
        </v-col>
        </v-row>

      </v-col>

      <!-- skills -->
      <v-col :cols="12" :sm="6" :md="6" :lg="3">
        <v-row no-gutters>
          <v-col :cols="12" class="pa-1">
          <v-card style="height: 755px; display: flex; flex-flow: column;">
            <v-card-title style="background-color: hsl(4, 90%, 58%); color: #fff;" class="body-1 pt-1 pb-1">
              <h2 class="subtitle-1">Skills</h2>
            </v-card-title>

            <v-simple-table
              dense
              style="overflow-y: auto"
            >
              <thead>
              <tr>
                <th v-for="header in skillHeaders" :class="header.class">
                  {{ header.text }}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in skills">
                <td class="text-left pa-1 small">
                  {{ item.name }}
                  <span v-if="item.custom">
                    <v-hover>
                      <v-icon
                        small
                        @click="removeCustomSkill(item.key)"
                        slot-scope="{ hover }"
                        :color="`${ hover ? 'error' : '' }`"
                      >delete</v-icon>
                    </v-hover>
                  </span>
                </td>
                <td class="text-center pa-1 small">
                  {{ item.value }}
                </td>
                <td class="text-center pa-1 small">
                  <span v-if="item.attribute">
                    {{ item.attribute.substring(0,3) }}
                  </span>
                </td>
                <td class="text-center pa-1 small">
                  {{ computeSkillPool(item) }}<span v-if="item.conditionalAdjustment !== 0">/{{ computeSkillPool(item)+item.conditionalAdjustment }}</span>
                </td>
                <td class="text-center pa-1 small">
                  <v-tooltip bottom v-if="item.modifiers.length > 0">
                    <template v-slot:activator="{ on }">
                      <v-avatar
                        :color="valueHintColor(item)"
                        size="12"
                        v-on="on"
                      >
                        <v-icon dark small>{{valueHintIcon(item)}}</v-icon>
                      </v-avatar>
                    </template>
                    <div>Pool {{ item.rating + item.adjustedAttributeValue }} = Skill ({{item.rating}}) + {{item.attributeObject.name}} ({{item.attributeObject.adjustedRating}})</div>
                    <div v-for="modifier in item.modifiers.filter((m) => m.condition === null)">
                      {{modifier.valueString}} • {{modifier.provider}} ({{modifier.category}})
                    </div>
                    <div v-if="item.modifiers.find((m) => m.condition !== null)">
                      <div><strong>Conditional modifiers:</strong></div>
                      <div v-for="modifier in item.modifiers.filter((m) => m.condition !== null)">
                        {{modifier.valueString}} {{modifier.condition}} • {{modifier.provider}} ({{modifier.category}})
                      </div>
                    </div>
                  </v-tooltip>
                </td>
              </tr>
              </tbody>
            </v-simple-table>

            <v-spacer></v-spacer>

            <v-card-actions style="justify-content: center;">
              <v-btn x-small text @click="openSkillsSettings">Additional Skill <v-icon small>settings</v-icon></v-btn>
            </v-card-actions>

            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- actions, gear, feats, spells, ... -->
      <v-col :cols="12" :sm="12" :md="12" :lg="6" class="pa-1 ">
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

            <v-tab class="caption" key="actions" :href="`#tab-actions`"><h2 class="subtitle-2">Weapons</h2></v-tab>
            <v-tab class="caption" key="wargear" :href="`#tab-wargear`"><h2 class="subtitle-2">Wargear</h2></v-tab>
            <v-tab class="caption" key="abilities-talents" :href="`#tab-abilities-talents`"><h2 class="subtitle-2">Abilities</h2></v-tab>
            <v-tab class="caption" key="psychic-powers" :href="`#tab-psychic-powers`" v-if="psychicPowers.length > 0"><h2 class="subtitle-2">Powers</h2></v-tab>
            <v-tab class="caption" key="objectives" :href="`#tab-objectives`"><h2 class="subtitle-2">Description</h2></v-tab>

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
                    <tr
                        v-if="item.meta"
                        v-for="(meta, metaIndex) in item.meta.filter(m => m.type.indexOf('-weapon') > 0)"
                        :key="`${item.name}-${metaIndex}`"
                    >

                      <td class="text-left pa-1 small">
                        {{ item.name }}
                        <template v-if="item.meta.length > 1">
                          <span v-if="meta.type === 'melee-weapon'">(Melee)</span>
                          <span v-else-if="meta.type === 'ranged-weapon'">(Ranged)</span>
                        </template>
                      </td>

                      <td class="text-center pa-1 small">
                        <span v-if="meta.range > 4">
                          {{ meta.range/2 }} | {{ meta.range }} | {{ meta.range*1.5 }}
                        </span>
                        <span v-else-if="meta.range > 1">{{ meta.range }} m</span>
                        <span v-if="meta.range === 1">melee</span>
                        <span v-if="isNaN(meta.range) && meta.range.startsWith('STRx')">{{meta.range}}</span>
                      </td>

                      <td class="text-center pa-1 small">
                        <div v-if="meta.damage">
                          <div v-if="meta.damage.static === '*'">*</div>
                          <div v-else>
                            <span v-if="meta.type==='melee-weapon'">{{ meta.damage.static + attributes.find((a)=>a.key==='strength').adjustedRating }}*</span>
                            <span v-else>{{ meta.damage.static }}</span>
                            <span> + </span>
                            <span>{{ meta.damage.ed }} ED</span>
                          </div>
                        </div>
                      </td>

                      <td class="text-center pa-1 small">
                        <span>{{ meta.ap }}</span>
                      </td>

                      <td class="text-center pa-1 small">
                        <span>{{ isNaN(meta.salvo) ? '-' : meta.salvo }}</span>
                      </td>

                      <td class="text-left pa-1 small">
                        <span v-if="meta.traits && meta.traits.length >0">{{ meta.traits.join(', ') }}</span>
                        <span v-else>-</span>
                      </td>

                    </tr>
                  </template>
                </v-data-table>

                <div class="mb-1 mt-2">
                  <span class="body-2 red--text">Reloads:</span>
                  <span class="body-2">{{ characterReloads.points - characterReloads.spend }} remaining.</span>
                  <div class="pl-2" style="flex-wrap: wrap; display: flex;" v-if="characterReloads.points > 0">
                    <v-btn
                      text icon
                      v-for="pointIndex in characterReloads.points"
                      :key="pointIndex"
                      @click="toggleResourceReloads(pointIndex)"
                    >
                      <v-icon color="error" v-if="pointIndex <= characterReloads.spend">signal_cellular_no_sim</v-icon>
                      <v-icon color="primary" v-else>sd_storage</v-icon>
                    </v-btn>
                  </div>
                </div>

                <div class="mt-4">
                  <div
                    v-for="trait in weaponsTraitSet"
                    v-if="traitByName(trait)"
                    :key="trait"
                    class="body-2 mb-2 caption"
                  >
                    <p v-if="traitByName(trait).crunch">
                      <strong>{{ traitByName(trait).name }}: </strong> {{ traitByName(trait).crunch }}
                    </p>
                    <p v-else>{{ traitByName(trait).description }}</p>
                  </div>
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
                <div v-for="gearItem in wargear" :key="gearItem.id" class="caption mb-2">
                  <div v-if="gearItem.variant" style="display: inline;">
                    <strong >{{ gearItem.variant }}</strong>
                    <span> ({{ gearItem.name }})</span>
                  </div>
                  <strong v-else>{{ gearItem.name }}</strong>
                  <em v-if="gearItem.type"> • {{gearItem.type}}</em>
                  <span v-if="gearItem.source">
                    <em v-if="gearItem.source.key"> • {{ gearItem.source.key }}</em><em v-if="!isNaN(gearItem.source.page)">, pg. {{ gearItem.source.page }}</em>
                  </span>

                  <p class="mb-1" v-if="gearItem.snippet">{{ gearItem.snippet }}</p>
                  <div class="mb-1" v-else v-html="gearItem.description"></div>

                  <div
                    v-if="gearItem.meta !== undefined && gearItem.meta.length > 0 && ['armour'].includes(gearItem.meta[0].type)"
                  >
                    <p
                      class="ml-1 pl-2 mb-1" style="border-left: solid 3px lightgrey;"
                      v-for="trait in gearItem.meta[0].traits"
                      v-if="traitByName(trait, true)"
                      :key="trait"
                    >
                      <strong>{{ trait }}: </strong>
                      {{ traitByName(trait, true).crunch }}
                    </p>
                  </div>

                </div>

              </div>
            </v-tab-item>

            <!-- abilities (All, Race, Archetype, Talents, Faith?, Other) -->
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
                    v-for="item in [`All`,`Species`, `Archetype`, `Ascension`, `Talents`, `Other`]"
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

                      <div
                          v-if="ability.selectedOptions"
                          v-for="selectedOption in ability.selectedOptions"
                          class="ml-1 pl-2"
                          style="border-left: solid 3px lightgrey;"
                      >
                        <strong>{{ selectedOption.name }}</strong>
                        <div v-if="selectedOption.snippet"><p class="mb-1" v-html="computeFormatedText(selectedOption.snippet)"></p></div>
                        <div v-else v-html="computeFormatedText(selectedOption.description)"></div>
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

                    <div v-for="ability in archetypeAbilities" :key="ability.name" class="caption mb-2">

                      <strong>{{ ability.name }}</strong>
                      <em v-if="ability.source"> • {{ ability.source }}</em>

                      <div v-if="ability.snippet"><p class="mb-1" v-html="computeFormatedText(ability.snippet)"></p></div>
                      <div v-else v-html="computeFormatedText(ability.description)"></div>

                      <div
                        v-if="ability.selectedOptions"
                        v-for="selectedOption in ability.selectedOptions"
                        class="ml-1 pl-2"
                        style="border-left: solid 3px lightgrey;"
                      >
                        <strong>{{ selectedOption.name }}</strong>
                        <div v-if="selectedOption.snippet"><p class="mb-1" v-html="computeFormatedText(selectedOption.snippet)"></p></div>
                        <div v-else v-html="computeFormatedText(selectedOption.description)"></div>
                      </div>

                    </div>
                  </div>

                  <!-- Ascensions < abilities (Background, Other) -->
                  <div v-show="abilitySection.selection === 'ascension' || (abilitySection.selection === 'all' && ascensionAbilities.length > 0 )">

                    <div class="mb-1" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
                      <span class="body-2 red--text">Ascension</span>
                    </div>

                    <div v-for="ability in ascensionAbilities" :key="ability.name" class="caption mb-2">

                      <strong>{{ ability.name }}</strong>
                      <em v-if="ability.source"> • {{ ability.source }}</em>

                      <div v-if="ability.snippet"><p class="mb-1" v-html="computeFormatedText(ability.snippet)"></p></div>
                      <div v-else v-html="computeFormatedText(ability.description)"></div>

                      <div v-if="ability.selectedOption" class="ml-1 pl-2" style="border-left: solid 3px lightgrey;">
                        <strong v-if="ability.selectedOption.name">{{ ability.selectedOption.name }}</strong>
                        <div v-if="ability.selectedOption.snippet"><p class="mb-1" v-html="ability.selectedOption.snippet"></p></div>
                      </div>

                    </div>

                  </div>

                  <!-- talents < abilities -->
                  <div v-show="['all', 'talents'].some(i=>i===abilitySection.selection)" >

                    <div class="mb-1" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12); display: flex;">
                      <span class="body-2 red--text" style="flex: 1;">Talents</span>
                      <div style="flex-wrap: wrap; display: flex;" v-if="characterFaith.points > 0">
                        <div
                          v-for="pointIndex in characterFaith.points"
                          class="faith-box"
                          :class="{ 'faith-box--filled': pointIndex <= characterFaith.spend }"
                          @click="toggleResourceFaith(pointIndex)"
                        ></div>
                        <span class="caption ml-2">/ Faith Points</span>
                      </div>
                    </div>

                    <div v-if="talents.length > 0" v-for="talent in talents" :key="talent.name" class="caption mb-2">

                      <strong>{{ talent.name }}</strong>
                      <em> • Talent</em>
                      <span v-if="talent.source">
                        <em v-if="talent.source.key"> • {{ talent.source.key }}</em><em v-if="!isNaN(talent.source.page)">, pg. {{ talent.source.page }}</em>
                      </span>
                      <div v-if="talent.snippet"><p class="mb-1" v-html="computeFormatedText(talent.snippet)"></p></div>
                      <div v-else v-html="computeFormatedText(talent.description)"></div>

                      <div
                        v-if="talent.selectedOptions"
                        v-for="selectedOption in talent.selectedOptions"
                        class="ml-1 pl-2"
                        style="border-left: solid 3px lightgrey;"
                      >
                        <strong>{{ selectedOption.name }}</strong>
                        <div v-if="selectedOption.snippet"><p class="mb-1" v-html="computeFormatedText(selectedOption.snippet)"></p></div>
                        <div v-else v-html="computeFormatedText(selectedOption.description)"></div>
                      </div>

                      <div v-if="false" class="mt-1 mb-1 ml-1 pl-2" style="flex-wrap: wrap; display: flex; border-left: solid 3px lightgrey;" >
                        <div
                          v-for="pointIndex in characterFaith.points"
                          class="faith-box"
                          :class="{ 'faith-box--filled': pointIndex <= characterFaith.spend }"
                          @click="toggleResourceFaith(pointIndex)"
                        ></div>
                        <span class="caption ml-2">/ Faith Points</span>
                      </div>

                    </div>

                    <div v-if="talents.length === 0" align="center" class="mt-2 mb-2">
                      <em>Knowledge is treason.</em>
                    </div>
                  </div>

                  <!-- talents (with faith) < abilities -->
                  <div v-if="false" v-show="['all', 'faith'].some(i=>i===abilitySection.selection)" class="caption">
                    <div class="mb-1" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12); display: flex;">
                      <span class="body-2 red--text" style="flex: 1;">Faith</span>
                      <div style="flex-wrap: wrap; display: flex;">
                        <div
                          v-for="pointIndex in characterFaith.points"
                          class="faith-box"
                          :class="{ 'faith-box--filled': pointIndex <= characterFaith.spend }"
                          @click="toggleResourceFaith(pointIndex)"
                        ></div>
                        <span class="body-2 ml-2">Faith Points</span>
                      </div>
                    </div>
                    <div v-if="talentsForFaith.length > 0" v-for="talent in talentsForFaith" :key="talent.name" >
                      <strong>{{ talent.name }}</strong><em> • Talent</em>
                      <p v-html="computeFormatedText(talent.description)" />
                    </div>
                    <div v-if="talentsForFaith.length === 0" align="center" class="mt-2 mb-2">
                      <em>The heretic does not live the imperial creed.</em>
                    </div>
                  </div>

                  <!-- other < abilities (Ascensions, Background, Other) -->
                  <div v-show="abilitySection.selection === 'other' || (abilitySection.selection === 'all' && otherAbilities.length > 0 )">

                    <div class="mb-1" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
                      <span class="body-2 red--text">Other</span>
                    </div>

                    <div v-for="ability in otherAbilities" :key="`${ability.id ? ability.id : ability.name}`" class="caption mb-3">

                      <strong>{{ ability.name }}</strong>
                      <em v-if="ability.source"> • {{ ability.source }}</em>
                      <span v-if="ability.source === 'Mutation'">
                        <v-hover>
                          <v-icon
                            small
                            @click="removeMutation(ability.id)"
                            slot-scope="{ hover }"
                            :color="`${ hover ? 'error' : '' }`"
                          >delete</v-icon>
                        </v-hover>
                      </span>

                      <div v-if="ability.snippet"><p class="mb-1" v-html="computeFormatedText(ability.snippet)"></p></div>
                      <div v-else v-html="computeFormatedText(ability.description)"></div>

                      <div v-if="ability.selectedOption" class="ml-1 pl-2 mt-1" style="border-left: solid 3px lightgrey;">
                        <strong v-if="ability.selectedOption.name">{{ ability.selectedOption.name }}</strong>
                        <p v-if="ability.selectedOption.snippet">{{ability.selectedOption.snippet}}</p>
                      </div>

                      <div
                        v-if="ability.selectedOptions"
                        v-for="selectedOption in ability.selectedOptions"
                        class="ml-1 pl-2"
                        style="border-left: solid 3px lightgrey;"
                      >
                        <strong>{{ selectedOption.name }}</strong>
                        <div v-if="selectedOption.snippet"><p class="mb-1" v-html="computeFormatedText(selectedOption.snippet)"></p></div>
                        <div v-else v-html="computeFormatedText(selectedOption.description)"></div>
                      </div>

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
                  :items-per-page="-1"
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

              <!-- notes, bound, others -->
              <div class="pa-2" style="border-top: 1px solid rgba(0, 0, 0, 0.12);">
                <div class="caption mb-2">
                  <strong>Power Levels</strong><em> • core, pg. 260</em>
                  <div>You may cast <em>Bound</em>, <em>Unbound</em> or <em>Transcendent</em>.</div>
                </div>
                <div v-if="speciesKey && speciesKey.endsWith('aeldari')" class="caption mb-2">
                  <strong>Aeldari Psyker</strong><em> • core, pg. 282</em>
                  <div>If you trigger Perils of the Warp you must roll 2d6; the highest is always the ‘tens’ digit of the d66 roll, and the lower result is the units digit.</div>
                </div>
                <div v-if="speciesKey && speciesKey.endsWith('aeldari') && keywordStrings && keywordStrings.includes('Asuryani')" class="caption mb-2">
                  <strong>Asuryani Psyker</strong><em> • core, pg. 282</em>
                  <div>You may reroll a single Wrath Dice that rolled a Complication once per Test.</div>
                </div>
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
                    v-for="item in [`All`,`Objectives`,`Languages`,`Keywords`,`Notes`]"
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
                      :key="keyword.name"
                      class="caption"
                    >
                      <strong>{{ keyword.name }}</strong>
                      <em> • {{ keyword.type }}</em>
                      <span v-if="keyword.custom">
                        <v-hover>
                          <v-icon
                            small
                            @click="removeCustomKeyword(keyword.name)"
                            slot-scope="{ hover }"
                            :color="`${ hover ? 'error' : '' }`"
                          >delete</v-icon>
                        </v-hover>
                      </span>
                      <p>
                        {{ keyword.description }}
                      </p>
                    </div>
                    <div style="display: flex; justify-content: center;">
                      <v-btn x-small text @click="keywordsEditorDialog = true">Additional Keywords <v-icon small>settings</v-icon></v-btn>
                    </div>
                  </div>


                  <!-- objectives < description -->
                  <div v-show="['all', 'notes'].some(i=>i===descriptionSection.selection)">
                    <div class="mb-1" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
                      <span class="body-2 red--text">
                        Notes
                        <v-icon v-if="!characterNotesShowEditor" small @click="characterNotesOpenEditor">edit</v-icon>
                      </span>
                    </div>
                    <div v-if="characterNotesShowEditor">
                      <v-textarea
                          v-model="characterNotesEditorModel"
                          hint="Use markdown, e.g. **bold** _italic_"
                          persistent-hint
                          filled
                          auto-grow
                      ></v-textarea>
                      <v-btn @click="characterNotesSave" small color="success">Save</v-btn>
                    </div>
                    <div v-else-if="characterNotes" class="caption" v-html="characterNotes">
                    </div>
                    <span v-else class="caption" @click="characterNotesOpenEditor">+ Add Notes</span>
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
import MutationsMixin from '~/mixins/MutationsMixin';
import KeywordRepository from '~/mixins/KeywordRepositoryMixin';
import DodCorruptionManager from '~/components/forge/DodCorruptionManager';
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import {marked} from 'marked';

export default {
  name: 'in-app-view',
  //layout: '',
  mixins: [
    BackgroundRepositoryMixin,
    StatRepositoryMixin,
    SluggerMixin,
    WargearTraitRepositoryMixin,
    KeywordRepository,
    MutationsMixin,
  ],
  components: {
    DodDefaultBreadcrumbs,
    DodCorruptionManager,
  },
  props: [],
  head() {
    return {
      title: this.characterName,
    };
  },
  async asyncData({ params, $axios }) {

    const factionResponse = await $axios.get('/api/factions/');
    const chaptersResponse = await $axios.get('/api/species/chapters/');
    const talentResponse = await $axios.get('/api/talents/');
    const psychicPowersResponse = await $axios.get('/api/psychic-powers/');
    const psychicAbilitiesResponse = await $axios.get('/api/psychic-powers/universal-abilities');

    return {
      characterId: params.id,
      astartesChapterRepository: chaptersResponse.data,
      factionRepository: factionResponse.data,
      psychicPowersRepository: psychicPowersResponse.data,
      psychicAbilitiesRepository: psychicAbilitiesResponse.data,
      talentRepository: talentResponse.data,
      breadcrumbItems: [
        { text: '', nuxt: true, exact: true, to: '/' },
        { text: 'Forge', nuxt: true, exact: true, to: '/forge/my-characters' },
        { text: 'Character', nuxt: true, exact: true, to: `/forge/characters/${params.id}` },
      ],
    };
  },
  data() {
    return {
      attributeHeaders: [
        { text: 'Attribute', sortable: false, align: 'left', class: 'text-left small pa-1' },
        { text: 'Rating', sortable: false, align: 'center', class: 'text-center small pa-1' },
        { text: 'Enhanced', sortable: false, align: 'right', class: 'text-center small pa-1' },
        { text: 'Notes', sortable: false, style: 'center', class: 'text-center small pa-1' },
      ],
      traitHeaders: [
        { text: 'Trait', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'Rating', sortable: false, align: 'center', class: 'small pa-1' },
      ],
      skillHeaders: [
        { text: 'Skill', sortable: false, align: 'left', class: 'text-left small pa-1' },
        { text: 'Rating', sortable: false, align: 'center', class: 'text-center small pa-1' },
        { text: 'Att', sortable: false, align: 'center', class: 'text-center small pa-1' },
        { text: 'Total', sortable: false, align: 'center', class: 'text-center small pa-1' },
        { text: 'Notes', sortable: false, style: 'center', class: 'text-center small pa-1' },
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
      showContextDialog: false,
      contextDialogComponent: undefined,
      contextDialogTraitKey: undefined,
      //
      objectiveEditorShow: false,
      objectiveEditorValue: '',
      //
      characterNotesShowEditor: false,
      characterNotesEditorModel: '',
      //
      skillsEditorDialog: false,
      keywordsEditorDialog: false,
      showCorruptionManagerDialog: false,
      customSkill: {
        key: undefined,
        name: 'Custom Skill',
        attribute: '',
        description: '',
      },
      customKeyword: {
        key: undefined,
        name: 'Custom Keywords',
        description: '',
      },
      keywordFormValid: true,
      //
      characterSpecies: undefined,
      characterArchetype: undefined,
      ascensionPackagesRepository: undefined,
      wargearRepository: undefined,
    };
  },
  computed: {
    sources() {
      return [
        'core',
        'fspg',
        'red1',
        'cos',
        // 'tnh',
        ...this.settingHomebrews
      ];
    },
    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
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

    characterTalents() {
      return this.$store.getters['characters/characterTalentsById'](this.$route.params.id);
    },

    characterMutations() {
      return this.$store.getters['characters/characterMutationsById'](this.$route.params.id);
    },

    archetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    archetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    characterFactionKey() {
      return this.$store.getters['characters/characterFactionKeyById'](this.characterId);
    },

    characterBackgroundKey() {
      return this.$store.getters['characters/characterBackgroundKeyById'](this.characterId);
    },
    characterAscensionPackages() {
      return this.$store.getters['characters/characterAscensionPackagesById'](this.characterId);
    },
    keywordStrings() {
      return this.$store.getters['characters/characterKeywordsFinalById'](this.characterId);
    },
    keywords() {
      const enrichedKeywords = [];
      const characterKeywords = this.$store.getters['characters/characterKeywordsRawById'](this.characterId);
      if (characterKeywords) {
        characterKeywords.forEach(charKeyword => {
          const keyword = {
            name: charKeyword?.replacement || charKeyword.name,
            type: null,
            description: 'Alright then, keep your secrets.',
            custom: charKeyword?.custom || false,
          };
          const k = this.keywordCombinedRepository.find(i => i.name===keyword.name);
          keyword.description = k?.description || charKeyword.description;
          keyword.type = k?.type || 'Custom';
          enrichedKeywords.push(keyword);
        });
      }
      return enrichedKeywords;
    },
    languages() {
      return this.$store.getters['characters/characterLanguagesById'](this.characterId);
    },
    avatar() {
      const customAvatarUrl = this.$store.getters['characters/characterAvatarUrlById'](this.characterId);

      if ( customAvatarUrl ) {
        return customAvatarUrl;
      }

      if (this.archetypeKey !== undefined) {
        if (this.archetypeKey === 'advanced') {
          return '/img/avatar_placeholder.png';
        }
        if (!['core-ratling', 'core-ogryn'].includes(this.speciesKey)) {
          return `/img/avatars/archetype/${this.archetypeKey}.png`;
        }
      }

      if (this.speciesKey !== undefined) {
        return `/img/avatars/species/${this.speciesKey}.png`;
      }

      return '/img/avatars/species/core-human.png';
    },

    characterAttributesEnhanced() {
      let enhancedAttributes = this.$store.getters['characters/characterAttributesEnhancedById'](this.characterId);
      return enhancedAttributes;
    },

    /**
     * {
     *  name: 'Strength',
     *  key: 'strength,
     *  rating: 3, // aka bought value / rating
     *  adjustedRating: 5, // adjuste rating,
     *  adjustment: 2, // the adjusted amount
     *  modifiers: [
     *    // +1 from Attribute Modification * Space Marine Species
     *    // +3 from Powered(3) * Astartes MK VII
     *    { static: 1, rank: false, halfRank: false, }
     *  ],
     * }
     */
    attributes() {

      const characterAttributes = this.$store.getters['characters/characterAttributesById'](this.characterId);
      let attributes = this.attributeRepository.map((repositoryAttribute) => {
        return {
          ...repositoryAttribute,
          value: characterAttributes[repositoryAttribute.key],
          enhancedValue: parseInt(this.characterAttributesEnhanced[repositoryAttribute.key]),
          rating: characterAttributes[repositoryAttribute.key],
          adjustedRating: parseInt(characterAttributes[repositoryAttribute.key]),
          adjustment: 0,
          modifiers: [],
          conditionalAdjustment: 0,
        };
      });

      this.enhancements
      .filter((enhancement)=>enhancement.targetGroup==='attributes')
      .forEach((enhancement)=>{
        let attr = attributes.find((a)=>a.key===enhancement.targetValue);
        attr.adjustment += enhancement.modifier;
        attr.adjustedRating += enhancement.modifier;
        attr.modifiers.push(`${enhancement.modifier < 0 ? '-' : '+'}${enhancement.modifier} • ${enhancement.provider} • (${enhancement.category})`);
      });

      attributes = attributes.map((a) => {
        if (a.adjustedRating < 1) {
          a.adjustedRating = Math.max(1, a.adjustedRating);
          a.modifiers.push('(i) Value is increase to at least 1.');
        }
        return a;
      });

      let poweredStrength = 0;
      // enrich with (equipped) gear
      if ( this.armour && this.armour.length > 0 ) {
        const wornArmour = this.armour
          .filter((armour) => !armour.meta[0].traits.includes('Shield'))
          .filter((armour) => armour.meta[0].traits.find((trait) => trait.indexOf('Powered') >= 0 ))
          .sort((a, b) => a.meta[0].armourRating < b.meta[0].armourRating ? 1 : -1)
          .find((i) => true);
        if (wornArmour) {
          let poweredString = wornArmour.meta[0].traits.find((trait)=>trait.includes('Powered'));
          if (poweredString) {
            const trait = this.normalizeTrait(poweredString);
            if ( trait.variant) {
              poweredStrength = parseInt(trait.variant);
              let strength = attributes.find((a)=>a.key==='strength');
              strength.adjustedRating += poweredStrength;
              strength.adjustment += poweredStrength;
              strength.modifiers.push(`+${poweredStrength} • ${wornArmour.name} (Powered Armour)`);
            }
          }
        }
      }

      return attributes;
    },

    /**
     *
     * @returns [{Talents}]
     */
    traits() {
      const characterTraits = this.$store.getters['characters/characterTraitsById'](this.characterId);
      const traitsEnhanced = this.$store.getters['characters/characterTraitsEnhancedById'](this.characterId);
      const attributes = this.attributes;

      let finalTraits = this.traitRepository.map((t) => {

        let baseTraitValue = 0;

        let relatedAttribute = attributes.find((attribute) => attribute.name === t.attribute);
        if (t.key === 'influence' && this.speciesKey === 'core-ork') {
          relatedAttribute = attributes.find((attribute) => attribute.name === 'Strength');
        }

        if (relatedAttribute) {
          baseTraitValue += Math.ceil(relatedAttribute.adjustedRating * t.compute.multi);
        } else {
          let relatedSkill = this.skills.find((skill) => skill.name === t.skill);
          if (relatedSkill) {
            // todo better find the correct value
            baseTraitValue += Math.ceil(this.computeSkillPool(relatedSkill) * t.compute.multi);
          }
        }

        if (t.key === 'speed') {
          baseTraitValue = characterTraits[t.key];
        }

        baseTraitValue += t.compute.static;
        baseTraitValue += t.compute.tier * this.characterSettingTier ;

        const enhancedValue = baseTraitValue;
        const aggregatedTrait = {
          ...t,
          value: enhancedValue,
          enhancedValue: enhancedValue,
          rating: enhancedValue,
          adjustedRating: enhancedValue,
          adjustment: 0,
          conditionalAdjustment: 0,
          baseHelp: `Base = ${baseTraitValue}`,
          baseTraitValue: baseTraitValue,
          modifiers: [],
        };

        return aggregatedTrait;
      });

      // We search all enhancements that have TRAIT modifications
      this.enhancements
      .filter((enhancement) => enhancement.targetGroup==='traits')
      .forEach((enhancement) => {
        // {"targetGroup":"attributes","targetValue":"strength","modifier":1,"source":"species"}
        let traity = finalTraits.find((a) => a.key === enhancement.targetValue);
        let mody = enhancement.modifier;
        if (enhancement.rank) {
          mody += (enhancement.rank * this.characterRank );
        }
        if (enhancement.modifierPerAscendedTier) {
          mody += (enhancement.modifierPerAscendedTier * enhancement.ascendedTiers);
        }
        if ( traity ) {
          const modifier = {
            value: mody,
            valueString: `${mody < 0 ? '-' : '+'}${mody}`,
            type: 'MODIFIER',
            condition: enhancement.condition || null,
            provider: enhancement.provider,
            category: enhancement.category,
          };
          traity.modifiers.push(modifier);
          if (enhancement.condition) {
            traity.conditionalAdjustment += mody;
          } else {
            traity.adjustment += mody;
            traity.adjustedRating += mody;
          }
        } else {
          console.warn(`Unexpected undefined trait for ${enhancement.targetValue}.`);
        }
      });

      if (this.armour && this.armour.length > 0) {
        let resilience = finalTraits.find((a) => a.key === 'resilience');
        let defence = finalTraits.find((a) => a.key === 'defence');
        const wornArmour = this.armour
          .filter((armour) => !armour.meta[0].traits.includes('Shield'))
          .sort((a, b) => a.meta[0].armourRating < b.meta[0].armourRating ? 1 : -1)
          .find((i) => true)
        if (wornArmour) {
          resilience.adjustment += wornArmour.meta[0].armourRating;
          resilience.adjustedRating += wornArmour.meta[0].armourRating;
          const modifier = {
            value: wornArmour.meta[0].armourRating,
            valueString: `${wornArmour.meta[0].armourRating < 0 ? '-' : '+'}${wornArmour.meta[0].armourRating}`,
            type: 'MODIFIER',
            condition: null,
            provider: wornArmour.name,
            category: wornArmour.type,
          };
          resilience.modifiers.push(modifier);
        }
        const wornShield = this.armour
          .filter((armour) => armour.meta[0].traits.includes('Shield'))
          .sort((a, b) => a.meta[0].armourRating < b.meta[0].armourRating ? 1 : -1)
          .find((i) => true);
        if (wornShield) {
          const modifier = {
            value: wornShield.meta[0].armourRating,
            valueString: `${wornShield.meta[0].armourRating < 0 ? '-' : '+'}${wornShield.meta[0].armourRating}`,
            type: 'MODIFIER',
            condition: null,
            provider: wornShield.name,
            category: wornShield.type,
          };
          resilience.adjustment += wornShield.meta[0].armourRating;
          resilience.adjustedRating += wornShield.meta[0].armourRating;
          resilience.modifiers.push(modifier);
          defence.adjustment += wornShield.meta[0].armourRating;
          defence.adjustedRating += wornShield.meta[0].armourRating;
          defence.modifiers.push(modifier);
        }
      }

      let influence = finalTraits.find((t) => t.key === 'influence');
      if (influence && this.keywordStrings.includes('Adeptus Mechanicus')) {
        const intellect = attributes.find((attribute) => attribute.name === 'Intellect');
        let baseIntellect = 0;
        baseIntellect = influence.calculate(intellect.adjustedRating);
        influence.baseHelp = `${influence.baseHelp} / ${baseIntellect} (with Adeptus Mechanicus)`;
        influence.alternativeRating = baseIntellect + influence.adjustment;
      }

      finalTraits
      .filter((t)=>['maxWounds', 'maxShock', 'wealth'].includes(t.key))
      .forEach((t)=>{
        t.spend = this.$store.getters['characters/characterResourceSpendById'](this.characterId, t.key);
      });

      return finalTraits;
    },
    groupedTraits() {
      return [
        ...this.traits.filter((i) => i.type === 'Combat'),
        ...this.traits.filter((i) => i.type === 'Mental'),
        ...this.traits.filter((i) => i.type === 'Social'),
      ];
    },
    characterReloads() {
      const spend = this.$store.getters['characters/characterReloadsSpendById'](this.characterId);
      let points = 3;
      this.wargear.forEach((w)=>{
        points += w.key === 'core-ammo-backpack' ? 10 : 0;
        points += w.key === 'core-bandolier' ? 2 : 0;
        points += w.key === 'core-ammo-drum' ? 1 : 0;
      });

      return { points, spend };
    },
    characterFaith() {
      //const points = this.$store.getters['characters/characterFaithPointsById'](this.characterId);
      const spend = this.$store.getters['characters/characterFaithSpendById'](this.characterId);

      let points = 0;
      this.enhancements
          .filter((enhancement) => enhancement.targetGroup==='resources')
          .filter((enhancement) => enhancement.targetValue==='faith')
          .forEach((enhancement) => {
            points += enhancement.modifier;
          });

      return { points, spend };
    },
    skills() {
      const customSkills = this.$store.getters['characters/characterCustomSkillsById'](this.characterId);
      const adHocSkillRepository = [
        ...this.skillRepository,
        ...customSkills,
      ];

      const characterSkills = this.$store.getters['characters/characterSkillsById'](this.characterId);

      let skills = adHocSkillRepository.map((repositorySkill) => {
        const skill = {
          ...repositorySkill,
          value: characterSkills[repositorySkill.key],
          enhancedValue: parseInt(characterSkills[repositorySkill.key]),
          rating: characterSkills[repositorySkill.key],
          adjustedRating: parseInt(characterSkills[repositorySkill.key]),
          adjustment: 0,
          conditionalAdjustment: 0,
          dnPenalty: 0,
          modifiers: [],
          adjustedAttributeValue: 0,
          attributeObject: {},
        };
        const attribute = this.attributes.find((a) => a.name === skill.attribute);
        if (attribute) {
          skill.attributeObject = attribute;
          skill.adjustedAttributeValue = attribute.adjustedRating;
        }
        if (skill.name === 'Intimidation' && this.talents.includes('Imposing Presence')) {
          const strength = this.attributes.find((a) => a.name === 'Strength');
          skill.attributeObject = strength;
          skill.adjustedAttributeValue = strength.adjustedRating;
        }
        return skill;
      });

      /**
       * modifiers [
       *  { value: 3, type: 'BONUS_DICE', condition: null || 'when attacking AELDARI', provider: 'Hatret (AELDARI)', category: 'Talent' },
       * ]
       */

      // We search all enhancements that have SKILL modifications
      this.enhancements
      .filter((enhancement) => enhancement.targetGroup==='skills')
      .forEach((enhancement) => {
        let skill = skills.find((a) => a.key === enhancement.targetValue);
        let mody = enhancement.modifier;
        if (enhancement.rank) {
          mody += (enhancement.rank * this.characterRank);
        }
        if ( skill ) {
          const modifier = {
            value: mody,
            valueString: `${mody < 0 ? '-' : '+'}${mody}`,
            type: 'MODIFIER',
            condition: enhancement.condition || null,
            provider: enhancement.provider,
            category: enhancement.category,
          };
          skill.modifiers.push(modifier);
          if (enhancement.condition) {
            skill.conditionalAdjustment += mody;
          } else {
            skill.adjustment += mody;
            skill.adjustedRating += mody;
          }
        } else {
          console.warn(`Unexpected undefined skill for ${enhancement.targetValue}.`);
        }
      });

      return skills;
    },

    characterEnhancements() {
      return this.$store.getters['characters/characterEnhancementsById'](this.characterId);
    },

    /**
     * Enriched enhancements, gather all directly given and also drived from other sources
     * modifier (current) { targetGroup, targetValue, modifier, rank, condition, source }
     * modifier (proposal) { value: 3, type: 'BONUS_DICE', condition: null || 'when attacking AELDARI', provider: 'Hatret (AELDARI)', category: 'Talent' },
     */
    enhancements() {
      let finalEnhancements = [];

      if (!this.wargearRepository) {
        return finalEnhancements;
      }

      // from species
      if (this.characterSpecies) {
        this.characterSpecies.speciesFeatures
        .filter((feature) => feature.modifications)
        .forEach((feature) => {
          feature.modifications.forEach((mod) => {
            const newMod = {
              ...mod,
              provider: feature.name,
              category: this.characterSpecies.name,
              source: this.characterSpecies.source,
            };
            finalEnhancements.push(newMod);
          });
          if ( feature.options ) {
            const traitSelection = this.characterEnhancements.find( (e) => e.source.startsWith(`species.${feature.name}.`));
            console.info(traitSelection);
            // TODO ?
          }
        })
      }

      // from archetype
      if (this.characterArchetype) {
        this.characterArchetype.archetypeFeatures
        .filter((feature) => feature.modifications)
        .forEach((feature) => {
          feature.modifications.forEach((mod) => {
            const newMod = {
              ...mod,
              provider: feature.name,
              category: this.characterArchetype.name,
              source: this.characterArchetype.source,
            };
            finalEnhancements.push(newMod);
          });
        });
        if(this.characterArchetype.influence) {
          const newMod = {
            targetGroup: 'traits',
            targetValue: 'influence',
            modifier: this.characterArchetype.influence,
            provider: 'Archetype Influence',
            category: this.characterArchetype.name,
            source: this.characterArchetype.source,
          };
          finalEnhancements.push(newMod);
        }
      }

      // from ascensions
      const ascensionRepository = this.ascensionPackagesRepository;
      if (ascensionRepository && ascensionRepository.length > 0) {
        ascensionRepository.forEach((ascension) => {
          const ascendedTiers = ascension.targetTier - ascension.sourceTier;
          ascension.ascensionFeatures.forEach((feature) => {
            if (feature.modifications) {
              feature.modifications.forEach((mod) => {
                const newMod = {
                  ...mod,
                  ascendedTiers,
                  provider: feature.name,
                  category: ascension.name,
                  source: ascension.source,
                };
                finalEnhancements.push(newMod);
              });
            }
          });
        });
      }

      // existing enhancements (Excluding those from the RAW package)
      if (this.characterEnhancements) {
        this.characterEnhancements
        .filter((mod) => mod.source
          && mod.source !== 'species'
          && mod.source !== 'archetype'
          && mod.source !== 'ascension'
        )
        .forEach((mod) => {
          let provider = 'Unknown';
          let category = 'Unknown';
          const sourceParts = mod.source.split('.');
          if (sourceParts.length === 1) {
            if (sourceParts[0] === 'custom') {
              // aka custom mutations
              provider = mod.hint;
              category = 'Custom'
            } else {
              provider = '';
              category = sourceParts[0].charAt(0).toUpperCase() + sourceParts[0].slice(1);
            }
          }
          if (sourceParts.length > 1) {
            provider = mod.name || sourceParts.slice(1).join(' • ');
            category = sourceParts[0].charAt(0).toUpperCase() + sourceParts[0].slice(1);
          }
          const newMod = {
            ...mod,
            provider,
            category,
          };
          finalEnhancements.push(newMod);
        });
      }

      // from talents
      this.talents
      .filter((talent) => talent.modifications)
      .forEach((talent) => {
        talent.modifications.forEach((mod) => {
          const newMod = {
            ...mod,
            provider: talent.name,
            category: 'Talent',
          };
          finalEnhancements.push(newMod);
        });
      });

      // from (equipped) wargear, mostly cybernetics
      if (this.gear && this.gear.length >0) {
        let modGear = this.gear
        .filter((gear) => gear.modifications)
        .forEach((gear) => {
          gear.modifications.forEach(mod => {
            const newMod = {
              ...mod,
              provider: gear.name,
              category: gear.type,
            };
            return finalEnhancements.push(newMod);
          });
        });
      }

      // from keywords
      this.keywordStrings.forEach( k => {
        const keyword = this.keywordCombinedRepository.find( i => i.name === k );
        if ( keyword === undefined ) {
          console.warn(`No keyword found for ${k}!`);
        } else if ( keyword.modifications ) {
          keyword.modifications.forEach(mod => {
            const newMod = {
              ...mod,
              provider: keyword.name,
              category: 'Keyword',
            };
            return finalEnhancements.push(newMod);
          });
        }
      });

      // from mutations
      this.mutations
      .filter((mutation) => mutation.modifications)
      .forEach((mutation) => {
        if (mutation.modifications) {
          mutation.modifications.forEach(mod => {
            const newMod = {
              ...mod,
              provider: mutation.name,
              category: 'Mutation',
            };
            return finalEnhancements.push(newMod);
          });
        }
      });

      // from others TODO

      return finalEnhancements;
    },

    speciesAbilities(){
      const abilities = [];

      if (this.characterSpecies !== undefined && this.characterSpecies.speciesFeatures) {

          this.characterSpecies.speciesFeatures.forEach( (feature) => {
            // Honour the Chapter
            if (feature.name === 'Honour the Chapter') {
              const chapter = this.astartesChapterRepository.find((a) => a.key === this.speciesAstartesChapter) || [];
              const traditions = chapter.beliefsAndTraditions;
              if (traditions !== undefined) {
                traditions.forEach((t) => {
                  const tradition = {
                    name: t.name,
                    effect: t.effect,
                    snippet: t.effect,
                    source: chapter.name,
                  };
                  abilities.push(tradition);
                });
              }
            } else {
            // other abilities
              const ability = {
                name: feature.name,
                effect: feature.snippet ? feature.snippet : feature.description,
                snippet: feature.snippet,
                description: feature.description,
                source: this.speciesLabel,
                hint: this.speciesLabel,
                selectedOptions: [],
              };
              if ( feature.options ) {
                const traitSelection = this.characterEnhancements
                  .filter( (e) => e.source.startsWith(`species.${feature.name}.`));
                if ( traitSelection ) {
                  traitSelection.forEach((selection) => {
                    if (selection.effect) {
                      ability.selectedOptions.push({
                        name: selection.name,
                        snippet: selection.effect,
                      });
                    } else if (selection.name) {
                      ability.selectedOptions.push({
                        name: selection.name,
                      });
                    }
                  })
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
        archetype.archetypeFeatures.forEach((feature) => {
          const ability = {
            name: feature.name,
            effect: feature.snippet ? feature.snippet : feature.description,
            snippet: feature.snippet,
            description: feature.description,
            source: archetype.name,
            hint: archetype.name,
            selectedOptions: [],
          };
          if ( feature.options ) {
            const traitSelection = this.characterEnhancements.filter( (e) => e.source.startsWith(`archetype.${feature.name}.`));
            if ( traitSelection ) {
              traitSelection.forEach((selection) => {
                if (selection.effect) {
                  ability.selectedOptions.push({
                    name: selection.name,
                    snippet: selection.effect,
                  });
                } else if (selection.name) {
                  ability.selectedOptions.push({
                    name: selection.name,
                  });
                }
              })
            }
          }
          abilities.push(ability);
        });
      }
      return abilities;
    },
    ascensionAbilities() {
      const abilities = [];

      const ascensionPackages = this.characterAscensionPackages;
      const ascensionRepository = this.ascensionPackagesRepository;

      if (ascensionRepository && ascensionRepository.length > 0) {

        ascensionRepository.forEach((ascension) => {

          ascension.ascensionFeatures
          .filter((feature) => feature.hideInSheet === undefined || feature.hideInSheet === false)
          .forEach((feature) => {
            const ability = {
              name: feature.name,
              effect: feature.snippet ? feature.snippet : feature.description, // todo deprecated
              snippet: feature.snippet,
              description: feature.description,
              source: ascension.name,
              hint: ascension.name,
            };

            if ( feature.options ) {
              const featureOption = this.characterEnhancements.find( (e) => e.source.startsWith(`ascension.${ascension.key}.${feature.key}.`));
              if ( featureOption ) {
                if ( featureOption.targetValue ) {
                  ability['selectedOption'] = {
                    effect: featureOption.targetValue, // todo e.g. corruption
                    snippet: featureOption.targetValue,
                  };
                } else { // e.g. memorabie injury
                  ability['selectedOption'] = {
                    name: featureOption.name,
                    effect: featureOption.effect,
                    snippet: featureOption.effect,
                  };
                }
              }
            }
            abilities.push(ability);
          });
        });
      }

      return abilities;
    },
    otherAbilities() {
      const abilities = [];

      // keyword abilities
      this.keywordStrings.forEach( k => {
        const keyword = this.keywordCombinedRepository.find( i => i.name === k );
        if ( keyword === undefined ) {
          console.warn(`No keyword found for ${k}!`);
        } else if ( keyword.effect ) {
          const keywordAbility = {
            name: keyword.effectLabel ? keyword.effectLabel : keyword.name,
            effect: keyword.effect, // Deprecated
            snippet: keyword.effect,
            source: keyword.effectLabel ? `${keyword.name} Keyword` : `${keyword.type} Keyword`,
          };
          abilities.push(keywordAbility);
        }
      });

      // background abilities
      if (this.characterBackgroundKey) {
        this.backgroundRepository
        .filter((b) => b.key === this.characterBackgroundKey)
        .forEach((b) => {
          const backgroundAbility = {
            name: b.name,
            effect: b.bonus, // Deprecated
            snippet: b.bonus,
            source: 'Background',
          };
          const backgroundEnhancements = this.characterEnhancements.find((e) => e.source.startsWith(`background.`));
          if (backgroundEnhancements) {
            backgroundAbility.selectedOption = {
              name: backgroundEnhancements.targetValue,
            }
          }
          abilities.push(backgroundAbility);
        });
      }

      // mutations
      if (this.mutations) {
        this.mutations.forEach((item) => {
          item.source = 'Mutation',
          abilities.push(item);
        });
      }

      // other
      if (this.customAbilities) {
        this.customAbilities
        .filter( (a) =>
          a.source
          && !a.source.startsWith('species.')
          && !a.source.startsWith('archetype.')
          && !a.source.startsWith('ascension.')
        )
        .forEach((item) => {
          const ability = {
            name: item.name,
            effect: item.effect,
            snippet: item.effect,
          };
          abilities.push(ability);
        });
      }

      return abilities;
    },
    abilities() {
      return [
        ...this.speciesAbilities,
        ...this.archetypeAbilities,
        ...this.otherAbilities
      ];
    },
    customAbilities() {
      return this.characterEnhancements ? this.characterEnhancements.filter( (i) => i.targetGroup === 'abilities' ) : [];
    },
    enrichedTalents() {
      if (this.characterTalents && this.characterTalents.length > 0) {
        return this.characterTalents
          .map((charTalent) => this.talentRepository.find((t) => t.key === charTalent.key))
          .filter((t) => t !== undefined);
      }
      return [];
    },
    talents() {
      const finalTalents = [];

      this.characterTalents.forEach((charTalent) => {
        const rawTalent = this.talentRepository.find((t) => t.key === charTalent.key);
        if (rawTalent) {
          const ability = {
            name: rawTalent.name,
            snippet: rawTalent.snippet,
            description: rawTalent.description,
            source: rawTalent.source,
            hint: rawTalent.name,
            selectedOptions: [],
            modifications: rawTalent.modifications || [],
          };

          if (rawTalent.wargear && this.charGear){
            const gear = this.charGear.filter((g) => g.source && g.source.startsWith(`talent.${charTalent.id}.`));
            if (gear) {
              gear.forEach((g) => {
                ability.selectedOptions.push({ name: g.name });
              });
            }
          }

          if (charTalent.selected) {
            if (rawTalent.options) {
              const choice = this.getTalentOption(rawTalent, charTalent.selected);
              ability.name = ability.name.replace(/\[.*\]/, `(${choice.name})`);

              if (choice.modifications) {
                console.info(`Additional modifications found for the selected choice.`)
                ability.modifications.push(...choice.modifications);
              }

              if (choice.effect || choice.snippet ) {
                ability.selectedOptions.push({ name: choice.name, snippet: choice.snippet });
              }
            } else {
              ability.name = ability.name.replace(/\[.*\]/, `(${charTalent.selected})`);
            }
          }
          finalTalents.push(ability);
        } else {
          console.info(`No talent found for ${charTalent.key}`);
        }
      });
      return finalTalents.sort((a, b) => a.name.localeCompare(b.name));
    },
    talentsForFaith() {
      if ( this.enrichedTalents.length > 0 ) {
        return this.enrichedTalents.filter( talent => talent.groupKey && talent.groupKey === 'core-faith' );
      }
      return [];
    },
    mutations() {
      const finalMutations = [];

      this.characterMutations.forEach((charMutation) => {
        const rawMutation = this.mutationsRepository.find((m) => m.key === charMutation.key);
        if (rawMutation) {
          const ability = {
            id: charMutation.id,
            name: rawMutation.name, // we use the custom name
            snippet: rawMutation.snippet,
            description: rawMutation.description,
            source: rawMutation.source,
            hint: rawMutation.name,
            selectedOptions: [],
            modifications: rawMutation.modifications || [],
          };

          if (charMutation.selected) {
            if (rawMutation.options) {
              const choice = rawMutation.options.find((m) => m.key === charMutation.selected);

              if (choice.modifications) {
                console.info(`Additional modifications found for the selected choice.`)
                ability.modifications.push(...choice.modifications);
              }

              if (choice.snippet ) {
                ability.selectedOptions.push(choice);
              }
            } else {
              ability.name = ability.name.replace(/\[.*\]/, `(${charMutation.selected})`);
            }
          }
          finalMutations.push(ability);
        } else {
          console.info(`No mutation found for ${charMutation.key}`);
        }
      });
      return finalMutations.sort((a, b) => a.name.localeCompare(b.name));
    },
    charGear() {
      return this.$store.getters['characters/characterWargearById'](this.characterId);
    },
    wargear() {
      const chargear = this.charGear;
      const wargear = [];
      if(this.wargearRepository) {
        chargear.forEach((gear) => {
          const { name, id, variant } = gear;
          const foundGear = this.wargearRepository.find((w) => gear.name.localeCompare(w.name, 'en', {sensitivity: 'accent'}) === 0 );
          if (foundGear) {
            wargear.push({ ...foundGear, variant, id });
          } else {
            wargear.push({ name, variant, id, type: 'Misc' });
          }
        });
      }
      return wargear;
    },
    weapons() {
      return this.wargear.filter((wargear) => {
        let hasWeaponsProfile = false;
        if (['Ranged Weapon', 'Melee Weapon'].includes(wargear.type)) {
          hasWeaponsProfile = true;
        } else {
          if (wargear.meta) {
            wargear.meta.forEach((meta) => {
              console.info(['ranged-weapon', 'melee-weapon'].includes(meta.type));
              if (['ranged-weapon', 'melee-weapon'].includes(meta.type)) {
                hasWeaponsProfile = true;
              }
            })
          }
        }
        return hasWeaponsProfile;
      });
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
        if (power) {
          items.push(power);
        }
      });
      if (
          (this.keywords && this.keywords.find(k => k.name === 'Psyker') )
          || items.length > 0
      ) {
        items.push(...this.psychicAbilitiesRepository);
      }
      return items;
    },
    objectives() {
      if (this.characterSpecies && this.characterSpecies.objectives) {
        return this.characterSpecies.objectives.map((objective) => ({ text: objective }));
      } else if (this.characterArchetype && this.factionRepository) {
        const faction = this.factionRepository.find((faction) => faction.name === this.characterArchetype.faction);
        if (faction) {
          const objectiveList = faction.objectives;
          if (objectiveList) {
            return objectiveList.map((o) => ({ text: o }));
          }
        }
      } else {
        if (this.characterFactionKey) {
          const faction = this.factionRepository.find((faction) => faction.key === this.characterFactionKey);
          if (faction) {
            const objectiveList = faction.objectives;
            if (objectiveList) {
              return objectiveList.map((o) => ({ text: o }));
            }
          }
        }
      }
      return [];
    },
    characterNotes() {
      const notes = this.$store.getters['characters/characterFluffNotesById'](this.characterId) || '';
      return marked.parse(notes);
    },
    weaponsTraitSet() {
      let weaponsTraitSet = [];
      const { weapons } = this;

      weapons.forEach((weapon) => {
        weapon.meta.forEach((meta) => {
          if (meta.traits && meta.traits.length > 0) {
            weaponsTraitSet = [...weaponsTraitSet, ...meta.traits];
          }
        })
      });
      weaponsTraitSet = weaponsTraitSet.map((t) => t.split(/ ?\(/)[0]);
      return [...new Set(weaponsTraitSet)].sort();
    },
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
    characterAscensionPackages: {
      handler(newVal) {
        if (newVal && newVal !== 'unknown') {
          this.getAscensionPackageList(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getWargearList(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    async loadSpecies(key) {
      if ( key ) {
        let finalData = {};
        if ( key.startsWith('custom-')) {
          finalData = this.$store.getters['species/getSpecies'](key);
        } else {
          const { data } = await this.$axios.get(`/api/species/${key}`);
          finalData = data;
        }
        this.characterSpecies = finalData;
      }
    },
    async loadArchetype(key) {
      if ( key ) {
        if (key === 'advanced'){
          const mimic = this.$store.getters['characters/characterArchetypeMimicById'](this.characterId);
          if (mimic) {
            const { data } = await this.$axios.get(`/api/archetypes/${mimic}`);
            this.characterArchetype = {
              faction: this.characterFactionKey.toLowerCase(),
              factionKey: this.characterFactionKey,
              archetypeFeatures: data.archetypeFeatures,
            };
          }
        } else {
          const { data } = await this.$axios.get(`/api/archetypes/${key}`);
          this.characterArchetype = data;
        }
      }
    },
    async getAscensionPackageList(ascensionList) {

      let packages = [];

      if ( ascensionList.length > 0 ){
        for (const ascension of ascensionList) {
          const { data } = await this.$axios.get(`/api/ascension-packages/${ascension.key}`);
          const enrichedAscension = {
            ...data,
            ...ascension,
          };
          packages.push(enrichedAscension);
        }
      }
      this.ascensionPackagesRepository = packages;
    },
    async getWargearList(sources) {
      const config = {
        params: {
          source: sources.join(','),
        },
      };
      const { data } = await this.$axios.get('/api/wargear/', config);
      //this.wargearRepository = data.filter((i) => i.stub === undefined || i.stub === false);
      this.wargearRepository = data;
    },

    showContext(type) {
      switch (type) {
        case 'wealth':
        default:
          this.contextDialogTraitKey = type;
          this.contextDialogComponent = () => import('~/components/forge/DodWealthManager.vue');
          this.showContextDialog = true;
      }
    },

    hideContextDialog() {
      this.showContextDialog = false;
      this.contextDialogComponent = null;
      this.contextDialogTraitKey = null;
    },

    valueHintColor(item) {
      const value = item.adjustment + item.conditionalAdjustment;
      if (value > 0 ) return 'success';
      if (value < 0 ) return 'error';
      return 'primary';
    },
    valueHintIcon(item) {
      const value = item.adjustment + item.conditionalAdjustment;
      if (value > 0 ) return 'arrow_drop_up';
      if (value < 0 ) return 'arrow_drop_down';
      if (value === 0 ) return 'swap_vert';
      return 'swap_vert';
    },
    objectiveEditorOpen() {
      this.objectiveEditorValue = this.objectives.map((o) => o.text).join('\r\n');
      this.objectiveEditorShow = true;
    },
    addObjective(value) {
      console.info(`Add new objective: ${value}`);
      this.objectiveEditorShow = false;
    },
    characterNotesOpenEditor() {
      this.characterNotesEditorModel = this.$store.getters['characters/characterFluffNotesById'](this.characterId);
      this.characterNotesShowEditor = true;
    },
    characterNotesCancel() {
      this.characterNotesEditorModel = '';
      this.characterNotesShowEditor = false;
    },
    characterNotesSave() {
      const id = this.characterId;
      const notes = this.characterNotesEditorModel;
      this.$store.commit('characters/setCharacterFluffNotes', { id, notes });
      this.characterNotesEditorModel = '';
      this.characterNotesShowEditor = false;
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
      let traitName = name;
      if ( withParanteris ) {
        // weaponsTraitSet = weaponsTraitSet.map((t) => t.split(/ ?\(/)[0]);
        traitName = traitName.split(/ ?\(/)[0];
      }
      // return this.combinedTraitsRepository.find( item => item.name.indexOf(prefix) >= 0);
      return this.wargearTraitRepository.find((item) => item.name === traitName);
    },
    computeSkillPool(skill) {
      const attribute = this.attributes.find((a) => a.name === skill.attribute);
      if (attribute) {
          return attribute.adjustedRating + skill.adjustedRating;
      }
      return skill.adjustedRating;
    },
    getTalentOption(talent, choiceKey) {
      return talent.options.find((t) => t.key === choiceKey);
    },
    computeFormatedText(text) {
      if ( text === undefined ) {
        return text;
      }
      const rank = this.characterRank;
      let computed = text;

      // computed = computed.replace(/(1d3\+Rank Shock)/g, `<strong>1d3+${rank} Shock</strong>`);
      computed = computed.replace(/(\d+) Faith/g, '<em>$1 Faith</em>');
      computed = computed.replace(/(\d+ meters)/g, '<strong>$1</strong>');
      computed = computed.replace(/(\d+ metres)/g, '<strong>$1</strong>');
      computed = computed.replace(/15 \+Rank metres/g, `<strong title="15 +Rank meters">${15 + rank} meters</strong>`);
      computed = computed.replace(/15 \+Rank meters/g, `<strong title="15 +Rank meters">${15 + rank} meters</strong>`);
      computed = computed.replace(/15\+Double Rank metres/g, `<strong>${15 + (2*rank)} metres</strong>`);
      computed = computed.replace(/1\+Rank/g, `<strong>${(rank)+1}</strong>`);
      computed = computed.replace(/1\+Double Rank/g, `<strong>+${(2*rank)+1}</strong>`);
      computed = computed.replace(/2\+Double Rank/g, `<strong>${(2*rank)+2}</strong>`);
      computed = computed.replace(/3\+Double Rank/g, `<strong>${(2*rank)+3}</strong>`);
      computed = computed.replace(/15\+Double Rank/g, `<strong>${(2*rank)+15}</strong>`);
      computed = computed.replace(/20\+Double Rank/g, `<strong>${(2*rank)+20}</strong>`);
      computed = computed.replace(/\+Rank/g, `<strong>+${rank}</strong>`);
      computed = computed.replace(/\+Double Rank/g, `<strong>+${2*rank}</strong>`);
      computed = computed.replace(/10 ?x ?Rank/g, `<strong>${10*rank}</strong>`);
      computed = computed.replace(/10 ?x ?Double Rank/g, `<strong>${10*2*rank}</strong>`);
      computed = computed.replace(/ Double Rank/g, ` <strong>${2*rank}</strong>`);

      return computed;
    },
    toggleResource(resourceItem, index) {
      const id = this.characterId;
      const resourceKey = resourceItem.key;

      const current = this.$store.getters['characters/characterResourceSpendById'](this.characterId, resourceKey);
      const spend = (index > current) ? current+1 : current-1;

      this.$store.commit('characters/setCharacterResourceSpend', { id, resourceKey, spend });
    },
    toggleResourceReloads(index) {
      const id = this.characterId;
      const current = this.characterReloads.spend;
      const spend = (index > current) ? current+1 : current-1;
      const resourceKey = 'reloads';
      this.$store.commit('characters/setCharacterResourceSpend', { id, spend, resourceKey });
    },
    toggleResourceFaith(index) {
      const id = this.characterId;
      const current = this.characterFaith.spend;
      const spend = (index > current) ? current+1 : current-1;
      this.$store.commit('characters/setCharacterFaithSpend', { id, spend });
    },
    openSkillsSettings(){
      this.skillsEditorDialog = true;
    },
    closeSkillsSettings() {
      this.customSkill = {
        key: undefined,
        name: 'Custom Skill',
        atttribute: '',
        description: '',
      };
      this.skillsEditorDialog = false;
    },
    closeKeywordsSettings() {
      this.customKeyword = {
        key: undefined,
        name: 'Custom Keyword',
        description: '',
      };
      this.keywordsEditorDialog = false;
    },
    saveCustomKeyword(){

      const keyword = {
        name: this.customKeyword.name,
        description: this.customKeyword.description,
        source: `custom.${this.customKeyword.name}`,
        type: 'keyword',
        replacement: undefined,
        custom: true,
      };
      this.$store.commit('characters/addCharacterKeyword', { id: this.characterId, keyword });

      this.closeKeywordsSettings();
    },
    removeMutation(mutationId) {
      const id = this.characterId;
      this.$store.commit('characters/removeCharacterMutation', { id, uuid: mutationId });
    },
    removeCustomKeyword(keywordName) {
      const id = this.characterId;
      const source = `custom.${keywordName}`;
      this.$store.commit('characters/clearCharacterKeywordsBySource', { id, source });
    },
    saveCustomSkill() {
      // validate
      const skill = {
        key: this.textToCamel(this.customSkill.name),
        name: this.customSkill.name,
        attribute: this.customSkill.attribute,
        description: this.customSkill.description,
      };

      const doExist = this.skills.find((s)=>s.key===skill.key);
      if ( doExist ) {
        console.warn(`Skill ${skill.name} already exists.`);
      } else {
        this.addCustomSkill(skill);
        this.closeSkillsSettings();
      }
    },
    addCustomSkill(skill) {
      const id = this.characterId;
      this.$store.commit('characters/addCharacterCustomSkill', { id, skill });
    },
    removeCustomSkill(key) {
      const id = this.characterId;
      this.$store.commit('characters/removeCharacterCustomSkill', { id, key });
    },

    /**
     * Respite, aka Long Rest, see pg. 196
     * > Heal all Shock and Wounds
     * > Wreath is reset to 2
     * > Refresh all Faith
     */
    doRespite() {
      const id = this.characterId;
      const spend = 0;
      this.$store.commit('characters/setCharacterResourceSpend', { id, spend, resourceKey: 'maxShock' });
      this.$store.commit('characters/setCharacterResourceSpend', { id, spend, resourceKey: 'maxWounds' });
      this.$store.commit('characters/setCharacterResourceSpend', { id, spend, resourceKey: 'faith' });
    }
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
    height: 705px;
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

  .resource-box {
    $size: 12px;
    min-height: $size;
    max-height: $size;
    min-width: $size;
    max-width: $size;
    border: 1px solid hsl(0, 0%, 85%);
    box-shadow: inset 0 0 4px 0 hsl(0, 0%, 85%);
    cursor: pointer;

    box-sizing: inherit;
    margin: 2px;

    &--filled {

      &:before {
        content: "";
        display: block;
        height: 7px;
        width: 7px;
        margin-top: 1.5px;
        margin-left: 1.5px;
      }

      &::before {
        background-color: hsl(0, 100%, 37%);
      }
    }

    &--filled-light::before {
      background-color: hsl(62, 70%, 44%) !important;
    }
  }

  .faith-box {
    min-height: 20px;
    max-height: 20px;
    min-width: 20px;
    max-width: 20px;
    border: 1px solid hsl(0, 0%, 85%);
    box-shadow: inset 0 0 4px 0 hsl(0, 0%, 85%);
    cursor: pointer;

    box-sizing: inherit;
    margin: 2px;

    &--filled {

      &:before {
        content: "";
        display: block;
        height: 10px;
        width: 10px;
        margin-top: 4px;
        margin-left: 4px;
      }

      &::before {
        background-color: hsl(0, 100%, 37%);
      }
    }

  }
</style>
