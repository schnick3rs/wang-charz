<template>
  <div class="colorful-page">

    <header class="colorful-page__header" :class="cssFlavourModifier">
      <h1>{{ headline }}</h1>
    </header>

  </div>
</template>

<script lang="js">

export default {
  name: 'ColorfulPage',
  props: {
    headline: String,
    flavour: {
      type: String,
      default: 'doom',
    }
  },
  computed: {
    cssFlavourModifier() {
      return `colorful-page__header--${this.flavour}-flavour`;
    },
  },
};
</script>

<style lang="scss">

  .colorful-page__header {
    border-bottom: 2px solid hsl(122, 39%, 49%);

    &--forge-flavour {
      border-bottom: 2px solid hsl(4, 90%, 58%)
    }
    &--blog-flavour {
      border-bottom: 2px solid hsl(194, 90%, 65%);
    }
    &--vault-flavour {
      border-bottom: 2px solid hsl(122, 39%, 49%);
    }
  }
</style>
