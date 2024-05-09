import { Text, View } from "@/components/Themed";
import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { Slot, useRouter } from "expo-router";
import { IconButton } from "react-native-paper";
import { createContext, useState } from "react";
import Colors from "@/constants/Colors";
export const SignUpContext = createContext<{
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}>({
  title: "",
  setTitle: () => null,
  setEmail: () => null,
  email: "",
});

export default function SignUpLayout() {
  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const route = useRouter();
  const colorScheme = useColorScheme();
  return (
    <SignUpContext.Provider value={{ title, setTitle, email, setEmail }}>
      <SafeAreaView>
        <StatusBar barStyle={"light-content"}></StatusBar>
        <View
          style={{
            backgroundColor: Colors[colorScheme ?? "light"].primary,
            height: "100%",
          }}
        >
          <View
            style={{
              flex: 1,
              marginTop: 40,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              backgroundColor: "rgba(255,255,255,0.2)",
              display: "flex",
            }}
          >
            <View
              style={{
                flex: 1,
                marginTop: 22,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                backgroundColor: "#f0f0f0",
                overflow: "hidden",
                opacity: 1,
                position: "relative",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <IconButton
                  icon="chevron-left"
                  iconColor={"#2C2929"}
                  size={34}
                  onPress={() => route.back()}
                />
                <Text
                  style={{ fontSize: 18, color: "#2C2929", fontWeight: "500" }}
                >
                  {title}
                </Text>
              </View>
              <Slot></Slot>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SignUpContext.Provider>
  );
}
