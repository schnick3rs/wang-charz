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

              <h2>New Astropath, who dis?</h2>

              <p>
                Hey, listen. When Wrath & Glory was announced, we where excited. Once the
                pre-ordered PDF was availible, we kicked of our first Wrath & Glory campaign.
                The Campaign started in 2018 and we are currently approaching our #25 Session.
                I will write a little about that campaign, delve into the background and history of
                the sessions and will occasionally explore house rules that we established.
              </p>

              <p>
                Feedback is highly welcome, wether you want wo know more about the characters involved,
                or more details regarding the specific session. Just let me know via
                <a href="mailto:docsofdoom+posts@gmail.com?subject=Blog Feedback: #2 Golden Goose">docsofdoom+posts(at)gmail.com</a>.
              </p>

              <h2>The Setup</h2>

              <p>
                We decided, that the Setting would be Tier 3. And that one player need to take a Rouge Trader.
                The rest of the characters where free to choose. Overall the group consist of 7 players plus the GM.
                Regarding the choosen characters. Those would be created as Tier 1 to 2 Characters at first. But I'm getting ahead.
                For the first session not everybody had to have their character. Sure, we would have a Tier 2 Rogue Trader, but the rest...
                Well, let's meet them in cronological order, shall we.
              </p>

              <h3>The Rogue Trader</h3>

              <p>
                The Patriarch Fedor D. Vulpes is the Lord of a very old but faiding rogue trader house.
                His sisters son is the Protagonist: <strong>Alexander B. Vulpes</strong>.
                Alexander learend his trade as Seneschall of his cousin, Torben. Over the years, he developed
                a unique skills set. His political sense, high insight in the human desires and charisma,
                allowed him to make some favourable deals. And, he also geathered some capable individualls
                around him. Those would serve them well, once he would be assigned his own ship.
                An this is where the story starts, Alexander is now Captain of the small Imperiall
                Frigate, the <em>Golden Goose</em>. It's not much, but it's (almost) honest work.
                So, now let's take a look at those trusted advisors, shall we?
              </p>

              <h3>The Crew</h3>

              <p>
                First, <strong>Angelo <em>'Angel'</em> Vitinelli</strong>, the cigarillo smoking Master Helmsmen.
                Most notable, is his thick italian accent.
              </p>

              <p>
                Then we have Tech-Akolyth <strong>Igor Molotow</strong>.
                You guessed his origin? Could it be russian? Indeed!
                How did the servitors understand him? Binary of course...
                All in all, this one knows how to overclock an engine or other mechanical parts.
              </p>

              <p>
                Ahh, what could be a better asset than a flamethrower wielding,
                litany chanting and heresy expecting priest be?
                Probably everybody else for a shadowy, soon-to-be to be captain.
                But this priest at least know how to motivate some troops!
                His name is <strong>Orpheus Isiminga</strong> and he adds an old age,
                a slow walk and a grumpy personality to his skill set.
              </p>

              <p>
                No entourage would be complete with an Arch Militant whose purpose is to protect
                the Captain and lead the troops. This role is filled by the wannabe highborn
                <strong>Anastasia Argent</strong>, also called <em>'The Lady'</em> by the subordinates.
                Protective in regard to her Lord, Alexander Vulpes,
                and with a glimpse of ambition in her eyes.
              </p>

              <p>
                Oh, and a Navigator of course... <strong>Orellion</strong>.
                Not to important, guides the ship, mutations (probably), the usual.
              </p>

              <p>
                For the first session, those members where created by the GM.
                He presented multiple reduced character sheets with a picture and points distributed,
                so that the main skills would be around 8. E.g. The lady would have Ballistic Skill 8,
                The Pilot, ähm.. well Pilot 8, and so on. We took turns in choosing those characters,
                put an name on them, and developed some characteristics on the fly, the result is in
                the character summary that I presented above.
              </p>

              <p>
                But not all players would choose a, lets say, playable (N)PC (sort of).
                One Player would also (in addition to the Rogue Trader character) start with an
                almost finished character. With that I mean a Tier 3 Character but with less points
                (around 70 to 100 BP less). We had no strict rule, and details where negotiated with
                the GM. We will come to this character a little later.
              </p>

              <h2>The story begins</h2>

              <blockquote class="blockquote" style="font-style: italic">
                The flagship of the Rogue Trader House Vulpes, the <em>Honor</em>, anchors
                near a ship cemetery located in the <em>Rekram-System</em>.

                Swarms of Shuttles were eager to harvest the scrap metal. Next to the <em>Honor</em>
                lays the <em>Valor</em>, the ship of Antonius Vulpes, heir to the throne and
                unloved cousin of Captain Alexander.

                House Vulpes was not the first to claim the cemetery and this expedition was less
                an exciting hunt for archotech and more the feast of vultures on an old
                battlefield.

                The finest days of House Vulpes were long gone.
              </blockquote>

              <p>
                Ok, so Alexander is joining a meeting that the old Patriarch Vulpes had ordered.
                Onboard of the flagship, the old Lord welcommed Alexander and his entourage.
                Oddly enough, next to the Patriarch's throne stood an unexpected guest,
                an Adeptus Astartes. His black skin, red glowing, deamonlike eyes and the green
                carapace of a scout armour, identified him as Battle Brother from the Salamander
                Chapter.
              </p>

              <p>
                The Patriach talks, about the ancient pacts between Rouge Traders and Astartes Chapters,
                old as the Empire itself, almost 10,000 years ago. In the first decades of existence,
                the Salamanders joined the vast Rogue Trader explorations and while not many Houses
                still honor those oaths, House Vulpes does. He proclaims:
              </p>

              <blockquote class="blockquote" style="font-style: italic;">
                “This is Brother Epimeteus from the third company of the Slamanders Chapter; born from
                the XVIII. Legion.

                The customs demand, that he will be part of your crew until seven decades have passed
                or the Chaptercommand releases him from this ritual pact.

                His wisdom and burning axe will join your cause to strengthen the bond between our
                clans.

                Learn from him, and teach him, as the customs demand.”
              </blockquote>

              <h3>Unexpected guests</h3>

              <p>
                The pact is sealed, and new plans await. But a sudden intruder demands attention.
                The Augor telemetry discovered multiple enemy ships that were hidden within the
                asteriod belt. Now they approach the waiting ships.

                The old patriach orders Alexander and Antonius to man their ship and escape this
                ambush.
              </p>

              <p>
                To make things short, Alexander reaches the Golden Goose and discovers, that the
                options are fading. The telemetry is exhausted from the swarms of enemies, orks,
                to be precise. The sister ships of Alexanders Goose, are heavyly damaged and
                it's not sure if they will make it. Lord Vulpes commands that the navigator
                finds an route for an escape jump, most preferably to the near <em>Hethgart</em>
                System. That system had previously send a distress call and Alexander was out of
                options. This System was the one with the highest chance to survive this jump,
                according to his navigator. And who was he to disagree?
              </p>

              <p>
                The ships increases the distance to the stellar objects and larger ships before
                it is forced to do the jump into the warp. Vomit fills the deck from this
                hard warp journey. Sadly, the Augurs announce that multiple objects are following
                them within the warp.
              </p>

              <h3>Wait, wat? Tyranids? A come ON!</h3>

              <p>
                Thanks GM... So the ship enters realspace. Behind a Tyranid fleet that is attacking
                the Imperial naval defences of the Hethgart system. But wait, whats with the objects
                following in the warpspace? Could it be the other Vulpes ships? Nope, its hordes
                of orks.
              </p>

              <blockquote class="blockquote" style="font-style: italic">
                “This is Burkard Heldenreich from the Firststrike. Identify yourself.”
              </blockquote>

              <p>
                Heldenreich (roughly Heroesrealm in english) seems to be in charge of the defence
                force. Alexander uses whats left as options, he charges through the Tyranide vessels,
                dragging the orks behind him right into the melee, so that both Xenos are decemating
                each other. What a cunning plan! Well, it works, and the remaining survivors
                are finished off.
              </p>

              <p>
                Alexander sells his entry into the war as 'just as planned' and is praised for his
                cunning approach. Lord Heldenreich, the Lord of one of the great Rogue Trader Houses
                of this region, congratulates Alexander Vulpes, and gives him a nickname, the Greyfox,
                after a small, cunning animal on his homeplanet. Cunning!
              </p>

              <p>
                Also, Heldenreich announces that (as a gift) he will grant the Greyfox the right
                to lead the expansion into newly discovered lands (more on that in a different
                article). Fun fact: it's not a gift, it's a shore. But well, The House Vulpes is
                even more decimated, Alexander is the last remaining heir and the Goose their last
                ship. So he will do what he does best, roll with the dice and see were it lands.
              </p>

              <h3>New allies</h3>

              <p>
                The New exploration force will get some new faces (read player characters.
                First, the a renown Tech-Priest, <strong>Koreljow</strong>, proclaims,
                that he will join Lord Vulpes to investigate anomalies on the new frontier.
                This is a highly intelligent and capable Tech-Magos, an asset that is
                a surprise for sure, but a welcome one.
              </p>

              <p>
                Another asset is the Fresh Baked Commissar <strong>Maxim Semjoniwitsch Orlow</strong>
                assigned and ordered to organize the manpower needed to claim the new worlds in the
                name of the emperor.
              </p>

              <p>
                Both of those are wellcome assets for Lord Vulpes. Some more will join in the next Session.
                At this point, we leave the entourage behind. They will become NPC's with the rich
                background of a full evening of action. And the players will join lord Vulpes with a
                mix of approx. Tier 2 characters. For now, we have:
              </p>

              <ul>
                <li>The Rogue Trader, Lord Alexander Bartholome Vulpes</li>
                <li>Commissar Maxim Semjonowitsch Orlow, from Valhalla</li>
                <li>Asterts Scout Epimetheus, from the Slamanders Chapter</li>
                <li>Magos Sergei Pawlowitsch Koreljow, who will make Tech DN's obsolete</li>
              </ul>

              <p>
                Three characters are still missing, and those will be introduced in the next session.
              </p>

              <h2>Whats next</h2>

              <p>
                So, this a short glimpse into our first session one year ago. You saw how we established
                a narrative that already introduced and enriched NPCs. In the next write up, I will
                introduce the three missing PCs and how the story continuous. I can also give you
                the concrete stats of the characters if there is interest.
              </p>

              <p>
                Tell me what you think and if you
                want to know more: <a href="mailto:docsofdoom+posts@gmail.com?subject=Blog Feedback: #2 Golden Goose">docsofdoom+posts(at)gmail.com</a>.
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
        id: 1,
        title: 'The Journe of the Golden Goose - Session Zero',
        shortTitle: 'The Golden Goose #0',
        slug: 'the-journey-of-the-golden-goose-session-zero',
        abstract:
          'Let\'s take a look at our first session from our log running tier 3 campaign',
        author: {
          id: 1,
          name: 'Brother Lucius',
          avatar: '',
        },
        image: '/img/artwork_posts.jpg',
        tags: [
          'Setting',
          'Journey of the Golden Goose',
        ],
        publishedAt: '2019-12-12T08:00:00+08:00',
        modifiedAt: '2019-12-12T08:00:00+08:00',
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
