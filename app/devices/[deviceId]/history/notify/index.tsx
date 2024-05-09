import { FunctionComponent } from "react";
import { ScrollView, useColorScheme } from "react-native";
import { Text, View } from "@/components/Themed";
import { Divider } from "react-native-paper";

import Colors from "@/constants/Colors";

interface HistoryNotifyScreenProps {}
const HistoryField: FunctionComponent<{
  time: string;
  content: string;
  status?: "warn" | "abnormal" | "normal";
}> = ({ time, content, status = "normal" }) => {
  const colorScheme = useColorScheme();
  const colorPicker = (): { background: string; textColor: string } => {
    return {
      background:
        Colors[colorScheme ?? "light"][
          status !== "normal" ? status : "primary"
        ],
      textColor: "#fff",
    };
  };
  return (
    <View style={{ marginTop: 12 }}>
      <Text style={{ marginLeft: 16 }}>{time}</Text>
      <Divider></Divider>
      <View style={{ paddingHorizontal: 24, paddingVertical: 16 }}>
        <View
          style={{
            padding: 12,
            backgroundColor: colorPicker().background,
            borderRadius: 16,
            marginRight: "auto",
          }}
        >
          <Text style={{ color: colorPicker().textColor }}>{content}</Text>
        </View>
      </View>
    </View>
  );
};
const HistoryNotifyScreen: FunctionComponent<HistoryNotifyScreenProps> = () => {
  return (
    <ScrollView style={{ marginRight: 32, borderRightWidth: 1 }}>
      <HistoryField
        time="Hôm nay"
        content="Phát hiện bất thường"
      ></HistoryField>
      <HistoryField
        time="Hôm nay"
        content="Phát hiện bất thường"
      ></HistoryField>
    </ScrollView>
  );
};

export default HistoryNotifyScreen;
