import { makeAutoObservable, toJS } from "mobx";
// import { Auto } from '../types/types';
// import { observer } from "mobx-react-lite";

class BrandChoice {
  brand = ''
  autoDict: any = {}
  // autoDict<T> = {
  //   [K in keyof T]: [

  //   ]
  // }
  
  models: any = []

  constructor() {
      makeAutoObservable(this);
  }

  brandChange(event: any) {
    this.brand = event.target.value;
    console.log('выбрали марку во втором слекте (стор) - ', this.brand);
  }

  modelChange(arr: any) {
    this.models = arr;
    console.log('положили модели марки в стор (стор) >> ', toJS(this.models));
  }

  setAutoDict(obj: any) {
    this.autoDict = obj;
    console.log('словарь авто, стор >> ', toJS(this.autoDict))
  }
}
export const myBrand = new BrandChoice();

