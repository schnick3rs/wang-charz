import axios from "axios";

const apiBaseUrl = 'https://api.sheety.co';

export default {
  mounted() {
    console.info('Fetching species from sheety.co ...');
    axios.get(`${apiBaseUrl}/04c8f13a-c4ed-4f05-adad-7cf11db62151`)
      .then((response) => {
        this.speciesRepository = response.data;
        console.log(`Fetched ${this.speciesRepository .length} species.`);
      });
    axios.get(`${apiBaseUrl}/a192e4d5-a73f-46c0-929e-f3eca3dde0a0`)
      .then((response) => {
        this.speciesAbilitiesRepository = response.data;
        console.log(`Fetched ${this.speciesAbilitiesRepository .length} species abilities.`);
      });
  },
  data: function() {
    return {
      speciesRepository : undefined,
      speciesAbilitiesRepository : undefined,
      astartesChapterRepository: [
        { key: 'bloodAngles', name: 'Blood Angels', beliefsAndTraditions: [
            { name: 'Blood Frenzy', effect: 'When attacking in melee combat, a Blood Angels Space Marine may reroll up to Rank damage dice on every attack.' },
            { name: 'The Red Thirst', effect: 'After engaging in melee combat, Blood Angels must pass a Willpower test (DN 3). On a failure, the Blood Angels Space Marine feels a strong urge to drink the blood of the fallen—the player may choose how to respond to this urge. If the failure involves a complication, the Blood Angels Space Marine may not resist this urge. The Game Master may alter the DN based on how long it has been since the character has tasted blood.' },          ]
        },
        { key: 'darkAngles', name: 'Dark Angels', beliefsAndTraditions: [

          ]
        },
        { key: 'imperialFists', name: 'Imperial Fists', beliefsAndTraditions: [
            { name: 'Blood Frenzy', effect: '' },
            { name: 'The Red Thirst', effect: '' },
          ]
        },
      ],
    }
  },
}