import { Fragment, FunctionComponent, ReactNode } from "react";
import { Text, View } from "../Themed";
import Field from "./Field";
import { Divider } from "react-native-paper";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type item = {
  itemKey: number;
  left?: ReactNode | string | FunctionComponent;
  right?: ReactNode | string;
  rightStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
  lelftStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
};
interface FieldListProps {
  title?: ReactNode | string;
  items: item[];
  style?: StyleProp<ViewStyle>;
}

const FieldList: FunctionComponent<FieldListProps> = ({
  title,
  items,
  style,
}) => {
  return (
    <View
      style={[
        {
          paddingHorizontal: 24,
          paddingBottom: 16,
          marginTop: 16,
        },
        style,
      ]}
    >
      {title ? (
        <View style={{ paddingHorizontal: 4, paddingVertical: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{title}</Text>
        </View>
      ) : (
        ""
      )}
      {items.length
        ? items.map((item) => (
            <Fragment key={item.itemKey}>
              <Field
                left={
                  typeof item.left !== "function" ? (
                    item.left
                  ) : (
                    <item.left></item.left>
                  )
                }
                right={item.right}
                rightStyle={item.rightStyle}
                lelftStyle={item.lelftStyle}
              ></Field>
              <Divider></Divider>
            </Fragment>
          ))
        : ""}
    </View>
  );
};

export default FieldList;
