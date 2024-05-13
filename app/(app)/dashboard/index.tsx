import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Menu,
  Searchbar,
} from "react-native-paper";
import * as React from "react";
import CircularProgress from "@/components/CircularProgress";
import { deviceType } from "@/types";
import Card from "./_component/card";
import Colors from "@/constants/Colors";
import { router, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { deviceSelector } from "@/redux/selector";
import formatTimeDifference from "@/lib/formatTime";
import useMessage from "@/hook/useMessage";
import { updateDevices } from "@/redux/slices/deviceSlice";

export default function TabTwoScreen() {
  // Animated FAB
  const [isExtended, setIsExtended] = React.useState(true);
  const { messageDeviceReceived } = useMessage();
  const isIOS = Platform.OS === "ios";
  const colorScheme = useColorScheme();
  const onScroll = ({ nativeEvent }: { nativeEvent: any }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };
  const route = useRouter();
  const dispatch = useAppDispatch();
  // const fabStyle = { [animateFrom]: 16 };
  React.useEffect(() => {
    const handleListenDevice = async () => {
      await messageDeviceReceived((message) => {
        dispatch(updateDevices(JSON.parse(message)));
      });
    };
    handleListenDevice();
  }, []);
  // Search Bar
  const [searchQuery, setSearchQuery] = React.useState("");
  const deviceList = useAppSelector(deviceSelector).data
    ?.devices as deviceType[];
  return (
    <View style={styles.wrap}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
              paddingBottom: 20,
            }}
          >
            <Searchbar
              placeholder="Tìm Thiết Bị"
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
          </View>
          <Divider></Divider>
          <SafeAreaView style={styles.fabContainer}>
            <ScrollView
              onScroll={onScroll}
              style={{ marginRight: 0, marginBottom: 44 }}
            >
              {deviceList?.map((device, index) => {
                //   Meunu
                const [visible, setVisible] = React.useState(false);

                const openMenu = () => setVisible(true);

                const closeMenu = () => setVisible(false);
                const voltage = device?.battery?.voltage || 3000;
                const percentBattery = Math.round(
                  ((600 - (3600 - voltage)) * 100) / 600
                );
                return (
                  <React.Fragment key={device.id}>
                    <Card
                      title={`Thiết bị ${index + 1}`}
                      deviceId={device?.deviceId}
                      status={true}
                      right={
                        <SafeAreaView>
                          <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={
                              <IconButton
                                icon="dots-vertical-circle-outline"
                                iconColor={
                                  Colors[colorScheme ?? "light"].primary
                                }
                                size={32}
                                onPress={openMenu}
                              />
                            }
                          >
                            <Menu.Item
                              onPress={() => {
                                closeMenu();
                                router.navigate({
                                  pathname: "/devices/[deviceId]",
                                  params: { deviceId: device.deviceId },
                                });
                              }}
                              title="Chi Tiết"
                            />
                            <Divider />
                            <Menu.Item onPress={() => {}} title="Share" />
                          </Menu>
                        </SafeAreaView>
                      }
                    >
                      <Avatar.Icon size={96} icon="devices" />
                      <View>
                        <CircularProgress
                          width={80}
                          height={80}
                          value={device.sensors?.SmokeValue}
                          targetValue={1000}
                          status={true}
                        ></CircularProgress>
                      </View>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            marginBottom: -2,
                            fontSize: 16,
                          }}
                        >
                          {formatTimeDifference(device?.updatedAt)}
                        </Text>

                        <MaterialIcons name="update" size={36} color="black" />
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 0,
                        }}
                      >
                        <Text
                          style={{
                            marginBottom: -6,
                            fontSize: 16,
                            fontStyle: "italic",
                            fontWeight: "600",
                            color: Colors[colorScheme ?? "light"].primary,
                          }}
                        >
                          {percentBattery}%
                        </Text>
                        <FontAwesome name="battery-2" size={32} color="black" />
                      </View>
                    </Card>
                    {/* <SafeAreaView>
                    <Pressable
                      style={styles.item}
                      onPressOut={() => {
                        router.navigate({
                          pathname: "/device/[deviceId]",
                          params: { deviceId: "bacon" },
                        });
                      }}
                    > */}

                    {/* </Pressable>
                  </SafeAreaView> */}
                    <Divider></Divider>
                  </React.Fragment>
                );
              })}
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 120,
                }}
              >
                <Button
                  style={{
                    flexDirection: "row",
                    gap: 16,
                  }}
                  icon="camera"
                  mode="outlined"
                  onPress={() => route.navigate("/scanqr")}
                >
                  <Text style={{ fontSize: 20, fontWeight: "600" }}>
                    Thêm Thiết Bị
                  </Text>
                </Button>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {},
  container: {},
  content: {
    position: "relative",
    height: "100%",
  },

  // FAB animation
  fabContainer: {
    flexGrow: 1,
    paddingBottom: 56,
  },
  fabStyle: {
    zIndex: -1,
    bottom: 16,
    right: 16,
    position: "absolute",
  },
  item: {
    paddingVertical: 8,
    position: "relative",
    paddingLeft: 16,
    paddingRight: 24,
  },
  itemRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
