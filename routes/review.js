const express = require("express");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utills/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/reviews.js");
const WrapAsync = require("../utills/WrapAsync.js");
const Listening = require("../models/listing.js");
const {
  validateReviews,
  isLoggedIn,
  isReviewOwner,
} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//reviews
//post  review route
router.post(
  "/",
  isLoggedIn,
  validateReviews,
  WrapAsync(reviewController.createReview)
);

//delette review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewOwner,
  WrapAsync(reviewController.destroyReview)
);

module.exports = router;
