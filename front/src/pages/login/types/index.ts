import { CustomError } from '@/api/axios.ts';

import { ResisterConfig } from '@/shared/types/form.ts';
import type { LoginForm } from '@/shared/types/user';

export type ViewProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  formData: LoginForm;
  setFormData: (data: LoginForm) => void;
  errors: Record<string, string>;
  error: CustomError | null;
  isPending: boolean;
  register: (name: string, config: ResisterConfig<LoginForm>) => { ref: (item: HTMLElement | null) => void };
};
