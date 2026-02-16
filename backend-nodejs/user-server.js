// npm init -y
// npm install express cors uuid
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (your JSON data)
let users = [
  {
    id: "6ae0",
    name: "John",
    email: "john@doe",
    password: "123456",
  },
  {
    id: "52a6",
    name: "rohit paudel",
    email: "rohit@gmail.com",
    password: "rohit@123",
  },
];

// ==========================
// 1️⃣ GET ALL USERS
// ==========================
app.get("/users", (req, res) => {
  console.log(users, "users");
  res.json(users);
});

// ==========================
// 2️⃣ GET SINGLE USER
// ==========================
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// ==========================
// 3️⃣ CREATE USER
// ==========================
app.post("/users", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newUser = {
    id: uuidv4().slice(0, 4),
    name,
    email,
    password,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// ==========================
// 4️⃣ UPDATE USER
// ==========================
app.put("/users/:id", (req, res) => {
  const { name, email, password } = req.body;

  const userIndex = users.findIndex((u) => u.id === req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[userIndex] = {
    ...users[userIndex],
    name,
    email,
    password,
  };

  res.json(users[userIndex]);
});

// ==========================
// 5️⃣ DELETE USER
// ==========================
app.delete("/users/:id", (req, res) => {
  const userExists = users.some((u) => u.id === req.params.id);

  if (!userExists) {
    return res.status(404).json({ message: "User not found" });
  }

  users = users.filter((u) => u.id !== req.params.id);

  res.json({ message: "User deleted successfully" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
