import React, { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [students, setStudents] = useState([]);

  // Fetch students
  const getStudents = async () => {
    const res = await fetch("http://localhost:3000/students");
    const data = await res.json();
    setStudents(data);
  };

  // Add student
  const addStudent = async () => {
    await fetch("http://localhost:3000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, course }),
    });

    setName("");
    setCourse("");
    getStudents();
  };

  // Load data on start
  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Student Record System</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Enter Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
      <br /><br />

      <button onClick={addStudent}>Add Student</button>

      <h3>Student List</h3>
      <ul>
        {students.map((s, index) => (
          <li key={index}>
            {s.name} - {s.course}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;