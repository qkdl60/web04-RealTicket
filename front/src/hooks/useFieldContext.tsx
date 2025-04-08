import { useContext } from 'react';

import { FieldContext } from '@/shared/contexts/fieldContext';

export const useFieldContext = () => useContext(FieldContext);
