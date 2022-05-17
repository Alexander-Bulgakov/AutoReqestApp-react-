import React from 'react';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.scss';

export default function App(): JSX.Element {
  return (
    <div className="container">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
