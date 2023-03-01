import React from "react";
import { Route, Routes } from "react-router";
import ReviewCreate from "./reviewCreate/reviewCreate";
import ReviewEdit from "./reviewEdit/reviewEdit";
import ReviewList from "./reviewList/reviewList";
import ReviewView from "./reviewView/reviewView";

export default function ReviewsTab() {
  return (
    <Routes>
      <Route path="/" element={<ReviewList />} />
      <Route path="/create" element={<ReviewCreate />} />
      <Route path="/edit/:selectedReview" element={<ReviewEdit />} />
      <Route path="/view/:selectedReview" element={<ReviewView />} />
    </Routes>
  );
}
