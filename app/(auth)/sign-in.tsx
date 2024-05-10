import { router, usePathname, useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "@/lib/ctx";
import { View, Text } from "@/components/Themed";
import {
  Image,
  SafeAreaView,
  useColorScheme,
  StyleSheet,
  Alert,
} from "react-native";
import { Button, Divider, IconButton, TextInput } from "react-native-paper";
import { ErrorInfo, useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import authService from "@/services/authService";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useAuth } from "@/redux/selector";
import { createAxios } from "@/services/createInstance";
import { TokenData } from "@/types";
import { loginSuccess } from "@/redux/slices/authSlice";
import TextInputIcon from "react-native-paper/lib/typescript/components/TextInput/Adornment/TextInputIcon";

export type signInType = {
  email: string;
  password: string;
};
export default function SignIn() {
  const colorScheme = useColorScheme();
  const formSchema = z.object({
    email: z.string().email("Vui lòng nhập Email hợp lệ"),
    password: z.string().min(4, "Mật khẩu phải có ít nhất 8 kí tự"),
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Form
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });
  const dispatch = useAppDispatch();
  const onSubmit = async (data: signInType) => {
    try {
      const res = await authService.login(data, dispatch, router);
      Alert.alert("Thông báo", JSON.stringify(res));
    } catch (error: any) {
      console.log(JSON.stringify(error));
      Alert.alert("Đăng nhập thất bại", "Email hoặc mật khẩu không đúng!");
    }
  };
  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            marginTop: 48,
            paddingTop: 52,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            borderRadius: 20,
          }}
        >
          <Image
            source={require("../../assets/images/landingPage.png")}
            style={{ width: 328, height: 265, paddingRight: 2 }}
          />
        </View>
        <Text
          style={{
            color: Colors[colorScheme ?? "light"].primary,
            textAlign: "center",
            fontSize: 36,
            fontWeight: "700",
          }}
        >
          Đăng Nhập
        </Text>

        <View style={{ marginTop: 48, gap: 16 }}>
          <Text
            style={{
              color: "#2C2929",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "400",
              opacity: 0.4,
            }}
          >
            Thêm thông tin đăng nhập của bạn.
          </Text>
          <View
            style={{
              gap: 15,
              marginHorizontal: 40,
            }}
          >
            <Controller
              control={control}
              name={"email"}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <View>
                  <TextInput
                    outlineStyle={{ borderRadius: 24 }}
                    mode="outlined"
                    label=" Email"
                    error={!!error}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                  {error && (
                    <Text style={styles.errorMessage}>{error.message}</Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name={"password"}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <View>
                  <TextInput
                    secureTextEntry={secureTextEntry}
                    outlineStyle={{ borderRadius: 24 }}
                    mode="outlined"
                    error={!!error}
                    label=" Mật Khẩu"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    right={
                      <IconButton
                        icon={
                          secureTextEntry ? "eye-off-outline" : "eye-outline"
                        }
                        onPress={() => {
                          setSecureTextEntry(!secureTextEntry);
                          return false;
                        }}
                      />
                    }
                  />
                  {error && (
                    <Text style={styles.errorMessage}>{error.message}</Text>
                  )}
                </View>
              )}
            />
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              buttonColor={Colors[colorScheme ?? "light"].primary}
              style={{
                borderRadius: 24,
                marginTop: 12,
              }}
              contentStyle={{
                width: 305,
                height: 58,
              }}
              labelStyle={{
                color: "#fff",
                fontWeight: "700",
                fontSize: 20,
              }}
            >
              Đăng Nhập
            </Button>
          </View>
          <Divider style={{ marginTop: 35 }}></Divider>
          <Text style={{ textAlign: "center", paddingBottom: 40 }}>
            Nếu bạn là người dùng mới {"\n"}
            <Button
              labelStyle={{
                fontSize: 16,
                textDecorationLine: "underline",
                fontWeight: "600",
                marginLeft: 0,
              }}
              onPress={() => {
                router.push("/(auth)/sign-up");
              }}
            >
              Đăng ký ngay!
            </Button>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  errorMessage: {
    color: "red",
    position: "absolute",
    bottom: -18,
    left: 18,
  },
});
