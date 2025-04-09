type Timeout = ReturnType<typeof setTimeout>;

const setDebounce = (delayTime: number) => {
  let timer: Timeout | null = null;

  return (callback: () => void) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(callback, delayTime * 1000);
  };
};

export const changeSeatCountDebounce = setDebounce(0.5);
