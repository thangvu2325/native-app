import { useAppSelector } from "@/redux/hook";
import { useAuth } from "@/redux/selector";
import { Redirect, Stack } from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

export default function AppLayout() {
  const { isLogin, currentUser } = useAppSelector(useAuth);

  if (isLogin) {
    return <Redirect href={"/(home)/"}></Redirect>;
  }
  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
