import axios from 'axios';
import { urls } from '../../data/data';

export const createToken = async (userName: string, password: string) => {
  try {
    const response = await axios.post(`${urls.AUTH_URL}`, {
      username: userName,
      password: password
    });
    console.log('Token created:', response.data.token);
    console.log('Token status:', response.status);
    return response.data.token;

  } catch (error) {
    console.error(`Error creating token:`, error);
  }
}
