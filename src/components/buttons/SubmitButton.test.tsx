import React from 'react';
import { render } from '@testing-library/react';
import { test } from 'vitest';
import SubmitButton from './SubmitButton';

test('displays loading spinner when loading=true', () => {
  const { getByTitle } = render(<SubmitButton title='Login' loading/>);

  expect(getByTitle('loading_dots')).toBeVisible();
});