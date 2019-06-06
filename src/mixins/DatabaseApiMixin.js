import axios from "axios";

/**
 * https://api.sheety.co/669365df-fa15-4003-ad7d-21d86e11b69a
 */
const apiBaseUrl = 'https://api.sheety.co';

export default {
  methods: {
    fetchFromDb(apiEndpoint, targetRepository) {
      axios.get(`${apiBaseUrl}/${apiEndpoint}`)
        .then((response) => {
          targetRepository = response.data;
      })
    }
  }
}