import React, { createContext, useContext, useCallback } from 'react';
import { apiEscola } from '../services/api';

interface IUser {
  email?: string;
  id?: number;
  name?: string;
  is_active?: boolean;
  is_admin?: boolean;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface IToken {
  token?: string;
}

interface AuthContextData {
  user: IUser;
  token: IToken;
  signIn(credentials: SignInCredentials): void;
  checkToken(): void;
  signOut(): void;
}

type ActionType = 'START' | 'SUCCESS' | 'ERROR';

interface IAction {
  type: ActionType;
  payload: {
    user: IUser | Error | null;
    token: IToken | null;
  };
}

interface IReducer {
  loading?: boolean;
  user?: IUser | Error | null;
  token?: IToken | null;
  error?: Error | null;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const authReducer: React.Reducer<IReducer, IAction> = (state, action) => {
  switch (action.type) {
    case 'START': {
      return {
        loading: true,
        user: null,
        token: null,
        error: null,
      };
    }
    case 'SUCCESS': {
      return {
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    }
    case 'ERROR': {
      return {
        loading: false,
        user: null,
        token: null,
        error: new Error(),
      };
    }
    default: {
      throw new Error(`Ação não reconhecida ${action.type}`);
    }
  }
};

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, {
    loading: false,
    user: null,
    error: null,
  });

  const signOut = useCallback(() => {
    dispatch({ type: 'START', payload: { user: null, token: null } });
    localStorage.removeItem('@user');
    localStorage.removeItem('@token');
    apiEscola.defaults.headers.Authorization = '';
  }, []);

  const signIn = useCallback(({ email, password }) => {
    dispatch({ type: 'START', payload: { user: null, token: null } });

    apiEscola
      .post('auth', { email, password })
      .then((response) => {
        const { token, user } = response.data;

        localStorage.setItem('@user', JSON.stringify(user));
        localStorage.setItem('@token', JSON.stringify(token));
        apiEscola.defaults.headers.Authorization = `Bearer ${token}`;

        dispatch({
          type: 'SUCCESS',
          payload: {
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              is_active: user.is_active,
              is_admin: user.is_admin,
            },
            token,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: 'ERROR',
          payload: err,
        });
      });
  }, []);

  // React.useEffect(() => {
  //   dispatch({ type: 'START', payload: { user: null, token: null } });

  //   const userLS = localStorage.getItem('@user');
  //   const tokenLS = localStorage.getItem('@token');

  //   if (userLS && tokenLS) {
  //     console.log('LOCALSTORAGE');

  //     const parsedUser = JSON.parse(userLS);
  //     const parsedToken = JSON.parse(tokenLS);

  //     apiEscola.defaults.headers.Authorization = `Bearer ${parsedToken}`;

  //     apiEscola.post('/users/check-token').then((response) => {
  //       const { token } = response.data;

  //       if (token) {
  //         console.log('TOKEN VÁLIDO');
  //         dispatch({
  //           type: 'SUCCESS',
  //           payload: {
  //             user: {
  //               id: parsedUser.id,
  //               email: parsedUser.email,
  //               name: parsedUser.name,
  //               is_active: parsedUser.is_active,
  //               is_admin: parsedUser.is_admin,
  //             },
  //             token: parsedToken,
  //           },
  //         });
  //         localStorage.setItem('@user', userLS);
  //         localStorage.setItem('@token', tokenLS);
  //       } else {
  //         console.log('TOKEN INVÁLIDO');
  //       }
  //     });
  //   } else {
  //     console.log('USUARIO/TOKEN INVÁLIDO');
  //   }
  // }, []);

  const checkToken = useCallback(() => {
    apiEscola.post('/users/check-token').then((response) => {
      const { token } = response.data;

      if (!token) {
        dispatch({
          type: 'SUCCESS',
          payload: {
            user: null,
            token: null,
          },
        });
        localStorage.removeItem('@user');
        localStorage.removeItem('@token');
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user as IUser,
        token: state.token as IToken,
        signIn,
        checkToken,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
