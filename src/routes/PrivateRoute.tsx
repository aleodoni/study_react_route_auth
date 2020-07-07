import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user, checkToken } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        checkToken();
        if (user) {
          return <Component />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
