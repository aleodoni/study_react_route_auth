import React, { createContext, useContext, useCallback } from 'react';
import { apiGithub } from '../services/api';

interface IUser {
  login?: string;
  id?: number;
  name?: string;
}

interface GithubContextData {
  user: IUser;
  deleta(): void;
  carrega(): void;
}

type ActionType = 'START' | 'SUCCESS' | 'ERROR';

interface IAction {
  type: ActionType;
  payload: IUser | Error | null;
}

interface IReducer {
  loading?: boolean;
  user?: IUser | Error | null;
  error?: Error | null;
}

const GithubContext = createContext<GithubContextData>({} as GithubContextData);

const githubReducer: React.Reducer<IReducer, IAction> = (state, action) => {
  switch (action.type) {
    case 'START': {
      return {
        loading: true,
        user: null,
        error: null,
      };
    }
    case 'SUCCESS': {
      return {
        loading: false,
        user: action.payload,
        error: null,
      };
    }
    case 'ERROR': {
      return {
        loading: false,
        user: null,
        error: action.payload as Error,
      };
    }
    default: {
      throw new Error(`Ação não reconhecida ${action.type}`);
    }
  }
};

export const GithubProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(githubReducer, {
    loading: false,
    user: null,
    error: null,
  });

  const deleta = useCallback(() => {
    console.log('DELETA');
    dispatch({ type: 'START', payload: null });
    localStorage.removeItem('@user');
    dispatch({ type: 'SUCCESS', payload: null });
  }, []);

  const carrega = useCallback(() => {
    console.log('CARREGA');

    dispatch({ type: 'START', payload: null });

    apiGithub.get('/users/aleodoni').then((response) => {
      const { data } = response;
      dispatch({
        type: 'SUCCESS',
        payload: {
          id: data.id,
          login: data.login,
          name: data.name,
        },
      });

      localStorage.setItem(
        '@user',
        JSON.stringify({
          id: data.id,
          login: data.login,
          name: data.name,
        }),
      );
    });
  }, []);

  React.useEffect(() => {
    dispatch({ type: 'START', payload: null });

    const user = localStorage.getItem('@user');

    if (user) {
      console.log('LOCALSTORAGE');

      const parsedUser = JSON.parse(user);

      dispatch({
        type: 'SUCCESS',
        payload: parsedUser,
      });
    } else {
      console.log('API');

      apiGithub.get('/users/aleodoni').then((response) => {
        const { data } = response;
        dispatch({
          type: 'SUCCESS',
          payload: {
            id: data.id,
            login: data.login,
            name: data.name,
          },
        });
        localStorage.setItem(
          '@user',
          JSON.stringify({
            id: data.id,
            login: data.login,
            name: data.name,
          }),
        );
      });
    }
  }, []);

  return (
    <GithubContext.Provider
      value={{ user: state.user as IUser, deleta, carrega }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export function useGithub(): GithubContextData {
  const context = useContext(GithubContext);

  if (!context) {
    throw new Error('useGithub must be used within an AuthProvider');
  }

  return context;
}
