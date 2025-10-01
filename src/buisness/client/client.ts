import axios from "axios";


export class Client {

  protected request: any;

  constructor(request: any) {
    this.request = request;
  }

  async get(endPoint: string, header?: object) {
    return this.request.get(endPoint, header);
  }

  async post(endPoint: string, payload: object, header?: object) {
    return this.request.post(endPoint, payload, header);
  }

  async put(endPoint: string, payload: object, header?: object) {
    return this.request.put(endPoint, payload, header);
  }

  async delete(endPoint: string, header?: object) {
    return this.request.delete(endPoint, header);
  }
}
