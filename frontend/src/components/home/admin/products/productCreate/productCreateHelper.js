import axios from "axios";

export async function sendProductDetails(
  id,
  name,
  description,
  image,
  category,
  size,
  price,
  discount
) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  const dataPacket = {
    id,
    name,
    description,
    image,
    category,
    size,
    price,
    discount,
  };
  console.log("Product before Sending: ", dataPacket);
  try {
    await axiosInstance.post("/api/products/", dataPacket);
  } catch (err) {
    console.log(err);
  }
}
