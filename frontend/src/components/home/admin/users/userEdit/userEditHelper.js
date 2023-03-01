import axios from "axios";
import CryptoJS from "crypto-js";

const SALT = CryptoJS.enc.Utf8.parse(
  process.env.REACT_APP_PASSWORD_SALT || "juan"
);

export async function modifyUserDetails(
  selectedUser,
  name,
  userName,
  password,
  prevPassword,
  isAdmin,
  phoneNumber,
  email
) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  let datapacket = {
    name,
    userName,
    isAdmin,
    phoneNumber,
    email,
  };

  if (password !== prevPassword) {
    const hashedPassword = CryptoJS.PBKDF2(password, SALT, {
      keySize: 256 / 32,
    }).toString();
    datapacket["password"] = hashedPassword;
  }

  try {
    let res = await axiosInstance.put(`/api/users/${selectedUser}`, datapacket);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
}

export async function loadUserDetails(selectedUser) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  let res;
  try {
    res = await axiosInstance.get(`/api/users/find/${selectedUser}`);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
  return res.data;
}
