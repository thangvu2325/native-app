import { FunctionComponent, useContext } from "react";
import { ScrollView, useColorScheme } from "react-native";
import { Text, View } from "@/components/Themed";
import { Divider } from "react-native-paper";

import Colors from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { useAppSelector } from "@/redux/hook";
import { deviceSelector } from "@/redux/selector";
import { HistoryContext } from "../_layout";

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
  const local = useLocalSearchParams();
  const deviceFound = useAppSelector(deviceSelector)?.data?.devices.find(
    (device) => device?.deviceId === local?.deviceId
  );
  const { startDate, endDate } = useContext(HistoryContext);
  return (
    <ScrollView style={{ marginRight: 32, borderRightWidth: 1 }}>
      {/* {deviceFound?.warningLogs.length
        ? deviceFound.warningLogs.map((warning) => (
            <HistoryField
              key={warning.id}
              time={new Date(warning.updatedAt)
                .toISOString()
                .replace(/T/, " ")
                .replace(/\..+/, "")
                .split(" ")
                .map((part) => {
                  const [year, month, day] = part.split("-");
                  return year.length === 4 ? `${day}-${month}-${year}` : part;
                })
                .reverse()
                .join(" - ")}
              content={warning.message}
            ></HistoryField>
          ))
        : ""} */}
    </ScrollView>
  );
};

export default HistoryNotifyScreen;
