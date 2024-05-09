import { FunctionComponent, ReactNode } from "react";
import { View, Text } from "../Themed";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

interface FieldProps {
  left?: ReactNode | string;
  right?: ReactNode | string;
  rightStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
  lelftStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
}

const Field: FunctionComponent<FieldProps> = ({
  left,
  right,
  rightStyle,
  lelftStyle,
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 4,
        paddingVertical: 12,
      }}
    >
      <Text
        style={[
          { display: "flex", alignItems: "center", margin: 0, padding: 0 },
          lelftStyle,
        ]}
      >
        {left}
      </Text>
      <Text
        style={[
          {
            display: "flex",
            alignItems: "center",
            margin: 0,
            padding: 0,
          },
          rightStyle,
        ]}
      >
        {right}
      </Text>
    </View>
  );
};

export default Field;
