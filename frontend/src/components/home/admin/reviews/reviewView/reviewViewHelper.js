import axios from "axios";

export async function loadReviewDetails(selectedReview) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  console.log("BACKEND_URL: ", process.env.REACT_APP_BACKEND_URL);
  let res;
  try {
    res = await axiosInstance.get(`/api/reviews/${selectedReview}`);
    console.log("Res Data:", res.data);
  } catch (err) {
    console.log(err);
  }
  return res.data;
}
