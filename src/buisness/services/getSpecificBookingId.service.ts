import axios from 'axios';
import { urls } from '../../data/data';

export async function getSpecificBookingId(bookingId: number) {
  try {
    const response = await axios.get(`${urls.BASE_URL}/${bookingId}`, {
      headers: {
        Accept: `application/json`
      }
    });
    console.log('Response status:', response.status);
    console.log(`Details for Booking ID ${bookingId}:`, response.data);
    return response.data;
    
  } catch (error) {
    console.error(`Error fetching specific booking ID:`, error);
  }
}
