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
  customer: customerType;
  deviceId: string;
  fullname: string;
  email: string;
  phone: string;
  battery: {
    voltage: number;
  };
  sim: {
    imsi: string;
  };
  sensors: {
    AlarmSatus: boolean;
    SmokeValue: number;
    Temperature: number;
    Humidity: number;
  };
  signal: {
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
  createdAt: Date;
  updatedAt: Date;
};
