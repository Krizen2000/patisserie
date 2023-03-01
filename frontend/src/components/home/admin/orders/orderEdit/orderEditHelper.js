import axios from "axios";

export async function loadOrderDetails(selectedOrder) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  let res;
  try {
    res = await axiosInstance.get(`/api/orders/find/${selectedOrder}`);
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

export async function modifyOrderDetails(
  selectedOrder,
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

  console.log("orderId:", selectedOrder);
  console.log("userName:", userName);
  console.log("address:", address);
  console.log("items:", items);
  console.log("shippingCharge:", shippingCharge);
  console.log("coupon:", coupon);
  console.log("paymentMethod:", paymentMethod);
  console.log("status:", status);
  console.log("deliveredAt:", deliveredAt);

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

  try {
    await axiosInstance.put(`/api/orders/${selectedOrder}`, datapacket);
  } catch (err) {
    console.log(err);
  }
}
