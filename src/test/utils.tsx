import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import AuthContext, { AuthContextValue } from '../context/AuthContext';

export const renderInMockAuthContext = (component: React.ReactNode, contextValue: AuthContextValue) => render(
  <AuthContext.Provider value={contextValue}>
    {component}
  </AuthContext.Provider>
);

export const immediatelyRejectPromise = () => new Promise((_, rej) => rej());

export const waitAsync = (ms: number) => new Promise((res) => setTimeout(() => res(null), ms));

export const setupTestUser = () => userEvent.setup();
