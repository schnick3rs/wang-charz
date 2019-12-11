export default {
  methods: {
    articleJsonLdSchema(post, title, description, image) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        datePublished: post.publishedAt,
        dateModified: post.modifiedAt,
        headline: title,
        description,
        image,
        author: {
          '@type': 'Person',
          name: post.author.name,
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
