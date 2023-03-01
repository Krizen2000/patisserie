import axios from "axios";

export async function loadProductDetails(productId) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  let res;
  try {
    res = await axiosInstance.get(`/api/products/find/${productId}`);
  } catch (err) {
    console.log(err);
  }
  return {
    id: res.data.id,
    name: res.data.name,
    description: res.data.description,
    image: res.data.image,
    category: res.data.category,
    size: res.data.size,
    price: res.data.price,
    discount: res.data.discount,
    special: res.data.special,
  };
}

export async function modifyProductDetails(
  prevProductId,
  id,
  name,
  description,
  image,
  category,
  size,
  price,
  discount,
  special
) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  console.log("productId:", prevProductId);

  console.log("id:", id);
  console.log("name:", name);
  console.log("desc:", description);
  console.log("image:", image);
  console.log("category:", category);
  console.log("size:", size);
  console.log("price:", price);
  console.log("discount:", discount);
  console.log("special:", special);

  const datapacket = {
    id,
    name,
    description,
    image,
    category,
    size,
    price,
    discount,
    special,
  };

  try {
    await axiosInstance.put(`/api/products/${prevProductId}`, datapacket);
  } catch (err) {
    console.log(err);
  }
}
