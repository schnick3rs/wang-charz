<template>
  <div>
    <div
      v-show="showTooltip"
      class="tooltip-container"
      :style="{ left: tooltip.position.x, top: tooltip.position.y }"
    >
      <v-card v-if="tooltip.loading" dark color="success" class="text-center">
        <v-progress-circular indeterminate />
      </v-card>
      <v-card v-else raised dark color="success">
        <v-card-title class="tooltip-container__header">
          {{ hintBoxItem.title }}
        </v-card-title>
        <v-card-text>
          {{ hintBoxItem.description }}
        </v-card-text>
      </v-card>
    </div>

    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row
      justify="center"
      no-gutters
      dense
      class="mt-4"
    >
      <v-col
        :cols="12"
        :md="10"
      >
        <v-row>
          <v-col
            :cols="12"
          >
            <header class="page-header page-header--doom-green">
              <h1>{{ post.title }}</h1>
            </header>

            <article class="post-html-container">
              <p>{{ post.abstract }}</p>

              <h2>New reader?</h2>

              <p>
                The story of Captain Vulpes continuous.
                Check out <nuxt-link to="/posts/2-the-journey-of-the-golden-goose-session-zero">the kickoff session</nuxt-link> write-up,
                in case you missed it.
              </p>


              <h2>Recap</h2>

              <p>
                So, last session, Lord Vulpes escaped an ork ambush with the last remaining ship
                of House Vulpes, the Goolden Goose. Now he seeks to rebuild his fortune and the
                name of his Rouge Trader House. He was granted the opportunity to load the exploration
                into the W22 System, a System, that had been cut off by a warpstorm that was now fading.
                Treasure and horror awaits (probably). But he is not alone. First, he has a trusted crew,
                and second he has some self proclaimed passengers (more are coming!).
              </p>

              <p>
                Those are the <strong>Tech-Prist Koreljow</strong>, who wants to investigate and decipher a stellar phenomen,
                the <em>Koreljow-Line</em>. Named by them man (parts) himself, because he found this anomaly.
                What a machine!
              </p>

              <p>
                Next, we have <strong>Commissar Orlow</strong>. Leading by example (and fear, well... mostly fear).
                Fresh from the academy, his has the order to recruit as much man as needed to support the
                Exploration Force. Assigned to him are two Bulklander, hughe landing vassels to bring
                the imperial forces to the enemy.
              </p>

              <p>
                The <strong>Astartes Epimetheus</strong> from the Salamanders Chapter.
                Bound by an old pact to travel with Lord Vulpes. He has a friendly and welcoming
                attitude towards the mere humans. Unusual and refreshing.
              </p>

              <p>
                So, this group gathers around the Planet <em>Cheribdion Alpha</em> that will be
                the starting point for the Exploration, once all preperations are finished.
                But before we see what lays behind the warp infused rabbit hole,
                let's see what the missing three player charactes are doing, shall we?
              </p>

              <h2>The missing parts</h2>

              <p>
                So, we will visit two locaitons. First <em>Aiden Hive</em>, the main Hive on the
                planet Charibdion Alpha. Here we will follow the journey of the local scum,
                <strong>Cassidy Gaines</strong> and how a ordered recruitment machine can suck
                an unviling individuall into the training meatgrinder of Commissar Orlow.
              </p>

              <p>
                After that, we check out how an aspiring Inquisitorial Akolyth and a
                Sister Hospitaller join forces.
              </p>

              <h3>The scum psyker</h3>

              <p>
                <strong>Cassidy Gaines</strong> was (is? will ever be?) a lowborn scum, born into
                the bazzilions of a hive world. destined to live and die on this planet.
                Or so he taught. Desteny
              </p>

            </article>

          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import BreadcrumbSchemaMixin from '~/mixins/BreadcrumbSchemaMixin';

export default {
  name: 'TheJourneyOfTheGoldenGooseSessionZero',
  components: {
    DodDefaultBreadcrumbs,
  },
  mixins: [
    BreadcrumbSchemaMixin,
  ],
  data() {
    return {
      post: {
        id: 3,
        title: 'The Journey of the Golden Goose - Session 01',
        shortTitle: 'The Golden Goose #1',
        slug: 'the-journey-of-the-golden-goose-session-01',
        abstract:
          'Vulpes gathers more passangers ',
        author: {
          id: 1,
          name: 'Brother Lucius',
          avatar: '',
        },
        //image: '/img/chronic_goose_session-0.jpg',
        image: '/img/artwork_posts.jpg',
        tags: [
          'Setting',
          'Journey of the Golden Goose',
        ],
        publishedAt: '2019-12-10T08:00:00+08:00',
        modifiedAt: '2019-12-10T08:00:00+08:00',
      },
      showTooltip: false,
      tooltip: {
        position: { x: 0, y: 0 },
        loading: false,
      },
      hintBoxItem: { title: '', description: '', type: '' },
    };
  },
  head() {
    const { title } = this.post;
    const description = this.post.abstract;
    const image = `https://www.doctors-of-doom.com${this.post.image}`;
    const articleJsonLdSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPost',
      datePublished: this.post.publishedAt,
      dateModified: this.post.modifiedAt,
      headline: title,
      description,
      image,
      author: {
        '@type': 'Person',
        name: this.post.author.name,
      },
    };
    return {
      title,
      titleTemplate: '%s | Blog',
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'og:image', name: 'og:image', content: image },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: image },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(this.breadcrumbJsonLdSchema(this.breadcrumbItems)), type: 'application/ld+json' },
        { innerHTML: JSON.stringify(articleJsonLdSchema), type: 'application/ld+json' },
      ],
    };
  },
  computed: {
    breadcrumbItems() {
      return [
        {
          text: '', disabled: false, nuxt: true, exact: true, to: '/',
        },
        {
          text: 'Posts', disabled: false, nuxt: true, exact: true, to: '/posts',
        },
        {
          text: this.post.shortTitle, disabled: false, nuxt: true, exact: true, to: `/posts/${this.post.id}-${this.post.slug}`,
        },
      ];
    },
  },
  methods: {
    setHintBoxItem($event, talentId) {
      this.tooltip.loading = true;
      this.$axios.get(`/api/talents/${talentId}`)
      .then(({ data }) => {
        this.hintBoxItem = {
          title: data.name,
          description: data.effect,
          type: 'Talent',
        };
        this.tooltip.loading = false;
      });
      this.showTooltip = true;
      this.tooltip.position.x = `${$event.pageX}px`;
      this.tooltip.position.y = `${$event.pageY}px`;
    },
  },
};
</script>

<style scoped lang="scss">

  .tooltip {

    font-weight: 600;
    text-decoration: none;
    color: hsl(122, 39%, 49%);

    &--talent {
    }
  }

  .tooltip-container {

    z-index: 1;
    position: absolute;
    min-width: 450px;
    max-width: 450px;
    min-height: 100px;
    &__header {

    }
    &__content {

    }
  }

  .post-wrapper {
  }

  .page-header {
    border-bottom: 2px solid black;
    &--doom-green {
      border-color: hsl(122, 39%, 49%);
    }
  }

  .post-html-container {
    border-left: 0.5px solid hsl(122, 39%, 79%);
    border-right: 0.5px solid hsl(122, 39%, 79%);
    border-bottom: 2px solid hsl(122, 39%, 49%);
    background: white;
    padding: 20px 10px;
    margin-bottom: 20px;
    //column-count: 2;
    & h2, h3 {
      //column-span: all;
    }
    & p {
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
