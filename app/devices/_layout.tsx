import { Redirect, Slot, router, usePathname } from "expo-router";
import { FunctionComponent } from "react";
import { Button } from "react-native-paper";
import LayoutHasHeader from "@/layouts/LayoutHasHeader";
import { useAppSelector } from "@/redux/hook";
import { useAuth } from "@/redux/selector";

interface DeviceLayoutProps {}
export const unstable_settings = {
  initialRouteName: "(home)",
};
const DeviceLayout: FunctionComponent<DeviceLayoutProps> = () => {
  const pathname = usePathname();
  console.log(pathname);

  const { isLogin } = useAppSelector(useAuth);
  if (!isLogin) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/(auth)/sign-in" />;
  }
  return (
    <LayoutHasHeader
      HeaderRight={
        <Button
          style={{ marginRight: 12 }}
          icon="history"
          mode="text"
          labelStyle={{
            fontSize: 16,
          }}
          onPress={() => router.push("/")}
        >
          Lịch sử thiết bị
        </Button>
      }
    >
      <Slot></Slot>
    </LayoutHasHeader>
  );
};

export default DeviceLayout;
