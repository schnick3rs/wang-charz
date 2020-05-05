import axios from 'axios';

const apiBaseUrl = 'https://api.sheety.co';

export default {

  async asyncData({ params }) {
    const skillResponse = await axios.get('https://api.sheety.co/669365df-fa15-4003-ad7d-21d86e11b69a');
    return {
      skillRepository: skillResponse.data || [],
    };
  },

  mounted() {
    console.info('Fetching from sheety.co ...');
    axios.get(`${apiBaseUrl}/669365df-fa15-4003-ad7d-21d86e11b69a`)
      .then((response) => {
        this.skillRepository = response.data;
        console.log(`Fetched ${this.skillRepository.length} attributes.`);
      });
  },
  data() {
    return {
      skillRepository: undefined,
    };
  },
};
