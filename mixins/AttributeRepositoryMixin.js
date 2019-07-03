import axios from 'axios';

export default {
  async asyncData({ params }) {
    const attributeResponse = await axios.get('https://api.sheety.co/ff93c641-c553-4379-85c0-ca2acd417333');
    return {
      attributeRepository: attributeResponse.data || [],
    };
  },
};
