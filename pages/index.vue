<template lang="html">
  <v-layout justify-center row wrap>
    <v-flex xs12 sm10 md8 lg6>
      <v-card nuxt to="/vault/" class="hover-card">
        <v-img src="/img/artwork_forge.jpg" height="250" />

        <v-card-actions>
          <v-spacer /><span>© unknown from warhammer40k.fandom.com</span>
        </v-card-actions>

        <v-card-title>
          <h2 class="headline">
            Vault - A collection of Wrath & Glory homebrews
          </h2>
        </v-card-title>

        <v-card-text>
          <p>
            An expanding collection of <strong>homebrews from fans</strong> of the Wrath & Glory RPG. Extend your known settings like the
            Inquisition or explore the life of a Titan crew. Enter the <strong>Vault</strong> to find out more...
          </p>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12 sm10 md8 lg6 v-if="false">
      <v-card nuxt to="/builder/setting" disabled>
        <v-img class="card__image--disabled" src="/img/artwork_mechanicus_aertist-alexboca.jpg" height="250" />

        <v-card-actions>
          <v-spacer /><span>© Artwork by AlexBoca (DevianArt)</span>
        </v-card-actions>

        <v-card-title>
          <h2 class="headline">
            <span class="caption">00001010 00010110 10101011 01101001 11001011 01011110 10101100 00011011 10100010 10010101 11010111 10101011</span>
            <span style="display:none;">Wrath & Glory Character Builder</span>
          </h2>
        </v-card-title>

        <v-card-text>
          <span class="caption">00001101 11100111 11100010 10011101 11101011 01100001 01111010 11000111 10101101 10110110 00101001 11100000 01101010 01110111 01101101 10001001 11101010 11101000 01111111 00101010 00101110 10101101 11000110 10100110 10100101 10101000 10100000 10011101 10101001 11011101 10110010 11010110 10101011 10110101 10111011 10100010 10010101 11011000 10100111 10000001 10100101 10101011 01101010 11011000 01011010 10011101 11010001 10100101 10100010 10111100 10000010 10000101 10101010 11011010 01110010 11010111 10101011 01111110 10001010 11110010 10100010 11101010 11101100 01111010 11001011 00100010 10100010</span>
          <span style="display:none;">Define the setting and tier of your campaign and start building a Wrath & Glory Character for your session.</span>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="js">
export default {
  components: {},
  head: function () {
    return {
      title: 'Homepage | A Wrath & Glory Fanpage',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Within the Warhammer 40k Universe, the Doctors of Doom are serving the community for Wrath & Glory ' +
            'roleplaying game.'
        }
      ]
    }
  },
  data() {
    return {
    }
  },
}
</script>

<style scoped lang="css">
  .hover-card {
    cursor: pointer;
  }
  .hover-card:hover {
    -webkit-box-shadow: 0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12) !important;
    box-shadow: 0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12) !important;
  }
  .card__image--disabled {
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
  }
</style>
