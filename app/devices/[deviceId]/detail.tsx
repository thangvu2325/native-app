import { Text, View } from "@/components/Themed";
import FieldList, { item } from "@/components/ui/FieldList";
import { FunctionComponent, useContext, useEffect } from "react";
import { Button, Divider } from "react-native-paper";
import { Pressable, ScrollView } from "react-native";
import { LayoutHasHeaderContext } from "@/layouts/LayoutHasHeader";
import { useLocalSearchParams, usePathname } from "expo-router";
import { useAppSelector } from "@/redux/hook";
import { deviceSelector } from "@/redux/selector";
import { NumberArray } from "react-native-svg";
import formatTimeDifference from "@/lib/formatTime";
import Field from "@/components/ui/Field";

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
    left: <Text style={{ fontSize: 14, fontWeight: "600" }}>Imsi</Text>,
    right: imsi ?? 0,
  },
];
const signalItems: (props: {
  band: string;
  deviceNetworkRssiDbm: string | NumberArray;
}) => item[] = ({ band, deviceNetworkRssiDbm }) => [
  {
    itemKey: 1,
    left: (
      <Text style={{ fontSize: 14, fontWeight: "600" }}>Băng Tần ( BW )</Text>
    ),
    right: band,
  },
  {
    itemKey: 2,
    left: (
      <Text style={{ fontSize: 14, fontWeight: "600" }}>
        Cường độ tín hiệu thu (RSSI)
      </Text>
    ),
    right: deviceNetworkRssiDbm,
  },
];
const networkItems: (props: {
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
    left: <Text style={{ fontSize: 14, fontWeight: "600" }}>Operator</Text>,
    right: props.Operator,
  },
  {
    itemKey: 2,
    left: <Text style={{ fontSize: 14, fontWeight: "600" }}>band</Text>,
    right: props.band,
  },
  {
    itemKey: 3,
    left: <Text style={{ fontSize: 14, fontWeight: "600" }}>EARFCN</Text>,
    right: props.EARFCN,
  },
  {
    itemKey: 5,
    left: <Text style={{ fontSize: 14, fontWeight: "600" }}>PCI</Text>,
    right: props.PCI,
  },
  {
    itemKey: 6,
    left: (
      <Text style={{ fontSize: 14, fontWeight: "600" }}>connectionStatus</Text>
    ),
    right: props.connectionStatus,
  },
  {
    itemKey: 7,
    lelftStyle: { width: 200 },
    left: <Text style={{ fontSize: 14, fontWeight: "600" }}>ipAddress</Text>,
    right: props.ipAddress,
  },
  {
    itemKey: 8,
    left: <Text style={{ fontSize: 14, fontWeight: "600" }}>RSRP</Text>,
    right: props.RSRP,
  },
  {
    itemKey: 9,
    left: <Text style={{ fontSize: 14, fontWeight: "600" }}>RSSI</Text>,
    right: props.RSSI,
  },
  {
    itemKey: 10,
    left: <Text style={{ fontSize: 14, fontWeight: "600" }}>RSRQ</Text>,
    right: props.RSRQ,
  },
  {
    itemKey: 11,
    left: <Text style={{ fontSize: 14, fontWeight: "600" }}>T3324</Text>,
    right: props.T3324,
  },
  {
    itemKey: 12,
    left: <Text style={{ fontSize: 14, fontWeight: "600" }}>T3412</Text>,
    right: props.T3412,
  },
  {
    itemKey: 13,
    left: <Text style={{ fontSize: 14, fontWeight: "600" }}>tac</Text>,
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
          networkItems({
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
