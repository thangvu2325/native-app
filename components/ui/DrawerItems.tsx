import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Platform, Pressable, Animated } from "react-native";
import { Button, Drawer, Portal } from "react-native-paper";
export type DrawerItemType = {
  label: string;
  icon: string;
  key: number;
};
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: DrawerItemType[];
  title?: string;
};

const DrawerItems = ({ open, setOpen, items, title }: Props) => {
  const [drawerItemIndex, setDrawerItemIndex] = useState(0);
  const _setDrawerItem = (index: any) => setDrawerItemIndex(index);
  const animatedValue = useRef(new Animated.Value(open ? 1 : 0)).current;
  const route = useRouter();
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: open ? 0 : 1, // Mục tiêu là hiện hoặc ẩn
      duration: 300, // Thời gian animation
      useNativeDriver: false, // Sử dụng native driver
    }).start(); // Bắt đầu animation
  }, [open]);

  return (
    <Portal>
      <View
        style={{
          display: open ? "flex" : "none",
          flexDirection: "row",
          flex: 1,
        }}
      >
        <Animated.View
          style={[
            styles.drawerContent,
            {
              backgroundColor: "#ccc",
            },
            {
              transform: [
                {
                  translateX: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -300],
                  }),
                },
              ],
            },
          ]}
        >
          <Drawer.Section title={title}>
            {items.length
              ? items.map((props, index) => (
                  <Drawer.Item
                    {...props}
                    key={props.key}
                    theme={
                      props.key === 3
                        ? { colors: { primary: "#CCD3CA" } }
                        : undefined
                    }
                    active={drawerItemIndex === index}
                    onPress={() => {
                      _setDrawerItem(index);
                      route.navigate("/policy");
                    }}
                  />
                ))
              : ""}
          </Drawer.Section>
        </Animated.View>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: "rgba(204,204,204,0.9)",
            position: "relative",
            transform: [
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 300], // Di chuyển từ phải qua trái
                }),
              },
            ],
          }}
        >
          <Button
            icon="window-close"
            mode="text"
            contentStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            style={{
              position: "absolute",
              right: 32,
              top: 56,
            }}
            onPress={() => setOpen(!open)}
          >
            Đóng
          </Button>
        </Animated.View>
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    paddingTop: Platform.OS === "android" ? 25 : 22,
    width: 240,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerItems;
