import axios from 'axios';
import { urls } from '../../data/data';

export async function getAllBookingIds() {
  try {
    const response = await axios.get(`${urls.BASE_URL}`);
    console.log('Response status:', response.status);
    console.log('Current Booking IDs:', response.data);
    return response.data;

  } catch (error) {
    console.error(`Error fetching booking IDs:`, error);
    throw error;
  }
}
