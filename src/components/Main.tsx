import React from 'react';
import './Main.scss';

import { Routes, Route } from 'react-router-dom';

import RequestForm from '../pages/RequestForm';
import RequestsList from '../pages/RequestsList';
import NotFound from '../pages/NotFound';

export default function Main(): JSX.Element {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<RequestsList />} />
        <Route path="/request" element={<RequestForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
