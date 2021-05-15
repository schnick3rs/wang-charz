<template lang="html">
  <div>

    <v-row no-gutters>

      <v-col :cols="12" v-if="item.source">
        <p>
          <strong>Source:</strong>
          <nuxt-link v-if="item.source.path" :to="item.source.path">{{ item.source.book }}</nuxt-link>
          <span v-else>
            {{ item.source.book }}
            <a v-if="item.source.link" :href="item.source.link" target="_blank">
              <v-icon small>launch</v-icon>
            </a>
          </span>
          <em>(pg. {{ item.source.page }})</em>
        </p>
      </v-col>

      <v-col :cols="12" :sm="6" :md="6" :lg="5">

        <v-container class="caption">

          <v-row style="background-color: #F44336; color: white;">
            <v-col>{{ item.name }}</v-col>
          </v-row>

          <v-row class="caption" >
            <v-col style="background-color: #424242; color: white;">Tier</v-col>
            <v-col>{{ item.tier }}</v-col>
            <v-col style="background-color: #424242; color: white;">Species</v-col>
            <v-col>{{ item.species.map((s)=>s.name).join(', ') }}</v-col>
            <v-col style="background-color: #424242; color: white;">XP Cost</v-col>
            <v-col>{{ item.cost }}</v-col>
          </v-row>

          <v-row>
            <v-col><strong>Keywords:</strong> <span class="text--keyword">{{ keywords }}</span></v-col>
          </v-row>

          <v-row style="background-color: lightgray;">
            <v-col><strong>Attributes:</strong> {{ attributePrerequisites }}</v-col>
          </v-row>

          <v-row>
            <v-col><strong>Skills:</strong> {{ skillPrerequisites }}</v-col>
          </v-row>

          <v-row style="background-color: lightgray;">
            <v-col :cols="12">
              <div :cols="12" v-for="feature in item.archetypeFeatures">
                <strong>{{ feature.name }}</strong>
                <div v-if="feature.description" v-html="feature.description"></div>
                <p v-else>{{ feature.snippet }}</p>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col><strong>Wargear:</strong> {{ wargearText }}</v-col>
          </v-row>

          <v-row style="background-color: lightgray;" v-if="item.influence && item.influence != 0">
            <v-col><strong>Influence:</strong> {{ `${item.influence > 0 ? '+' : ''}${item.influence}` }}</v-col>
          </v-row>

          <v-row v-show="false">
            <v-col :cols="8" style="background-color: #F44336; color: white;">Suggested Attributes</v-col>
            <v-col :cols="3" style="background-color: #424242; color: white;">XP Cost</v-col>
            <v-col :cols="1" style="background-color: lightgray;">13</v-col>
          </v-row>

          <v-row v-show="false">
            <v-col :cols="5" style="background-color: #424242; color: white;">Attribute</v-col>
            <v-col :cols="1" >Str</v-col>
            <v-col :cols="1" style="background-color: lightgray;">Tou</v-col>
            <v-col :cols="1" >Agi</v-col>
            <v-col :cols="1" style="background-color: lightgray;">Ini</v-col>
            <v-col :cols="1" >Wil</v-col>
            <v-col :cols="1" style="background-color: lightgray;">Int</v-col>
            <v-col :cols="1">Fel</v-col>

            <v-col :cols="5" style="background-color: #424242; color: white;">Rating</v-col>
            <v-col :cols="1" >{{ suggestedAttributes.strength }}</v-col>
            <v-col :cols="1" style="background-color: lightgray;">{{ suggestedAttributes.toughness }}</v-col>
            <v-col :cols="1" >{{ suggestedAttributes.agility }}</v-col>
            <v-col :cols="1" style="background-color: lightgray;">{{ suggestedAttributes.initiative }}</v-col>
            <v-col :cols="1" >{{ suggestedAttributes.willpower }}</v-col>
            <v-col :cols="1" style="background-color: lightgray;">{{ suggestedAttributes.intellect }}</v-col>
            <v-col :cols="1">{{ suggestedAttributes.fellowship }}</v-col>
          </v-row>

          <v-row v-show="false" v-if="suggestedSkills">
            <v-col :cols="8" style="background-color: #F44336; color: white;">Suggested Skills</v-col>
            <v-col :cols="3" style="background-color: #424242; color: white;">XP Cost</v-col>
            <v-col :cols="1" style="background-color: lightgray;">13</v-col>
            <v-col :cols="12" >{{ suggestedSkills }}</v-col>
          </v-row>

          <v-row v-show="false" v-if="suggestedTalents && suggestedTalents.length > 0">
            <v-col :cols="12" style="background-color: #F44336; color: white;">Suggested Talents</v-col>
            <v-col :cols="12">
              {{ suggestedTalents.map((t) => `${t.name} (${t.source.key}, pg. ${t.source.page})`).join(', ') }}
            </v-col>
          </v-row>

        </v-container>

      </v-col>

      <v-col class="ma-4">
        <div v-html="item.description"></div>
      </v-col>

    </v-row>

  </div>
</template>

<script lang="js">
import KeywordRepository from '~/mixins/KeywordRepositoryMixin';
import StatRepository from '~/mixins/StatRepositoryMixin';
import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  name: 'ArchetypePreview',
  mixins: [
    KeywordRepository,
    StatRepository,
    SluggerMixin,
  ],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      suggestedTalents: [],
    };
  },
  async mounted() {
    if (this.item.suggested && this.item.suggested.talents) {
      for(const talentKey of this.item.suggested.talents) {
        const response = await this.$axios.get(`/api/talents/${talentKey}`);
        const { data } = response;
        if (data !== undefined && data !== '') {
          this.suggestedTalents.push(data);
        }
      }
    }
  },
  computed: {
    attributePrerequisites() {
      if (this.item.prerequisites) {
        return this.item.prerequisites
        .filter((p) => p.group === 'attributes')
        .map((a) => `${this.getAttributeByKey(a.value).name} ${a.threshold}`)
        .join(', ');
      }
      return this.item.attributes;
    },
    skillPrerequisites() {
      if (this.item.prerequisites) {
        return this.item.prerequisites
        .filter((p) => p.group === 'skills')
        .map((a) => `${this.getSkillByKey(a.value).name} ${a.threshold}`)
        .join(', ');
      }
      return this.item.skills;
    },
    suggestedAttributes() {
      const suggestedAttributes = { };
      this.attributeRepository.forEach((a) => {
        let suggestedValue = '?';
        if (this.item.suggestedStats) {
          const suggestedAttribute = this.item.suggestedStats
            .filter((p) => p.group === 'attributes')
            .find((i) => i.value === a.key);
          if (suggestedAttribute) {
            suggestedValue = suggestedAttribute.threshold
          }
        }
        suggestedAttributes[a.key] = suggestedValue;
      });
      return suggestedAttributes;
    },
    suggestedSkills() {
      if (this.item.suggestedStats) {
        return this.item.suggestedStats
        .filter((p) => p.group === 'skills')
        .map((a) => `${this.getSkillByKey(a.value).name} ${a.threshold}`)
        .join(', ');
      }
      return this.item.skills;
    },
    abilityObjects() {
      if (Array.isArray(this.item.abilities)) {
        return this.item.abilities;
      }
      return [];
    },
    wargearText() {
      if ( this.item.wargearString ) {
        return this.item.wargearString;
      }
      if ( this.item.wargear && this.item.wargear.length > 0 ) {
        return this.item.wargear.map((g) => {
          if (g.amount) {
            return `${g.amount}x ${g.name}`;
          }
          return `${g.name}`;
        }).join(', ');
      }
      return this.item.wargear;
    },
    keywords() {
      if (this.item.keywords) {
        return this.item.keywords.split(',').join(', ');
      }
      return '';
    },
  },
  methods: {
    getAvatar(key) {
      return `/img/avatars/archetype/${key}.png`;
    },
  },
};
</script>

<style scoped lang="scss">

.text--keyword {
  color: #F44336;
  font-weight: 600;
  font-family: serif;
  text-transform: uppercase;
}

.zigzag {
  background: linear-gradient(135deg, #fff 5px, transparent 0) 0 5px, linear-gradient(-135deg, #fff 5px, #F44336 0) 0 5px;
  background-color: #F44336;
  background-position: left top;
  background-repeat: repeat-x;
  background-size: 10px 10px;
}

</style>
