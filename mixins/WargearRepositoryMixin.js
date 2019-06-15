import axios from 'axios';

const apiBaseUrl = 'https://api.sheety.co';

export default {
  mounted() {
    console.info('Fetching wargear from sheety.co ...');
    axios.get(`${apiBaseUrl}/cd93dfab-c658-4099-8a93-e6cc202b3488`)
      .then((response) => {
        this.wargearRepository = response.data;
        console.log(`Fetched ${this.wargearRepository.length} wargear entries.`);
      });
  },
  data: function() {
    return {
      wargearRepository: undefined,
    }
  },
}