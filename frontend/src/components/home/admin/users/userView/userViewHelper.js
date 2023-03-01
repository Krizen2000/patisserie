import axios from "axios";

export async function loadUserDetails(selectedUser) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  let res;
  try {
    res = await axiosInstance.get(`/api/users/find/${selectedUser}`);
    console.log("Get User: ", res.data);
  } catch (err) {
    console.log(err);
  }
  return res.data;
}
