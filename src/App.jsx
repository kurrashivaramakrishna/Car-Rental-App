import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'  // ⬅️ import these
// import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      {/* Navbar (stays visible on all pages) */}
      <header className="navbar">
        <h1 className="logo">🚗 CarRent</h1>
        <nav>
          {/* <Link to="/">Home</Link> */}
          <Link to="/signup">Signup</Link>
          <Link to="/signin">Signin</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </header>

      {/* Routes (changes content depending on URL) */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 CarRent. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;