import React, { useState } from "react";
import API from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function UploadForm() {
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [files, setFiles] = useState([]);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("model", model);
    form.append("price_per_day", price);
    form.append("location", location);
    form.append("available_from", from);
    form.append("available_to", to);
    for (let f of files) form.append("images", f);

    try {
      await API.post("/api/cars", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Uploaded successfully!");
      nav("/my-listings");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error uploading");
    }
  }

  // 💅 Inline Styles
  const styles = {
    formContainer: {
      maxWidth: "720px",
      margin: "40px auto",
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))",
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      color: "#222",
      fontFamily: "'Poppins', sans-serif",
      border: "1px solid rgba(255,255,255,0.3)",
    },
    title: {
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "600",
      color: "#0f172a",
      marginBottom: "12px",
    },
    input: {
      padding: "12px 15px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      fontSize: "16px",
      transition: "all 0.3s ease",
      outline: "none",
    },
    inputFocus: {
      borderColor: "#2563eb",
      boxShadow: "0 0 5px rgba(37, 99, 235, 0.3)",
    },
    label: {
      fontWeight: "500",
      color: "#374151",
      marginTop: "8px",
    },
    fileInput: {
      padding: "10px",
      backgroundColor: "#f8fafc",
      borderRadius: "10px",
      border: "1px solid #cbd5e1",
      cursor: "pointer",
    },
    button: {
      background:
        "linear-gradient(90deg, #2563eb, #1d4ed8, #3b82f6, #60a5fa)",
      color: "#fff",
      border: "none",
      padding: "12px 20px",
      borderRadius: "10px",
      fontSize: "18px",
      fontWeight: "500",
      cursor: "pointer",
      marginTop: "12px",
      transition: "all 0.3s ease",
    },
    buttonHover: {
      transform: "scale(1.03)",
      boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)",
    },
  };

  // Hover effects (simple inline workaround)
  const [hover, setHover] = useState(false);

  return (
    <form onSubmit={submit} style={styles.formContainer}>
      <h2 style={styles.title}>🚗 Upload Your Car Listing</h2>

      <input
        style={styles.input}
        value={model}
        onChange={(e) => setModel(e.target.value)}
        required
        placeholder="Model (e.g. Toyota Corolla)"
      />

      <input
        type="number"
        style={styles.input}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        placeholder="Price per day (£)"
      />

      <input
        style={styles.input}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />

      <label style={styles.label}>Availability from</label>
      <input
        type="date"
        style={styles.input}
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />

      <label style={styles.label}>Availability to</label>
      <input
        type="date"
        style={styles.input}
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <input
        multiple
        type="file"
        accept="image/*"
        style={styles.fileInput}
        onChange={(e) => setFiles(e.target.files)}
      />

      <button
        type="submit"
        style={{
          ...styles.button,
          ...(hover ? styles.buttonHover : {}),
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Upload
      </button>
    </form>
  );
}
