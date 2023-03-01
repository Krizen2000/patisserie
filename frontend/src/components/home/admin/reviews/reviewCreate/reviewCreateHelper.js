import axios from "axios";

export async function sendReviewDetails(
  title,
  message,
  rating,
  userName,
  productId
) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  const datapacket = {
    title,
    message,
    rating,
    userName,
    productId,
  };
  try {
    let res = await axiosInstance.post("/api/reviews/", datapacket);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
}
