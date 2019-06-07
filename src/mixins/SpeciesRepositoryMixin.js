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
  },
  data: function() {
    return {
      speciesRepository : undefined,
    }
  },
}