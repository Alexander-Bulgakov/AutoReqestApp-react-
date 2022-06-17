import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../pages/Loader';
import NotFound from '../pages/NotFound';
import RequestForm from '../pages/RequestForm';
import Requests from '../pages/Requests';
import SuccessRequestPage from '../pages/SuccessRequest';
import './Main.scss';

const Main = (): JSX.Element => {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Requests />} />
        <Route path="/DRAFT" element={<RequestForm />} />
        <Route path="/SUCCESS" element={<SuccessRequestPage />} />
        <Route path="/Loading" element={<Loading />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Main;