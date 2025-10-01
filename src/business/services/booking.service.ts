import { urls } from "../../data/data";
import { Client } from "../client/client";

export class BookingService extends Client {

  async deleteBooking(bookingId: number, token: string) {
  try {
    const response = await this.delete(
      `${urls.BASE_URL}/${bookingId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Cookie: `token=${token}`
        }
      }
    );

    return response;
    
    } catch (error) {
      console.error(`Error deleting booking ID ${bookingId}:`, error);
    }
  }

  async updatePartialBooking(bookingId: number, updateData: object, token: string) {
  try {
    const response = await this.patch(
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
    return response.data;

    } catch (error) {
      console.error(`Error updating booking ID ${bookingId}:`, error);
    }
  }

  async updateBooking(bookingId: number, updatedData: object, token: string) {
  try {
    const response = await this.put(
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
    return response.data;
    
    } catch (error) {
      console.error(`Error updating booking ID ${bookingId}:`, error);
    }
  }

  async createBooking(bookingData: object) {
  try {
    const response = await this.post(
      `${urls.BASE_URL}`,
      bookingData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  async pingApi() {
  try {

    const response = await this.get(`${urls.PING_URL}`);
    return response.status;
    
  } catch (error) {
      throw new Error(`Error pinging API: ${error}`);
    }
  }

  async getAllBookingIds() {
  try {
    const response = await this.get(`${urls.BASE_URL}`);

    return response.data;
    } catch (error) {
      console.error(`Error fetching booking IDs:`, error);
      throw error;
    }
  }

  async getSpecificBookingId(bookingId: number) {
  try {
    const response = await this.get(`${urls.BASE_URL}/${bookingId}`, {
      headers: {
        Accept: `application/json`
      }
    });

    return response.data;
    
    } catch (error) {
      console.error(`Error fetching specific booking ID:`, error);
    }
  }

  async createToken(userName: string, password: string) {

    try {
      const response = await this.post(`${urls.AUTH_URL}`, {
        username: userName,
        password: password
      });

      return response.data.token;

    }catch (error) {
      throw new Error(`Error creating token: ${error}`);
    }
  }
}
