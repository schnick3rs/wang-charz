<template lang="html">

  <v-row justify="center">

    <v-col v-bind:cols="12">

      <v-row>

        <v-col>
          <h3 class="headline">{{ item.name }}</h3>
          <span class="subtitle-1 grey--text">{{ item.hint }}</span>
          <h5 class="subtitle-2">
            <strong>Source: </strong>
            <span>{{ item.source.book }}</span><span v-if="item.source.page">, pg. {{ item.source.page }}</span>
          </h5>

        </v-col>

        <v-spacer></v-spacer>

        <v-col class="hidden-xs-only">
          <img v-bind:src="avatar" style="width:96px" />
        </v-col>

      </v-row>

    </v-col>

    <v-col v-bind:cols="12" >

      <p class="text-lg-justify">
        <strong>Build Point Cost:</strong> {{ item.cost }}
      </p>

      <p><v-divider /></p>

      <p class="text-lg-justify">
        <strong>Base Tier:</strong> {{ item.baseTier }}
      </p>

      <p class="text-lg-justify">
        <strong>Speed:</strong> {{ item.speed }}
      </p>

      <p class="text-lg-justify">
        <strong>Attribute Modifications:</strong> {{ item.attributes || 'None' }}
      </p>

      <div v-if="item.abilities">

        <span class="mt-2 grey--text">Abilities</span>
        <v-divider></v-divider>

        <div
          v-for="ability in item.abilityObjects"
          v-if="item.abilities"
          class="text-lg-justify"
        >
          <p><strong>{{ ability.name }}:</strong> {{ ability.effect }}</p>
        </div>

        <div v-if="item.description && item.description.length > 0">
          <p><v-divider /></p>
          <blockquote class="blockquote font-italic" >
            <p>"{{ item.description }}"</p>
            <span class="right">- Source: {{ item.source.book }} -</span>
          </blockquote>
        </div>

      </div>

    </v-col>

    <!-- source -->
    <v-col v-bind:cols="12" style="font-style: italic">
      <span class="caption">{{ item.source.book }}</span><span class="caption" v-if="item.source.page">, pg. {{ item.source.page }}</span>
    </v-col>

  </v-row>

</template>

<script lang="js">

export default {
  name: 'species-details',
  mixins: [],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    avatar() {
      const slug = this.item.name.toLowerCase().replace(/\s/gm, '-');
      return `/img/icon/species/species_${slug}_avatar.png`;
    },
  },
  methods: {

  },
};
</script>

<style scoped lang="css">

</style>
