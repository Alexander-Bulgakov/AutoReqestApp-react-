import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { myBrand } from '../store/selectBrand.store';
// import { Props } from '../types/types';
import { City } from '../types/types';


const SelectCity = ({ title, register }: any ): JSX.Element => {
  const [value, setValue] = useState('');
  const [items, setItems] = useState<City[]>([]);

  useEffect(() => {
    myBrand.getCitiesFromAPI('/reg_service/api/v1/dictionary/DICT_CITIES')
      .then(res => setItems(res));
  }, [])

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  console.log('items, city >> ', items);

  return (
    <FormControl fullWidth>
      <InputLabel>{title}</InputLabel>
      <Select
        { ...register(
          "city"
        )}
        required
        sx={{ bgcolor: "background.paper" }}
        className="select"
        labelId="demo-simple-select-label"
        // id="demo-simple-select"
        value={value}
        label={title}
        onChange={handleChange}
        variant="filled"
        disableUnderline
      >
        {items.map((city: any) => (
          <MenuItem key={city.code} value={city}>{city.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectCity;