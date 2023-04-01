import React from 'react';
import { fireEvent } from '@testing-library/react';
import { test, vi } from 'vitest';
import LoginForm from './LoginForm';
import { renderInMockAuthContext } from '../../test/utils';

const mockLogin = vi.fn();

const loggedOutAuthContextState = {
  user: null,
  token: null,
  loginUser: mockLogin,
  logoutUser: vi.fn(),
  registerUser: vi.fn(),
  isServerError: false,
};

const renderInAuthContextLoggedOutState = (component: React.ReactNode) => renderInMockAuthContext(component, loggedOutAuthContextState);

test('only allows form submission if username and password fields set', () => {
  const { getByText } = renderInAuthContextLoggedOutState(<LoginForm />);
  const submitButton = getByText('Log In', { exact: true });

  fireEvent.click(submitButton);

  expect(mockLogin).toBeCalledTimes(0);
});

test.todo('shows a warning if username field is empty on submit');

test.todo('shows a warning if password field is empty on submit');

test.todo('shows a warning if login credentials are incorrect');

test.todo('submit button is disabled while processing request');