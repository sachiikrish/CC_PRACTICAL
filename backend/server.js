const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "https://cc-practical-sigma.vercel.app"
}));

// 🔗 Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://me:mePassword@cc.z8ckgiq.mongodb.net/")
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ Connection Error:", err));


// 📦 Create Schema
const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
});

// 📁 Create Model
const Student = mongoose.model("Student", studentSchema);


// ➕ Add Student
app.post("/add", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.send("Student Added Successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});


// 📄 Get All Students
app.get("/students", async (req, res) => {
  try {
    const data = await Student.find();
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});


// ❌ Delete Student (Optional but useful)
app.delete("/delete/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.send("Student Deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});


// ✏️ Update Student (Optional)
app.put("/update/:id", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.send("Student Updated");
  } catch (err) {
    res.status(500).send(err);
  }
});


// 🚀 Start Server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
