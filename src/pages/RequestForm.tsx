import React, { useState} from 'react';
import { Button, Checkbox, TextField, createTheme, ThemeProvider, FormControlLabel } from '@mui/material';
import SelectCity from '../components/SelectCity';
// import { City } from '../types/types';
import { observer } from "mobx-react-lite";
// import { AutoDict } from '../types/types';
import SelectBrands from '../components/SelectBrands';
import SelectModels from '../components/SelectModels';
// import { request } from '../API';
// import { myBrand } from '../store/selectBrand.store';
import { useForm } from 'react-hook-form';
// import { FormHelperText } from '@mui/material';
import './RequestForm.scss';
import MaskedInput from '../components/MaskedInput';

const RequestForm = observer(() => {
  
  // const [cities, setСity] = useState<City[]>([]);
  // const [autoBrands, setBrands] = useState<any>([]);
  const [value, setValue] = useState('');
  const { 
    register, 
    formState: { errors},
    handleSubmit
  } = useForm({
    mode: "onChange"
  });

  // const handleChangeLicense = (e: any) => {
  //   console.log(e);
  // }

  const onSubmit = (data: any) => {
    console.log(data);
  }

  const theme = createTheme({
    palette: {
      background: {
        paper: "#f6f9f9"
      }
    }
  })

  const handleChangeInput = (event: any) => {
    // const value = event.target.value;
    // if (event.target.id === '')
    setValue(event.target.value);
    // console.log(event.target.value);
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
            // "person.lastName", 
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
          // helperText={errors?.email ? errors?.email?.message : null}
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
          value={value}
          sx={{ input: { bgcolor: "background.paper" } }}
          // helperText={errors?.driverLicense?.message}
          // error={!!errors?.driverLicense}
          { ...register(
            "driverLicense", 
            // "person.driverLicense", 
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
          // items={cities}
          register={register} />
        <SelectBrands 
          title="Марка автомобиля" 
          // items={autoBrands} 
          register={register}/>
        <SelectModels title="Модель" register={register} />
        <FormControlLabel 
          control={<Checkbox required />} 
          label="Согласен на обработку персональных данных" 
          className="checkbox" />
        <Button type="submit" variant="contained" id='saveButton'>Сохранить</Button>
        <Button type="submit" variant="contained" id='registerButton'>Отправить на регистрацию</Button>
        {/* disabled={!isValid} */}
      </form>
      </ThemeProvider>
    </div>
  );
})

export default RequestForm;
