/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import {useAuth} from './contexts/AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {currentUser} = useAuth()
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser?.pseudo) {
          // not logged in so redirect to login page with the return url
          return <Redirect to='/login' />;
        }

        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};
export default PrivateRoute;
