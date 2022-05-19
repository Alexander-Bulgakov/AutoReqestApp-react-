import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import axios from 'axios';
import SelectUI from '../components/SelectUI';
import { Request, City } from '../types/types';
// import { myTimer } from 'store/Selects.store';
// import { observer } from "mobx-react-lite";
import { AutoDict } from '../types/types';
import Selectbrands from '../components/SelectBrands';

const RequestForm = () => {

  const baseDictionariesURL = '/reg_service/api/v1/dictionary/';
  const citiesID = 'DICT_CITIES';
  const brandsID = 'DICT_AUTO';
  const [cities, setСity] = useState<City[]>([]);
  const [autoBrands, setBrand] = useState([]);
  useEffect(() => {
    const reqData = async () => {
      const result = await axios.get<Request>(baseDictionariesURL + citiesID);
          setСity(result.data.items);
    }
    reqData();
  }, []);

  const autoArr: any = [];
  useEffect(() => {
    const brandsRequest = async () => {
      const result = await axios.get<AutoDict, any>(baseDictionariesURL + brandsID);
      const brandsArr = result.data;
      // console.log('brandsArr >>> ', brandsArr);
      brandsArr.map((item: {}) => {
        autoArr.push(...Object.keys(item))
      });
      setBrand(autoArr);
    }
    brandsRequest();
  }, []);
  // console.log(autoBrands);
  // useEffect(() => {
  //   axios.get<ServerResponse, []>('/reg_service/api/v1/dictionary/DICT_AUTO')
  //     .then((result) => {
  //       result.map(item => {
  //         autoArr.push(...Object.keys(item))
  //       });
  //       setBrand(autoArr);
  //   });
  // }, []);
  const handleSubmitSend = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Форма отправлена');
  }
  return (
    <div className="content-container">
      <div className="main-header">
        <h1 className="main-header__title">Оставить заявку</h1>
        <p className="main-header__description">Заполните данные формы</p>
      </div>
      <form className="form-container" onSubmit={handleSubmitSend}>
        <Input placeholder="Фамилия" className="field form-container__input1" disableUnderline />
        <Input placeholder="Имя" className="field form-container__input2" disableUnderline />
        <Input placeholder="Отчество" className="field form-container__input3" disableUnderline />
        <Input placeholder="Email" className="field form-container__input4" disableUnderline />
        <Input placeholder="Водительское удостоверение" className="field form-container__input5" disableUnderline />
        <SelectUI title="Город" items={cities} />
        <Selectbrands title="Марка автомобиля" items={autoBrands} />
        <SelectUI title="Модель" items={[]} />
        <FormControlLabel control={<Checkbox />} label="Согласен на обработку персональных данных" className="checkbox" />
        <Button type="submit" variant="contained">Сохранить</Button>
        <Button type="submit" variant="contained">Отправить на регистрацию</Button>
      </form>
    </div>
  );
}

export default RequestForm;
