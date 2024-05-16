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
  off(event: any) {
    this.socket.off(event);
  }
  sendMessage(data: any) {
    this.socket.emit("message", data);
  }
  subscribeToDeviceMessages(messageHandler: ServerToClientEvents["device"]) {
    this.socket.on("device", messageHandler);
  }
  subscribeToMessages(messageHandler: ServerToClientEvents["message"]) {
    this.socket.on("message", messageHandler);
  }
  joinRoom(roomId: string) {
    this.socket.emit("join", roomId);
  }

  leaveRoom(roomId: string) {
    this.socket.emit("leave", roomId);
  }
}

export const socketService = new SocketService();
