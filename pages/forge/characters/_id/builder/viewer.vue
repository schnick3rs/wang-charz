<template>
  <div
    v-touch="{
      left: () => next(),
      right: () => prev(),
    }"
  >
    <!-- mobile attribute view -->
    <div>
      <v-card>
        <v-card-text>{{ active.label }}</v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Viewer',
  layout: 'print',
  data() {
    return {
      activeComponent: 'attributes',
      children: {
        attributes: { id: 1, label: 'Attributes' },
        skills: { id: 2, label: 'skills' },
      },
    };
  },
  computed: {
    active() {
      return this.children[this.activeComponent];
    },
  },
  async asyncData({ params }) {
    const sourceFilter = '?source=core,coreab';

    return {
      characterId: params.id,
    };
  },
  methods: {
    prev() {
      console.log('Show previous view');
      this.loadView('attributes');
    },
    next() {
      console.log('Show next view');
      this.loadView('skills');
    },
    loadView(index) {
      this.activeComponent = index;
    },
  },
};
</script>

<style scoped>

</style>
