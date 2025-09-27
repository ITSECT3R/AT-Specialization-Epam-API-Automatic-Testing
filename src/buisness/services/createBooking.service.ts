import axios from "axios";
import { urls } from "../../data/data";

export async function createBooking(bookingData: object) {
  try {
    const response = await axios.post(
      `${urls.BASE_URL}`,
      bookingData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );
    console.log('Booking created with ID:', response.data.bookingid);
    console.log('Response status:', response.status);
    console.log('Booking data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
  }
};
