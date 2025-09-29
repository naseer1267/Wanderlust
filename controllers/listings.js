const { Query } = require("mongoose");
const Listening = require("../models/listing.js");
let key = process.env.MAP_TOKEN;

module.exports.index = async (req, res) => {
  if (req.query.location) {
    let location = req.query.location;
    const listings = await Listening.find({ location: `${location}` });
    return res.render("./listings/index.ejs", { listings });
  } else {
    const listings = await Listening.find({});
    res.render("./listings/index.ejs", { listings });
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.createListing = async (req, res) => {
  const place = req.body.listing.location;
  const mapUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(
    place
  )}.json?key=${key}`;
  const response = await fetch(mapUrl);
  const data = await response.json();
  // const [lng, lat] = data.features[0].geometry.coordinates;
  console.log(data.features[0].geometry);
  // res.send(`Coordinates for ${place}: Longitude = ${lng}, Latitude = ${lat}`);
  // if (data.features && data.features.length > 0) {
  //   const [lng, lat] = data.features[0].geometry.coordinates;
  //   res.send(`Coordinates for ${place}: Longitude = ${lng}, Latitude = ${lat}`);
  // } else {
  //   res.send("Location not found!");
  // }
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listening(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = data.features[0].geometry;
  let newLis = await newListing.save();
  console.log(newLis);
  req.flash("success", "listing added successfully");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listening.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "listing does not exists");
    return res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listening.findById(id);
  if (!listing) {
    req.flash("error", "listing does not exists");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_150,w_200");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listening.findByIdAndUpdate(id, { ...req.body.listing });
  console.log(req.file);
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "listing updated ");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listening.findByIdAndDelete(id);
  req.flash("success", "listing deleted");
  res.redirect("/listings");
};
