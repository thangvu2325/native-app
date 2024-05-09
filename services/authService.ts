/* eslint-disable @typescript-eslint/no-explicit-any */
import SignIn from "@/app/(auth)/sign-in";
import config from "@/config";
import useMessage from "@/hook/useMessage";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "@/redux/slices/authSlice";
import { updateDevices } from "@/redux/slices/deviceSlice";
import { AppDispatch } from "@/redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosInstance } from "axios";
import { Router } from "expo-router";
const { messageConnection, messageDeviceReceived } = useMessage();

const register = async (
  data: userRegister,
  dispatch: Dispatch,
  router: Router
) => {
  try {
    dispatch(registerStart());
    const res = await axios.post(config.baseUrl + "/auth/register", data);
    dispatch(registerSuccess());
    await login(
      { email: data.email, password: data.password },
      dispatch,
      router
    );
    return res.data;
  } catch (error) {
    dispatch(registerFailed());
    console.log(error);
    throw error;
  }
};
const checkEmailValid = async (email: string) => {
  try {
    const res = await axios.post(`${config.baseUrl}/auth/checkemailexist`, {
      email,
    });
    return res.data;
  } catch (error: any) {
    console.log(error.message);
  }
};
const checkPhoneValid = async (phone: string) => {
  try {
    const res = await axios.post(`${config.baseUrl}/auth/checksmsexist`, {
      phone,
    });
    return res.data;
  } catch (error: any) {
    console.log(error.message);
  }
};
const checkActive = async (
  axiosClient: AxiosInstance,
  userId: string,
  router: Router
) => {
  try {
    const res = await axiosClient.post(`${config.baseUrl}/auth/checkactive`, {
      userId,
    });
    return res.data;
  } catch (error: any) {
    router.push("/(auth)/sign-up/verify");
  }
};
const VerifySecretKey = async (data: { secretKey: string; email: string }) => {
  const res = await axios.post(config.baseUrl + "/auth/verify", data);
  return res.data;
};
const resendVerifyKey = async (data: { email: string }) => {
  try {
    const res = await axios.post(config.baseUrl + "/auth/resend", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const login = async (data: userLogin, dispatch: Dispatch, router: Router) => {
  try {
    dispatch(loginStart());
    const res = await axios.post(config.baseUrl + "/auth/login", data);
    dispatch(loginSuccess(res.data));
    await messageConnection(
      res.data?.backendTokens.accessToken,
      res.data?.user.id
    );
    await messageDeviceReceived((message) => {
      dispatch(updateDevices(JSON.parse(message)));
    });
    router.push("/(home)/");
    return res.data;
  } catch (error: any) {
    dispatch(loginFailed(error.response.data.message));
    console.log(error);
    throw error;
  }
};
export const logOut = async (
  dispatch: AppDispatch,
  id: string,
  axiosClient: AxiosInstance
) => {
  dispatch(logOutStart());
  try {
    await axiosClient.post("/auth/logout", { id: id });
    dispatch(logOutSuccess());
  } catch (err) {
    dispatch(logOutFailed());
  }
};

const authService = {
  register,
  login,
  logOut,
  VerifySecretKey,
  resendVerifyKey,
  checkEmailValid,
  checkPhoneValid,
  checkActive,
};

export default authService;
