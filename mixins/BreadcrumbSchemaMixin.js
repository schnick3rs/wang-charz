export default {
  methods: {
    breadcrumbJsonLdSchema(items) {
      const breadcrumbListSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: (index === 0 ? 'Doctors of Doom' : item.text),
          item: `https://www.doctors-of-doom.com${item.to}`,
        })),
      };
      return breadcrumbListSchema;
    },
  },
};
