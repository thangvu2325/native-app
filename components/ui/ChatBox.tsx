import { Fragment, FunctionComponent, ReactNode } from "react";
import { Text, View } from "../Themed";
import { Avatar } from "react-native-paper";
import { Pressable, SafeAreaView } from "react-native";

interface ChatBoxProps {
  align?: "left" | "right";
  content?: string;
  avatar?: ReactNode;
}

const ChatBox: FunctionComponent<ChatBoxProps> = ({
  align = "left",
  content = "Bố mày là bot",
  avatar = <Avatar.Text size={40} label="XD" />,
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: align !== "left" ? "row-reverse" : "row",
        gap: 8,
        maxWidth: 296,
        marginLeft: align !== "left" ? "auto" : 0,
      }}
    >
      <SafeAreaView>
        <Pressable onPressOut={() => console.log(1)}>{avatar}</Pressable>
      </SafeAreaView>
      <View style={{ flex: 1, borderWidth: 0.8, borderRadius: 16 }}>
        <Text style={{ padding: 12, fontSize: 14, fontWeight: "400" }}>
          {content}
        </Text>
      </View>
    </View>
  );
};

export default ChatBox;
