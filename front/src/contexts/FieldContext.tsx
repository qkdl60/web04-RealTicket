import { createContext } from 'react';

type FieldContextValue = {
  isValid: boolean;
  htmlFor: null | string;
};
const FIELD_CONTEXT_DEFAULT_VALUE: FieldContextValue = {
  isValid: true,
  htmlFor: null,
};
export const FieldContext = createContext<FieldContextValue>(FIELD_CONTEXT_DEFAULT_VALUE);
