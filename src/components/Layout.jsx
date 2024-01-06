import React from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <div className="wrapper">
            <header className="header"></header>
            <main className="main">
                <div className="container">
                    <Outlet />
                </div>
            </main>
            <footer className="footer"></footer>
        </div>
    );
}
