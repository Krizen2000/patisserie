import axios from "axios";

export async function loadAllProductsDetails() {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  console.log("BACKEND_URL: ", process.env.REACT_APP_BACKEND_URL);
  let res;
  try {
    res = await axiosInstance.get("/api/products/all");
    console.log("Res Data:", res.data.products);
  } catch (err) {
    console.log(err);
  }
  return res.data.products;
}
