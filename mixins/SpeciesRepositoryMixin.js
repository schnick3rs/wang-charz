import axios from 'axios'

export default {
  async asyncData({ params }) {
    const speciesResponse = await axios.get(`https://api.sheety.co/04c8f13a-c4ed-4f05-adad-7cf11db62151`)
    const speciesAbilitiesResponse = await axios.get(`https://api.sheety.co/a192e4d5-a73f-46c0-929e-f3eca3dde0a0`)
    return {
      speciesRepository: speciesResponse.data || [],
      speciesAbilitiesRepository: speciesAbilitiesResponse.data || []
    }
  }
}
