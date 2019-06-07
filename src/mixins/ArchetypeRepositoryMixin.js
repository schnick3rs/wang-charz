import axios from 'axios';

const apiBaseUrl = 'https://api.sheety.co';

export default {
  mounted() {
    console.info('Fetching from sheety.co ...');
    axios.get(`${apiBaseUrl}/e39d8899-85e5-4281-acf4-4d854bd39994`)
      .then((response) => {
        this.archetypeRepository = response.data;
        console.log(`Fetched ${this.archetypeRepository .length} entries.`);
      });
  },
  data: function() {
    return {
      archetypeRepository : undefined,
    }
  },
}