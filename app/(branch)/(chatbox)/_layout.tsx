import { Slot } from "expo-router";
import { FunctionComponent } from "react";

import LayoutHasHeader from "@/layouts/LayoutHasHeader";

interface ChatboxLayoutProps {}

const ChatboxLayout: FunctionComponent<ChatboxLayoutProps> = () => {
  return (
    <LayoutHasHeader>
      <Slot></Slot>
    </LayoutHasHeader>
  );
};

export default ChatboxLayout;
