// import { Button } from '@mui/material';
import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { myStore } from '../store/MyStore.store';
import Loader from '../icons/Loader.svg';
import axios from 'axios';
import './Loader.scss';
import { useNavigate } from 'react-router-dom';


const Loading = () => {
  const navigate = useNavigate();
  
  const statusRequest = async () => {
    await axios.get('/reg_service/api/v1/request/status/' + myStore.registeredReqId)
    .then(req => {
      if (req.data === 'SUCCESS') {
        navigate('/');
      } else {
        setTimeout(() => {
          statusRequest()
        }, 3000);
      }
    })
  }

  useEffect(() => {
    statusRequest();
  }, []);

  return (
    <div className="main-container">
      {/* <Link to="/">
        <Button variant="contained">К списку заявок</Button>
      </Link> */}
      <img src={Loader} alt="Ожидание подтверждения заявки" className="loader" />
    </div>
  );
}

export default Loading;
