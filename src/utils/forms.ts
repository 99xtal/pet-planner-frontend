import { FieldErrors, FieldValues } from 'react-hook-form';

export const listMissingFields = <T extends FieldValues>(errors: FieldErrors<T>) => {
  const entries = Object.entries(errors);
  return entries.filter(([_, error]) => error?.type === 'required').map(([field]) => field);
};
  