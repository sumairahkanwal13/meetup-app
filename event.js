
const express = require("express");
const cors = require("cors");
const app = express();

const { initializeDatabase } = require("./DB/DB.Connect");
const Events = require("./models/event.models");

app.use(express.json());
initializeDatabase();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));


// 1. Create new event
async function createEvent(newEvent) {
  try {
    const event = new Events(newEvent);
    return await event.save();
  } catch (error) {
    console.log(error);
  }
}

app.post("/events", async (req, res) => {
  try {
    const event = await createEvent(req.body);
    res.status(201).json({ message: "Event added successfully.", event });
  } catch (error) {
    res.status(500).json({ error: "Failed to add event." });
  }
});


// 2. Read all Events
async function readAllEvents() {
  try {
    return await Events.find();
  } catch (error) {
    console.log(error);
  }
}

app.get("/events", async (req, res) => {
  try {
    const events = await readAllEvents();
    if (events.length > 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: "No event found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events." });
  }
});


// 3. Get event by Title
async function readEventByTitle(eventTitle) {
  try {
    return await Events.findOne({ title: eventTitle });
  } catch (error) {
    console.log(error);
  }
}

app.get("/events/title/:eventTitle", async (req, res) => {
  try {
    const event = await readEventByTitle(req.params.eventTitle);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: "No event found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event." });
  }
});


// 4. Get event By Id
async function readEventById(eventId) {
  try {
    return await Events.findById(eventId);
  } catch (error) {
    console.log(error);
  }
}

app.get("/events/:eventId", async (req, res) => {
  try {
    const event = await readEventById(req.params.eventId);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: "No event found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event." });
  }
});


// 5. Update event By Id
async function updateEvent(eventId, dataToUpdate) {
  try {
    return await Events.findByIdAndUpdate(eventId, dataToUpdate, { new: true });
  } catch (error) {
    console.log(error);
  }
}

app.post("/events/:eventId", async (req, res) => {
  try {
    const event = await updateEvent(req.params.eventId, req.body);
    if (event) {
      res.json({ message: "Event updated successfully.", event });
    } else {
      res.status(404).json({ error: "No event found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update event." });
  }
});


// 6. Delete event by id
async function deleteEvent(eventId) {
  try {
    return await Events.findByIdAndDelete(eventId);
  } catch (error) {
    console.log(error);
  }
}

app.delete("/events/:eventId", async (req, res) => {
  try {
    const eventDeleted = await deleteEvent(req.params.eventId);
    if (eventDeleted) {
      res.status(200).json({ message: "Event deleted successfully." });
    } else {
      res.status(404).json({ error: "No event found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event." });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
