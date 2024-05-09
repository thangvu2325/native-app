import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { FunctionComponent, useEffect, useState } from "react";
import { ScrollView, useColorScheme } from "react-native";
import { LineChart, lineDataItem } from "react-native-gifted-charts";

interface HistoryChartScreenProps {}
const latestData: lineDataItem[] = [
  {
    value: 100,
    hideDataPoint: true,
    label: "20",
    labelTextStyle: { color: "red" },
  },
  {
    value: 120,
    hideDataPoint: true,
    label: "20",
    labelTextStyle: { color: "red" },
  },
  {
    value: 210,
    hideDataPoint: true,
  },
  {
    value: 250,
    hideDataPoint: true,
  },
  {
    value: 320,
    hideDataPoint: true,
  },
  {
    value: 310,
    hideDataPoint: true,
  },
  {
    value: 270,
    hideDataPoint: true,
    label: "20",
    labelTextStyle: { color: "red" },
  },
  {
    value: 240,
    hideDataPoint: true,
  },
  {
    value: 130,
    hideDataPoint: true,
  },
  {
    value: 120,
    hideDataPoint: true,
  },
  {
    value: 100,
    hideDataPoint: true,
  },
  {
    value: 210,
    hideDataPoint: true,
  },
  {
    value: 270,
    hideDataPoint: true,
  },
  {
    value: 240,
    hideDataPoint: true,
  },
  {
    value: 120,
    hideDataPoint: true,
  },
  {
    value: 100,
    hideDataPoint: true,
  },
  {
    value: 210,
    hideDataPoint: true,
  },
  {
    value: 20,
    hideDataPoint: true,
  },
  {
    value: 100,
    hideDataPoint: true,
  },
];
const HistoryChartScreen: FunctionComponent<HistoryChartScreenProps> = () => {
  const [currentData, setCurrentData] = useState<lineDataItem[]>(latestData);
  const colorScheme = useColorScheme();
  // useEffect(() => {
  //   // Thiết lập interval
  //   const intervalId = setInterval(() => {
  //     setCurrentData((prev) => [
  //       ...prev,
  //       {
  //         value: Math.floor(Math.random() * (500 - 100 + 1)) + 100,
  //         hideDataPoint: true,
  //       },
  //     ]);
  //   }, 2000);
  //   // Cleanup function
  //   return () => clearInterval(intervalId);
  // }, []);
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingHorizontal: 32,
          gap: 24,
        }}
      >
        <View
          style={{
            borderWidth: 0.6,
            flex: 1,
            borderRadius: 16,
            position: "relative",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 12,
            paddingBottom: 6,
          }}
        >
          <Text
            style={{
              position: "absolute",
              top: 0,
              left: 12,
              fontSize: 10,
              fontWeight: "400",
              fontStyle: "italic",
            }}
          >
            Dữ liệu khói cao nhất
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>400</Text>
        </View>
        <View
          style={{
            borderWidth: 0.6,
            flex: 1,
            borderRadius: 16,
            position: "relative",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 12,
            paddingBottom: 6,
          }}
        >
          <Text
            style={{
              position: "absolute",
              top: 0,
              left: 12,
              fontSize: 10,
              fontWeight: "400",
              fontStyle: "italic",
            }}
          >
            Số lần phát hiện bất thường
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>3</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 24,
        }}
      >
        <View style={{ width: 320, marginTop: 120 }}>
          <LineChart
            width={240}
            endSpacing={0}
            initialSpacing={0}
            data={currentData}
            textColor1="black"
            textShiftY={-8}
            textShiftX={-10}
            adjustToWidth={true}
            textFontSize={13}
            xAxisIndicesWidth={20}
            noOfSectionsBelowXAxis={4}
            thickness={1}
            hideRules
            yAxisOffset={20}
            yAxisColor="#0BA5A4"
            color1="black"
            verticalLinesColor="rgba(14,164,164,0.5)"
            xAxisColor="#0BA5A4"
            pointerConfig={{
              pointerStripWidth: 2,
              pointerStripColor: Colors[colorScheme ?? "light"].primary,
              pointerLabelComponent: () => (
                <View
                  style={{
                    backgroundColor: "red",
                  }}
                >
                  <Text>test</Text>
                </View>
              ),
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HistoryChartScreen;
