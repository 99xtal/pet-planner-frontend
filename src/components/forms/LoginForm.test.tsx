import React from 'react';
import { test, vi } from 'vitest';

import LoginForm from './LoginForm';
import { renderInMockAuthContext, setupTestUser, waitAsync } from '../../test/utils';

const mockLogin = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

test('doesn\'t submit form if username and password fields not set', async () => {
  const user = setupTestUser();
  const { submitButton } = getLoginFormComponents();

  await user.click(submitButton);

  expect(mockLogin).toBeCalledTimes(0);
});

test('doesn\'t submit form  if only username field is set', async () => {
  const user = setupTestUser();
  const { submitButton, usernameInput } = getLoginFormComponents();

  await user.click(usernameInput);
  await user.keyboard('username');

  await user.click(submitButton);

  expect(mockLogin).toBeCalledTimes(0);
});

test('doesn\'t submit form  if only password field is set', async () => {
  const user = setupTestUser();
  const { submitButton, passwordInput } = getLoginFormComponents();

  await user.click(passwordInput);
  await user.keyboard('password');

  await user.click(submitButton);

  expect(mockLogin).toBeCalledTimes(0);
});


test('submits form if username and password fields set', async () => {
  const user = setupTestUser();
  const { usernameInput, passwordInput, submitButton } = getLoginFormComponents();

  await user.click(usernameInput);
  await user.keyboard('username');

  await user.click(passwordInput);
  await user.keyboard('password');

  await user.click(submitButton);

  expect(mockLogin).toBeCalledTimes(1);
});

test('shows a warning if username field is empty on submit', async () => {
  const user = setupTestUser();
  const { submitButton, usernameError} = getLoginFormComponents();

  await user.click(submitButton);
  expect(usernameError).toBeVisible();
});

test('shows a warning if password field is empty on submit', async () => {
  const user = setupTestUser();
  const { submitButton, passwordError} = getLoginFormComponents();

  await user.click(submitButton);
  expect(passwordError).toBeVisible();
});

test.todo('shows a warning if login credentials are incorrect');

test('submit button is disabled while processing request', async () => {
  const user = setupTestUser();
  const { usernameInput, passwordInput, submitButton } = getLoginFormComponents();
  mockLogin.mockImplementation(() => waitAsync(1000));

  await user.click(usernameInput);
  await user.keyboard('username');

  await user.click(passwordInput);
  await user.keyboard('password');

  await user.tripleClick(submitButton);

  expect(mockLogin).toBeCalledTimes(1);
});

function getLoginFormComponents() {
  const { getByText, getByPlaceholderText, queryByText } = renderInMockAuthContext(<LoginForm />, {
    user: null,
    token: null,
    loginUser: mockLogin,
    logoutUser: vi.fn(),
    registerUser: vi.fn(),
    isServerError: false,
  });
  const submitButton = getByText('Log In', { exact: true });
  const usernameInput = getByPlaceholderText('username', { exact: false });
  const passwordInput = getByPlaceholderText('password', { exact: false });
  const usernameError = queryByText('invalid username', { exact: false });
  const passwordError = queryByText('invalid password', { exact: false });


  return {
    submitButton,
    usernameInput,
    passwordInput,
    usernameError,
    passwordError,
  };
}