import { View } from "@/components/Themed";
import { Slot } from "expo-router";
import React, { FunctionComponent } from "react";
import { StyleSheet } from "react-native";

interface DashboardLayoutProps {}

const DashboardLayout: FunctionComponent<DashboardLayoutProps> = () => {
  const [value, setValue] = React.useState("");
  return (
    <View>
      <Slot></Slot>
    </View>
  );
};
const styles = StyleSheet.create({
  wrap: {
    height: "100%",
  },
  container: {
    marginHorizontal: 4,
  },
});
export default DashboardLayout;
