import React from "react";
import './Header.css';

const message: string = 'Здесь будет хеадер';

export default function Header(): JSX.Element {
    return (
        <div className="header_container__">{message}</div>
    )
}