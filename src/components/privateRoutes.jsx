import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from './Spinner';
import Auth from '../hooks/auth';

const PrivateRoutes = () => {
    const {login, checkState} = Auth();

    if (checkState) {
        return <Spinner />
    }
    return login ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoutes;
