import config from "@/config";
import { AxiosInstance } from "axios";

const getAllDevices = async (
  axiosClient: AxiosInstance,
  customer_id: string
) => {
  try {
    console.log(config.baseUrl);
    const res = await axiosClient.get("/devices/customers" + customer_id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const devicesService = { getAllDevices };

export default devicesService;
