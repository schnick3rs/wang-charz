<template lang="html">
  <v-row justify="center">
    <v-col :cols="12">
      <v-row>
        <v-col>
          <h3 class="headline">
            {{ item.name }}
          </h3>
          <span class="subtitle-1 grey--text">{{ item.hint }}</span>
          <h5 class="subtitle-2">
            <strong>Source: </strong>
            <span>{{ item.source.book }}</span><span v-if="item.source.page">, pg. {{ item.source.page }}</span>
          </h5>
        </v-col>

        <v-spacer />

        <v-col class="hidden-xs-only">
          <img :src="avatar" style="width:96px">
        </v-col>
      </v-row>
    </v-col>

    <v-col :cols="12">

      <p class="text-lg-justify">
        <strong>Group:</strong> {{ item.group }}
      </p>

      <p class="text-lg-justify">
        <strong>Common Keywords:</strong>
        <v-chip v-for="keyword in item.advancedCreationKeywords" :key="keyword" class="ma-1" label>{{ keyword }}</v-chip>
      </p>


      <p class="text-lg-justify">
        <strong>Objectives</strong>
        <ol>
          <li v-for="objective in item.objectives" :key="objective">{{ objective }}</li>
        </ol>
      </p>

      <div v-if="item.backgroundSection">
        <strong>Background</strong>
        <ul>
          <li v-for="section in item.backgroundSection" :key="section"><strong>{{ section.title }} {{section.type}}: </strong>{{ section.snippet}} <i> => {{ section.plusOne }}</i></li>
        </ul>
      </div>
    </v-col>

    <!-- source -->
    <v-col :cols="12" style="font-style: italic">
      <span class="caption">{{ item.source.book }}</span><span v-if="item.source.page" class="caption">, pg. {{ item.source.page }}</span>
    </v-col>
  </v-row>
</template>

<script lang="js">
import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  name: 'FactionDetails',
  mixins: [
    SluggerMixin,
  ],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    avatar() {
      return `/img/avatars/factions/${this.item.key}.png`;
    },
  },
  methods: {

  },
};
</script>

<style scoped lang="css">

</style>
