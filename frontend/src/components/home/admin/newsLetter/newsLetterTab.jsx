import React from "react";
import { Route, Routes } from "react-router";
import NewsLetterList from "./newsLetterList";

export default function NewsLetterTab() {
  return (
    <Routes>
      <Route path="/" element={<NewsLetterList />} />
    </Routes>
  );
}
