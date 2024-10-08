import React from 'react';
import { Route, Redirect } from 'react-router-dom';
function PrivateRoute({ NavBar, ...rest }) {
  const isAuthenticated = /* Check if the user is authenticated */ false;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
export default PrivateRoute;