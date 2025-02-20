import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import { jwtDecode } from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';

// project import
import Loader from 'components/Loader';
import axios from 'utils/axios';
import { baseUrl } from 'Service/baseUrl';

const chance = new Chance();

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded = jwtDecode(serviceToken);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
  if (serviceToken) {
    sessionStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    sessionStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.sessionStorage.getItem('serviceToken');
        if (serviceToken) {
          setSession(serviceToken);
          const response = await axios.get(`${baseUrl}auth/authorize`);
          console.log('1------------->',response.data);


          const userData = response.data.data
          sessionStorage.setItem("defaultOffice", userData.defaultOfficeId)
          sessionStorage.setItem("companies", JSON.stringify(userData.companies))
          sessionStorage.setItem("phoneNumber", userData.phoneNumber)
          sessionStorage.setItem("role", userData.role)
          sessionStorage.setItem("routers", JSON.stringify(userData.routers))
          sessionStorage.setItem("fullName", userData.fullName)
          sessionStorage.setItem("avatar", userData.avatar || "")
          sessionStorage.setItem("username", userData.username)
          sessionStorage.setItem("defaultCompanyId", userData.defaultCompanyId)
          sessionStorage.setItem("defaultCompanyName", userData.defaultCompanyName)
          sessionStorage.setItem("isStaff", userData.isStaff)
          window.location.href = "/dashboard"
          


          const { user } = response.data;
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              // user
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);


  const payload = {
    username: 'akuu',
    password: '1975',
    deviceId: "browser-" + Math.random().toString(36).substr(2, 9),
  }
  const login = async (token, type) => {
    console.log('login--------->>>>>>>>>>>>>', token, type);

    setSession(token);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        // user
      }
    });



    // const response = await axios.post(`${baseUrl}auth/login`, payload, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // } );
    // console.log('------------->',response.data);
    // const { data, user } = response.data;
    // setSession(response.data.data);
    // dispatch({
    //   type: LOGIN,
    //   payload: {
    //     isLoggedIn: true,
    //     // user
    //   }
    // });





  };

  const register = async (email, password, firstName, lastName) => {
    // todo: this flow need to be recode as it not verified
    const id = chance.bb_pin();
    const response = await axios.post('/api/account/register', {
      id,
      email,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.sessionStorage.getItem('users') !== undefined && window.sessionStorage.getItem('users') !== null) {
      const localUsers = window.sessionStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.sessionStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    sessionStorage.clear();
    window.location.reload();
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async (email) => {
    console.log('email - ', email);
  };

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
