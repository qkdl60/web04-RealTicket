export type ViewProps = {
  isValid: boolean;
  InputRef: React.RefObject<HTMLInputElement>;
  inputData: string;
  changeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validateAndGoNextStep: () => void;
};
