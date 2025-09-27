import axios from "axios";
import { urls } from "../../data/data";

export async function updateBooking(bookingId: number, updatedData: object, token: string) {
  try {
    const response = await axios.put(
      `${urls.BASE_URL}/${bookingId}`,
      updatedData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Cookie: `token=${token}`
        }
      }
    );
    console.log(`Booking ID ${bookingId} fully updated.`);
    console.log('Response status:', response.status);
    console.log('Updated booking data:', response.data);
    return response.data;
    
  } catch (error) {
    console.error(`Error updating booking ID ${bookingId}:`, error);
  }
}
