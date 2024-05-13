import { Text, View } from "@/components/Themed";
import { LayoutHasHeaderContext } from "@/layouts/LayoutHasHeader";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { deviceSelector, useAuth } from "@/redux/selector";
import { loginSuccess } from "@/redux/slices/authSlice";
import { createAxios } from "@/services/createInstance";
import { TokenData, deviceType, historyType } from "@/types";
import { Slot, useLocalSearchParams, useRouter } from "expo-router";
import {
  FunctionComponent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Pressable } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";

interface HistoryLayoutProps {}
export const unstable_settings = {
  initialRouteName: "/notify",
};
export const HistoryContext = createContext({
  startDate: new Date(),
  endDate: new Date(),
  historyData: [] as historyType[],
} as {
  startDate: CalendarDate;
  endDate: CalendarDate;
  historyData: historyType[];
});
const HistoryLayout: FunctionComponent<HistoryLayoutProps> = () => {
  const { setTitle } = useContext(LayoutHasHeaderContext);

  const router = useRouter();
  const [value, setValue] = useState("");
  // Date Range
  const [range, setRange] = useState<{
    startDate: CalendarDate;
    endDate: CalendarDate;
  }>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [historyData, setHistoryData] = useState<historyType[]>([]);
  const [open, setOpen] = useState(false);
  const local = useLocalSearchParams();
  // const deviceFound = useAppSelector(deviceSelector)?.data?.devices.find(
  //   (device) => device?.deviceId === local?.deviceId
  // ) as deviceType;
  const { currentUser } = useAppSelector(useAuth);
  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const onConfirm = useCallback(
    ({
      startDate,
      endDate,
    }: {
      startDate: CalendarDate;
      endDate: CalendarDate;
    }) => {
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]
  );
  const dispatch = useAppDispatch();
  const axiosClient = createAxios(
    currentUser as TokenData,
    dispatch,
    loginSuccess
  );
  useEffect(() => {
    setTitle("Lịch sử thiết bị");
    setValue("notify");
    const handleGETHistory = async () => {
      try {
        const res: {
          data: {
            historyCount: number;
            historyList: historyType[];
          };
        } = await axiosClient.get(`/history?deviceId=${local?.deviceId}`);
        if (res.data) {
          const startDate = new Date(
            res.data.historyList[0]?.sensors.createdAt ?? ""
          );
          const endDate = new Date(
            res.data.historyList[res.data.historyList.length - 1]?.sensors
              .createdAt ?? ""
          );
          setRange({ startDate, endDate });
          setHistoryData(res.data.historyList);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleGETHistory();
    router.navigate(`/devices/${local.deviceId}/history/` + "notify");
  }, []);
  return (
    <HistoryContext.Provider value={{ ...range, historyData }}>
      <View>
        <View style={{ marginBottom: 16, marginHorizontal: 32 }}>
          <SegmentedButtons
            value={value}
            onValueChange={(value) => {
              router.navigate(`/devices/${local.deviceId}/history/` + value);
              setValue(value);
            }}
            buttons={[
              {
                value: "notify",
                label: "Thông báo",
              },
              {
                value: "chart",
                label: "Đồ thị",
              },
            ]}
          />
          <Pressable
            onPress={() => setOpen(true)}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#ccc" : "transparent",
              },
              {
                marginTop: 12,
                flexDirection: "row",
                alignItems: "center",
                marginLeft: "auto",
                borderRadius: 12,
              },
            ]}
          >
            <View
              style={{
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 12,
              }}
            >
              <View
                style={{
                  position: "relative",
                  borderRightWidth: 1,
                  paddingHorizontal: 12,
                  paddingRight: 12,
                  paddingBottom: 4,
                  paddingTop: 12,
                }}
              >
                <Text>{range.startDate?.toLocaleDateString()}</Text>
                <Text
                  style={{
                    position: "absolute",
                    left: 8,
                    fontWeight: "200",
                    fontSize: 8,
                  }}
                >
                  Ngày bắt đầu
                </Text>
              </View>
              <View
                style={{
                  position: "relative",
                  paddingHorizontal: 12,
                  paddingBottom: 4,
                  paddingTop: 12,
                }}
              >
                <Text>{range.endDate?.toLocaleDateString()}</Text>
                <Text
                  style={{
                    position: "absolute",
                    left: 8,
                    fontWeight: "200",
                    fontSize: 8,
                  }}
                >
                  Ngày Kết Thúc
                </Text>
              </View>
            </View>
          </Pressable>

          <DatePickerModal
            locale="enGB"
            mode="range"
            visible={open}
            onDismiss={onDismiss}
            startDate={range.startDate}
            endDate={range.endDate}
            onConfirm={onConfirm}
          />
        </View>
        <Slot></Slot>
      </View>
    </HistoryContext.Provider>
  );
};

export default HistoryLayout;
