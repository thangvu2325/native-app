import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useAuth } from "@/redux/selector";
import { loginSuccess } from "@/redux/slices/authSlice";
import authService from "@/services/authService";
import { createAxios } from "@/services/createInstance";
import { TokenData } from "@/types";

import { Redirect, Stack, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/(home)",
};

export default function AppLayout() {
  const { isLogin, currentUser } = useAppSelector(useAuth);

  if (!isLogin) {
    return <Redirect href={"/(auth)/sign-in"}></Redirect>;
  }

  return (
    <Stack>
      <Stack.Screen
        name="settings"
        options={{ presentation: "modal", title: "Cài Đặt" }}
      />
      <Stack.Screen
        name="scanqr"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="policy"
        options={{
          presentation: "modal",
          title: "Chính sách",
        }}
      />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", title: "test" }}
      />
      <Stack.Screen
        name="(chatbox)"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
}
