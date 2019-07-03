import axios from 'axios';

const apiBaseUrl = 'https://api.sheety.co';

export default {

  async asyncData({ params }) {
    const traitResponse = await axios.get('https://api.sheety.co/2d702477-7a22-4d71-9c25-6119ee216253');
    return {
      traitRepository: traitResponse.data || [],
    };
  },
};
