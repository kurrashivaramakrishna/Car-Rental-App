import { useState, useEffect } from "react";
import "./App.css";
import Header from "./pages/Header";
import { supabase } from "./supabaseClient";
import CarUploadForm from "./components/CarUploadForm";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [cars, setCars] = useState([]);
  const [location, setLocation] = useState("Fetching location...");

  // ==============================
  //  Get Current User Location
  // ==============================
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);
      },
      () => setLocation("Unable to access location")
    );
  }, []);

  // ==============================
  //  Fetch Cars from Supabase
  // ==============================
  const fetchCars = async () => {
    console.log("Fetching cars from Supabase...");

    const { data, error } = await supabase
      .from("caruploading")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      return;
    }

    console.log("Cars fetched:", data);

    // Prepare cars with valid public image URLs
    const carsWithPublicUrls = data.map((car) => {
      if (!car.image_url) {
        console.warn("Missing image for car:", car.model);
        return car;
      }

      // If already a full URL, skip conversion
      if (car.image_url.startsWith("http")) return car;

      const { data: publicUrlData, error: publicUrlError } = supabase.storage
        .from("car-images")
        .getPublicUrl(car.image_url);

      if (publicUrlError) {
        console.error("Error generating public URL:", publicUrlError);
        return car;
      }

      return {
        ...car,
        image_url: publicUrlData?.publicUrl || car.image_url,
      };
    });

    setCars(carsWithPublicUrls);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // ==============================
  //  SEARCH HANDLER (called from Header)
  // ==============================
  const handleSearch = async ({ searchTerm, category }) => {
    console.log("Searching for:", searchTerm, "in", category);

    let query = supabase.from("caruploading").select("*");

    // If user entered a keyword
    if (searchTerm && searchTerm.trim() !== "") {
      query = query.or(
        `model.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,price.ilike.%${searchTerm}%`
      );
    }

    // If user selected a category
    if (category && category !== "") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Search error:", error);
    } else {
      console.log("Search results:", data);
      setCars(data);
    }
  };

  // ==============================
  //  Render Tabs
  // ==============================
  const renderHome = () => (
    <div className="home">
      <h2>Welcome to Shiva Motors</h2>
      <p>Explore and list your cars for rent or sale.</p>

      <div className="car-grid">
        {cars.length === 0 ? (
          <p>No cars found. Try a different search.</p>
        ) : (
          cars.map((car) => (
            <div key={car.id} className="car-card">
              <img
                src={car.image_url || "/placeholder.png"}
                alt={car.model}
                style={{
                  width: "70%",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <h3>{car.model}</h3>
              <p>Price: £{car.price}</p>
              <p>Location: {car.location}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderUpload = () => (
    <div>
      <CarUploadForm onCarAdded={fetchCars} />
    </div>
  );

  const renderProfile = () => (
    <div className="profile">
      <h2>Profile Section</h2>
      <p>Profile management will be available soon.</p>
    </div>
  );

  const renderJourney = () => (
    <div className="journey">
      <h2>Journey Tracker</h2>
      <p>Track your travel and routes here.</p>
    </div>
  );

  // ==============================
  //  MAIN LAYOUT
  // ==============================
  return (
    <div className={`app ${activeTab}`}>
      {/* Header */}
      <Header onSearch={handleSearch} userLocation={location} />

      {/* Main Content */}
      <main className="content">
        {activeTab === "home" && renderHome()}
        {activeTab === "Upload" && renderUpload()}
        {activeTab === "profile" && renderProfile()}
        {activeTab === "journey" && renderJourney()}
      </main>

      {/* Footer Navigation */}
      <footer className="footer">
        {["home", "profile", "journey", "Upload"].map((tab) => (
          <button
            key={tab}
            className={`footer-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </footer>
    </div>
  );
}
