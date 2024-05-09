import {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Pressable, ScrollView, useColorScheme } from "react-native";
import { LayoutHasHeaderContext } from "@/layouts/LayoutHasHeader";
import { Text, View } from "@/components/Themed";
import { Divider, SegmentedButtons } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";
import { enGB, registerTranslation } from "react-native-paper-dates";
import Colors from "@/constants/Colors";
registerTranslation("enGB", {
  save: "Save",
  selectSingle: "Select date",
  selectMultiple: "Select dates",
  selectRange: "Select period",
  notAccordingToDateFormat: (inputFormat) =>
    `Date format must be ${inputFormat}`,
  mustBeHigherThan: (date) => `Must be later then ${date}`,
  mustBeLowerThan: (date) => `Must be earlier then ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: "Day is not allowed",
  previous: "Previous",
  next: "Next",
  typeInDate: "Type in date",
  pickDateFromCalendar: "Pick date from calendar",
  close: "Close",
  hour: "",
  minute: "",
});
interface HistoryScreenProps {}
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
const HistoryScreen: FunctionComponent<HistoryScreenProps> = () => {
  const { setTitle } = useContext(LayoutHasHeaderContext);
  useEffect(() => {
    setTitle("Lịch sử thiết bị");
  }, []);
  const [value, setValue] = useState("");

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
          onValueChange={setValue}
          buttons={[
            {
              value: "walk",
              label: "Thông báo",
            },
            {
              value: "train",
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
    </View>
  );
};

export default HistoryScreen;
