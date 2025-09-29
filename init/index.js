const mongoose = require("mongoose");
const initData = require("./data.js");
const Listening = require("../models/listing.js");

main()
  .then((res) => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDb = async () => {
  await Listening.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68c71b80e05620c0d9afb1ca",
  }));
  await Listening.insertMany(initData.data);
  console.log("data was saved");
};

initDb();
