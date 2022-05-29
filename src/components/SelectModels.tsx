import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { observer } from 'mobx-react-lite';
import { MenuItem } from '@mui/material';
import { myBrand } from '../store/selectBrand.store';
import { toJS } from 'mobx';

const SelectModels = ({ title }: any ): JSX.Element => {
  const [value, setValue] = useState('');
  const [models, setModels] = useState([]);


  // обработчик значения селекта после выбора
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  // добавление массива моделей 
  useEffect(() => {
    const modelsArr = toJS(myBrand.models);
    // console.log(modelsArr);
    setModels(modelsArr);
  }, [myBrand.models])

  console.log('models (select state) >> ', models);



  return (
    <FormControl fullWidth>
      <InputLabel>{title}</InputLabel>
      <Select
        disableUnderline
        className="select"
        labelId="demo-simple-select-label"
        // id="demo-simple-select"
        value={value}
        // label="Марка автомобиля"
        defaultValue=""
        onChange={handleChange}
        variant="filled"
      >
        {models?.length && models.map((item: any) => (
          <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
        ))}

      </Select>
    </FormControl>
  );
}

export default observer(SelectModels);