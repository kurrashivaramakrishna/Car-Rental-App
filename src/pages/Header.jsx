import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header({ onSearch, userLocation }) {
  const [location, setLocation] = useState(userLocation || "Detecting...");
  const [menuOpen, setMenuOpen] = useState(false);
  const [locDropdownOpen, setLocDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  // ==============================
  //  Detect User Location
  // ==============================
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "Unknown city";
            const postcode = data.address.postcode || "";
            const country = data.address.country || "";
            setLocation(`${city}, ${postcode}, ${country}`);
          } catch (err) {
            setLocation("Unable to detect location");
          }
        },
        () => setLocation("Location unavailable")
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  // ==============================
  //  Search Handler
  // ==============================
  const handleSearchClick = () => {
    if (onSearch) {
      onSearch({ searchTerm, category });
    } else {
      console.warn("Header: onSearch() prop not provided.");
    }
  };

  // ==============================
  //  Category Filter Handler
  // ==============================
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setCategory(selected);

    // Optional: auto trigger search when category changes
    if (onSearch) {
      onSearch({ searchTerm, category: selected });
    }
  };

  // ==============================
  //  Hamburger Menu Toggle
  // ==============================
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="app-header">
      {/* ===== Logo ===== */}
      <div className="logo">
        <Link to="/">🚗 CarRental</Link>
      </div>

      {/* ===== Location ===== */}
      <div className="location">
        <button
          onClick={() => setLocDropdownOpen(!locDropdownOpen)}
          className="location-btn"
        >
          📍 {location.split(",")[0] || "Detecting..."}
        </button>

        {locDropdownOpen && (
          <div className="location-dropdown">
            <p>Your current location:</p>
            <strong>{location}</strong>
            <button onClick={() => setLocDropdownOpen(false)}>Close</button>
          </div>
        )}
      </div>

      {/* ===== Search Bar ===== */}
      <div className="search-bar">
        <select
          className="category-select"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">All Cars</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="hatchback">Hatchback</option>
          <option value="electric">Electric</option>
        </select>

        <input
          type="text"
          placeholder="Search cars, models, or locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
        />

        <button className="search-btn" onClick={handleSearchClick}>
          🔍
        </button>
      </div>

      {/* ===== Navigation Links ===== */}
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/upload">Upload</Link>
        <Link to="/available_cars">Available Cars</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>

        <button className="cart-btn">
          🛒 <span className="cart-count">2</span>
        </button>

        <div className="profile-dropdown">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Profile"
          />
          <div className="dropdown-content">
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/logout" className="logout">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== Hamburger Menu ===== */}
      <button className="hamburger" onClick={toggleMenu}>
        {menuOpen ? "✖" : "☰"}
      </button>
    </header>
  );
}
