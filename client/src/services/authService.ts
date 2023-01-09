import axios from 'axios';
import * as url from '../utils/constant';
import {AuthData, SignInPayload, LoginPayload} from '../utils/types';

const register = async (data: SignInPayload): Promise<AuthData> => {
  try {
    let res = await axios.post(url.REGISTER, data);

    return res.data;
  } catch (error) {
    throw error;
  }
};

const signIn = async (data: LoginPayload): Promise<AuthData> => {
  try {
    let res = await axios.post(url.LOGIN, data);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const authService = {
  register,
  signIn,
};
