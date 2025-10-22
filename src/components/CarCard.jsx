// import { useState, useEffect } from "react";
// import { createClient } from "@supabase/supabase-js";
// import "./App.css";
// import Header from "./pages/Header";
// import { supabase } from "./supabaseClient";
// import CarUploadForm from "./components/CarUploadForm";

// // Initialize Supabase client
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


// export default function App() {
//   const [activeTab, setActiveTab] = useState("home");
//   const [cars, setCars] = useState([]);
//   const [location, setLocation] = useState("Fetching location...");

//   // 🌍 Fetch user location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setLocation(`📍 ${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);
//         },
//         () => setLocation("Location permission denied")
//       );
//     }
//   }, []);

//   // 🚗 Fetch all cars from Supabase
//   const fetchCars = async () => {
//     const { data, error } = await supabase
//       .from("caruploading")
//       .select("*")
//       .order("id", { ascending: false });
//     if (error) console.error("Fetch error:", error);
//     else setCars(data || []);
//   };

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   return (
//     <div className={`app ${activeTab}`}>
//       {/* 🧭 Amazon-like Header */}
//       <Header userLocation={location} />

//       <main className="content">
//         {activeTab === "home" && (
//           <div className="home">
//             <h2>Welcome to Shiva Motors 🚘</h2>
//             <p>Explore and list your cars for rent or sale!</p>
//           </div>
//         )}

//         {activeTab === "gallery" && (
//   <div>
//     <CarUploadForm onCarAdded={fetchCars} />
//     <div className="car-grid">
//       {cars.map((car) => (
//         <div
//           key={car.id}
//           className="car-card"
//           onClick={() =>
//             alert(
//               `Model: ${car.model}\nPrice: £${car.price}\nOwner: ${car.phone || "N/A"}\nLocation: ${car.location}`
//             )
//           }
//         >
//           <img src={car.image_url || "/placeholder.png"} alt={car.model} />
//           <h3>{car.model}</h3>
//           <p>💰 Price: £{car.price}</p>
//           <p>📍 {car.location}</p>
//           <p>✅ {car.availability_time}</p>
//         </div>
//       ))}
//     </div>
//   </div>
// )}


//         {activeTab === "profile" && <h2>👤 Profile Section Coming Soon</h2>}
//         {activeTab === "journey" && <h2>🗺️ Track your travel journeys here</h2>}
//       </main>

//       {/* 🔻 Footer Navigation */}
//       <footer className="footer">
//         {["home", "profile", "journey", "gallery"].map((tab) => (
//           <button
//             key={tab}
//             className={`footer-btn ${activeTab === tab ? "active" : ""}`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab === "home" && "🏠 Home"}
//             {tab === "profile" && "👤 Profile"}
//             {tab === "journey" && "🗺️ Journey"}
//             {tab === "gallery" && "🚘 Gallery"}
//           </button>
//         ))}
//         <div
//           className="slider"
//           style={{
//             left: `${
//               ["home", "profile", "journey", "gallery"].indexOf(activeTab) * 25
//             }%`,
//           }}
//         />
//       </footer>
//     </div>
//   );
// }



// table policy
// -- Enable RLS first
// alter table caruploading enable row level security;

// -- Insert policy
// create policy "Allow all inserts"
// on caruploading
// for insert
// with check (true);

// -- Select policy
// create policy "Allow all selects"
// on caruploading
// for select
// using (true);
//  and bucket policy
//  create policy "Allow uploads for all users"
// on storage.objects
// for insert
// with check (bucket_id = 'car-images');
// new code 