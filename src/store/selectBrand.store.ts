import axios from "axios";
import { makeAutoObservable, toJS } from "mobx";
// import { AutoDict } from "types/types";
// import { Auto } from '../types/types';
// import { observer } from "mobx-react-lite";

class BrandChoice {
  brand = ''
  autoDict: any = {}
  license: any = ''
  models: any = []
  itemObject: any = {}
  reqObject: any = {}
  reqId = ''

  constructor() {
      makeAutoObservable(this);
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

  setItemObject(id: any, brand: any, model: any, date: any) {
    this.itemObject.id = id;
    this.itemObject.brand = brand;
    this.itemObject.model = model;
    this.itemObject.date = date;
  }

  setRequestId(id: string){
    this.reqId = id;
    console.log('reqID', this.reqId);
    
  }

  async getRequestFromApi(url: string) {
    const request = await axios.get(url);
    // this.reqObject = request.data;
    console.log('this.reqObject >>> ', toJS(this.reqObject)) 
    return request;
  }
  async createRequestDraft(url: string, data: {}) {
    const request = await axios.post(url, data);
    this.reqObject = request.data;
    console.log('this.reqObject >>> ', toJS(this.reqObject)) 
    return request;
  }

  async updateRequest(url: string, data: {}) {
    const request = await axios.put(url, data);
    return request;
  }
}
export const myBrand = new BrandChoice();

