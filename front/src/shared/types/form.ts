export interface ResisterConfig<T> {
  validate: Validate<T>;
}
export type Validate<T> = ({ value, formData }: { value: string; formData: T }) => null | string;
