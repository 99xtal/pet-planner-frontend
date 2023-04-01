import React from 'react';
import { render } from '@testing-library/react';
import AuthContext, { AuthContextValue } from '../context/AuthContext';

export const renderInMockAuthContext = (component: React.ReactNode, contextValue: AuthContextValue) => render(
  <AuthContext.Provider value={contextValue}>
    {component}
  </AuthContext.Provider>
);