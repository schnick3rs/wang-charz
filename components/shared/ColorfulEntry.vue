<template>
  <div class="colorful-entry">

    <header class="colorful-entry__header" :class="cssFlavourModifier">
      <h1>{{ headline }}</h1>
    </header>

    <article class="colorful-entry__container" :class="cssContainer">

      <slot></slot>

    </article>

  </div>
</template>

<script lang="js">

export default {
  name: 'ColorfulEntry',
  props: {
    headline: String,
    flavour: {
      type: String,
      default: 'doom',
    }
  },
  computed: {
    cssFlavourModifier() {
      return `colorful-entry__header--${this.flavour}-flavour`;
    },
    cssContainer() {
      return `colorful-entry__container--${this.flavour}-flavour`;
    }
  },
};
</script>

<style lang="scss">

  $forge-red: hsl(4, 67%, 55%);
  $forge-red-lighter: hsl(4, 67%, 75%);

  $wargear-blue: hsl(213, 85%, 40%);
  $wargear-blue-lighter: hsl(213, 85%, 60%);

  .colorful-entry__header {
    border-bottom: 2px solid hsl(122, 39%, 49%);

    &--forge-flavour {
      border-bottom: 2px solid $forge-red;
    }

    &--wargear-flavour {
      border-bottom: 2px solid $wargear-blue;
    }

    &--blog-flavour {
      border-bottom: 2px solid hsl(194, 90%, 65%);
    }

    &--vault-flavour {
      border-bottom: 2px solid hsl(122, 39%, 49%);
    }
  }

  .colorful-entry__container {
    border-left: 0.5px solid hsl(194, 90%, 90%);
    border-right: 0.5px solid hsl(194, 90%, 90%);
    border-bottom: 2px solid hsl(195, 16%, 90%);
    //background: white;
    padding: 20px 10px;
    margin-bottom: 20px;

    &--forge-flavour {
      border-left: 0.5px solid $forge-red-lighter;
      border-right: 0.5px solid $forge-red-lighter;
      border-bottom: 2px solid $forge-red;
    }

    &--wargear-flavour {
      border-left: 0.5px solid $wargear-blue-lighter;
      border-right: 0.5px solid $wargear-blue-lighter;
      border-bottom: 2px solid $wargear-blue;
    }

    &--vault-flavour {
      border-left: 0.5px solid hsl(122, 39%, 69%);
      border-right: 0.5px solid hsl(122, 39%, 69%);
      border-bottom: 2px solid hsl(122, 39%, 49%);
    }

    &--blog-flavour {
      border-left: 0.5px solid hsl(194, 90%, 45%);
      border-right: 0.5px solid hsl(194, 90%, 45%);
      border-bottom: 2px solid hsl(194, 90%, 65%);
    }

    //column-count: 2;
    & h2, h3 {
      //column-span: all;
    }
    & p {
    }
    & li > p {
      margin-bottom: 0;
    }
    & img {
      width: 100%;
    }
  }

  .sexy-line{
    display:block;
    border:none;
    color:white;
    height:1px;
    background:black;
    background: -webkit-gradient(radial, 50% 50%, 0, 50% 50%, 350, from(#000), to(#fff));
  }
</style>
