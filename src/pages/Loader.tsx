import React, { useEffect } from 'react';
import { myStore } from '../store/MyStore.store';
import Loader from '../icons/Loader.svg';
import './Loader.scss';
import { useNavigate } from 'react-router-dom';


const Loading = () => {

  const navigate = useNavigate();
  
  const statusRequest = async () => {
    myStore.statusRequest('/reg_service/api/v1/request/status/' + myStore.registeredrequestId)
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
