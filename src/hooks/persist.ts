import React, { Dispatch, SetStateAction } from 'react';

function usePersistedState<S>(
  key: string,
  defaultValue: string,
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = React.useState<S>(() => {
    const persistedState = localStorage.getItem(key);
    return persistedState ? JSON.parse(persistedState) : defaultValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}

export default usePersistedState;
