import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storeValue = localStorage.getItem(key);
    return storeValue ? JSON.parse(storeValue) : initialState;
  });

  // Store the data on browser in form of key-value pair (value is a string)
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
