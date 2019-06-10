import axios from 'axios';

const apiBaseUrl = 'https://api.sheety.co';

export default {
  mounted() {
    console.debug('Fetching from sheety.co ...');
    axios.get(`${apiBaseUrl}/e39d8899-85e5-4281-acf4-4d854bd39994`)
      .then((response) => {
        this.archetypeRepository = response.data;
        console.debug(`Fetched ${this.archetypeRepository .length} entries.`);
      });
    axios.get(`${apiBaseUrl}/6790490e-d9cc-439f-839b-dec3f1f8edc0`)
      .then((response) => {
        this.archetypeAbilityRepository = response.data;
        console.debug(`Fetched ${this.archetypeAbilityRepository .length} entries.`);
      });
  },
  data: function() {
    return {
      archetypeRepository : undefined,
      archetypeAbilityRepository: undefined,
    }
  },
}