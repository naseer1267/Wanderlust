const express = require("express");
const router = express.Router();
const { listingSchema, reviewSchema } = require("../schema.js");
const WrapAsync = require("../utills/WrapAsync.js");
const Listening = require("../models/listing.js");
const ExpressError = require("../utills/ExpressError.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(WrapAsync(listingController.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    WrapAsync(listingController.createListing)
  );
  

// router.get("/", WrapAsync(listingController.index));

//new------------

router.get("/new", isLoggedIn, listingController.renderNewForm);

// router.post(
//   "/",
//   isLoggedIn,
//   validateListing,
//   WrapAsync(listingController.createListing)
// );

router
  .route("/:id")
  .get(WrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    WrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, WrapAsync(listingController.deleteListing));

//show------------
// router.get("/:id", WrapAsync(listingController.showListing));

//edit=============

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  validateListing,
  WrapAsync(listingController.renderEditForm)
);

//edit updated

// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   WrapAsync(listingController.updateListing)
// );

//delete========

// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   WrapAsync(listingController.deleteListing)
// );

module.exports = router;
