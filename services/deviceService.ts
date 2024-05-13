import config from "@/config";
import axios, { AxiosInstance } from "axios";
import { tr } from "react-native-paper-dates";

const getAllDevices = async (
  axiosClient: AxiosInstance,
  customer_id: string
) => {
  try {
    console.log(config.baseUrl);
    const res = await axiosClient.get(`/devices?customer_id=${customer_id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const toggleAlarm = async (
  axiosClient: AxiosInstance,
  customer_id: string,
  deviceId: string
) => {
  try {
    await axiosClient.post(`/customers/device/${customer_id}/${deviceId}`);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

const devicesService = { getAllDevices, toggleAlarm };

export default devicesService;
