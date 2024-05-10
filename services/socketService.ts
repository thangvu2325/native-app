/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "@/types/socket";
import config from "@/config";

class SocketService {
  private readonly socket: Socket<ServerToClientEvents, ClientToServerEvents> =
    io(config.socketUrl ?? "", {
      autoConnect: false,
    });

  connectWithAuthToken(
    token: string,
    userId: string,
    headers: Record<string, string>
  ) {
    if (headers && this.socket?.io?.opts?.extraHeaders) {
      Object.keys(headers).forEach((key) => {
        if (this.socket.io.opts.extraHeaders) {
          this.socket.io.opts.extraHeaders[key] = headers[key];
        }
      });
    }

    // Thiết lập thông tin xác thực
    this.socket.auth = { token, userId };

    // Kết nối với máy chủ WebSocket
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  sendMessage(data: any) {
    this.socket.emit("message", data);
  }
  subscribeToDeviceMessages(
    messageHandler: ServerToClientEvents["deviceMessage"]
  ) {
    this.socket.on("deviceMessage", messageHandler);
  }
  subscribeToWarningMessages(
    messageHandler: ServerToClientEvents["fireWarning"]
  ) {
    this.socket.on("fireWarning", messageHandler);
  }
  subscribeToMessages(messageHandler: ServerToClientEvents["message"]) {
    this.socket.on("message", messageHandler);
  }
}

export const socketService = new SocketService();
