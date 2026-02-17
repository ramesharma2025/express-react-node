import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:5000/users";

  // ======================
  // Fetch Users
  // ======================
  const fetchUsers = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ======================
  // Handle Input Change
  // ======================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ======================
  // Submit (Add or Update)
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setForm({ name: "", email: "", password: "" });
    setEditingId(null);
    fetchUsers();
  };

  // ======================
  // Delete User
  // ======================
  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    fetchUsers();
  };

  // ======================
  // Edit User
  // ======================
  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    setEditingId(user._id);
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>🚀 Welcome to MERN Stack</h1>
      </header>

      {/* MAIN CONTENT */}
      <div style={styles.container}>
        {/* LEFT SIDE - FORM */}
        <div style={styles.formSection}>
          <h2 style={styles.sectionTitle}>
            {editingId ? "Edit User" : "Add User"}
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <button type="submit" style={styles.button}>
              {editingId ? "Update User" : "Add User"}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE - TABLE */}
        <div style={styles.tableSection}>
          <h2 style={styles.sectionTitle}>Users List</h2>

          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(user)}
                      style={styles.editBtn}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © 2026 MERN Stack App. All Rights Reserved.
      </footer>
    </div>
  );
};

// ======================
// Beautified Styles
// ======================
const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    background: "linear-gradient(90deg, #007bff, #6610f2)",
    padding: "20px",
    textAlign: "center",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
  headerTitle: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  container: {
    display: "flex",
    gap: "30px",
    padding: "40px",
    flex: 1,
  },
  formSection: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  tableSection: {
    flex: 2,
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    width: "100%",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  editBtn: {
    marginRight: "8px",
    padding: "6px 12px",
    backgroundColor: "#ffc107",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "6px 12px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  footer: {
    backgroundColor: "#212529",
    color: "#fff",
    textAlign: "center",
    padding: "15px",
    fontSize: "14px",
  },
};

export default Users;
