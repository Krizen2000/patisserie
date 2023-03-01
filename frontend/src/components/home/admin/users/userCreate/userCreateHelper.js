import axios from "axios";
import CryptoJS from "crypto-js";

const SALT = CryptoJS.enc.Utf8.parse(
  process.env.REACT_APP_PASSWORD_SALT || "juan"
);

export async function sendUserDetails(
  name,
  userName,
  password,
  isAdmin,
  phoneNumber,
  email
) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  const hashedPassword = CryptoJS.PBKDF2(password, SALT, {
    keySize: 256 / 32,
  }).toString();

  const datapacket = {
    name,
    userName,
    isAdmin,
    phoneNumber,
    email,
    password: hashedPassword,
  };
  try {
    await axiosInstance.post("/api/users/", datapacket);
  } catch (err) {
    console.log(err);
  }
}
