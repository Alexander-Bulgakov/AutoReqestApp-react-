import React, { useEffect, useState} from 'react';
import { Button, Checkbox, TextField, createTheme, ThemeProvider, FormControlLabel } from '@mui/material';
import SelectCity from '../components/SelectCity';
import { observer } from 'mobx-react-lite';
import SelectBrands from '../components/SelectBrands';
import SelectModels from '../components/SelectModels';
import { useForm } from 'react-hook-form';
import './RequestForm.scss';
import MaskedInput from '../components/MaskedInput';
import { myBrand } from '../store/selectBrand.store';
import { toJS } from 'mobx';

const RequestForm = observer(() => {

  const [clickedButton, setButton] = useState('');
  const [inputValue, setInputValue] = useState('');
  // const [city, setCity] = useState('');
  const [brand, setBrand] = useState('');
  // const [model, setModel] = useState('');
  const { 
    register, 
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({
    mode: "onChange"
  });
  
  console.log('myBrand.requestObject (form) >> ', toJS(myBrand.requestObject));
  useEffect(() => {

    myBrand.getRequestFromApi('/reg_service/api/v1/request/' + myBrand.reqId)
      .then(req => req.data)
      .then(data => {
        console.log('getRequestFromApi >>> ', data);        
        setValue('lastName', data.person.lastName);
        setValue('firstName', data.person.firstName);
        setValue('secondName', data.person.secondName);
        setValue('email', data.person.email);
        setValue('driverLicense', data.person.driverLicense);
        setValue('city.name', data.city.name);
        myBrand.setCity(data.city.name);
        // setCity(data.city.name);
        setValue('brand', data.auto.brand);
        setBrand(data.auto.brand);
        setValue('model.name', data.auto.model.name);
        // setValue('model', {
        //   name: data.auto.model.name
        // });
        myBrand.setModel(data.auto.model.name);
        // setModel(data.auto.model.name);
      });
      
  }, [myBrand.requestObject]);

  const onSubmit = (data: any) => {
    if (clickedButton === 'saveButton') {
      console.log('onSubmit save data >>> ', data);
      myBrand.updateRequest('/reg_service/api/v1/request', data)
      .then(req => console.log('req', req));
    } else {
      console.log(data);
    }
  }

  const theme = createTheme({
    palette: {
      background: {
        paper: "#f6f9f9"
      }
    }
  })

  const handleChangeInput = (event: any) => {
    setInputValue(event.target.value);
  }

  const handleClick = (buttonFlag: string) => {
    setButton(buttonFlag);
  }

  return (
    <div className="content-container">
      <div className="main-header">
        <h1 className="main-header__title">Оставить заявку</h1>
        <p className="main-header__description">Заполните данные формы</p>
      </div>
      <ThemeProvider theme={theme}>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)} >
        <TextField
          required
          focused
          label={errors?.lastName ? errors.lastName.message : null}
          placeholder="Фамилия"
          variant="filled"
          InputProps={{
            disableUnderline: true
          }}
          className="field form-container__input1"
          // helperText={errors?.lastName ? errors.lastName.message : null}
          error={!!errors?.lastName}
          sx={{ input: { bgcolor: "background.paper" } }}
          { ...register(
            "lastName",
            { 
              required: "Обязательное поле", 
              pattern: { 
                value: /^[А-Яа-я-]+$/i,
                message: "Введите фамилию кириллицей"
              }
            }
          )} />
        <TextField 
          required
          focused
          variant="filled"
          InputProps={{
            disableUnderline: true
          }}
          label={errors?.firstName ? errors.firstName.message : null}
          placeholder="Имя"
          className="field form-container__input2" 
          error={!!errors?.firstName}
          sx={{ input: { bgcolor: "background.paper" } }}
          { ...register(
            "firstName", 
            // "person.firstName", 
            { 
              required: "Обязательное поле",
              pattern: {
                value: /^[А-Яа-я]+$/i,
                message: "Введите имя кириллицей" 
              }
            }) 
          } />
        <TextField 
          focused
          variant="filled"
          InputProps={{
            disableUnderline: true
          }}
          label={errors?.secondName ? errors.secondName.message : null}
          // label="Отчество" 
          placeholder="Отчество"
          className="field form-container__input3"
          sx={{ input: { bgcolor: "background.paper" } }}
          error={!!errors?.secondName}
          { ...register(
            "secondName",
            // "person.secondName",
            { 
              pattern: {
                value: /^[А-Яа-я]+$/i,
                message: "Введите отчество кириллицей"
              }
            }
          )} />
        <TextField 
          required
          focused
          variant="filled"
          InputProps={{
            disableUnderline: true
          }}
          label={errors?.email ? errors.email.message : null}
          placeholder="Email"
          className="field form-container__input4" 
          sx={{ input: { bgcolor: "background.paper" } }}
          error={!!errors?.email}
          { ...register(
            "email", 
            // "person.email", 
            { 
              required: "Обязательное поле", 
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Некорректный адрес"
              }
            }
          )} />   
        <TextField 
          required
          focused
          variant="filled"
          label={errors?.driverLicense ? errors.driverLicense.message : null}
          placeholder='Водительское удостоверение'
          InputProps={{
            disableUnderline: true,
            inputComponent: MaskedInput as any,
          }}
          className="field form-container__input5" 
          value={inputValue}
          sx={{ input: { bgcolor: "background.paper" } }}
          { ...register(
            "driverLicense",
            { 
              required: "Введите номер водительского удостоверения",
              pattern: {
                value: /[0-9]{4} [0-9]{6}$/g,
                message: "В формате 0000 0000000"
              }
            }
          )}
          onChange={handleChangeInput}
        />
        <SelectCity 
          title="Город" 
          register={register}
          setValue={setValue}
          // currentCity={city}
           />
        <SelectBrands 
          title="Марка автомобиля" 
          register={register}
          currentBrand={brand} />
        <SelectModels 
          title="Модель" 
          register={register} 
          // currentModel={model} 
          />
        <FormControlLabel 
          control={<Checkbox required />} 
          label="Согласен на обработку персональных данных" 
          className="checkbox" />
        <Button type="submit" variant="contained" onClick={() => handleClick('saveButton')}>Сохранить</Button>
        <Button type="submit" variant="contained" onClick={() => handleClick('registerButton')}>Отправить на регистрацию</Button>
      </form>
      </ThemeProvider>
    </div>
  );
})

export default RequestForm;
