import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import { PropsModels } from '../types/types';

export default function SelectModels({ title, items }: any ): JSX.Element {
  const [value, setValue] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    console.log(event.target.value);
  };
  // console.log('items >> ', items);
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
