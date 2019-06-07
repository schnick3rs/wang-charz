import axios from "axios";

const apiBaseUrl = 'https://api.sheety.co';

export default {
  mounted() {
    console.info('Fetching from sheety.co ...');
    axios.get(`${apiBaseUrl}/669365df-fa15-4003-ad7d-21d86e11b69a`)
      .then((response) => {
        this.traitRepository = response.data;
        console.log(`Fetched ${this.traitRepository.length} attributes.`);
      });
  },
  data: function() {
    return {
      traitRepository: undefined,
    }
  },
}