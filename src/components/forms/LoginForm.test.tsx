import React from 'react';
import { beforeEach, test, vi } from 'vitest';

import LoginForm from './LoginForm';
import { immediatelyRejectPromise, renderInMockAuthContext, setupTestUser, waitAsync } from '../../test/utils';

const mockLogin = vi.fn();

const setupTest = () => {
  const user = setupTestUser();
  const { getByText, getByRole, getByPlaceholderText, debug } = renderInMockAuthContext(<LoginForm />, {
    user: null,
    token: null,
    loginUser: mockLogin,
    logoutUser: vi.fn(),
    registerUser: vi.fn(),
    isServerError: false,
  });

  return {
    user,
    component: {
      submitButton: () => getByText('Log In', { exact: true }),
      usernameInput: () => getByRole('textbox', { name: 'username' }),
      passwordInput: () => getByPlaceholderText('password', { exact: false }),
      usernameError: () => getByText(/invalid.*username/ig),
      passwordError: () => getByText(/invalid.*password/ig),
      loginError: () => getByText(/incorrect.*username.*password/ig)
    },
    debug
  };
};

beforeEach(() => {
  vi.clearAllMocks();
});

test('doesn\'t submit form if username and password fields not set', async () => {
  const { user, component: { submitButton } } = setupTest();

  await user.click(submitButton());

  expect(mockLogin).toBeCalledTimes(0);
});

test('doesn\'t submit form if only username field is set', async () => {
  const { user, component: { usernameInput, submitButton } } = setupTest();

  await user.click(usernameInput());
  await user.keyboard('username');

  await user.click(submitButton());

  expect(mockLogin).toBeCalledTimes(0);
});

test('doesn\'t submit form if only password field is set', async () => {
  const { user, component: { passwordInput, submitButton }} = setupTest();

  await user.click(passwordInput());
  await user.keyboard('password');

  await user.click(submitButton());

  expect(mockLogin).toBeCalledTimes(0);
});


test('submits form if username and password fields set', async () => {
  const { user, component: { usernameInput, passwordInput, submitButton }} = setupTest();

  await user.click(usernameInput());
  await user.keyboard('username');

  await user.click(passwordInput());
  await user.keyboard('password');

  await user.click(submitButton());

  expect(mockLogin).toBeCalledTimes(1);
});

test('shows a warning if username field is empty on submit', async () => {
  const { user, component: { submitButton, usernameError } } = setupTest();

  await user.click(submitButton());

  expect(usernameError()).toBeTruthy();
  expect(usernameError()).toBeVisible();
});

test('shows a warning if password field is empty on submit', async () => {
  const { user, component: { submitButton, passwordError } } = setupTest();

  await user.click(submitButton());

  expect(passwordError()).toBeTruthy();
  expect(passwordError()).toBeVisible();});

test('shows a warning if login throws error', async () => {
  const { user, component: { usernameInput, passwordInput, submitButton, loginError }} = setupTest();
  mockLogin.mockImplementation(() => immediatelyRejectPromise());

  await user.click(usernameInput());
  await user.keyboard('username');

  await user.click(passwordInput());
  await user.keyboard('password');

  await user.click(submitButton());
  
  expect(loginError()).toBeVisible();
});

test('submit button is disabled while processing request', async () => {
  const { user, component: { usernameInput, passwordInput, submitButton }} = setupTest();
  
  mockLogin.mockImplementation(() => waitAsync(1000));

  await user.click(usernameInput());
  await user.keyboard('username');

  await user.click(passwordInput());
  await user.keyboard('password');

  await user.tripleClick(submitButton());

  expect(mockLogin).toBeCalledTimes(1);
});
