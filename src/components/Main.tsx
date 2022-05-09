import React from 'react';
import './Main.scss';
import Button from '@mui/material/Button';
import RequestsList from './RequestsList';

export default function Main(): JSX.Element {
  return (
    <div className="main-container">
      <div className="content-container">
        <div className="main-header">
          <h1 className="main-header__title">Список заявок</h1>
          <p className="main-header__description">Ваши заявки на покупку автомобилей</p>
        </div>
        <RequestsList />
        <Button variant="contained">Создать заявку</Button>
      </div>
    </div>
  );
}
