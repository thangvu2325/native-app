import { AxiosInstance } from "axios";

export type deviceAddType = {
  deviceId: string;
  secretKey: string;
};
const addDeviceforUser = async (
  axiosClient: AxiosInstance,
  customer_id: string,
  data: deviceAddType
) => {
  try {
    const res = await axiosClient.post(
      `/customers/device/${customer_id}`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const userService = { addDeviceforUser };

export default userService;
