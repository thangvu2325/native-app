import CircularProgress from "@/components/CircularProgress";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { FunctionComponent, ReactNode, useState } from "react";
import { useColorScheme } from "react-native";
import { Avatar, Button, Divider, IconButton, Menu } from "react-native-paper";

interface CardProps {
  title: string;
  deviceId: string;
  children: ReactNode;
  status: boolean;
  right: ReactNode;
}

const Card: FunctionComponent<CardProps> = ({
  title,
  deviceId,
  children,
  status,
  right,
}) => {
  return (
    <View style={{ padding: 12, paddingBottom: 0, marginRight: 0 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "600", fontStyle: "italic" }}>
          {title} ({deviceId})
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {right}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 16,
          alignItems: "center",
          gap: 16,
          paddingBottom: 12,
        }}
      >
        {children}
        <View
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "row",
            right: 0,
            bottom: 0,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 12 }}>Status: </Text>
          <Text style={{ fontSize: 12, color: "#40A2E3" }}>
            {status ? "ON" : "OFF"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Card;
