import axios from "axios";

export async function loadProductDetails(productId) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  let res;
  try {
    res = await axiosInstance.get(`/api/products/find/${productId}`);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
  return res.data;
}
