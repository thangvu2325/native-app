export type userType = {
  id: string;
  customer_id: string;
  username: string;
  email: string;
  phone: string;
  roles: string;
};
export type messageType = {
  id: number;
  content: string;
};

export interface AddMessageType {
  content: string;
  customerId: string;
}
export type ServerToClientEvents = {
  message: (data: string) => void;
  deviceMessage: (data: IMessage) => void;
};

export interface ClientToServerEvents {
  message: (data: AddMessageDto) => void;
  join: (roomId: number) => void;
  leave: (roomId: number) => void;
}
