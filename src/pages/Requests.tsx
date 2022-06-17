import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import RequestsList from '../components/RequestsList';
import { myStore } from '../store/MyStore.store';

const Requests = (): JSX.Element => {

  useEffect(() => myStore.setRequestId(null));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void =>  {
    // если не найдена заявка в статусе PROCESSING
    if (!myStore.successReq){
      myStore.createRequestDraft('/reg_service/api/v1/request', {})
        .then(req => {
          // myStore.setRequestObject(req.data);
          myStore.setRequestId(req.data.id);
        });
    } else {
      // если найдена заявка в статусе PROCESSING
      event.preventDefault();
    }
  }
    
  return (
    <div className="content-container">
      <div className="main-header">
        <h1 className="main-header__title">Список заявок</h1>
        <p className="main-header__description">Ваши заявки на покупку автомобилей</p>
      </div>
      <RequestsList />
      <Link to="/DRAFT">
        <Button variant="contained" onClick={handleClick}>Создать заявку</Button>
      </Link>
    </div>
  );
}

export default Requests;