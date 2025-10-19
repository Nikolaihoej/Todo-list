import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js
// it manages relationships between data, provides schema validation,
// and is used to translate between objects in code and the representation of those objects in MongoDB.

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
});
const Todo = mongoose.model("Todo", TodoSchema);

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { text, completed } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ message: "Text is required" });
    }
    const todo = new Todo({ text, completed: !!completed });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Failed to create todo" });
  }
});

app.patch("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  try {
    let updated = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      updated = await Todo.findByIdAndUpdate(
        id,
        { ...(text !== undefined && { text }), ...(completed !== undefined && { completed }) },
        { new: true }
      );
    }
    if (!updated) {
      updated = await Todo.findOneAndUpdate(
        { _id: id },
        { ...(text !== undefined && { text }), ...(completed !== undefined && { completed }) },
        { new: true }
      );
    }
    if (!updated) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(400).json({ message: "Invalid ID or update data" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let deleted = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      deleted = await Todo.findByIdAndDelete(id);
    }
    if (!deleted) {
      // Try as string (in case _id is stored as a string)
      deleted = await Todo.findOneAndDelete({ _id: id });
    }
    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(400).json({ message: "Invalid ID" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));