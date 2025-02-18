import { useMemo, useEffect, useReducer, useCallback, createContext } from 'react';

// third party
import { createClient } from '@supabase/supabase-js';

// project imports
import authReducer from 'contexts/auth-reducer/auth';
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';

// supabase initialize
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// const
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
  } else {
    localStorage.removeItem('serviceToken');
  }
};

// ==============================|| SUPABASE CONTEXT & PROVIDER ||============================== //

const supabaseContext = createContext(null);

export const SupabseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error) {
        dispatch({ type: LOGOUT, payload: { isLoggedIn: false, user: null } });
        console.error(error);
        throw error;
      }

      if (session?.user) {
        dispatch({ type: LOGIN, payload: { user: session?.user, isLoggedIn: true } });
      } else {
        dispatch({ type: LOGOUT, payload: { user: null, isLoggedIn: false } });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: LOGOUT, payload: { user: null, isLoggedIn: false } });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      dispatch({ type: LOGOUT, payload: { user: null, isLoggedIn: false } });
      console.error(error);
      throw error;
    } else {
      setSession(data.session.access_token);
      dispatch({
        type: LOGIN,
        payload: {
          user: {
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata.display_name
          },
          isLoggedIn: true
        }
      });
    }
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: `${firstName} ${lastName}`
        }
      }
    });

    if (error) {
      console.error(error);
      throw error;
    }
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      throw error;
    }

    dispatch({
      type: LOGOUT
    });
  }, []);

  // FORGOT PASSWORD
  const forgotPassword = useCallback(async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `/code-verification`
    });

    if (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const memoizedValue = useMemo(
    () => ({
      user: { ...state.user },
      ...state,
      login,
      register,
      logout,
      forgotPassword
    }),
    [forgotPassword, login, logout, register, state]
  );

  return <supabaseContext.Provider value={memoizedValue}>{children}</supabaseContext.Provider>;
};

export default supabaseContext;
