<script setup lang="ts">
const sections = [
  {
    key: 'vault',
    title: 'Homebrew <strong>Vault</strong>',
    subtitle: 'A collection of Wrath & Glory homebrews',
    imageSrc: '/img/artwork_vault_tile.jpg',
    imageCredit: 'unknown, found at warhammer40k.fandom.com',
    htmlText:
        'The <strong>Vault</strong> contains an expanding collection of '
    + '<strong>homebrews from fans</strong> of the Wrath & Glory Roleplaying Game.',
    link: { text: 'To the Vault', route: '/vault' },
    isActive: true,
    classes: [],
  },
  {
    key: 'forge',
    title: 'Character <strong>Forge</strong>',
    subtitle: 'A Character Builder for Wrath & Glory',
    // imageSrc: '/img/artwork_mechanicus_aertist-alexboca_mozjpeg.jpg',
    // imageCredit: 'Artwork by AlexBoca (DevianArt)',
    imageSrc: '/img/artwork_forge_tile.jpg',
    imageCredit: 'Artwork by prettysleepy1 (Pixabay)',
    htmlText:
        'Define the setting and tier of your campaign and <strong>start building a Wrath & '
    + 'Glory Character</strong> for your session.',
    link: { text: 'To the Forge', route: '/forge/my-characters' },
    isActive: true,
    classes: [],
  },
  {
    key: 'bestiary',
    title: 'Threat <strong>Bestiary</strong>',
    subtitle: 'A repository of player threats',
    imageSrc: '/img/artwork_bestiary_death.png',
    imageCredit: 'Artwork from Pixabay',
    htmlText:
        'In search of new <strong>threats</strong> for your players? '
    + 'Check out the <strong>Wrath & Glory bestiary</strong>.'
    + 'Those also contain enemies from the fan homebrews you can find in the <strong>Vault</strong>.',
    link: { text: 'To the Bestiary', route: '/bestiary' },
    isActive: true,
    classes: [],
  },
  {
    key: 'network',
    title: 'Community <strong>Network</strong>',
    subtitle: 'Assets & Links',
    imageSrc: '/img/artwork_network_tile.jpg',
    imageCredit: 'Artwork from Pixabay',
    htmlText: 'Check out some (one) of the assets provided by the community. E.g. some <strong>fillable character sheets</strong>.',
    link: { text: 'To the Network', route: '/network' },
    isActive: true,
    classes: [],
  },
  {
    key: 'posts',
    title: 'Roleplaying <strong>Articles</strong>',
    subtitle: 'Writings about the Hobby',
    imageSrc: '/img/artwork_posts_tile.jpg',
    imageCredit: 'Artwork from Pixabay',
    htmlText: '',
    link: { text: 'To the Posts', route: '/posts' },
    isActive: true,
    classes: [],
  },
  {
    key: 'eather',
    title: 'Broadcasting <strong>Ether</strong>',
    subtitle: 'A browsable list of Lets Plays',
    imageSrc: '/img/artwork_ether.jpg',
    imageCredit: 'Artwork from Pixabay',
    htmlText: 'Find <strong>One-Shots</strong>, <strong>Lern to plays</strong> and <strong>Let´s Plays</strong>.<br><br><strong>Beta</strong>, naming might change.',
    link: { text: 'To the Ether', route: '/ether' },
    isActive: true,
    classes: [],
  },
  {
    key: 'library',
    title: 'Reference <strong>Library</strong>',
    subtitle: 'Browse Options for Characters',
    imageSrc: '/img/artwork_library_tile.jpg',
    imageCredit: 'Artwork from Pixabay',
    htmlText: 'Browse through Species, Archetypes, Wargear and more...',
    link: { text: 'To the Library', route: '/library' },
    isActive: true,
    classes: [],
  },
  {
    key: 'codex',
    title: 'Rules <strong>Codex</strong>',
    subtitle: 'Quick Rules References',
    imageSrc: '/img/artwork_codex_tile.jpg',
    imageCredit: 'Artwork from Pixabay',
    htmlText: 'Need to know how bleeding work? Check the Rules reference.',
    link: { text: 'To the Codex', route: '/codex' },
    isActive: true,
    classes: [],
  },
];
</script>

<template>

  <div class="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
    <UPageCard
        v-for="section in sections"
        :key="section.title"
        class="overflow-hidden"
        :ui="{ root: 'hover:shadow-lg/30', container: 'p-0 sm:p-0'}"
        :to="section.link.route"
    >
      <div class="flex">
        <img
            :src="section.imageSrc"
            :alt="section.title"
            class="h-32 w-21 sm:h-64 sm:w-28 lg:h-78 object-cover"
        />

        <div class="flex flex-1 flex-col p-4">
          <h2
              class="text-3xl"
              v-html="section.title"
          />

          <p class="mt-2 text-sm text-muted">
            {{ section.subtitle }}
          </p>

          <div
              class="mt-4 flex-1 text-sm leading-6 hidden sm:block"
              v-html="section.htmlText"
          />

          <UButton
              class="mt-6 hidden sm:block"
              :link="section.link.route"
              size="xl"
          >
            {{ section.link.text }}
          </UButton>
        </div>
      </div>
    </UPageCard>
  </div>
</template>

<style scoped>

</style>