 <template>
    <nuxt-link :to="library">
      <code
          class="hint-box"
          @mouseenter="hoverHint"
          @mouseleave="hideHint"
      >{{ label }}</code>
    </nuxt-link>
</template>

<script lang=js>
export default {
  name: 'HintBox',
  props: {
    endpoint: String,
    label: String,
  },
  data() {
    return {
      hintItem: null,
    };
  },
  computed: {
    library() {
      return `/library${this.endpoint}`;
    },
  },
  methods: {
    hoverHint(event) {
      this.$root.$emit('hoverHint', { event, endpoint: this.endpoint });
    },
    hideHint() {
      this.$root.$emit('hideHint');
    },
  },
};
</script>

<style lang="scss">

.hint-box {

  font-weight: 600;
  text-decoration: none;
  color: hsl(194, 90%, 45%);

  &--talent {
  }
}

</style>
