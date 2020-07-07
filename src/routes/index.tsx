import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Github from '../pages/Github';
import Escola from '../pages/Escola';

import Route from './Route';
import PrivateRoute from './PrivateRoute';

const Routes: React.FC = () => (
  <Switch>
    <Suspense fallback={<span>aguarde...</span>}>
      <Route path="/" exact component={Home} />
      <PrivateRoute path="/github" component={Github} />
      <PrivateRoute path="/escola" component={Escola} />
    </Suspense>
  </Switch>
);

export default Routes;
