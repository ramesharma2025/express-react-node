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
      // UPDATE
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      // CREATE
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
    <div style={styles.container}>
      {/* LEFT SIDE - FORM */}
      <div style={styles.formSection}>
        <h2>{editingId ? "Edit User" : "Add User"}</h2>

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
        <h2>Users List</h2>

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
  );
};

// ======================
// Simple Dashboard Styles
// ======================
const styles = {
  container: {
    display: "flex",
    gap: "30px",
    padding: "40px",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
  },
  formSection: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  tableSection: {
    flex: 2,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
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
};

export default Users;
