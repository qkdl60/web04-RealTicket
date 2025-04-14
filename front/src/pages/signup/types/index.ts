import { CustomError } from '@/api/axios.ts';

import { ResisterConfig } from '@/shared/types/form.ts';
import type { SignupForm } from '@/shared/types/user';

export type ViewProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  formData: SignupForm;
  setFormData: (data: SignupForm) => void;
  errors: Record<string, string>;
  error: CustomError | null;
  isPending: boolean;
  register: (name: string, config: ResisterConfig<SignupForm>) => { ref: (item: HTMLElement | null) => void };
};
