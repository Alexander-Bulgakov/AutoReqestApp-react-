import { makeAutoObservable } from "mobx";
import axios from 'axios';
import { Request } from '../types/types';

// import { observer } from "mobx-react-lite";

class Timer {
  cities = 0

  constructor() {
      makeAutoObservable(this);
  }

  getCities() {
    axios.get<Request>('/api/dictionary/DICT_CITIES')
      .then((result) => {
        // console.log(result.data.items);
        result.data.items;
      });
  }

}
export const myTimer = new Timer();
