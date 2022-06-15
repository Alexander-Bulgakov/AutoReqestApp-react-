import axios from "axios";
import { makeAutoObservable, toJS } from "mobx";

class BrandChoice {
  brand = ''
  autoDict: any = {}
  license: any = ''
  models: any = []
  currentCity = ''
  currentModel = ''
  itemObject: any = {}
  requestObject: any = {}
  reqId: string | null = ''
  // formObject: any = {}
  successReq = false

  setCity(city: any) {
    this.currentCity = city;
  }

  setModel(model: any) {
    this.currentModel = model;
    console.log('this.currentModel >>> ', this.currentModel);
    
  }

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

  setRequestId(id: string | null){
    this.reqId = id;    
    console.log('reqId >>', this.reqId);
  }

  setRequestObject(data: any) {
    this.requestObject = data;
  }

  // setFormObject(data: any){

  //   const {auto, city, createDate, id, person, status} = data;
  //   this.formObject = {
  //     id: id,
  //     status: {
  //       code: status.code
  //     },
  //     person: {
  //       lastName: person.lastName,
  //       firstName: person.firstName,
  //       secondName: person.secondName,
  //       driverLicense: person.driverLicense,
  //       email: person.email
  //     },
  //     auto: {
  //       brand: auto.brand,
  //       model: {
  //         id: auto.model.id,
  //         name: auto.model.name
  //       }
  //     },
  //     city: {
  //       code: city.code,
  //       name: city.name
  //     },
  //     createDate: createDate
  //   }
    
  // }

  async getRequestFromApi(url: string) {
    const request = await axios.get(url);
    console.log('this.requestObject >>> ', toJS(this.requestObject)) 
    return request;
  }
  
  async createRequestDraft(url: string, data: {}) {
    const request = await axios.post(url, data);
    this.requestObject = request.data;
    console.log('this.requestObject >>> ', toJS(this.requestObject)) 
    return request;
  }

  async updateRequest(url: string, data: {}) {
    const request = await axios.put(url, data);
    return request;
  }
}
export const myBrand = new BrandChoice();

