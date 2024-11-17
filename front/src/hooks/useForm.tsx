import { FormEvent, useRef, useState } from 'react';

/*
TODO 훅 테스트 , FormState는 reducer 사용하기 
   */
interface IFormState {
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValid: boolean;
}
type Validate = (value: string) => null | string;
interface IResisterConfig {
  validate: Validate;
}
export default function useForm<T extends Record<string, unknown>>() {
  const itemRefListRef = useRef<null | Map<string, HTMLElement>>(null);
  const itemValidationListRef = useRef<Record<string, Validate>>({});
  const [formState, setFormState] = useState<IFormState>({
    errors: {},
    isSubmitting: false,
    isValid: false,
  });

  const getMap = () => {
    if (!itemRefListRef.current) {
      itemRefListRef.current = new Map<string, HTMLElement>();
    }
    return itemRefListRef.current;
  };

  const register = (name: string, config: IResisterConfig) => {
    const ref = (item: HTMLElement | null) => {
      const map = getMap();
      if (!item) return;
      map.set(name, item);
    };
    itemValidationListRef.current[name] = config.validate;
    return { ref };
  };

  const handleSubmit = (submit: (data: T) => Promise<void>) => {
    const formData: Record<string, unknown> = {};
    return async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFormState({ ...formState, isSubmitting: true });
      //TODO 함수 분리
      const itemList = getMap();
      try {
        let errors = {};
        itemList.forEach((element, key) => {
          const itemValue = (element as HTMLInputElement).value;
          formData[key] = itemValue;
          const validationResult = itemValidationListRef.current[key](itemValue);
          if (validationResult) {
            errors = { ...errors, [key]: validationResult };
          }
        });
        const hasError = Object.keys(errors).length > 0;
        if (!hasError) {
          await submit(formData as T);
          setFormState((prevState) => ({ ...prevState, errors: {}, isValid: true }));
        } else setFormState((prevState) => ({ ...prevState, isValid: false, errors }));
      } catch (error) {
        //TODO 에러 핸들링 수정
        console.log(error);
      } finally {
        setFormState((prevState) => ({ ...prevState, isSubmitting: false }));
      }
    };
  };

  return { register, handleSubmit, formState };
}
