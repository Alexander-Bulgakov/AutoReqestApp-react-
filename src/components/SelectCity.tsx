import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { myBrand } from '../store/selectBrand.store';
import { City } from '../types/types';


const SelectCity = ({ title, register }: any ): JSX.Element => {
  
  const [defaultCity, setValue] = useState('');
  const [items, setItems] = useState<City[]>([]);

  useEffect(() => {

    setValue(myBrand.currentCity);
  }, [myBrand.currentCity]);

  useEffect(() => {
    myBrand.getCitiesFromAPI('/reg_service/api/v1/dictionary/DICT_CITIES')
    .then(res => setItems(res));
  }, []);
  
  const handleChange = (event: SelectChangeEvent) => {
    const currentCity = items.find(item => item.name == event.target.value);
    console.log('currentCity >>> ', currentCity)
    setValue(event.target.value as string);
  };
  
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
        value={defaultCity}
        defaultValue={defaultCity}
        label={title}
        onChange={handleChange}
        variant="filled"
        disableUnderline
      >
        {items.map((city: any) => (
          <MenuItem 
            key={city.code} 
            value={city.name} 
            selected={city.name == defaultCity}
            >{city.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectCity;