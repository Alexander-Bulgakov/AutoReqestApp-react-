import React, { useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Checkbox, TextField, createTheme, ThemeProvider, FormControlLabel } from '@mui/material';
import { myStore } from '../store/MyStore.store';
import SelectCity from '../components/SelectCity';
import SelectBrands from '../components/SelectBrands';
import SelectModels from '../components/SelectModels';
import MaskedInput from '../components/MaskedInput';
import './RequestForm.scss';

const RequestForm = observer(() => {

  const [clickedButton, setButton] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [brand, setBrand] = useState('');
  const navigate = useNavigate();
  const { 
    register, 
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({
    mode: "onSubmit",
  });
  
  useEffect(() => {
    
    myStore.getRequestFromApi('/reg_service/api/v1/request/' + myStore.requestId)
      .then(req => req.data)
      .then(data => {
        setValue('lastName', data.person.lastName);
        setValue('firstName', data.person.firstName);
        setValue('secondName', data.person.secondName);
        setValue('email', data.person.email);
        setValue('driverLicense', data.person.driverLicense);
        setValue('city.name', data.city.name);
        myStore.setCity(data.city.name);
        setValue('brand', data.auto.brand);
        setBrand(data.auto.brand);
        setValue('model.name', data.auto.model.name);
        myStore.setModel(data.auto.model.name);
      });
      
  }, []);

  const onSubmit = (data: any) => {
    data.id = myStore.requestId;
    if (clickedButton === 'saveButton') {
      myStore.updateRequest('/reg_service/api/v1/request', data)
      .then(() => navigate('/'));
    } else {
      myStore.setRegisteredReq(data.id);
      myStore.registrationRequest('reg_service/api/v1/request/registration', data)
      .then(() => navigate('/Loading'));
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
          className="field"
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
          className="field" 
          error={!!errors?.firstName}
          sx={{ input: { bgcolor: "background.paper" } }}
          { ...register(
            "firstName", 
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
          placeholder="Отчество"
          className="field"
          sx={{ input: { bgcolor: "background.paper" } }}
          error={!!errors?.secondName}
          { ...register(
            "secondName",
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
          className="field" 
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
          className="form-container__input-license" 
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
           />
        <SelectBrands 
          title="Марка автомобиля" 
          register={register}
          currentBrand={brand} />
        <SelectModels 
          title="Модель" 
          register={register}
          setValue={setValue}
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
