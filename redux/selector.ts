import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const authSelector = (state: RootState) => state.persistedReducer.auth;
export const useAuth = createSelector(authSelector, (data) => {
  if (data.login.authData?.backendTokens?.accessToken) {
    return {
      isLogin: true,
      currentUser: data.login.authData,
    };
  }
  return {
    isLogin: false,
    currentUser: null,
  };
});
// device
export const deviceSelector = (state: RootState) => state.device;
