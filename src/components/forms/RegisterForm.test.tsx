import { render } from '@testing-library/react';
import React from 'react';
import { beforeEach, test, vi } from 'vitest';

import { setupTestUser } from '../../test/utils';
import RegisterForm from './RegisterForm';

const mockRegister = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

test('form not submitted if username not set', async () => {
  const user = setupTestUser();
  const { getByText, getByPlaceholderText } = render(<RegisterForm handleSubmit={mockRegister}/>);
  const submitButton = getByText('register', { exact: false });
  const emailInput = getByPlaceholderText('email', { exact: false });
  const passwordInput = getByPlaceholderText('password', { exact: false });

  await user.click(emailInput);
  await user.keyboard('test@email.com');
  await user.click(passwordInput);
  await user.keyboard('password');
  await user.click(submitButton);

  expect(mockRegister).toBeCalledTimes(0);
});

test('form not submitted if password not set', async () => {
  const user = setupTestUser();
  const { getByText, getByPlaceholderText } = render(<RegisterForm handleSubmit={mockRegister}/>);
  const submitButton = getByText('register', { exact: false });
  const usernameInput = getByPlaceholderText('username', { exact: false });
  const emailInput = getByPlaceholderText('email', { exact: false });
  
  await user.click(usernameInput);
  await user.keyboard('username');
  await user.click(emailInput);
  await user.keyboard('test@email.com');
  await user.click(submitButton);
  
  expect(mockRegister).toBeCalledTimes(0);
});

test('form not submitted if email not set', async () => {
  const user = setupTestUser();
  const { getByText, getByPlaceholderText } = render(<RegisterForm handleSubmit={mockRegister}/>);
  const submitButton = getByText('register', { exact: false });
  const usernameInput = getByPlaceholderText('username', { exact: false });
  const passwordInput = getByPlaceholderText('password', { exact: false });

  await user.click(usernameInput);
  await user.keyboard('username');
  await user.click(passwordInput);
  await user.keyboard('password');
  await user.click(submitButton);
    
  expect(mockRegister).toBeCalledTimes(0);
});

test('form is submitted if all required fields are set', async () => {
  const user = setupTestUser();
  const { getByText, getByPlaceholderText } = render(<RegisterForm handleSubmit={mockRegister}/>);
  const submitButton = getByText('register', { exact: false });
  const usernameInput = getByPlaceholderText('username', { exact: false });
  const passwordInput = getByPlaceholderText('password', { exact: false });
  const emailInput = getByPlaceholderText('email', { exact: false });
  
  await user.click(usernameInput);
  await user.keyboard('username');
  await user.click(passwordInput);
  await user.keyboard('password');
  await user.click(emailInput);
  await user.keyboard('test@email.com');
  await user.click(submitButton);
      
  expect(mockRegister).toBeCalledTimes(1);
});
