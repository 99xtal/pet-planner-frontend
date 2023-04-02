import { render } from '@testing-library/react';
import React from 'react';
import { beforeEach, test, vi } from 'vitest';

import { setupTestUser } from '../../test/utils';
import RegisterForm from './RegisterForm';

const mockRegisterCallback = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

const setupTest = () => {
  const user = setupTestUser();
  const { getByText, getByPlaceholderText, getByRole } = render(<RegisterForm handleSubmit={mockRegisterCallback}/>);

  return {
    user,
    component: {
      submitButton: () => getByText('register', { exact: false }),
      usernameInput: () => getByRole('textbox', { name: 'username' }),
      emailInput: () => getByRole('textbox', { name: 'email' }),
      passwordInput: () => getByPlaceholderText('password', { exact: false }),
    }
  };
};

test('form not submitted if username not set', async () => {
  const { user, component: { emailInput, passwordInput, submitButton } } = setupTest();

  await user.click(emailInput());
  await user.keyboard('test@email.com');
  await user.click(passwordInput());
  await user.keyboard('password');
  await user.click(submitButton());

  expect(mockRegisterCallback).toBeCalledTimes(0);
});

test('form not submitted if password not set', async () => {
  const { user, component: { usernameInput, emailInput, submitButton } } = setupTest();

  await user.click(usernameInput());
  await user.keyboard('username');
  await user.click(emailInput());
  await user.keyboard('test@email.com');
  await user.click(submitButton());
  
  expect(mockRegisterCallback).toBeCalledTimes(0);
});

test('form not submitted if email not set', async () => {
  const { user, component: { usernameInput, passwordInput, submitButton }} = setupTest();

  await user.click(usernameInput());
  await user.keyboard('username');
  await user.click(passwordInput());
  await user.keyboard('password');
  await user.click(submitButton());
    
  expect(mockRegisterCallback).toBeCalledTimes(0);
});

test('form is submitted if all required fields are set', async () => {
  const { user, component: { usernameInput, passwordInput, emailInput, submitButton }} = setupTest();
  
  await user.click(usernameInput());
  await user.keyboard('username');
  await user.click(passwordInput());
  await user.keyboard('password');
  await user.click(emailInput());
  await user.keyboard('test@email.com');
  await user.click(submitButton());
      
  expect(mockRegisterCallback).toBeCalledTimes(1);
});
