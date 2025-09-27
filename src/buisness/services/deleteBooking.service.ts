import axios from "axios";
import { urls } from "../../data/data";

export async function deleteBooking(bookingId: number, token: string) {
  try {
    const response = await axios.delete(
      `${urls.BASE_URL}/${bookingId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Cookie: `token=${token}`
        }
      }
    );
    console.log(`Booking ID ${bookingId} deleted.`);
    console.log('Response status:', response.status);
    return response;
    
  } catch (error) {
    console.error(`Error deleting booking ID ${bookingId}:`, error);
  }
}