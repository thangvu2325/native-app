import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StatusBar } from "react-native"; // Import Image from react-native
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface WelcomeScreenProps {}

const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = () => {
  const route = useRouter();
  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            marginTop: 48,
            paddingHorizontal: 11,
            paddingTop: 52,
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
            color: "#7041EE",
            textAlign: "center",
            fontSize: 62,
            fontWeight: "700",
          }}
        >
          IOT
        </Text>
        <Text
          style={{
            color: "#2C2929",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "400",
          }}
        >
          Your Everday consumption record!
        </Text>
        <View style={{ marginTop: 96, gap: 16 }}>
          <Button
            mode="contained"
            onPress={() => route.navigate("/sign-up")}
            buttonColor="#7041EE"
            style={{
              borderRadius: 24,
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
            Bắt đầu
          </Button>
          <Button
            mode="contained"
            onPress={() => route.navigate("/sign-in")}
            buttonColor="#fff"
            style={{
              borderRadius: 24,
            }}
            rippleColor={"#ccc"}
            contentStyle={{
              width: 305,
              height: 58,
            }}
            labelStyle={{
              color: "#7041EE",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            Đăng Nhập
          </Button>
          <Text style={{ textAlign: "center" }}>
            Người dùng mới thì nhấp vào
            <Text style={{ color: "#7041EE", fontWeight: "700" }}>
              {" "}
              Bắt đầu
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
