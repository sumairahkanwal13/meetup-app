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
  time: {
    type: String,
    default: ""
  },
  endTime: {             
    type: String,
    default: ""
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
  address: {
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
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        default: "",
      },
    },
  ],
  organizer: {          
    type: String,
    default: ""
  },
  dressCode: {
    type: String,
    default: "",
  },
  ageRestriction: {
    type: String,
    default: "",
  },
  capacity: {            
    type: Number,
    default: 0
  },
  attendees: [
  {
    name: String,
    email: String
  }
]

});


const Events = mongoose.model("Events", eventSchema);

module.exports = Events;
