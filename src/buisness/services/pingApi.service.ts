import axios from "axios";
import { urls } from "../../data/data";

export async function pingApi() {
  try {
    const response = await axios.get(`${urls.PING_URL}`);
    console.log('Ping Response status:', response.status);
    return response.status;
    
  } catch (error) {
    console.error(`Error pinging API:`, error);
    throw error;
  }
}