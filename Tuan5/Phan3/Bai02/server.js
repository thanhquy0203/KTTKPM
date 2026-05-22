const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;

app.use(express.json());

const noteSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

app.get("/", async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 }).limit(20);
  res.json({ message: "Node.js connected to MongoDB", notes });
});

app.post("/notes", async (req, res) => {
  const note = await Note.create({ text: req.body.text || "Hello MongoDB" });
  res.status(201).json(note);
});

mongoose
  .connect(mongoUrl)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  });
