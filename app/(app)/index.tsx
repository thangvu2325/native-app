import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { LineChart, lineDataItem } from "react-native-gifted-charts";

import * as React from "react";
import { deviceSelector, useAuth } from "@/redux/selector";
import { useAppSelector } from "@/redux/hook";

export default function TabOneScreen() {
  const [currentData, setCurrentData] = React.useState<lineDataItem[]>([]);
  const { isLogin, currentUser } = useAppSelector(useAuth);

  const devicesCount = useAppSelector(deviceSelector)?.data?.devicesCount;

  // React.useEffect(() => {
  //   // Thiết lập interval
  //   const intervalId = setInterval(() => {
  //     setCurrentData((prev) => [
  //       ...prev,
  //       {
  //         value: Math.floor(Math.random() * (500 - 100 + 1)) + 100,
  //         labelComponent: () => <Text>"24 Nov"</Text>,
  //         hideDataPoint: true,
  //       },
  //     ]);
  //   }, 2000);
  //   // Cleanup function
  //   return () => clearInterval(intervalId);
  // }, []);
  return (
    <View>
      <View style={{ marginHorizontal: 16 }}>
        <SafeAreaView>
          <ScrollView>
            <View
              style={{
                display: "flex",
                marginTop: 24,
                marginHorizontal: 12,
                gap: 24,
              }}
            >
              <View>
                <Text style={{ fontSize: 24, fontWeight: "600" }}>
                  Xin Chào!
                </Text>
                <Text
                  style={{ fontSize: 24, fontWeight: "600", marginLeft: 20 }}
                >
                  Thắng Vũ
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    position: "relative",
                    width: 34,
                    marginRight: 8,
                  }}
                >
                  <FontAwesome name="bell-o" size={30} color="black" />
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 9999,
                      backgroundColor: "red",
                      position: "absolute",
                      top: 0,
                      right: 4,
                    }}
                  ></View>
                </View>
                <View style={{ width: 200 }}>
                  <Text>Bạn có thêm 4 thông báo mới chưa đọc</Text>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  backgroundColor: "#CCD3CA",
                  borderRadius: 8,
                  height: 300,
                  display: "flex",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 18 }}>Thống Kê</Text>
                  <Ionicons name="filter" size={24} color="black" />
                </View>
                <View
                  style={{
                    overflow: "hidden",
                    flex: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <LineChart
                    initialSpacing={0}
                    data={currentData}
                    spacing={10}
                    textColor1="black"
                    textShiftY={-8}
                    textShiftX={-10}
                    textFontSize={13}
                    thickness={1}
                    hideRules
                    yAxisColor="#0BA5A4"
                    color1="black"
                    verticalLinesColor="rgba(14,164,164,0.5)"
                    xAxisColor="#0BA5A4"
                  />
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 12,
                  height: 120,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#F5E8DD",
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      fontStyle: "italic",
                    }}
                  >
                    Số Thiết Bị
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      fontStyle: "italic",
                    }}
                  >
                    {devicesCount ?? ""}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "#EED3D9",
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      fontStyle: "italic",
                    }}
                  >
                    Cập Nhật
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      fontStyle: "italic",
                    }}
                  >
                    20
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}
