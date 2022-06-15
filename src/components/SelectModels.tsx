import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { observer } from 'mobx-react-lite';
import { MenuItem } from '@mui/material';
import { myBrand } from '../store/selectBrand.store';
import { toJS } from 'mobx';
import { Auto } from '../types/types';


const SelectModels = ({ title, register, setValue }: any ): JSX.Element => {
  
  const [model, setModel] = useState('');
  const [models, setModels] = useState<Auto[]>([]);

  console.log('myBrand.currentModel >> ', myBrand.currentModel);
  console.log('model >> ', model);

  useEffect(() => {
    setModel(myBrand.currentModel);
  }, [myBrand.currentModel]);
  
  useEffect(() => {
    const obj = toJS(myBrand.autoDict);
    const arr = obj[myBrand.brand];
    setModels(arr);
  }, [myBrand.brand]);

  useEffect(() => {
    console.log('models >>> ', models)
    // const currentModel = models.find(item => item.name == model);
    // setValue('model.id', currentModel?.id);
  }, [model]);
  
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
        value={model}
        // defaultValue=""
        label={title}
        onChange={handleChange}
        variant="filled"
        disableUnderline
      >
        {models?.length && models.map((item: any) => (
          <MenuItem 
            key={item.id} 
            value={item.name}
            selected={item.name == model}
            >{item.name}</MenuItem>
        ))}

      </Select>
    </FormControl>
  );
}

export default observer(SelectModels);