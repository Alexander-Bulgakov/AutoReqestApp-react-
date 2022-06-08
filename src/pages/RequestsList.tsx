/* eslint-disable react/jsx-indent */
import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { myBrand } from '../store/selectBrand.store';
import RequestListItem from '../components/RequestsListItem';



console.log(myBrand.getRequestsFromAPI('/reg_service/api/v1/requests'));

// const requestsArray = [1, 2, 3];
export default function RequestsList(): JSX.Element {
  // const [requests, setRequests] = useState([]);
  // useEffect(() => {
  //   myBrand.getRequestsFromAPI('/reg_service/api/v1/requests')
  //     // .then(res => console.log(res.data));
  //     .then(res => setRequests(res.data));
  // }, [])
  return (
    <div className="content-container">
      <div className="main-header">
        <h1 className="main-header__title">Список заявок</h1>
        <p className="main-header__description">Ваши заявки на покупку автомобилей</p>
      </div>
      <RequestListItem />
      <Link to="/DRAFT">
        <Button variant="contained">Создать заявку</Button>
      </Link>
    </div>
  );
}
