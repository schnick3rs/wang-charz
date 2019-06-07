import axios from "axios";

const apiBaseUrl = 'https://api.sheety.co';

export default {
  mounted() {
    console.info('Fetching from sheety.co ...');
    axios.get(`${apiBaseUrl}/ff93c641-c553-4379-85c0-ca2acd417333`)
      .then((response) => {
        this.attributeRepository = response.data; // all attributes;
        console.log(`Fetched ${this.attributeRepository.length} attributes.`);
      });
  },
  data: function() {
    return {
      attributeRepository: undefined,
    }
  },
}