import React from "react";
import { myStore } from "../store/MyStore.store";
import './SuccessRequest.scss';
import Success from '../icons/Success.svg';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';



const SuccessRequestPage = () => {

  return(
    <div className="success-container">
      <div className="success-container__header">
        <img src={Success} alt="" className="success-img"/>
        <h1>Заявка №{myStore.itemObject.id}</h1>
      </div>
        <p className="success-description">Автомобиль: {myStore.itemObject.brand} {myStore.itemObject.model}</p>
        <p className="success-description">Дата заявки: { new Date(myStore.itemObject.date).toLocaleDateString()}</p>
        <Link to="/">
          <Button variant="contained">К списку заявок</Button>
        </Link>
      </div>
  )

}
export default SuccessRequestPage;