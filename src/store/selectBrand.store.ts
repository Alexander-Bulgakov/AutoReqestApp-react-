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
  successObject: any = {}

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
    console.log('license, store >> ', this.license)
  }

  setBrand(value: any) {
    this.brand = value;
    console.log('смена брэнда из useEffect brands', this.brand);
  }

  setAutoDict(obj: any) {
    this.autoDict = obj;
    console.log('словарь авто, стор >> ', toJS(this.autoDict))
  }

  setSuccessObject(id: any, brand: any, model: any, date: any) {
    this.successObject.id = id;
    this.successObject.brand = brand;
    this.successObject.model = model;
    this.successObject.date = date;
  }

  async createRequestDraft(url: string, data: {}) {
    const request = await axios.post(url, data);
    return request;
  }
}
export const myBrand = new BrandChoice();

