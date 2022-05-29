import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { City, Request } from './types/types';
import { AutoDict, Request } from './types/types';

const useGetCities = (url: string) => {

    const reqData = async () => {
      const result = await axios.get<Request, any>(url);
        return result.data.items;
    }

  return reqData();
}

const brandsRequest = (url: string) => {
  const autoArr: any = [];
   
  const data = async () => {
    const result = await axios.get<AutoDict, any>(url);
    const brandsArr = result.data;
    brandsArr.map((item: {}) => {
      autoArr.push(...Object.keys(item))
    });
    return autoArr;
  }
  return data();
}

const request = async (url: string) => {
  const result = await axios.get(url);
  return result.data;
}
// const modelsRequest = (url: string) => {
//   const data = async () => {
//     const result = await axios.get<AutoDict, any>(url);
//     const brandsArr = result.data;
//     const model = brandsArr.filter((item: { hasOwnProperty: (arg: string) => any; }) => {
//       return item.hasOwnProperty(brand);
//     })

//   }
//   // console.log('from SelectModels >> ', model);

// }

export { useGetCities, brandsRequest, request };
