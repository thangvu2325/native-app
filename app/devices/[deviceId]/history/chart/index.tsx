import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useAppSelector } from "@/redux/hook";
import { deviceSelector } from "@/redux/selector";
import { useLocalSearchParams } from "expo-router";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { LineChart, lineDataItem } from "react-native-gifted-charts";
import { HistoryContext } from "../_layout";

interface HistoryChartScreenProps {}

const HistoryChartScreen: FunctionComponent<HistoryChartScreenProps> = () => {
  const [currentData, setCurrentData] = useState<lineDataItem[]>([]);
  const [smokeValue, setSmokeValue] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const local = useLocalSearchParams();
  const deviceFound = useAppSelector(deviceSelector)?.data?.devices.find(
    (device) => device?.deviceId === local?.deviceId
  );
  const { startDate, endDate, historyData } = useContext(HistoryContext);
  console.log(historyData.length);
  useEffect(() => {
    if (historyData.length) {
      let smokeValue = 0;
      let count = 0;
      historyData
        .filter((item) => {
          // Kiểm tra xem cả startDate và endDate có tồn tại và có giá trị không
          if (startDate && endDate) {
            return (
              new Date(item?.sensors.updatedAt).getTime() >=
                startDate.getTime() &&
              new Date(item?.sensors.updatedAt).getTime() <= endDate.getTime()
            );
          }
          return false; // Trả về false nếu startDate hoặc endDate không tồn tại hoặc không hợp lệ
        })
        .forEach((item) => {
          if (item?.sensors.SmokeValue > 3000) {
            count++;
          }
          if (smokeValue < item?.sensors.SmokeValue) {
            smokeValue = item?.sensors.SmokeValue;
          }
        });
      setSmokeValue(smokeValue);
      setCount(count);
      setCurrentData(
        historyData
          .filter((item) => {
            // Kiểm tra xem cả startDate và endDate có tồn tại và có giá trị không
            if (startDate && endDate) {
              return (
                new Date(item?.sensors.updatedAt).getTime() >=
                  startDate.getTime() &&
                new Date(item?.sensors.updatedAt).getTime() <= endDate.getTime()
              );
            }
            return false; // Trả về false nếu startDate hoặc endDate không tồn tại hoặc không hợp lệ
          })
          .map((item, index, array) => {
            const isLabel = [0, ...Array(4).fill(Math.floor(array.length / 5))]
              .map(
                (v, i) =>
                  v +
                  i * Math.floor(array.length / 5) +
                  (i === 0 ? array.length % 5 : 0)
              )
              .includes(index);
            return {
              value: item?.sensors.SmokeValue,
              hideDataPoint: true,
              ...{
                label: isLabel
                  ? new Date(item?.sensors.updatedAt).toLocaleDateString(
                      "en-GB"
                    )
                  : undefined,
              },
              Date: new Date(item?.sensors.updatedAt)
                .toISOString()
                .replace(/T/, " ")
                .replace(/\..+/, "")
                .split(" ")
                .map((part) => {
                  const [year, month, day] = part.split("-");
                  return year.length === 4 ? `${day}-${month}-${year}` : part;
                })
                .reverse()
                .join(" - "),
            };
          })
      );
    }
  }, [deviceFound, startDate, endDate]);
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
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{smokeValue}</Text>
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
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{count}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 24,
        }}
      >
        <View
          style={{ width: 320, borderRadius: 4, borderWidth: 1, padding: 20 }}
        >
          <LineChart
            overflowTop={100}
            width={240}
            endSpacing={0}
            initialSpacing={0}
            hideDataPoints
            data={currentData}
            highlightedRange={{
              from: 3000,
              to: 10000,
              color: "red",
            }}
            textColor1="black"
            adjustToWidth={true}
            startFillColor="rgba(20,105,81,0.3)"
            endFillColor="rgba(20,85,81,0.01)"
            textFontSize={13}
            xAxisIndicesWidth={20}
            xAxisLabelTextStyle={{ width: 80, fontSize: 4 }}
            thickness={1}
            hideRules
            yAxisColor="#0BA5A4"
            color1="black"
            verticalLinesColor="rgba(14,164,164,0.5)"
            xAxisColor="#0BA5A4"
            pointerConfig={{
              pointerStripHeight: 160,
              pointerStripColor: "lightgray",
              pointerStripWidth: 2,
              pointerColor: "lightgray",
              radius: 6,
              pointerLabelWidth: 100,
              pointerLabelHeight: 90,
              activatePointersOnLongPress: true,
              autoAdjustPointerLabelPosition: false,
              pointerLabelComponent: (items: any) => {
                return (
                  <View
                    style={{
                      height: 90,
                      width: 100,
                      justifyContent: "center",
                      marginTop: -30,
                      marginLeft: -40,
                    }}
                  >
                    <Text
                      style={{
                        color: "red",
                        fontSize: 14,
                        marginBottom: 6,
                        textAlign: "center",
                      }}
                    >
                      {items[0].Date}
                    </Text>

                    <View
                      style={{
                        paddingHorizontal: 14,
                        paddingVertical: 6,
                        borderRadius: 16,
                        backgroundColor: "white",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                        {items[0].value}
                      </Text>
                    </View>
                  </View>
                );
              },
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HistoryChartScreen;
