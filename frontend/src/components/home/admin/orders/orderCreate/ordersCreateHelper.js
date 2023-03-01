import axios from "axios";

export async function sendOrderDetails(
  userName,
  address,
  items,
  shippingCharge,
  coupon,
  paymentMethod,
  status,
  deliveredAt
) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  let datapacket = {
    userName,
    address,
    items,
    shippingCharge,
    coupon,
    paymentMethod,
    status,
  };
  if (deliveredAt) datapacket["deliveredAt"] = deliveredAt;
  console.log("DataPacket:", datapacket);

  try {
    let res = await axiosInstance.post("/api/orders/", datapacket);
    console.log("Created Order SerRes:", res.data);
  } catch (err) {
    console.log(err);
  }
}
