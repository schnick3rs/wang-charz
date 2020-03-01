export default {
  methods: {
    /**
     * converts 'Some fancy text' to 'some-fancy-text'
     *
     * // \W matches any non-word character (equal to [^a-zA-Z0-9_])
     * // \s matches any whitespace character (equal to [\r\n\t\f\v ])
     *
     * @param text
     * @returns {*)
     */
    textToKebab(text) {
      return text.toLowerCase().replace(/\W/gm, '-');
    },
    textToCamel(text) {
      return text
                .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
                .replace(/\s/g, '')
                .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
    },
    /**
     * converst 'some-kebab-slug' to 'someKebabSlug'
     * @param kebab
     * @returns lowerCamelCase
     */
    kebabToCamel(kebab) {
      return kebab.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
    },

    camelToKebab(camel) {
      return camel.replace(/([a-z0-9][A-Z])/g, (g) => `${g[0]}-${g[1].toLowerCase()}`);
    },
  },
};
