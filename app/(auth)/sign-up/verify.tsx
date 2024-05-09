import { View, Text } from "@/components/Themed";
import {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button, Divider, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { Alert, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import authService from "@/services/authService";
import { SignUpContext } from "./_layout";
import { useAppSelector } from "@/redux/hook";
import { useAuth } from "@/redux/selector";

interface VerifyScreenProps {}

const VerifyScreen: FunctionComponent<VerifyScreenProps> = () => {
  const ctx = useContext(SignUpContext);
  const route = useRouter();
  const { currentUser, isLogin } = useAppSelector(useAuth);
  const colorScheme = useColorScheme();
  useEffect(() => {
    ctx.setTitle("Xác thực Email");
  }, []);
  const [text, setText] = useState<string>("");
  const verifyAccount = async (secretKey: string) => {
    const res = await authService.VerifySecretKey({
      secretKey,
      email: currentUser?.user.email ?? ctx.email ?? "",
    });
    Alert.alert("Thông báo", JSON.stringify(res.result));
    route.push("/(home)/");
  };
  const resendVerify = async () => {
    try {
      const res = await authService.resendVerifyKey({
        email: currentUser?.user.email ?? ctx.email ?? "",
      });
      Alert.alert("Thông báo", JSON.stringify(res));
      resetCount();
      setCounting(true);
    } catch (error: any) {
      Alert.alert("Thông báo", "Tạo verify key thất bại");
      setCounting(false);
    }
  };
  useEffect(() => {
    if (currentUser?.user.email && isLogin) {
      resendVerify();
    }
  }, []);
  // Time
  const [count, setCount] = useState(300);
  const [isCounting, setIsCounting] = useState(false); // Thêm biến cờ và khởi tạo là true
  const setCounting = useCallback((value: boolean) => {
    setIsCounting(value); // Đảo ngược giá trị của biến cờ
  }, []);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCounting) {
      // Kiểm tra biến cờ trước khi giảm count
      interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount > 0) {
            return prevCount - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isCounting]); // Thêm isCounting vào dependency array
  const resetCount = useCallback(() => {
    setCount(300);
  }, []);
  return (
    <View
      style={{
        marginTop: 20,
        marginHorizontal: 24,
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 24, textAlign: "center", fontWeight: "700" }}>
          Nhập mã bảo mật
        </Text>
        <Text
          style={{
            color: "#000",
            fontSize: 15,
            fontWeight: "400",
          }}
        >
          Chúng tôi vừa gửi một đoạn mã bảo mật có 6 kí tự đến email:{" "}
          <Text
            style={{
              color: Colors[colorScheme ?? "light"].primary,
              fontWeight: "700",
            }}
          >
            {currentUser?.user.email ?? ctx.email ?? ""}
          </Text>
        </Text>
        <View style={{ marginTop: 12 }}>
          <TextInput
            outlineStyle={{ borderRadius: 24 }}
            mode="outlined"
            label=" Mã bảo mật"
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <Button
            mode="contained"
            onPress={() => verifyAccount(text)}
            buttonColor={Colors[colorScheme ?? "light"].primary}
            style={{
              borderRadius: 24,
              marginHorizontal: 48,
              marginTop: 24,
            }}
            contentStyle={{
              height: 48,
            }}
            labelStyle={{
              color: "#fff",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Tiếp Tục
          </Button>
        </View>
        <Divider></Divider>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text
            style={{
              borderWidth: 1,
              width: 60,
              height: 60,
              borderRadius: 60,
              textAlign: "center",
              textAlignVertical: "center",
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            {count}
          </Text>
        </View>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          Không nhận được mã bảo vệ ?
        </Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Button
            labelStyle={{
              fontSize: 16,
              textDecorationLine: "underline",
              fontWeight: "600",
              marginLeft: 0,
            }}
            onPress={resendVerify}
          >
            Gửi lại Email
          </Button>
        </View>
      </View>
    </View>
  );
};

export default VerifyScreen;
