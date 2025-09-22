const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String, 
    required: true,
  },
  type: {
    type: String,
    enum: ["Online", "Offline"], 
    required: true,
  },
  image: {
    type: String, 
    default: "",
  },
  price: {
    type: Number,
    default: 0, 
  },
  venue: {
    type: String, 
    default: "",
  },
  tags: [
    {
      type: String,
    },
  ],
  speakers: [
    {
      type: String,
    }
  ],
  address: {
    type: String,
    default: "",
  },
  dressCode: {
    type: String,
    default: "",
  },
  ageRestriction: {
    type: String,
    default: "",
  }
});

const Events = mongoose.model("Events", eventSchema);

module.exports = Events;
