import { Text, View } from "@/components/Themed";
import FieldList, { item } from "@/components/ui/FieldList";
import { FunctionComponent, useContext, useEffect } from "react";
import { Button, Divider, IconButton, Tooltip } from "react-native-paper";
import { ScrollView } from "react-native";
import { LayoutHasHeaderContext } from "@/layouts/LayoutHasHeader";
import { useLocalSearchParams, usePathname } from "expo-router";
import { useAppSelector } from "@/redux/hook";
import { deviceSelector } from "@/redux/selector";
import formatTimeDifference from "@/lib/formatTime";
import Ionicons from "@expo/vector-icons/Ionicons";

interface DetailScrrenProps {}
const items: (props: {
  deviceId: string;
  deviceName: string;
  imsi: string;
}) => item[] = ({ deviceId, deviceName, imsi }) => [
  {
    itemKey: 1,
    left: <Text style={{ fontSize: 14, fontWeight: "600" }}>Mã Thiết Bị</Text>,
    right: deviceId,
  },
  {
    itemKey: 2,
    left: <Text style={{ fontSize: 14, fontWeight: "600" }}>Tên Thiết Bị</Text>,
    right: deviceName,
  },
  {
    itemKey: 3,
    left: (
      <View style={{ flexDirection: "row", alignContent: "center", gap: 6 }}>
        <Text style={{ fontSize: 14, fontWeight: "600" }}>Imsi</Text>
        <Tooltip title="Selected Camera" enterTouchDelay={100}>
          <Ionicons name="information-circle-outline" size={20} color="black" />
        </Tooltip>
      </View>
    ),
    right: imsi ?? 0,
  },
];

const signalItems: (props: {
  Operator?: string;
  band?: number;
  EARFCN?: number;
  PCI?: number;
  connectionStatus?: number;
  ipAddress?: string;
  RSRP?: number;
  RSSI?: number;
  RSRQ?: number;
  T3324?: number;
  T3412?: number;
  tac?: string;
  updatedAt?: Date;
}) => item[] = (props) => [
  {
    itemKey: 1,
    left: (
      <View style={{ flexDirection: "row", alignContent: "center", gap: 6 }}>
        <Text style={{ fontSize: 14, fontWeight: "600" }}>Operator</Text>
        <Tooltip title="Selected Camera" enterTouchDelay={100}>
          <Ionicons name="information-circle-outline" size={20} color="black" />
        </Tooltip>
      </View>
    ),
    right: props.Operator,
  },
  {
    itemKey: 2,
    left: (
      <View style={{ flexDirection: "row", alignContent: "center", gap: 6 }}>
        <Text style={{ fontSize: 14, fontWeight: "600" }}>band</Text>
        <Tooltip title="Selected Camera" enterTouchDelay={100}>
          <Ionicons name="information-circle-outline" size={20} color="black" />
        </Tooltip>
      </View>
    ),
    right: props.band,
  },
  {
    itemKey: 3,
    left: (
      <View style={{ flexDirection: "row", alignContent: "center", gap: 6 }}>
        <Text style={{ fontSize: 14, fontWeight: "600" }}>EARFCN</Text>
        <Tooltip title="Selected Camera" enterTouchDelay={100}>
          <Ionicons name="information-circle-outline" size={20} color="black" />
        </Tooltip>
      </View>
    ),
    right: props.EARFCN,
  },
  {
    itemKey: 5,
    left: (
      <View style={{ flexDirection: "row", alignContent: "center", gap: 6 }}>
        <Text style={{ fontSize: 14, fontWeight: "600" }}>PCI</Text>
        <Tooltip title="Selected Camera" enterTouchDelay={100}>
          <Ionicons name="information-circle-outline" size={20} color="black" />
        </Tooltip>
      </View>
    ),
    right: props.PCI,
  },
  {
    itemKey: 6,
    left: (
      <View style={{ flexDirection: "row", alignContent: "center", gap: 6 }}>
        <Text style={{ fontSize: 14, fontWeight: "600" }}>
          connectionStatus
        </Text>
        <Tooltip title="Selected Camera" enterTouchDelay={100}>
          <Ionicons name="information-circle-outline" size={20} color="black" />
        </Tooltip>
      </View>
    ),
    right: props.connectionStatus,
  },
  {
    itemKey: 7,
    lelftStyle: { width: 200 },
    left: (
      <View style={{ flexDirection: "row", alignContent: "center", gap: 6 }}>
        <Text style={{ fontSize: 14, fontWeight: "600" }}>ipAddress</Text>
        <Tooltip title="Selected Camera" enterTouchDelay={100}>
          <Ionicons name="information-circle-outline" size={20} color="black" />
        </Tooltip>
      </View>
    ),
    right: props.ipAddress,
  },
  {
    itemKey: 8,
    left: (
      <View style={{ flexDirection: "row", alignContent: "center", gap: 6 }}>
        <Text style={{ fontSize: 14, fontWeight: "600" }}>RSRP</Text>
        <Tooltip title="Selected Camera" enterTouchDelay={100}>
          <Ionicons name="information-circle-outline" size={20} color="black" />
        </Tooltip>
      </View>
    ),
    right: props.RSRP,
  },
  {
    itemKey: 9,
    left: (
      <View style={{ flexDirection: "row", alignContent: "center", gap: 6 }}>
        <Text style={{ fontSize: 14, fontWeight: "600" }}>RSSI</Text>
        <Tooltip title="Selected Camera" enterTouchDelay={100}>
          <Ionicons name="information-circle-outline" size={20} color="black" />
        </Tooltip>
      </View>
    ),
    right: props.RSSI,
  },
  {
    itemKey: 10,
    left: (
      <View style={{ flexDirection: "row", alignContent: "center", gap: 6 }}>
        <Text style={{ fontSize: 14, fontWeight: "600" }}>RSRQ</Text>
        <Tooltip title="Selected Camera" enterTouchDelay={100}>
          <Ionicons name="information-circle-outline" size={20} color="black" />
        </Tooltip>
      </View>
    ),
    right: props.RSRQ,
  },
  {
    itemKey: 11,
    left: (
      <View style={{ flexDirection: "row", alignContent: "center", gap: 6 }}>
        <Text style={{ fontSize: 14, fontWeight: "600" }}>T3324</Text>
        <Tooltip title="Selected Camera" enterTouchDelay={100}>
          <Ionicons name="information-circle-outline" size={20} color="black" />
        </Tooltip>
      </View>
    ),
    right: props.T3324,
  },
  {
    itemKey: 12,
    left: (
      <View style={{ flexDirection: "row", alignContent: "center", gap: 6 }}>
        <Text style={{ fontSize: 14, fontWeight: "600" }}>T3412</Text>
        <Tooltip title="Selected Camera" enterTouchDelay={100}>
          <Ionicons name="information-circle-outline" size={20} color="black" />
        </Tooltip>
      </View>
    ),
    right: props.T3412,
  },
  {
    itemKey: 13,
    left: (
      <View style={{ flexDirection: "row", alignContent: "center", gap: 6 }}>
        <Text style={{ fontSize: 14, fontWeight: "600" }}>tac</Text>
        <Tooltip title="Selected Camera" enterTouchDelay={100}>
          <Ionicons name="information-circle-outline" size={20} color="black" />
        </Tooltip>
      </View>
    ),
    right: props.tac,
  },
  {
    itemKey: 16,
    left: (
      <Text style={{ fontSize: 14, fontWeight: "600" }}>
        Thời gian cập nhật
      </Text>
    ),
    right: formatTimeDifference(props.updatedAt),
  },
];
const DetailScrren: FunctionComponent<DetailScrrenProps> = () => {
  const { setTitle } = useContext(LayoutHasHeaderContext);
  useEffect(() => {
    setTitle("Thông tin thiết bị");
  }, []);
  const local = useLocalSearchParams();
  const deviceList = useAppSelector(deviceSelector).data.devices;
  const deviceFound = deviceList.find(
    (device) => device?.deviceId === local?.deviceId
  );
  return (
    <ScrollView>
      <FieldList
        style={{ marginTop: 0 }}
        items={(() =>
          items({
            deviceId: deviceFound?.deviceId ?? "",
            deviceName: deviceFound?.deviceId ?? "",
            imsi: deviceFound?.sim?.imsi ?? "",
          }))()}
      ></FieldList>
      <Divider style={{ marginVertical: 12 }}></Divider>
      <FieldList
        title={<Text style={{ fontSize: 18 }}>Mạng</Text>}
        style={{ marginTop: 0 }}
        items={(() =>
          signalItems({
            ...deviceFound?.signal,
            updatedAt: deviceFound?.updatedAt,
          }))()}
      ></FieldList>
      <View style={{ alignItems: "center", paddingBottom: 20 }}>
        <Button
          style={{ width: 200 }}
          icon="delete"
          mode="outlined"
          textColor="#000"
          onPress={() => console.log("Pressed")}
        >
          Xóa Thiết Bị
        </Button>
      </View>
    </ScrollView>
  );
};

export default DetailScrren;
