import React, {createContext, useState, useContext, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthData, LoginPayload} from '../utils/types';
import {authService} from '../services/authService';

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  handleLogin(data: LoginPayload): Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [authData, setAuthData] = useState<AuthData>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        //If there are data, it's converted to an Object and the state is updated.
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      //loading finished
      setLoading(false);
    }
  }

  const handleLogin = async (data: LoginPayload) => {
    //call the service passing credential (email and password).
    const authenticatedData = await authService.signIn(data);

    setAuthData(authenticatedData);

    //Persist the data in the Async Storage
    AsyncStorage.setItem('@AuthData', JSON.stringify(authenticatedData));

    //AXIOS AUTHORIZATION HEADER
    axios.defaults.headers.common.Authorization = `Bearer ${authenticatedData.token}`;
  };

  return (
    <AuthContext.Provider value={{authData, loading, handleLogin}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth};
