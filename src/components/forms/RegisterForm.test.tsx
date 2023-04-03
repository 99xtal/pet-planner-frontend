import { render } from '@testing-library/react';
import React from 'react';
import { beforeEach, test, vi } from 'vitest';

import { setupTestUser, waitAsync } from '../../test/utils';
import RegisterForm from './RegisterForm';

const mockRegisterCallback = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

const setupTest = () => {
  const user = setupTestUser();
  const { getByText, getByLabelText, queryByText } = render(<RegisterForm handleSubmit={mockRegisterCallback}/>);

  return {
    user,
    component: {
      submitButton: () => getByText('sign up', { exact: false }),
      usernameInput: () => getByLabelText('username'),
      emailInput: () => getByLabelText('email'),
      emailError: () => queryByText(/invalid.*email/i),
      passwordInput: () => getByLabelText('password'),
      passwordError: () => queryByText(/invalid.*password/i),
      tooShortError: () => queryByText(/too.*short/i),
    }
  };
};

test('only submits form if all required fields are set', async () => {
  const { user, component: { usernameInput, emailInput, passwordInput, submitButton } } = setupTest();

  await user.click(usernameInput());
  await user.keyboard('username');
  await user.click(submitButton());

  await user.click(emailInput());
  await user.keyboard('test@gmail.com');
  await user.click(submitButton());

  await user.click(passwordInput());
  await user.keyboard('p@ssword1!');
  await user.click(submitButton());

  expect(mockRegisterCallback).toBeCalledTimes(1);
});

test('disables form submission while processing request', async () => {
  const { user, component: { usernameInput, passwordInput, emailInput, submitButton }} = setupTest();
  
  mockRegisterCallback.mockImplementation(() => waitAsync(1000));

  await user.click(usernameInput());
  await user.keyboard('test_user');

  await user.click(emailInput());
  await user.keyboard('testuser@email.com');
  
  await user.click(passwordInput());
  await user.keyboard('password');

  await user.tripleClick(submitButton());

  expect(mockRegisterCallback).toBeCalledTimes(1);
});

test('disables form submission for invalid email', async () => {
  const { user, component: { usernameInput, passwordInput, emailInput, submitButton }} = setupTest();
  
  await user.click(usernameInput());
  await user.keyboard('test_user');

  await user.click(emailInput());
  await user.keyboard('testuser@email');
  
  await user.click(passwordInput());
  await user.keyboard('password');

  await user.click(submitButton());
  
  expect(mockRegisterCallback).toBeCalledTimes(0);
});

test('shows a warning for invalid email', async () => {
  const { user, component: { emailInput, emailError, submitButton }} = setupTest();

  await user.click(emailInput());
  await user.keyboard('email');
  expect(emailError()).toBeNull();

  await user.click(submitButton());
  expect(emailError()).toBeVisible();
});

test('shows a warning for invalid password (too short) after user clicks away', async () => {
  const { user, component: { passwordInput, submitButton, passwordError, tooShortError } } = setupTest();

  await user.click(passwordInput());
  await user.keyboard('abcdefg');

  expect(passwordError()).toBeNull();

  await user.click(submitButton());

  expect(passwordError()).toBeVisible();
  expect(tooShortError()).toBeVisible();
});
