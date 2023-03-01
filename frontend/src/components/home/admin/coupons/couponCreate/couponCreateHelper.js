import axios from "axios";

export async function sendCouponDetails(
  name,
  description,
  discount,
  maxCap,
  isValid
) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  const datapacket = {
    name,
    description,
    discount,
    maxCap,
    isValid,
  };
  try {
    await axiosInstance.post("/api/coupons/", datapacket);
  } catch (err) {
    console.log(err);
  }
}
