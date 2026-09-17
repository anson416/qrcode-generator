import { useCallback, useEffect, useState } from "react";

function readStoredValue<T>(key: string, defaultValue: T): T {
  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue === null ? defaultValue : (JSON.parse(rawValue) as T);
  } catch {
    return defaultValue;
  }
}

export default function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState(() => readStoredValue(key, defaultValue));

  const setStoredValue = useCallback(
    (newValue: T) => {
      setValue(newValue);
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      } catch {
        // localStorage unavailable (e.g. private mode); keep in-memory value.
      }
    },
    [key]
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== key) return;
      setValue(readStoredValue(key, defaultValue));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, defaultValue]);

  return [value, setStoredValue];
}
