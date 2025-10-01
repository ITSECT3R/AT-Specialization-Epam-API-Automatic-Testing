import axios from "axios";

export class Client {

  async get(endPoint: string, header?: object) {
    return axios.get(endPoint, header);
  }

  async post(endPoint: string, payload: object, header?: object) {
    return axios.post(endPoint, payload, header);
  }

  async put(endPoint: string, payload: object, header?: object) {
    return axios.put(endPoint, payload, header);
  }

  async delete(endPoint: string, header?: object) {
    return axios.delete(endPoint, header);
  }

  async patch(endPoint: string, payload: object, header?: object) {
    return axios.patch(endPoint, payload, header);
  }
}
