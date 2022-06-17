import React from 'react';
import './Header.scss';

export default function Header(): JSX.Element {
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header-logo">
          <div className="column header-logo__column_left">
            <span className="quad header-logo__quad_blue" />
            <span className="quad header-logo__quad_dark-blue" />
          </div>
          <div className="column header-logo__column_right">
            <span className="quad header-logo__quad_dark-blue" />
            <span className="quad header-logo__quad_blue" />
          </div>
        </div>
        <h1 className="header-text">Бронирование Автомобилей</h1>
      </div>
    </div>
  );
}
