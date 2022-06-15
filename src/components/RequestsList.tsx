import React, { useEffect, useState} from 'react';
import { myBrand } from '../store/selectBrand.store';
import Success from '../icons/Success.svg';
import Cloud from '../icons/Cloud.svg';
import Sync from '../icons/Sync.svg';
import './RequestsListItem.scss';
import { Link } from 'react-router-dom';

const ListItem = ({ code, id, brand, model, date }: any) => {

  const statusObj: any = {
    "SUCCESS": {
      img: Success,
      description: "Успех",
      link: "/SUCCESS"
    },
    "DRAFT": {
      img: Cloud,
      description: "Черновик",
      link: "/DRAFT"
    },
    "PROCESSING": {
      img: Sync,
      description: "В обработке",
      link: "/DRAFT"
    }
    
  }

  const handleClick = () => {
    
    //Этот метод удалить позже
    myBrand.setRequestId(id);

    // myBrand.getRequestFromApi('/reg_service/api/v1/request/' + id)
    //   .then(req => {
    //     myBrand.setRequestObject(req.data);
    //   });
    myBrand.setItemObject(id, brand, model, date);
    
  }

  return (
    <Link to={statusObj[code].link}  style={{ textDecoration: 'none' }} onClick={handleClick}>
      <div className="requests-list__item">
        <div className="requests-list__icon-container">
          <img src={statusObj[code].img} className="requests-list__icon"/>
        </div>
        <div className="requests-list__text">
          <h4 className="header">
            Заявка №{id} на автомобиль {brand} {model}
          </h4>
          <p className="description">Статус: {statusObj[code].description}</p>
          <p className="description">Дата: {new Date(date).toLocaleDateString()}</p>
        </div>
      </div>
    </Link>
  )
}
const RequestsList = (): JSX.Element | null => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    myBrand.getRequestsFromAPI('/reg_service/api/v1/requests')
      .then(res => setRequests(res.data));
  }, [])
  return(
    <ul className="requests-list">
      {
        requests.map((request: any) => (
          <li key={request.id}>
            <ListItem 
              code={request.status.code} 
              id={request.id} 
              brand={request.auto.brand} 
              model={request.auto.model.name} 
              date={request.createDate}/>
          </li>
        ))
      }
    </ul>
  )
}

export default RequestsList;