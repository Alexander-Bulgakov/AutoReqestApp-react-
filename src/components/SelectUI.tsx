import React, { useState } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import axios from 'axios';
import { Props } from '../types/types';

export default function SelectUI({ title, items }: Props): JSX.Element {
  const [value, setValue] = useState('');
  // const [cities, setСity] = useState<City[]>([]);
  // axios.get<City[]>('/api/items')
  //   .then((result) => {
  //   // console.log(result.data);
  //     setСity(result.data);
  //   });
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };
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
        {items.map((city) => (
          <MenuItem key={city.code} value={city.name}>{city.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
