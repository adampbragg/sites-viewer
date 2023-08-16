import axios from 'axios';

export const getSites = async () => {
  const response = await axios.get('http://localhost:3001/sites');
  return response.data;
}