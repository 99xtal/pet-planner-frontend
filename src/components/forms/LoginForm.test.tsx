import React from 'react';
import userEvent from '@testing-library/user-event';
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

const setupUser = () => userEvent.setup();

const waitAsync = (ms: number) => new Promise((res) => setTimeout(() => res(null), ms));

interface LoginFormComponents {
  submitButton: HTMLElement,
  usernameInput: HTMLElement,
  passwordInput: HTMLElement,
  usernameError: HTMLElement,
  passwordError: HTMLElement,
}

const getLoginFormComponents = () => {
  const { getByText, getByPlaceholderText, queryByText } = renderInMockAuthContext(<LoginForm />, loggedOutAuthContextState);
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
  } as LoginFormComponents;
};

const doLoginSubmission = async (user, components: LoginFormComponents) => {
  const { usernameInput, passwordInput, submitButton } = components;
  await user.click(usernameInput);
  await user.keyboard('username');

  await user.click(passwordInput);
  await user.keyboard('password');

  await user.click(submitButton);
};

beforeEach(() => {
  vi.clearAllMocks();
});

test('disallows form submission if username and password fields not set', async () => {
  const user = setupUser();
  const { submitButton } = getLoginFormComponents();

  await user.click(submitButton);

  expect(mockLogin).toBeCalledTimes(0);
});

test('disallows form submission if only username field is set', async () => {
  const user = setupUser();
  const { submitButton, usernameInput } = getLoginFormComponents();

  await user.click(usernameInput);
  await user.keyboard('username');

  await user.click(submitButton);

  expect(mockLogin).toBeCalledTimes(0);
});

test('disallows form submission if only password field is set', async () => {
  const user = setupUser();
  const { submitButton, passwordInput } = getLoginFormComponents();

  await user.click(passwordInput);
  await user.keyboard('password');

  await user.click(submitButton);

  expect(mockLogin).toBeCalledTimes(0);
});


test('allows form submission if username and password fields set', async () => {
  const user = setupUser();
  const components = getLoginFormComponents();

  await doLoginSubmission(user, components);

  expect(mockLogin).toBeCalledTimes(1);
});

test('shows a warning if username field is empty on submit', async () => {
  const user = setupUser();
  const { submitButton, usernameError} = getLoginFormComponents();

  await user.click(submitButton);
  expect(usernameError).toBeVisible();
});

test('shows a warning if password field is empty on submit', async () => {
  const user = setupUser();
  const { submitButton, passwordError} = getLoginFormComponents();

  await user.click(submitButton);
  expect(passwordError).toBeVisible();
});

test.todo('shows a warning if login credentials are incorrect');

test('submit button is disabled while processing request', async () => {
  const user = setupUser();
  const components = getLoginFormComponents();
  mockLogin.mockImplementation(() => waitAsync(1000));

  await doLoginSubmission(user, components);
  await user.tripleClick(components.submitButton);

  expect(mockLogin).toBeCalledTimes(1);
});