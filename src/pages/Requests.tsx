/* eslint-disable react/jsx-indent */
import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
// import { myBrand } from '../store/selectBrand.store';
import RequestsList from '../components/RequestsList';
import { myBrand } from '../store/selectBrand.store';

const Requests = (): JSX.Element => {

  const handleClick = () => {
    myBrand.createRequestDraft('/reg_service/api/v1/request', {})
      .then(req => {
        myBrand.setRequestId(req.data.id)
        console.log(req.data.id);
      });
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