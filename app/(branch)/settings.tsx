import { Text, View } from "@/components/Themed";
import FieldList, { item } from "@/components/ui/FieldList";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useAuth } from "@/redux/selector";
import { loginSuccess } from "@/redux/slices/authSlice";
import authService from "@/services/authService";
import { createAxios } from "@/services/createInstance";
import { TokenData } from "@/types";
import { MaterialIcons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import React, { Fragment } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Button, Divider, Switch } from "react-native-paper";
const itemsAccount: item[] = [
  {
    itemKey: 1,
    left: "Thông tin đăng ký",
    right: <MaterialIcons name="manage-accounts" size={24} color="black" />,
  },
  {
    itemKey: 3,
    left: "Tài Khoản Facebook:",
    right: (
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <MaterialIcons
          name="link"
          size={24}
          color="black"
          style={{ marginRight: 4 }}
        />
        <Text
          style={{
            fontSize: 12,
            fontStyle: "italic",
            textDecorationLine: "underline",
          }}
        >
          Đã Liên Kết
        </Text>
      </View>
    ),
  },
  {
    itemKey: 2,
    left: "Tài Khoản Google",
    right: (
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <MaterialIcons
          name="link"
          size={24}
          color="black"
          style={{ marginRight: 4 }}
        />
        <Text
          style={{
            fontSize: 12,
            fontStyle: "italic",
            textDecorationLine: "underline",
          }}
        >
          Đã Liên Kết
        </Text>
      </View>
    ),
  },
];
const itemsDevice: item[] = [
  {
    itemKey: 1,
    left: "Mật Khẩu",
    right: <MaterialIcons name="password" size={24} color="black" />,
  },
  {
    itemKey: 2,
    left: "Mật Khẩu",
    right: <MaterialIcons name="password" size={24} color="black" />,
  },
];
const itemsGeneral: (obj: {
  notify: {
    isSwitchOn: boolean;
    onToggleSwitch: () => void;
  };
  darkMode: {
    isSwitchOn: boolean;
    onToggleSwitch: () => void;
  };
}) => item[] = (obj) => [
  {
    itemKey: 1,
    left: "Thông Báo",
    // right: <MaterialIcons name="notifications-none" size={24} color="black" />,
    right: (
      <Switch
        value={obj.notify.isSwitchOn}
        onValueChange={obj.notify.onToggleSwitch}
        style={{ padding: 0, margin: 0 }}
      />
    ),
  },
  {
    itemKey: 2,
    left: "Ngôn Ngữ",
    right: <MaterialIcons name="password" size={24} color="black" />,
  },
  {
    itemKey: 3,
    left: "Chế Độ Tối",
    right: (
      <Switch
        value={obj.darkMode.isSwitchOn}
        onValueChange={obj.darkMode.onToggleSwitch}
        style={{ padding: 0, margin: 0 }}
      />
    ),
  },
];
const itemsPayment: item[] = [
  {
    itemKey: 1,
    left: "Mật Khẩu",
    right: <MaterialIcons name="password" size={24} color="black" />,
  },
  {
    itemKey: 2,
    left: "Mật Khẩu",
    right: <MaterialIcons name="password" size={24} color="black" />,
  },
];
export default function SettingScreen() {
  const pathname = usePathname();
  console.log(pathname);
  const [isSwitchNotifyOn, setIsSwitchNotifyOn] = React.useState(false);
  const [isSwitchDarkModeOn, setIsSwitchDarkModeOn] = React.useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = React.useState<boolean>(false);
  const onToggleSwitch = (
    setIsSwitchOn: React.Dispatch<React.SetStateAction<boolean>>,
    isSwitchOn: boolean
  ) => setIsSwitchOn(!isSwitchOn);
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(useAuth);
  const axiosClient = createAxios(
    currentUser as TokenData,
    dispatch,
    loginSuccess
  );
  const handleLogout = async () => {
    try {
      setIsLoadingLogout(false);
      await authService.logOut(
        dispatch,
        currentUser?.user?.id ?? "",
        axiosClient
      );
      setIsLoadingLogout(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ display: "flex", height: "100%" }}>
      <View style={{}}>
        <SafeAreaView>
          <ScrollView>
            <FieldList
              title={"Cài Đặt Tài Khoản"}
              items={itemsAccount}
              style={{ paddingBottom: 0 }}
            ></FieldList>
            <View
              style={{
                paddingVertical: 16,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                icon="logout"
                mode="contained-tonal"
                onPress={handleLogout}
                style={{ width: 160 }}
                loading={isLoadingLogout}
                disabled={isLoadingLogout}
              >
                Logout
              </Button>
            </View>
            <Divider></Divider>
            <FieldList
              title={"Cài Đặt Thiết Bị"}
              items={itemsDevice}
            ></FieldList>
            <Divider></Divider>
            <FieldList
              title={"Cài Đặt Chung"}
              items={itemsGeneral({
                notify: {
                  isSwitchOn: isSwitchNotifyOn,
                  onToggleSwitch: () =>
                    onToggleSwitch(setIsSwitchNotifyOn, isSwitchNotifyOn),
                },
                darkMode: {
                  isSwitchOn: isSwitchDarkModeOn,
                  onToggleSwitch: () =>
                    onToggleSwitch(setIsSwitchDarkModeOn, isSwitchDarkModeOn),
                },
              })}
            ></FieldList>
            <Divider></Divider>
            <FieldList title={"Thanh Toán"} items={itemsPayment}></FieldList>
            <Divider></Divider>
            <FieldList title={"Thanh Toán"} items={itemsPayment}></FieldList>
            <Divider></Divider>
            <FieldList title={"Thanh Toán"} items={itemsPayment}></FieldList>
            <Divider></Divider>
            <FieldList title={"Thanh Toán"} items={itemsPayment}></FieldList>
            <Divider></Divider>
            <FieldList title={"Thanh Toán"} items={itemsPayment}></FieldList>
            <Divider></Divider>
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}
