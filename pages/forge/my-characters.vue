<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>

    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row>

      <v-col :cols="12" v-if="false">
        <v-alert type="info" outlined text>
          On Januar 2021, <a href="https://www.cubicle7games.com/">Cubicle7</a> <a href="https://www.cubicle7games.com/40k-forsaken-system-players-guide-pdf-out-now/">posted about their newest PDF</a> for Wrath and Glory. The can get the <a href="https://www.drivethrurpg.com/product/303930/Wrath--Glory--Forsaken-System-Players-Guide?affiliate_id=466959" title="Wrath & Glory Forsaken System Player´s Guide (Affiliate Link)">Forsaken System Player´s Guide on e.g. drivethrurpg.com</a> (affiliate link). It contains Abhuman Species and new archetypes for the Imperium, covering Sororitas, Inquisition, Mechanicus and Astartes.
        </v-alert>
      </v-col>

      <v-col :cols="12">
        <h2 class="headline">
          My Characters: <span style="color: #1976d2;">{{ characterSets.filter(i=>i !== undefined).length }} Slots</span>
        </h2>

        <v-btn large color="primary" @click="newCharacter">
          Create a Character
        </v-btn>

        <v-btn large color="primary" outlined @click="importDialog = true">
          <v-icon left>cloud_upload</v-icon>
          Import a Character
        </v-btn>

        <v-btn large color="primary" outlined nuxt to="/forge/species">
          Custom Species
        </v-btn>

        <v-dialog
          v-model="importDialog"
          width="600px"
          scrollable
          :fullscreen="$vuetify.breakpoint.xsOnly"
        >
          <v-card class="pa-0">

            <v-card-title style="background-color: #262e37; color: #fff;">
              <span>Import Character</span>
              <v-spacer />
              <v-icon dark @click="importDialog = false">close</v-icon>
            </v-card-title>
            <v-card-text>
              <v-textarea
                class="mt-4"
                v-model="importSnippet"
                persistent-hint
                dense
                hint="Paste the exported character string into the field and hit the 'import' button."
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-btn block color="success" @click="importCharacter(importSnippet)" :disabled="!importSnippet">import</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-col>

      <!-- No Chars yet info text -->
      <v-col v-if="characterSets.filter(i=>i !== undefined).length <= 0" :cols="12">
        <v-alert
          type="info"
          prominent
          text
          border="left"
          color="primary"
        >
          Just hit <strong>Create a Character</strong> and start building.
        </v-alert>
        <v-alert
          v-if="false"
          type="info"
          prominent
          text
          border="left"
          color="primary"
        >
          <p>
            <strong>You have been here before and miss your character?</strong>
            Sadly, to implement the handling of multiple characters, I had to make quite some changes.
            Migrating existing characters was not achievable without significant effort.
            So, after some considerations, I decided to skip the migration.
            However, due to changes within the code, upcoming migrations are feasible.
          </p>
        </v-alert>
      </v-col>

      <v-col :cols="12">

        <v-alert
          v-if="hasLegacyCharacters"
          color="warning"
          border="left"
          outlined
        >
          <p>
            It seems that some of your characters are build with the old (Ulisses) Rules set.
            The FORGE does not support those characters anymore. I have set up an additional server, where you can manage those characters.
            That server needs to be awaken from stasis when used, thus it might take up to a minute until it is reachable.
            To transfer your characters, execute the following steps:
          </p>
          <ol>
            <li>export the characters using the respective button and save (copy to clipboard) the shown text,</li>
            <li>go to the <a href="https://doctors-of-doom-legacy.herokuapp.com/forge/my-characters" target="_blank">legacy forge</a>,</li>
            <li>import the character there and check if everything is as expected,</li>
            <li>if all works like before, consider <strong>deleting</strong> the transfered characters here.</li>
          </ol>
          <p>Alternatively, just rebuild the character using the new revision. Or, hit delete and never look back.</p>
        </v-alert>

        <v-row v-if="hasUnmigratedCharacters">

          <v-col
            :cols="12"
            :sm="12"
            :md="12"
            :lg="8"
          >

            <v-card>
              <v-card-title>Updates Available</v-card-title>
              <v-card-text>
                <p>This characters were build with an older version and need to be updated to ensure all fields are up to date. Just hit the <strong>update button</strong> to bring all  characters back in line.</p>
                <p><strong>This significantly change how ascensions work.</strong> Thus, they are <strong>purged from all characters</strong> including their respective choices. Please <strong>re-select them</strong> after the update.</p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  @click="migrateAllCharacters"
                    color="success"
                  block
                >
                  <v-icon left small>
                    cloud_upload
                  </v-icon>
                  Update all Characters
                </v-btn>
              </v-card-actions>
            </v-card>



          </v-col>

        </v-row>

        <v-row >
          <v-col
            v-for="character in characterSets.filter(i=>i !== undefined)"
            v-if="characterSets"
            :key="character.id"
            :cols="12"
            :sm="6"
            :md="6"
            :lg="4"
          >
            <v-card
              v-if="character"
            >
              <div class="card">
                <div class="card__image-container">
                  <div
                    class="card__image"
                    :style="{ backgroundImage: 'url('+characterAvatar(character.id)+')' }"
                    loading
                  />
                </div>

                <v-card-text class="pa-0">
                  <div class="card__content-container pa-4">
                    <h3>{{ characterName(character.id) }}</h3>

                    <div
                      v-if="isLegacyVersion(character.id)"
                    >
                      <v-btn
                        @click="openExportDialog(character.id)"
                        color="warning"
                        small
                      >
                        <v-icon left small>cloud_download</v-icon>
                        Export Legacy
                      </v-btn>
                    </div>
                    <div
                      v-else-if="characterVersion(character.id) < builderVersion"
                    >
                      <v-btn
                        @click="migrateCharacter(character.id)"
                        color="warning"
                        x-small
                      >
                        <v-icon left small>
                          cloud_upload
                        </v-icon>
                        Migrate (v{{characterVersion(character.id)}})
                      </v-btn>
                    </div>

                    <div>
                      <span>{{ characterSpeciesLabel(character.id) }} • {{ characterArchetypeLabel(character.id) }}</span>
                    </div>

                    <div>
                      <span>Rank {{ characterRank(character.id) }} • {{ characterSpendBp(character.id) }} / {{ characterTotalBp(character.id) }} XP</span>
                    </div>
                  </div>
                </v-card-text>
              </div>

              <v-divider />

              <v-card-text class="pa-2 card__campaign-container">
                <strong>Tier {{ characterSettingTier(character.id) }}:</strong> <em>{{ characterSettingTitle(character.id) }}</em>
              </v-card-text>

              <v-divider />

              <v-card-actions>
                <v-btn
                  nuxt
                  :to="`/forge/characters/${character.id}/builder/setting`"
                  color="primary"
                  x-small
                  text
                  :disabled="characterVersion(character.id) < builderVersion"
                >
                  <v-icon left small>
                    edit
                  </v-icon>
                  Edit
                </v-btn>
                <v-btn
                  nuxt
                  :to="`/forge/characters/${character.id}`"
                  color="primary"
                  text
                  x-small
                  :disabled="characterVersion(character.id) < builderVersion"
                >
                  <v-icon small left>
                    description
                  </v-icon>
                  View
                </v-btn>
                <v-btn
                  nuxt
                  :to="`/forge/characters/${character.id}/builder/print`"
                  target="_blank"
                  color="primary"
                  class="d-none d-md-flex"
                  text
                  x-small
                  v-if="false"
                  :disabled="characterVersion(character.id) < builderVersion"
                >
                  <v-icon small left>print</v-icon>Print
                </v-btn>

                <v-btn
                  color="primary"
                  text
                  x-small
                  @click="openExportDialog(character.id)"
                >
                  <v-icon small left>cloud_download</v-icon>
                  Export
                </v-btn>

                <v-btn
                  color="error"
                  text
                  small
                  @click="openDeleteDialog(character.id)"
                >
                  <v-icon small>delete</v-icon>Delete
                </v-btn>

              </v-card-actions>
            </v-card>
          </v-col>

          <v-dialog
            v-model="exportDialog"
            width="600px"
            scrollable
            :fullscreen="$vuetify.breakpoint.xsOnly"
          >
            <v-card class="pa-0">

              <v-card-title style="background-color: #262e37; color: #fff;">
                <span>Export Character</span>
                <v-spacer />
                <v-icon dark @click="exportDialog = false">
                  close
                </v-icon>
              </v-card-title>
              <v-card-text>
                <v-textarea
                  id="exportSnippetId"
                  rows="10"
                  readonly
                  class="mt-4"
                  persistent-hint
                  dense
                  hint="The character is exported without his custom image."
                  v-model="exportSnippet"
                ></v-textarea>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn outlined block color="primary" @click="copyToClipboard"><v-icon>file_copy</v-icon>Copy to clipboard</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="deleteDialog"
            width="350"
            persistent
          >
            <v-card>
              <v-card-title style="background-color: #262e37; color: #fff;">
                <span>Delete Character confirmation</span>
                <v-spacer />
                <v-icon dark @click="deleteDialog = false">close</v-icon>
              </v-card-title>
              <v-card-text>
                <div class="pt-2 pb-2">
                  <p>Do you really want to delete the character permanently?</p>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn block color="primary" @click="deleteCharacter">Delete permanently</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-row>
      </v-col>

      <v-col :cols="12">
        <v-card>
          <v-card-text>
            <h1 class="headline">
              Character Generator for Wrath and Glory
            </h1>
            <p>
              This <strong>online character generator for Wrath & Glory</strong> allows you to create and <strong>organize multiple
                characters</strong>. Just define a Setting with a fitting Tier and start building.
              For severe issues, feedback and ideas, reach out to me via
              <a href="mailto:docsofdoom+forge@gmail.com?subject=Forge Feedback">docsofdoom+forge(at)gmail.com</a>.
            </p>
            <p>
              One last note, the generator is <strong>still missing some features</strong>, e.g. some Talents like <em>Special Weapon Troopes</em>,
              but the vast majority is working as expected.
              Still, please consider this a <em>late</em> <strong>BETA</strong> Version, so characters <em>might</em> be deleted (or broken) on future updates.
              I will try my best to migrate the existing ones to the new version.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="js">
import {mapGetters} from 'vuex';
import SluggerMixin from '~/mixins/SluggerMixin';
import DodDefaultBreadcrumbs from '../../components/DodDefaultBreadcrumbs';

export default {
  name: 'MyCharacters',
  components: { DodDefaultBreadcrumbs },
  mixins: [
    SluggerMixin,
  ],
  props: [],
  data() {
    return {
      importDialog: false,
      importSnippet: '',
      exportDialog: false,
      exportSnippet: '',
      deleteDialog: false,
      deleteId: undefined,
      breadcrumbItems: [
        { text: '', nuxt: true, exact: true, to: '/' },
        { text: 'Forge', nuxt: true, exact: true, to: '/forge' },
        { text: 'Characters', nuxt: true, exact: true, to: '/forge/my-characters' },
      ],
      howTo: {
        steps: [
          { name: 'Select Species', text: 'Select a species. This defines the available archetypes. You may select any species that has a base tier lower or equals the Setting Tier.' },
          { name: 'Select Archetype', text: 'Select an Archetype. The archetype provides keywords, wargear and unique abilities.' },
          { name: 'Buy Attributes, Skills and Talents', text: 'Spend points on Attributes, Skills, Talents and Psychic Powers.' },
          { name: 'Ascend the Character', text: 'If the current tier is lower than the Setting Tier, select one or more ascension packages.' },
          { name: 'Select a Background', text: 'Choose a background.' },
        ],
      },
    };
  },
  head() {
    const title = 'Character Builder for Wrath & Glory | Forge';
    const description =
      'The Forge allows you to create and organize multiple characters for the Wrath and Glory' +
      'Roleplaying game. Create, manage and view your characters online.';
    const image = 'https://www.doctors-of-doom.com/img/artwork_abstract.jpg';
    const imageTwitter = 'https://www.doctors-of-doom.com/img/artwork_forge_twitter.jpg';

    const howToSchema = {
      '@context': 'http://schema.org',
      '@type': 'HowTo',
      name: 'How to create a Wrath and Glory Character',
      description: 'Creating a Character is quite easy. Pick a Setting Tier, select species and archetype and spend your remaining build points.',
      image: 'https://www.doctors-of-doom.com/img/artwork_abstract.jpg',
      tool: [
        {
          '@type': 'HowToTool',
          name: 'Wrath & Glory Core Rules',
        },
      ],
      supply: '', // TODO
      step: this.howTo.steps.map((item) => ({
        '@type': 'HowToStep',
        name: item.name,
        text: item.text,
        image: '', // TODO
        url: '', // TODO
      })),
      /**
       * period of 1 hour
       *
       * @see https://www.digi.com/resources/documentation/digidocs/90001437-13/reference/r_iso_8601_duration_format.htm
       */
      totalTime: 'P1H',
    };

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'og:image', name: 'og:image', content: image },
        // Twitter Card
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: imageTwitter },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(howToSchema), type: 'application/ld+json' },
      ],
    };
  },
  computed: {
    ...mapGetters({
      version: 'version',
      builderVersion: 'builderVersion',
      characterIds: 'characters/characterIds',
      characterSets: 'characters/characterSets',
    }),
    hasLegacyCharacters() {
      if ( this.characterIds === undefined ) {
        return false;
      }
      return this.characterIds.map( (id) => this.characterVersion(id) ).some( (version) => version <= 6 );
    },
    hasUnmigratedCharacters() {
      if ( this.characterIds === undefined ) {
        return false;
      }
      return this.characterIds.map( (id) => this.characterVersion(id) ).some( (version) => (version < this.builderVersion) && (version > 6) );
    },
  },
  methods: {
    migrateAllCharacters() {
      this.migrateCharacters( this.characterIds );
    },
    migrateCharacters(ids){
      ids.forEach( (id) => this.migrateCharacter(id));
    },
    migrateCharacter(id) {
      this.$store.dispatch('characters/migrate', {characterId:id});
    },
    characterVersion(id) {
      return this.$store.getters['characters/characterVersionById'](id);
    },
    characterName(id) {
      return this.$store.getters['characters/characterNameById'](id);
    },
    characterSpeciesKey(id) {
      return this.$store.getters['characters/characterSpeciesKeyById'](id);
    },
    characterSpeciesLabel(id) {
      return this.$store.getters['characters/characterSpeciesLabelById'](id);
    },
    characterArchetypeKey(id) {
      return this.$store.getters['characters/characterArchetypeKeyById'](id);
    },
    characterArchetypeLabel(id) {
      return this.$store.getters['characters/characterArchetypeLabelById'](id);
    },
    characterRank(id) {
      return this.$store.getters['characters/characterCampaignCustomRankById'](id);
    },
    characterTotalBp(id) {
      return this.$store.getters['characters/characterTotalBuildPointsById'](id);
    },
    characterSpendBp(id) {
      return this.$store.getters['characters/characterSpendBuildPointsById'](id);
    },
    characterSettingTitle(id) {
      return this.$store.getters['characters/characterSettingTitleById'](id);
    },
    characterSettingTier(id) {
      return this.$store.getters['characters/characterSettingTierById'](id);
    },
    isLegacyVersion(id) {
      return this.characterVersion(id) <= 6;
    },
    characterAvatar(id) {
      const customAvatarUrl = this.$store.getters['characters/characterAvatarUrlById'](id);
      if ( customAvatarUrl ) {
        return customAvatarUrl;
      }

      const archetypeKey = this.characterArchetypeKey(id);
      const speciesKey = this.characterSpeciesKey(id);
      if (archetypeKey !== undefined) {
        if (archetypeKey === 'advanced') {
          return '/img/avatar_placeholder.png';
        }
        if (!['core-ratling', 'core-ogryn'].includes(speciesKey)) {
          return `/img/avatars/archetype/${archetypeKey}.png`;
        }
      }

      if (speciesKey !== undefined) {
        return `/img/avatars/species/${speciesKey}.png`;
      }

      return '/img/avatars/species/core-human.png';
    },
    load(characterId) {
      this.$axios.get(`/api/characters/${characterId}`)
        .then((response) => {
          this.$store.dispatch('populateState', response);
        });

      // this.$store.dispatch('loadCharacterFromDatabase', characterId );
    },
    loadChar() {
      this.$store.dispatch('loadCharacterFromDatabase', { id: 3 });
    },
    saveChar() {
      this.$store.dispatch('saveCurrentCharacterToDatabase');
    },
    newCharacter() {
      const newCharId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
      this.$store.commit('characters/create', newCharId);
      this.$ga.event('New Character', 'click', newCharId, 10);
    },
    openDeleteDialog(id){
      this.deleteId = id;
      this.deleteDialog = true;
    },
    deleteCharacter() {
      const id = this.deleteId;
      this.$store.commit('characters/remove', id);
      this.deleteDialog = false;
      this.$ga.event('Delete Character', 'click', id, 1);
    },
    openExportDialog(id) {
      const characterJsonString = this.$store.getters['characters/characterStateJsonById'](id);
      this.exportSnippet = btoa(unescape(encodeURIComponent(characterJsonString)));
      this.exportDialog = true;
    },
    copyToClipboard() {
      document.getElementById('exportSnippetId').select();
      document.execCommand("copy");
    },
    importCharacter(stateString) {
      const newCharId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
      const payload = {
        id: newCharId,
        stateString: decodeURIComponent(escape(atob(stateString))),
      };
      this.$store.commit('characters/import', payload);
      this.importSnippet = '';
      this.importDialog = false;
      this.$ga.event('Import Character', 'click', newCharId, 1);
    }
  },
};
</script>

<style scoped lang="scss">
  .card {

    //max-width: 640px;
    height: 120px;
    display: flex;

    &__image-container {
      width: 120px;
      min-width: 120px;
      object-fit: contain;
      align-self: flex-start;
    }

    &__image {
      background-position: center center;
      background-size: cover;
      height: 120px;
      width: 120px;
    }

    &__content-container {
      flex: 1 1 auto;
      //color: rgba(0, 0, 0, 0.54);
    }

    &__campaign-container {
      //color: rgba(255, 255, 255, 0.7);
      //background-color: #424242;
    }

    &__content-subtitle {

    }

    &__content-footer {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
</style>
