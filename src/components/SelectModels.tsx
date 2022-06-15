import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { observer } from 'mobx-react-lite';
import { MenuItem } from '@mui/material';
import { myBrand } from '../store/selectBrand.store';
import { toJS } from 'mobx';

const SelectModels = ({ title, register }: any ): JSX.Element => {
  
  const [value, setModel] = useState('');
  const [models, setModels] = useState([]);

  console.log('myBrand.currentModel >> ', myBrand.currentModel);

  useEffect(() => {
    setModel(myBrand.currentModel);
  }, [myBrand.currentModel]);
  
  useEffect(() => {
    const obj = toJS(myBrand.autoDict);
    const arr = obj[myBrand.brand];
    setModels(arr);
  }, [myBrand.brand]);
  
  const handleChange = (event: SelectChangeEvent) => {
    setModel(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{title}</InputLabel>
      <Select
        { ...register(
          "model.name"
        )}
        required
        sx={{ bgcolor: "background.paper" }}
        className="select"
        labelId="demo-simple-select-label"
        value={value}
        // defaultValue=""
        label={title}
        onChange={handleChange}
        variant="filled"
        disableUnderline
      >
        {models?.length && models.map((item: any) => (
          <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
        ))}

      </Select>
    </FormControl>
  );
}

export default observer(SelectModels);