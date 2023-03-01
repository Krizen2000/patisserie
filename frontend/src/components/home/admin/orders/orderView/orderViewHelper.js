import axios from "axios";

export async function loadOrderDetails(selectedOrder) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  let res;
  try {
    res = await axiosInstance.get(`/api/orders/find/${selectedOrder}`);
    console.log(`Loaded Order: `, res.data);
  } catch (err) {
    console.log(err);
  }
  return {
    userName: res.data.userName,
    address: res.data.address,
    items: res.data.items,
    shippingCharge: res.data.shippingCharge,
    coupon: res.data.coupon,
    paymentMethod: res.data.paymentMethod,
    status: res.data.status,
    deliveredAt: res.data.deliveredAt,
  };
}
