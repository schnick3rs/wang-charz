import axios from "axios";

const apiBaseUrl = 'https://api.sheety.co';

export default {
  mounted() {
    console.info('Fetching from sheety.co ...');
    axios.get(`${apiBaseUrl}/2d702477-7a22-4d71-9c25-6119ee216253`)
      .then((response) => {
        this.skillRepository = response.data;
        console.log(`Fetched ${this.skillRepository.length} entries.`);
      });
  },
  data: function() {
    return {
      skillRepository: undefined,
    }
  },
}