<template lang="html">

  <section class="archetype-selection">
    <h1>archetype-selection Component</h1>

    <v-container grid-list-md>

      <v-layout>
        <v-flex>
          <v-icon color="lighten-1">filter_list</v-icon>
          <v-btn round>Militarum</v-btn>
          <v-btn round>Ministorum</v-btn>
          <v-btn round>Astartes</v-btn>
          <v-btn round>Heretec</v-btn>
          <v-btn round disabled>Ork</v-btn>
          <v-btn round disabled>Eldar</v-btn>
          <v-btn color="orange"><v-icon color="lighten-1">clear</v-icon> Clear</v-btn>
        </v-flex>
      </v-layout>

      <v-layout row flex>

        <v-flex xs6>
          <div class="species-selection__list">
            <v-list two-line>

              <v-list-tile
                      v-for="item in archetypeOptions"
                      avatar
                      @click="selectedArchetype = item"
              >
                <v-list-tile-avatar tile>
                  <img :src="item.avatar" />
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{item.label}} - {{item.group}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{item.description}}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">info</v-icon>
                  </v-btn>
                </v-list-tile-action>

              </v-list-tile>

            </v-list>
          </div>
        </v-flex>

        <v-flex xs6>

          <v-card v-if="selectedArchetype">
            <v-img :src="selectedArchetype.avatar" height="200px"></v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="headline md0">{{selectedArchetype.label}}</h3>
              </div>
            </v-card-title>
            <v-card-text>{{selectedArchetype.description}}</v-card-text>
            <v-card-text>
              <h4 class="title md0">Prerequisites</h4>
              <h5 class="subheading md0">Attributes</h5>
              <ul v-for="(value, key) in selectedArchetype.attributes">
                <li>{{key | capitalize}}: {{value}}</li>
              </ul>
              <h5 class="subheading md0">Skills</h5>
              <ul v-for="(value, key) in selectedArchetype.skills">
                <li>{{key | capitalize}}: {{value}}</li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary">Select Archetype</v-btn>
            </v-card-actions>
          </v-card>

        </v-flex>

      </v-layout>

    </v-container>

  </section>

</template>

<script lang="js">
  export default  {
    name: 'archetype-selection',
    props: [],
    mounted() {

    },
    data() {
      return {
        archetypeGroups: [
          { label: 'Militarum', species: ['human'] },
          { label: 'Agents', species: ['human'] },
          { label: 'Aeldary', species: ['eldar'] },
          { label: 'heretec', species: ['human', 'astartes'] },
          { label: 'Astartes', species: ['astartes', 'primaris'] },
        ],
        archetypeOptions: [
          { group: 'Adepta Soroitas', label: 'Sister of Battle', tier: 2, species: 'human', attributes: {strength:3, agility:3, toughness:3, willpower:3}, skills: {scholar:1, 'ballistic Skill':2, 'weapon Skill':2}, description: 'As the militant arm of the of the Adeptus Ministorum, the Sisters of Battle are equipped to engage any who would dare to oppose the Imperial Creed. It is their sacred duty to cleanse the galaxy of heresy and corruption, wherever they should fi nd it, including within the various organisations of the Imperium of Man. Due to their shared goals, the Orders Militant often work in conjunction with the Imperial Inquisition, though they remain distinct organisations. Many of the orders maintain convents on Shrine Worlds, so that they can more easily defend those places most blessed to the Imperial Creed', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrrCEl2BdBEHp_7h8k9aenXxDlhqNeLRwtzcvRv-XLMKgSpHOi' },
          { label: 'Tactical Marine', description: '', tier: 2, group: 'Adeptus Ministorum', avatar: 'https://warhammerart.com/wp-content/uploads/2015/10/space-marines-codex-800x1200.jpg' },
          { label: 'Imperial Guardsman', description: '', tier: 2, group: 'Adeptus Ministorum', avatar: 'https://warhammerart.com/wp-content/uploads/2015/10/space-marines-codex-800x1200.jpg' },
          { label: 'Inquisitional Akolyth', description: '', tier: 2, group: 'Adeptus Ministorum', avatar: 'https://warhammerart.com/wp-content/uploads/2015/10/space-marines-codex-800x1200.jpg' },
        ],
        selectedArchetype: null
      }
    },
    methods: {

    },
    computed: {

    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
}
</script>

<style scoped lang="css">
  .archetype-selection {

  }
</style>
