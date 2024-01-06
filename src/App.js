import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Layout } from './components/Layout';

export function App() {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
