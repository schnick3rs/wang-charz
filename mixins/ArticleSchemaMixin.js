export default {
  methods: {
    articleJsonLdSchema(post, image) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        datePublished: post.attributes.publishedAt,
        dateModified: post.attributes.modifiedAt,
        headline: post.attributes.title,
        description: post.attributes.description,
        image,
        author: {
          '@type': 'Person',
          name: post.attributes.author,
        },
        "publisher": {
          "@type": "Organization",
          "name": "Doctors of Doom",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.doctors-of-doom.com/android-chrome-192x192.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://www.doctors-of-doom.com/posts"
        },
      };
    },
  },
};
