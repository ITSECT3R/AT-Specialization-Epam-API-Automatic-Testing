import axios from "axios";
import { urls } from "../../data/data";

export async function updatePartialBooking(bookingId: number, updateData: object, token: string) {
  try {
    const response = await axios.patch(
      `${urls.BASE_URL}/${bookingId}`,
      updateData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Cookie: `token=${token}`
        }
      }
    );
    console.log(`Booking ID ${bookingId} partially updated.`);
    console.log('Response status:', response.status);
    console.log('Updated booking data:', response.data);
    return response.data;
    
  } catch (error) {
    console.error(`Error updating booking ID ${bookingId}:`, error);
  }
}
