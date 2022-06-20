import React, { useEffect, useState } from 'react';
import { Button, Popover, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RequestsList from '../components/RequestsList';
import { myStore } from '../store/MyStore.store';
import './Requests.scss';

const Requests = (): JSX.Element => {

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'button-popover' : undefined;

  useEffect(() => myStore.setRequestId(null));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void =>  {
    if (!myStore.processingReq){
      myStore.createRequestDraft('/reg_service/api/v1/request', {})
        .then(req => {
          myStore.setRequestId(req.data.id);
          navigate('/DRAFT')
        });
    } else {
      setAnchorEl(event.currentTarget);
      event.preventDefault();
    }
  }

  const handleClose = () => setAnchorEl(null);
    
  return (
    <div className="content-container">
      <div className="main-header">
        <h1 className="main-header__title">Список заявок</h1>
        <p className="main-header__description">Ваши заявки на покупку автомобилей</p>
      </div>
      <RequestsList />
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>Создать заявку</Button>
      <Popover 
        id={id} 
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <Typography>Одна заявка уже в обработке</Typography>
      </Popover>
    </div>
  );
}

export default Requests;