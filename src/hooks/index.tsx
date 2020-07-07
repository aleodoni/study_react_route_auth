import React from 'react';

import { GithubProvider } from './github';
import { AuthProvider } from './auth';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <GithubProvider>{children}</GithubProvider>
  </AuthProvider>
);

export default AppProvider;
