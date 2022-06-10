import React from 'react';
import './Main.scss';

import { Routes, Route } from 'react-router-dom';

import RequestForm from '../pages/RequestForm';
import RequestsList from '../pages/RequestsList';
import NotFound from '../pages/NotFound';
import SuccessRequestPage from '../pages/SuccessRequest';

export default function Main(): JSX.Element {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<RequestsList />} />
        <Route path="/DRAFT" element={<RequestForm />} />
        <Route path="/SUCCESS" element={<SuccessRequestPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
