import React from 'react';
import './Main.scss';

import { Routes, Route } from 'react-router-dom';

import RequestForm from '../pages/RequestForm';
import Requests from '../pages/Requests';
import NotFound from '../pages/NotFound';
import SuccessRequestPage from '../pages/SuccessRequest';
import Loading from '../pages/Loader';

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