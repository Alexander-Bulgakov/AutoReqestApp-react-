/* eslint-disable react/jsx-indent */
import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const requestsArray = [1, 2, 3];
export default function RequestsList(): JSX.Element {
  return (
    <div className="content-container">
      <div className="main-header">
        <h1 className="main-header__title">Список заявок</h1>
        <p className="main-header__description">Ваши заявки на покупку автомобилей</p>
      </div>
      <div className="requests-list">
        <ul>
          {
            requestsArray.map((request, i) => (
              <li key={i}>
                {request}
              </li>
            ))
          }
        </ul>
      </div>
      <Link to="/DRAFT">
        <Button variant="contained">Создать заявку</Button>
      </Link>
    </div>
  );
}
