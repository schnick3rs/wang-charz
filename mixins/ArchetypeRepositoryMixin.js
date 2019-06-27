import axios from 'axios'

export default {
  async asyncData({ params }) {
    const archetypeResponse = await axios.get(`https://api.sheety.co/e39d8899-85e5-4281-acf4-4d854bd39994`);
    const archetypeAbilityResponse = await axios.get(`https://api.sheety.co/6790490e-d9cc-439f-839b-dec3f1f8edc0`);
    return {
      archetypeRepository: archetypeResponse.data || [],
      archetypeAbilityRepository: archetypeAbilityResponse.data || [],
    };
  },
}
