import devicesService from "@/services/deviceService";
import { deviceType } from "@/types";
import { Dispatch, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AxiosInstance } from "axios";

// Define a type for the slice state
interface DevicesState {
  data: {
    devices: deviceType[];
    devicesCount: number;
  };
  loading: "idle" | "pending" | "success" | "error";
  error: string;
}

// Define the initial state using that type
const initialState: DevicesState = {} as DevicesState;
export const fetchDataDevices = createAsyncThunk(
  "devices/fetchData",
  async ({
    axiosClient,
    customer_id,
  }: {
    axiosClient: AxiosInstance;
    customer_id: string;
  }) => {
    try {
      const data = await devicesService.getAllDevices(axiosClient, customer_id);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    updateDevices(state, action) {
      if (!state.data.devices) {
        console.log("Không có thiết bị để cập nhật");
        return;
      }

      const index = state.data.devices.findIndex(
        (device) => device?.deviceId === action.payload?.deviceId
      );

      if (index === -1) {
        console.log("Không tìm thấy thiết bị");
        return;
      }
      const updatedDevice: deviceType = {
        ...state.data.devices[index],
        updatedAt:
          action.payload?.updatedAt ?? state.data.devices[index].updatedAt,
        createdAt:
          action.payload?.createdAt ?? state.data.devices[index].createdAt,
        sensors: {
          ...state.data.devices[index].sensors,
          ...action.payload.sensors,
        },
        battery: {
          ...state.data.devices[index].battery,
          ...action.payload.battery,
        },
        sim: {
          ...state.data.devices[index].sim,
          ...action.payload.sim,
        },
        signal: {
          ...state.data.devices[index].signal,
          ...action.payload.signal,
        },
      };
      // Cập nhật lại thiết bị trong mảng devices
      state.data.devices[index] = updatedDevice;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataDevices.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchDataDevices.fulfilled, (state, action) => {
        state.loading = "success";
        state.data = action.payload;
      })
      .addCase(fetchDataDevices.rejected, (state) => {
        state.loading = "error";
      });
  },
});

export const { updateDevices } = deviceSlice.actions;

export default deviceSlice.reducer;
