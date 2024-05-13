export type TokenData = {
  user: User;
  backendTokens: BackendTokens;
};

export type BackendTokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type User = {
  id: string;
  createdAt: Date;
  customer_id: string;
  updatedAt: Date;
  deletedAt: null;
  username: string;
  avatar: string;
  email: string;
  phone: null;
  isActive: boolean;
  role: string;
};
// Device
export type deviceType = {
  id: string;
  deviceId: string;
  battery: batteryType;
  sim: simType;
  sensors: sensorType;
  signal: signalType;
  AlarmReport: number;
  createdAt: Date;
  updatedAt: Date;
};
export type sensorType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  AlarmSatus: boolean;
  SmokeValue: number;
  Temperature: number;
  Humidity: number;
};
export type batteryType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  voltage: number;
};
export type signalType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  Operator: string;
  band: number;
  EARFCN: number;
  PCI: number;
  connectionStatus: number;
  ipAddress: string;
  RSRP: number;
  RSSI: number;
  RSRQ: number;
  T3324: number;
  T3412: number;
  tac: string;
};
export type simType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  imsi: string;
};
export type warningLogsType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  message: string;
};
export type historyType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  sensors: sensorType;
  battery: batteryType;
  signal: signalType;
  sim: simType;
};
