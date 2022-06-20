import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { observer } from 'mobx-react-lite';
import { MenuItem } from '@mui/material';
import { myStore } from '../store/MyStore.store';
import { toJS } from 'mobx';
import { Auto } from '../types/types';


const SelectModels = ({ title, register, setValue }: any ): JSX.Element => {
  
  const [selectedModel, setModel] = useState('');
  const [items, setItems] = useState<Auto[]>([]);

  useEffect(() => {
    setModel(myStore.currentModel);
  }, [myStore.currentModel]);
  
  useEffect(() => {
    const obj = toJS(myStore.autoDict);
    const arr = obj[myStore.brand];
    setItems(arr);
  }, [myStore.brand]);
  
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
        value={selectedModel}
        label={title}
        onChange={handleChange}
        variant="filled"
        disableUnderline
      >
        {items?.length && items.map((item: any) => (
          <MenuItem 
            key={item.id} 
            value={item.name}
            selected={item.name == selectedModel}
            >{item.name}</MenuItem>
        ))}

      </Select>
    </FormControl>
  );
}

export default observer(SelectModels);