import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Slot, useRouter } from "expo-router";
import { FunctionComponent, ReactNode, createContext, useState } from "react";
import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { IconButton } from "react-native-paper";

interface LayoutHasHeaderProps {
  HeaderRight?: ReactNode;
  children: ReactNode;
}
export const LayoutHasHeaderContext = createContext<{
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}>({
  title: "",
  setTitle: () => null,
});
const LayoutHasHeader: FunctionComponent<LayoutHasHeaderProps> = ({
  HeaderRight,
  children,
}) => {
  const [title, setTitle] = useState<string>("");
  const colorScheme = useColorScheme();
  const route = useRouter();
  return (
    <LayoutHasHeaderContext.Provider value={{ title, setTitle }}>
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
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
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
                    style={{
                      fontSize: 18,
                      color: "#2C2929",
                      fontWeight: "500",
                    }}
                  >
                    {title}
                  </Text>
                </View>
                {HeaderRight ?? ""}
              </View>
              {children}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LayoutHasHeaderContext.Provider>
  );
};

export default LayoutHasHeader;
