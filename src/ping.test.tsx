import React from 'react';
import { render } from '@testing-library/react';
import { expect, test } from 'vitest';

import Widget from './components/Widget/Widget';

test('test runner works', () => {
  expect(true).toBeTruthy();
});

test('RTL works', () => {
  const { getByText } = render(<Widget><p>Test</p></Widget>);
  expect(getByText('Test')).toBeTruthy();
});