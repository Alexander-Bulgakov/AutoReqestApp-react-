import React from 'react';
// import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { observer } from 'mobx-react-lite';
import { myBrand } from '../store/selectBrand.store';
import { toJS } from 'mobx';
// import { PropsModels } from '../types/types';

const SelectBrands = ({ title, items }: any ): JSX.Element => {

  const handleChange = (event: SelectChangeEvent) => {
    myBrand.brandChange(event);
    const obj = toJS(myBrand.autoDict);
    myBrand.modelChange(obj[myBrand.brand]);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{title}</InputLabel>
      <Select
        disableUnderline
        className="select"
        labelId="demo-simple-select-label"
        // id="demo-simple-select"
        // value={myBrand.brand}
        defaultValue=""
        // label="Марка автомобиля"
        onChange={handleChange}
        variant="filled"
      >
        {items.map((model: string, index: number) => (
          <MenuItem key={index} value={model}>{model}</MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default observer(SelectBrands);