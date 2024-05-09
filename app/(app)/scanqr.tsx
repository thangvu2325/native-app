import { Text, View } from "@/components/Themed";
import { FunctionComponent, useEffect, useState } from "react";
import {
  CameraView,
  CameraType,
  BarcodeScanningResult,
  Camera,
} from "expo-camera/next";
import jsQR from "jsqr";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, useColorScheme } from "react-native";
import { ActivityIndicator, Appbar, IconButton } from "react-native-paper";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Mask, Path, Svg } from "react-native-svg";
import userService from "@/services/userService";
import { createAxios } from "@/services/createInstance";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useAuth } from "@/redux/selector";
import { loginSuccess } from "@/redux/slices/authSlice";
import { TokenData } from "@/types";
import { fetchDataDevices } from "@/redux/slices/deviceSlice";
export default function ScanQRScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [image, setImage] = useState("");
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(useAuth);
  const axiosClient = createAxios(
    currentUser as TokenData,
    dispatch,
    loginSuccess
  );
  const colorScheme = useColorScheme();
  const route = useRouter();
  const [isFlipLoading, setIsFlipLoading] = useState<boolean>(false);
  const [flashMode, setFlashMode] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets[0].uri) {
        setImage(result.assets[0].uri);
      }
      const imageExpo = await FileSystem.readAsStringAsync(
        result.assets[0].uri,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );
      const imageBin = atob(imageExpo);
      const imageData = new Uint8ClampedArray(imageBin.length);
      for (let i = 0; i < imageBin.length; i++) {
        imageData[i] = imageBin.charCodeAt(i);
      }
      const code = jsQR(
        imageData,
        result.assets[0].width,
        result.assets[0].height
      );
      if (code) {
        const data: {
          deviceId: string;
          secretKey: string;
        } = JSON.parse(code.data);

        console.log(result);
      } else {
        alert("Không tìm thấy mã QR trong ảnh");
      }
    }
  };

  const toggleFlash = () => {
    setFlashMode(!flashMode);
  };
  function toggleCameraType() {
    setIsFlipLoading(true);
    setFacing((current) => (current === "back" ? "front" : "back"));

    setTimeout(() => {
      setIsFlipLoading(false);
    }, 1000);
  }
  const handleBarCodeScanned = async ({
    type,
    data,
  }: BarcodeScanningResult) => {
    setScanned(true);
    try {
      const dataReq = JSON.parse(data);
      const res = await userService.addDeviceforUser(
        axiosClient,
        currentUser?.user.customer_id ?? "",
        dataReq
      );
      route.back();
      alert(res.result + "1");
    } catch (error) {
      console.log(error);
      alert("thất bại");
    }
  };
  // Appbar
  const _goBack = () => route.back();

  const _handleMore = () => console.log("Shown more");
  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        enableTorch={flashMode}
        facing={facing}
        onCameraReady={() => {}}
      >
        <Appbar.Header style={{ backgroundColor: "transparent" }}>
          <Appbar.BackAction onPress={_goBack} color="#fff" />
          <Appbar.Content title="Quét QR" color="#fff" />
          <Appbar.Action
            icon="dots-vertical"
            onPress={_handleMore}
            color="#fff"
          />
        </Appbar.Header>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 200,
            }}
          >
            <Svg width={299} height={299} viewBox="0 0 299 299" fill="none">
              <Mask id="a" fill="#fff">
                <Path d="M0 5a5 5 0 015-5h76.153a5 5 0 015 5v76.153a5 5 0 01-5 5H5a5 5 0 01-5-5V5z" />
              </Mask>
              <Path
                d="M-5 5C-5-.523-.523-5 5-5h71.153c5.522 0 10 4.477 10 10H-5zm91.153 81.153H0h86.153zM5 86.153c-5.523 0-10-4.478-10-10V5C-5-.523-.523-5 5-5v91.153zM86.153 0v86.153V0z"
                fill="#fff"
                mask="url(#a)"
              />
              <Mask id="b" fill="#fff">
                <Path d="M299 5a5 5 0 00-5-5h-76.153a5 5 0 00-5 5v76.153a5 5 0 005 5H294a5 5 0 005-5V5z" />
              </Mask>
              <Path
                d="M304 5c0-5.523-4.477-10-10-10h-71.153c-5.522 0-10 4.477-10 10H304zm-91.153 81.153H299h-86.153zm81.153 0c5.523 0 10-4.478 10-10V5c0-5.523-4.477-10-10-10v91.153zM212.847 0v86.153V0z"
                fill="#fff"
                mask="url(#b)"
              />
              <Mask id="c" fill="#fff">
                <Path d="M0 294a5 5 0 005 5h76.153a5 5 0 005-5v-76.153a5 5 0 00-5-5H5a5 5 0 00-5 5V294z" />
              </Mask>
              <Path
                d="M-5 294c0 5.523 4.477 10 10 10h71.153c5.522 0 10-4.477 10-10H-5zm91.153-81.153H0h86.153zm-81.153 0c-5.523 0-10 4.478-10 10V294c0 5.523 4.477 10 10 10v-86.153-5zM86.153 299v-86.153V299z"
                fill="#fff"
                mask="url(#c)"
              />
              <Mask id="d" fill="#fff">
                <Path d="M299 294a5 5 0 01-5 5h-76.153a5 5 0 01-5-5v-76.153a5 5 0 015-5H294a5 5 0 015 5V294z" />
              </Mask>
              <Path
                d="M304 294c0 5.523-4.477 10-10 10h-71.153c-5.522 0-10-4.477-10-10H304zm-91.153-81.153H299h-86.153zm81.153 0c5.523 0 10 4.478 10 10V294c0 5.523-4.477 10-10 10v-86.153-5zM212.847 299v-86.153V299z"
                fill="#fff"
                mask="url(#d)"
              />
            </Svg>
          </View>
        </View>
        {isFlipLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <View
          style={{
            width: "100%",
            gap: 0,
            alignItems: "center",
            justifyContent: "flex-end",
            position: "relative",
            overflow: "visible",
            height: 96,
          }}
        >
          <View
            style={{
              position: "absolute",
              zIndex: 99,
              top: 6,
              padding: 0,
              backgroundColor: "#fff",
              borderRadius: 9999,
            }}
          >
            <IconButton
              icon="file-image-outline"
              iconColor={Colors[colorScheme ?? "light"].primary}
              size={40}
              onPress={pickImage}
            />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-end",
              backgroundColor: Colors[colorScheme ?? "light"].primary,
              paddingVertical: 4,
              gap: 60,
            }}
          >
            <IconButton
              icon="weather-sunny"
              iconColor={"#fff"}
              size={26}
              onPress={toggleFlash}
            />
            <IconButton
              icon="camera-flip"
              iconColor={"#fff"}
              size={26}
              onPress={toggleCameraType}
              loading={isFlipLoading}
            />
          </View>
        </View>
      </CameraView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  loadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  camera: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 20,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: "#000",
  },
});
