import { createAction, createReducer } from '@reduxjs/toolkit';
import history from 'history/browser';

export const authReducer = createReducer({ isAuthenticated: false }, builder =>
    builder
        .addCase(createAction('login'), state => {
            state.isAuthenticated = true;
            history.push('/');
        })
        .addCase(createAction('logout'), state => {
            state.isAuthenticated = false;
            localStorage.clear();
            history.push('/');
        })
);
