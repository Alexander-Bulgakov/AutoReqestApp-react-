import axios from "axios";
import { makeAutoObservable } from "mobx";

class MainStore {
  brand = ''
  autoDict: any = {}
  license: any = ''
  models: any = []
  currentCity = ''
  currentModel = ''
  successObject: any = {}
  requestObject: any = {}
  requestId: string | null = ''
  processingReq: boolean = false
  registeredrequestId: any = ''

  requests: any = []
  
  constructor() {
    makeAutoObservable(this);
  }
  
  setRequests(data: any) {
    this.requests = data;
  }
  setProcessing() {
    this.processingReq = true;
  }

  setCity(city: any) {
    this.currentCity = city;
  }

  setModel(model: any) {
    this.currentModel = model;    
  }

  setRegisteredReq(id: any) {
    this.registeredrequestId = id;
  }

  async getCitiesFromAPI(url: string) {
      const result = await axios.get<Request, any>(url);
      return result.data.items;
  }

  async getBrandsFromAPI(url: string) {
    const result = await axios.get<any, any>(url)
      .then(res => {
        const obj: {} = res.data.reduce((acc: any, val: any) => {
          const key = Object.keys(val)[0];
          acc[key] = val[key];
          return acc
        }, {})
        return obj
      })
      this.setAutoDict(result);
      return result;
  }

  async getRequestsFromAPI(url: string) {
    const requests = await axios.get(url)
    return requests
  }

  setLicense(value: any) {
    this.license = value;
  }

  setBrand(value: any) {
    this.brand = value;
  }

  setAutoDict(obj: any) {
    this.autoDict = obj;
  }

  setSuccessObject(id: any, brand: any, model: any, date: any) {
    this.successObject.id = id;
    this.successObject.brand = brand;
    this.successObject.model = model;
    this.successObject.date = date;
  }

  setRequestId(id: string | null){
    this.requestId = id;    
  }

  setRequestObject(data: any) {
    this.requestObject = data;
  }

  async getRequestFromApi(url: string) {
    const request = await axios.get(url);
    return request;
  }
  
  async createRequestDraft(url: string, data: {}) {
    const request = await axios.post(url, data);
    this.requestObject = request.data;
    return request;
  }

  async updateRequest(url: string, data: {}) {    
    const request = await axios.put(url, data);
    return request;
  }

  async registrationRequest(url: string, data: {}) {
    const request = await axios.post(url, data)
    return request;
  }

  async statusRequest(url: string) {
    const request = await axios.get(url);
    return request;

  }
}
export const myStore = new MainStore();

