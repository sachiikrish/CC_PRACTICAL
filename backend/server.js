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
mongoose.connect("mongodb+srv://me:mePassword@cc.z8ckgiq.mongodb.net/sample")
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





// 🚀 Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
