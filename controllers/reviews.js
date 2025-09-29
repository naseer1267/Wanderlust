const Review = require("../models/reviews.js");
const Listening = require("../models/listing.js");

module.exports.createReview = async (req, res, next) => {
  let listing = await Listening.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await listing.save();
  await newReview.save();
  req.flash("success", "Review added ");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res, next) => {
  let { id, reviewId } = req.params;

  await Listening.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted");
  return res.redirect(`/listings/${id}`);
};
