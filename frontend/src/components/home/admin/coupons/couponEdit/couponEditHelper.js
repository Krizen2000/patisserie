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

export async function modifyCouponDetails(
  prevCouponName,
  name,
  description,
  discount,
  maxCap,
  isValid
) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  console.log("prevCName:", prevCouponName);
  console.log("name:", name);
  console.log("des:", description);
  console.log("dis:", discount);
  console.log("maxCap:", maxCap);
  console.log("isValid:", isValid);

  const datapacket = { name, description, discount, maxCap, isValid };

  try {
    await axiosInstance.put(`/api/coupons/${prevCouponName}`, datapacket);
  } catch (err) {
    console.log(err);
  }
}
