import React from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";

export const CacheContext = createContext();

const initialCache = {
  subscribedNewsLetter: false,
  token: null,
  isAdmin: false,
  userName: null,
  cart: [],
};
function loadCache() {
  const cache = localStorage.getItem("data");
  return cache ? JSON.parse(cache) : initialCache;
}

export default function CacheProvider(props) {
  const [cache, setCache] = useState(loadCache());

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(cache));
  }, [cache]);

  return (
    <CacheContext.Provider value={{ cache, setCache }}>
      {props.children}
    </CacheContext.Provider>
  );
}
