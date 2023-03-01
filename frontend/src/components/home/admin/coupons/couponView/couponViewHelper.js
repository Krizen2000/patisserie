import axios from "axios";

export async function loadCouponDetails(sharedCouponName) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  let res;
  try {
    res = await axiosInstance.get(`/api/coupons/find/${sharedCouponName}`);
  } catch (err) {
    console.log(err);
  }
  return {
    name: res.data.name,
    description: res.data.description,
    discount: res.data.discount,
    maxCap: res.data.maxCap,
    isValid: res.data.isValid,
  };
}
