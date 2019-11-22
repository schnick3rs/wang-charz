export default {
  methods: {
    /**
     * converts 'Some fancy text' to 'some-fancy-text'
     * @param string
     * @returns {*}
     */
    stringToKebab(string) {
      return text.toLowerCase().replace(/\W/gm, '-');
      return string;
    },
    /**
     * converst 'some-kebab-slug' to 'someKebabSlug'
     * @param kebab
     * @returns lowerCamelCase
     */
    kebabToLowerCamelCase(kebab) {
      return kebab.replace(/-([a-z0-9])/g, function (g) { return g[1].toUpperCase(); });
    }
  }
}
