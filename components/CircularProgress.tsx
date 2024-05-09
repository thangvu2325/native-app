import React, { FunctionComponent } from "react";
import { View } from "./Themed";
import { StyleSheet } from "react-native";
import { Circle, G, Svg } from "react-native-svg";
import { Surface, Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

interface CircularProgressProps {
  width?: number;
  height?: number;
  value?: number;
  targetValue?: number;
  status?: boolean;
}

const CircularProgress: FunctionComponent<CircularProgressProps> = ({
  width = 160,
  height = 160,
  value = 0,
  targetValue = 1000,
  status = true,
}) => {
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  const percentage = (value / targetValue) * 100;
  const strokeDashoffset =
    circleCircumference - (circleCircumference * percentage) / 100;

  return (
    <View style={styles.wrap}>
      <View style={styles.graphWrapper}>
        <Svg height={height} width={width} viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#f0f0f0"
              fill="transparent"
              strokeWidth="20"
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#40A2E3"
              fill="transparent"
              strokeWidth="20"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </G>
        </Svg>
        <Text style={styles.text}>{percentage}%</Text>
      </View>
      {!status ? (
        <View style={styles.statusBg}>
          <Text style={styles.statusText}>OFF</Text>
        </View>
      ) : (
        ""
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  statusBg: {
    backgroundColor: "rgba(204,204,204,0.8)",
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
  text: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -10 }, { translateY: -10 }],
    fontSize: 16,
    fontWeight: "bold",
    color: "#14274E",
  },
});

export default CircularProgress;
