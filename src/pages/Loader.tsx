// import { Button } from '@mui/material';
import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { myStore } from '../store/MyStore.store';
import Loader from '../icons/Loader.svg';
// import axios from 'axios';
import './Loader.scss';
import { useNavigate } from 'react-router-dom';


const Loading = () => {
  const navigate = useNavigate();

  const regReq = myStore.registeredrequestId;

  console.log('regReq >>> ', regReq);
  
  
  const statusRequest = async () => {
    myStore.statusRequuest('/reg_service/api/v1/request/status/' + regReq)
    .then(req => {
      if (req.data === 'SUCCESS') {
        navigate('/');
      } else {
        setTimeout(() => {
          statusRequest()
        }, 1000);
      }
    })
  }

  useEffect(() => {
    statusRequest();
  }, []);

  return (
    <div className="main-container">
      <img src={Loader} alt="Ожидание подтверждения заявки" className="loader" />
    </div>
  );
}

export default Loading;
