import axios from 'axios';

const citiesReq = async () => {

  await axios.get('/reg_service/api/v1/dictionary/DICT_CITIES')
    .then((result) => {
      // console.log(result.data.items);
      setСity(result.data.items);
    });

}

const reqData = async () => {
  const result = await axios.get<Request>('/reg_service/api/v1/dictionary/DICT_CITIES');
      // console.log(result.data.items);
      setСity(result.data.items);
}

export default { reqData }