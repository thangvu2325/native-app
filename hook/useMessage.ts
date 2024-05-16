import { socketService } from "@/services/socketService";
import { ro } from "react-native-paper-dates";

const messageConnection = (token: string, customer_id: string) => {
  // Cấu hình các tiêu đề yêu cầu ở đây trước khi kết nối
  const headers = {
    // Authorization: `Bearer ${token}`,
    CustomerId: customer_id,
    "Access-Control-Allow-Origin": "*",
    // Thêm các tiêu đề khác nếu cần thiết
  };
  socketService.connectWithAuthToken(token, customer_id, headers);
};
const messageDeviceReceived = (handleMessage: (message: string) => void) => {
  socketService.subscribeToDeviceMessages(handleMessage);
};

const messageReiceved = (handleMessage: (message: string) => void) => {
  socketService.subscribeToMessages(handleMessage);
};
const joinRoom = (roomId: string) => {
  socketService.joinRoom(roomId);
};
const leaveRoom = (roomId: string) => {
  socketService.leaveRoom(roomId);
};
const messageSent = () => {
  const messageData = { text: "Hello, world!" };
  socketService.sendMessage(messageData);
};
const messageDisconnect = () => {
  socketService.disconnect();
};
const messageOff = (event: any) => {
  socketService.off(event);
};
const useMessage = () => ({
  messageConnection,
  messageReiceved,
  messageDisconnect,
  messageOff,
  messageSent,
  messageDeviceReceived,
  joinRoom,
  leaveRoom,
});
export default useMessage;
