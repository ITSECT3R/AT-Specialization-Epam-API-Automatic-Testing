import { createToken } from "../services/create-token.service";
import { createBooking } from "../services/createBooking.service";
import { deleteBooking } from "../services/deleteBooking.service";
import { getAllBookingIds } from "../services/getAllBookingIds.service";
import { getSpecificBookingId } from "../services/getSpecificBookingId.service";
import { updateBooking } from "../services/updateBooking.service";
import { updatePartialBooking } from "../services/updatePartialBooking.service";
import { pingApi } from "../services/pingApi.service";

class Client {

  protected getMethods = {
    getAllBookingIds,
    getSpecificBookingId
  };

  protected postMethods = {
    createBooking,
    createToken
  };

  protected putMethods = {
    updateBooking,
    updatePartialBooking
  };

  protected deleteMethods = {
    deleteBooking
  };

  protected pingMethod = {
    pingApi
  };
  
  get = {
    getAllBookingIds: this.getMethods.getAllBookingIds,
    getSpecificBookingId: this.getMethods.getSpecificBookingId
  };

  post = {
    createBooking: this.postMethods.createBooking,
    createToken: this.postMethods.createToken
  };

  put = {
    updateBooking: this.putMethods.updateBooking,
    updatePartialBooking: this.putMethods.updatePartialBooking
  };

  delete = {
    deleteBooking: this.deleteMethods.deleteBooking
  };

  ping = {
    pingApi: this.pingMethod.pingApi
  };
}

export const client = new Client();
