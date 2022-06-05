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
      // .then(obj => {
      //   myBrand.setAutoDict(obj);
      //   // setBrands(Object.keys(obj));
      //   console.log('собрали объект с бэка в форме - reduce >> ', obj);
      // })
      // console.log('result.data >>> ', result.data)
      // return result.data;
      return result;
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
}
export const myBrand = new BrandChoice();

