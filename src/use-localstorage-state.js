import { useState } from './preact.js';

const useLocalStorageState = (name, initial) => {
  const key = `five-dice/${name}`;
  const [value, setValue] = useState(initial);
  let stored = value;

  if (initial === value) {
    stored = Number(localStorage.getItem(key)) || initial;
  }

  return [stored, val => {
    if (val === initial) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, val);
    }

    if (val === value && val !== stored) {
      setValue(undefined);
    }

    setValue(val);
  }];
};

export { useLocalStorageState };
