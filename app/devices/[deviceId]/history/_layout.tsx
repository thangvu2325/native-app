import { Text, View } from "@/components/Themed";
import { LayoutHasHeaderContext } from "@/layouts/LayoutHasHeader";
import { Slot, router, usePathname, useRouter } from "expo-router";
import {
  FunctionComponent,
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

const HistoryLayout: FunctionComponent<HistoryLayoutProps> = () => {
  const { setTitle } = useContext(LayoutHasHeaderContext);
  useEffect(() => {
    setTitle("Lịch sử thiết bị");
    setValue(pathName.split("/").pop() ?? "notify");
  }, []);
  const router = useRouter();
  const [value, setValue] = useState("");
  console.log(value);
  const pathName = usePathname();
  // Date Range
  const [range, setRange] = useState<{
    startDate: CalendarDate;
    endDate: CalendarDate;
  }>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [open, setOpen] = useState(false);

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
  return (
    <View>
      <View style={{ marginBottom: 16, marginHorizontal: 32 }}>
        <SegmentedButtons
          value={value}
          onValueChange={(value) => {
            router.navigate("/device/history/" + value);
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
  );
};

export default HistoryLayout;
