import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import SelectUI from '../components/SelectUI';
import { City } from '../types/types';
import { observer } from "mobx-react-lite";
// import { AutoDict } from '../types/types';
import SelectBrands from '../components/SelectBrands';
import SelectModels from '../components/SelectModels';
import { useGetCities, request } from '../API';
import { myBrand } from '../store/selectBrand.store';
// import { toJS } from 'mobx';

const RequestForm = observer(() => {
  
  const [cities, setСity] = useState<City[]>([]);

  const [autoBrands, setBrands] = useState<any>([]);
  // const [models, setModel] = useState([]);

  useEffect(() => {
    useGetCities('/reg_service/api/v1/dictionary/DICT_CITIES')
      .then(res => setСity(res));
  }, []);

  useEffect(() => {
    request('/reg_service/api/v1/dictionary/DICT_AUTO')
      .then(res => {
        const obj: {} = res.reduce((acc: any, val: any) => {
          const key = Object.keys(val)[0];
          acc[key] = val[key];
          return acc
        }, {})
        return obj
      })
      .then(obj => {
        myBrand.setAutoDict(obj);
        setBrands(Object.keys(obj));
        console.log('собрали объект с бэка в форме - reduce >> ', obj);
      })
  }, []);

  // useEffect(() => {
  //   const obj = toJS(myBrand.autoDict);
  //   console.log('obj >> ', obj[myBrand.brand]);
  //   myBrand.modelChange(obj[myBrand.brand]);
  // }, [myBrand.brand])

  // useEffect(() => {
  //   console.log('models req from store', toJS(myBrand.models));
  //   // setModel(toJS(myBrand.models));
  // }, [myBrand.models])

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
        <SelectBrands title="Марка автомобиля" items={autoBrands} />
        <SelectModels title="Модель" />
        <FormControlLabel control={<Checkbox />} label="Согласен на обработку персональных данных" className="checkbox" />
        <Button type="submit" variant="contained">Сохранить</Button>
        <Button type="submit" variant="contained">Отправить на регистрацию</Button>
      </form>
    </div>
  );
})

export default RequestForm;
