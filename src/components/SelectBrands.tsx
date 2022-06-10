// import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { observer } from 'mobx-react-lite';
import { myBrand } from '../store/selectBrand.store';
// import { toJS } from 'mobx';
// import { PropsModels } from '../types/types';

const SelectBrands = ({ title, register }: any ): JSX.Element => {
const [value, setValue] = useState('');
const [autoBrands, setBrands] = useState<any>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };
  console.log('SelectBrands');
  
  useEffect(() => {
    myBrand.getBrandsFromAPI('/reg_service/api/v1/dictionary/DICT_AUTO')
    .then(obj => {
      // myBrand.setAutoDict(obj);
      setBrands(Object.keys(obj));
      console.log('собрали объект с бэка в форме - reduce >> ', obj);
    })
  }, [])

  useEffect(() => {
    console.log('brands useEffect value >>> ', value);
    myBrand.setBrand(value);
  }, [value])

  return (
    <FormControl fullWidth>
      <InputLabel>{title}</InputLabel>
      <Select
        { ...register(
          "brand"
        )}
        required
        sx={{ bgcolor: "background.paper" }}
        className="select"
        labelId="demo-simple-select-label"
        // id="demo-simple-select"
        value={value}
        defaultValue=""
        label={title}
        onChange={handleChange}
        variant="filled"
        disableUnderline
      >
        {autoBrands.map((model: string, index: number) => (
          <MenuItem key={index} value={model}>{model}</MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default observer(SelectBrands);