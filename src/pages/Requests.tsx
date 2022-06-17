import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import RequestsList from '../components/RequestsList';
import { myBrand } from '../store/selectBrand.store';

const Requests = (): JSX.Element => {

  useEffect(() => myBrand.setRequestId(null));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void =>  {
    // если не найдена заявка в статусе PROCESSING
    if (!myBrand.successReq){
      myBrand.createRequestDraft('/reg_service/api/v1/request', {})
        .then(req => {
          // myBrand.setRequestObject(req.data);
          myBrand.setRequestId(req.data.id);
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