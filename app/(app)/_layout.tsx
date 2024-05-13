import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, Redirect, Tabs, router } from "expo-router";
import { Image, Platform, Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import DrawerItems, { DrawerItemType } from "@/components/ui/DrawerItems";
import { FAB, IconButton, MD3Colors, Portal } from "react-native-paper";
import { View } from "@/components/Themed";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { createAxios } from "@/services/createInstance";
import { TokenData } from "@/types";
import { useAuth } from "@/redux/selector";
import { loginSuccess } from "@/redux/slices/authSlice";
import { fetchDataDevices } from "@/redux/slices/deviceSlice";
import { RootContext } from "../_layout";
import config from "@/config";
import { err } from "react-native-svg";
export const unstable_settings = {
  initialRouteName: "index",
};
const DrawerItemsData: DrawerItemType[] = [
  { label: "Thông Tin Khách Hàng", icon: "account-box", key: 0 },
  { label: "Thông Báo", icon: "account-box", key: 1 },
  { label: "Chính sách", icon: "book-open-page-variant-outline", key: 4 },
  { label: "Về Chúng Tôi", icon: "book-open-page-variant-outline", key: 3 },
  { label: "Gửi báo cáo", icon: "send", key: 2 },
];
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isDrawOpen, setIsDrawOpen] = useState<boolean>(false);
  // FAB
  const { isLogin, currentUser } = useAppSelector(useAuth);
  const dispatch = useAppDispatch();
  const axiosClient = createAxios(
    currentUser as TokenData,
    dispatch,
    loginSuccess
  );
  const value = useContext(RootContext);
  useEffect(() => {
    const handleEnablePush = async () => {
      axiosClient
        .put(`${config.baseUrl}/users/push/enable/${currentUser?.user.id}`, {
          notification_token: value.expoPushToken ?? "",
          device_type: Platform.OS,
        })
        .catch((err) => {
          console.log(err.mesage);
        });
    };
    if (isLogin) {
      dispatch(
        fetchDataDevices({
          axiosClient,
          customer_id: currentUser?.user?.customer_id ?? "",
        })
      );
      handleEnablePush();
    }
  }, [value]);

  if (!isLogin) {
    return <Redirect href={"/(auth)/sign-in"}></Redirect>;
  }

  return (
    <View style={{ position: "relative", height: "100%" }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Trang Chủ",
            headerLeft: () => (
              <Fragment>
                <IconButton
                  icon="arrow-collapse-right"
                  iconColor={"black"}
                  size={20}
                  onPressOut={() => {
                    setIsDrawOpen(!isDrawOpen);
                  }}
                  style={{
                    marginLeft: 16,
                  }}
                />
                <DrawerItems
                  title={"Công Cụ"}
                  items={DrawerItemsData}
                  open={isDrawOpen}
                  setOpen={setIsDrawOpen}
                />
              </Fragment>
            ),
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            headerRight: () => (
              <Link href="/settings" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="settings-outline"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="layers" color={color} />
            ),
            headerRight: () => (
              <IconButton
                icon="reload"
                iconColor={MD3Colors.error50}
                size={20}
                onPress={() =>
                  dispatch(
                    fetchDataDevices({
                      axiosClient,
                      customer_id: currentUser?.user.customer_id ?? "",
                    })
                  )
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="user"
          options={{
            title: "Người dùng",
            tabBarIcon: ({ color }) => (
              <AntDesign
                size={28}
                style={{ marginBottom: -3 }}
                name="user"
                color={color}
              />
            ),
          }}
        />
      </Tabs>
      {/* <Portal>
        <View>
          <Draggable
            x={200}
            y={300}
            onPressOut={() => {}}
            isCircle={true}
            renderColor="#fff"
            children={
              <View style={{ borderRadius: 9999, padding: 8 }}>
                <AntDesign name="customerservice" size={36} color="black" />
              </View>
            }
          />
        </View>
      </Portal> */}
    </View>
  );
}
