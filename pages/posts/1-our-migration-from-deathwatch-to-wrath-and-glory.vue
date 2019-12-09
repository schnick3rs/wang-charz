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

              <h2>Premise / A short overview of the setting</h2>

              <p>
                Ok, so in early 2017 we started a Warhammer 40k Adeptus Astartes Campaign
                titled <strong>The First Generation</strong> (or sometimes, the first harvest).
                3 Players and 1 Master. We used the FFG’s
                Deathwatch Rules as basis but made some alterations to fit our setting. We
                would not start as full marines or even deathwatch but as Aspirants, chosen
                to become marines for the <strong>Doctors of Doom</strong> Chapter, more precisely, the 4th
                Company. We would create characters but without much of the boni of an
                astartes, so more like mere humans. E.g. attributes would be 25+2d10
                (instead of 35+3d10) and we would be missing most of the skills and all
                organs for now. Chapters would be re-flavoured to represent different
                regions on the Chapters Recruitment Planet <strong>Latveria IV</strong>.
              </p>

              <p>
                The first sessions would be training and slowly gaining some of
                the organs, in general we gained the additional +10 for some stats, some
                skills and some talents. We picked Archetypes and spend XP. Soon, we would
                go on our first mission, using the requisition rules. And later, we would
                add the rules for Solo and Squad mode, Oathes, and finally we rose to be
                fully accepted Battle Brothers, earning our place among our Brethren and
                the right to wear the ancient power armors. Well, let’s meet the gang.
              </p>

              <h3>Meat the Squad, the Party composition</h3>

              <p>
                The Squad consists of three Marines: From the <strong>House Isenwell</strong> (reflavored
                Storm Warden Chapter), we have Brother <strong>Ferris</strong>. An agile duelist that chose
                the garments of the Assault Marine. The other two came from the House
                Hironiat (reflavored Imperial Fist Chapter). One is a born leader, <strong>Yordrik
                  ‘Steelvoice’</strong>. Born to lead from the front, he also was destined to join the
                Assault Marines. His fellow brother from the same house, was a Scout during
                is time as mere Human. His name is <strong>Gar</strong>, a quiet, determined and disturbing
                fellow that was accompanied by an animal companion: a falcon that he also
                called Gar. Oddly enough, the Master of The Forge, Brother <strong>Raziel</strong>, claimed
                this one, so he took the mantle of the Techmarines.
              </p>

              <h3>Reasons</h3>

              <p>
                Approximately 17 Sessions and 2 Years later, the Squad bordered Rank 3. And
                after the last session, we thought about switching to Wrath &amp; Glory,
                due to the positive experience with the W&amp;G system and the bad
                experience we had with the (in our view) complicated rules set of FFG’s
                Deathwatch system. We decided to convert the characters, see if that works
                for us, and if not, we would just stay (revert back to) Deathwatch.
              </p>

              <h2>Migration Approach</h2>

              <p>
                Together with our GM, we decided for the following Rules regarding the
                Character Creation.
              </p>

              <p>
                The general Setting Tier would be Tier 3 and the respective Rules regarding
                ascension and archetype requirements would apply. Due to the lack of
                Assault and Techmarines, we would consider taking Archetypes from some of
                the Homebrews (check out the <nuxt-link to="/vault">Vault</nuxt-link>!):
                <nuxt-link to="/vault/the-emperors-angels">The Emperor's Angles</nuxt-link> or
                <nuxt-link to="/vault/an-abundance-of-apocrypha">An abundance of Apocrypha</nuxt-link>.
                <em>The Emperor's Angles</em> supplement would also provide us with rules for House Isenwell (read: Storm Wardens).
              </p>

              <p>
                I want to talk a little about our Species choice. First, we considered
                making a Tier 4 Campaign and using Primaris as base (we would reflavour
                them as basic Adeptus Astartes because we do not follow the Primaris
                Timeline). But in the end, we thought Tier 3 would be more appropriate and
                leave more archetypes that would be fitting for our Lore. So Tier 3 it is.
                But we would gain some additional BP (quite a bit, read 130 BP) as a reward
                for our sessions played. The Rank would be determined by the GM (in this
                case, we would be Rank 2) and not by the BP gained. We also decided, that
                everyone needs to pick the <em>Steel and Doom</em> talent.
              </p>

              <h3>Condensed Creation Rules</h3>

              <p>
                So, here we have the condensed rules that we used:
              </p>

              <ul class="mb-4">
                <li>Framework/Setting is Tier 3 (300 BP as basis)</li>
                <li>Additional 130 Build Points, thus 430 Points</li>
                <li>Species is Adeptus Astartes (50 BP)</li>
                <li>Archetypes Restrictions: Any up to Tier 3 (~50 BP)</li>
                <li>Character Rank is 2</li>
                <li>Everybody must take the Steel and Doom talent (30 BP)</li>
              </ul>

              <p>
                This leaves approximately 300 build points to distribute freely.
              </p>

              <p>
                One final note. We also added a new Skill: Tactics (Intelligence). This
                will allow for some more distinction in addition to the related skills
                Leadership and Scholar.
              </p>

              <h3>The respective Characters</h3>

              <p>
                Let’s check with what we came up, shall we? As that is my character, I can
                go a little deeper into the thought process. I will explore the details of
                the other characters in a different post.
              </p>

              <h4>Brother Gar</h4>

              <p>
                Ah, the Techmarine. At first, I was tempted to use the Techmarine Archetype from one
                of the supplements. But then, in regard to the scoutish heritage of the
                character, I decided to take the <strong>Scout Archetype</strong> and Ascend with the <strong>Stay
                  the Course Package</strong>. This would give me some custom gear and augments and
                also the <strong>Adeptus Mechanicus</strong> Keyword.
              </p>

              <p>
                I then increased Attributes and Skills with a focus on
              </p>

              <ol class="mb-4">
                <li>First: Agility, Ballistic Skill and Stealth, representing the Scout part. </li>
                <li>And second: Intellect and Tech.</li>
                <li>
                  Finally, some supporting skills are: Awareness, Investigation, Pilot and
                  Scholar.
                </li>
              </ol>

              <p>
                Ok let’s check the Talents.
                <a class="tooltip tooltip--talent" href="/library/talents/37-steel-and-doom" @mouseover="setHintBoxItem($event, 37)" @mouseleave="showTooltip = false">Steel and Doom</a> was mandatory and thus set.
                I wandered through the talent section multiple times, but couldn’t find one
                that hooked me. Finally, I decided the
                <a class="tooltip tooltip-talent" href="/library/talents/4-bombardment" @mouseover="setHintBoxItem($event, 4)" @mouseleave="showTooltip = false">Bombardment</a>
                talent would ne fitting. It’s quite
                costly and I needed to convince my GM to ignore the Rank 3+ restriction
                (great success). I would reflavor the Talent so that it represents
                preparation by Gar, setting traps and explosives on key locations, to be
                triggered once the enemies are in place. His gift would allow him to
                estimate precisely where enemies would stand.
              </p>

              <p>
                And that’s mostly it. There is some final tweaking to do, but I think this will work well.
                I <nuxt-link to="/forge/my-characters">
                  build the character with the Forge
                </nuxt-link> (of course) and
                <a href="/characters/first-generation_brother-gar_v1.pdf">uploaded the
                  respective PDF</a>, if you want a closer look into the details..
              </p>

              <h2>Follow Up</h2>

              <p>
                That’s for today. Additional posts will follow, once I have the time to
                write some more. In the meantime, I hope you enjoyed the view into our
                migration progress. Any questions or remarks regarding our approach?
              </p>

              <p>
                I can also give more details on the narrative and history of the
                Recruitment World, the Chapter or the Characters, if you wish.
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
  name: 'OurMigrationFromDeathwatchToWrathAndGlory',
  components: {
    DodDefaultBreadcrumbs,
  },
  mixins: [
    BreadcrumbSchemaMixin,
  ],
  data() {
    return {
      post: {
        id: 1,
        title: 'Our migration from Deathwatch to Wrath and Glory',
        shortTitle: 'From Deathwatch to Wrath & Glory',
        slug: 'our-migration-from-deathwatch-to-wrath-and-glory',
        abstract:
          'Once you go Wrath & Glory, there is no turning back... '
          + 'We migrated out FFG Deathwatch campaign to Wrath and Glory. '
          + 'Here are the reasons why and how we did it.',
        author: {
          id: 1,
          name: 'Brother Lucius',
          avatar: '',
        },
        image: '/img/artwork_posts.jpg',
        tags: [
          'Migration Guide',
          'Deathwatch',
          'Setting',
          'The First Harvest',
        ],
        publishedAt: '2019-12-01T08:00:00+08:00',
        modifiedAt: '2019-12-01T08:00:00+08:00',
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
