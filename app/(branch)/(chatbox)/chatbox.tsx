import { View } from "@/components/Themed";
import ChatBox from "@/components/ui/ChatBox";
import { LayoutHasHeaderContext } from "@/layouts/LayoutHasHeader";
import {
  Fragment,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { IconButton, MD3Colors, TextInput } from "react-native-paper";

interface ChatBoxScreenProps {}

const ChatBoxScreen: FunctionComponent<ChatBoxScreenProps> = () => {
  const { setTitle } = useContext(LayoutHasHeaderContext);
  const [text, setText] = useState("");

  useEffect(() => {
    setTitle("Màn Hình Chát Box");
  }, []);
  return (
    <Fragment>
      <View style={{ padding: 16 }}>
        <View
          style={{
            width: "100%",
            gap: 16,
          }}
        >
          <ChatBox></ChatBox>
          <ChatBox align={"right"}></ChatBox>
          <ChatBox></ChatBox>
          <ChatBox></ChatBox>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          gap: 4,
          borderTopWidth: 0.6,
          borderColor: "grey",
        }}
      >
        <TextInput
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
          outlineStyle={{ borderRadius: 16 }}
          style={{ flex: 1, borderRadius: 16, height: 48 }}
        />
        <IconButton
          icon="send"
          iconColor={MD3Colors.primary40}
          size={20}
          onPress={() => console.log("Pressed")}
        />
      </View>
    </Fragment>
  );
};

export default ChatBoxScreen;
