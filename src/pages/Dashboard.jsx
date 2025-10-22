import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Temporary demo data (replace with Supabase later)
    setCars([
      {
        id: 1,
        name: "Tesla Model S",
        image_url: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
        price: "$180/day",
        seats: 5,
        location: "London",
      },
      {
        id: 2,
        name: "BMW X5",
        image_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
        price: "$150/day",
        seats: 5,
        location: "Manchester",
      },
      {
        id: 3,
        name: "Audi A6",
        image_url: "https://images.unsplash.com/photo-1617814077300-7a145b0b48f8",
        price: "$130/day",
        seats: 5,
        location: "Leeds",
      },
      {
        id: 4,
        name: "Range Rover Evoque",
        image_url: "https://images.unsplash.com/photo-1614200179399-7b8e0ff9dfb3",
        price: "$200/day",
        seats: 5,
        location: "Liverpool",
      },
      {
        id: 5,
        name: "Mercedes C-Class",
        image_url: "https://images.unsplash.com/photo-1605559424843-69f622b9ac0d",
        price: "$170/day",
        seats: 5,
        location: "Birmingham",
      },
    ]);
  }, []);

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
            🚗 CarHub
          </h1>

          {/* Search & Filter */}
          <div className="flex items-center gap-2 flex-1 mx-6">
            <input
              type="text"
              placeholder="Search cars, models..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              🔍
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition">
              ⚙️ Filters
            </button>
          </div>

          {/* Cart & Profile */}
          <div className="flex items-center gap-6">
            <button className="relative text-xl">
              🛒
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-1">
                2
              </span>
            </button>

            <div className="relative group">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-blue-600 cursor-pointer"
              />
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <ul className="text-sm text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Settings
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-10 text-center shadow-lg">
        <h2 className="text-3xl font-bold">Find Your Perfect Ride</h2>
        <p className="mt-2 text-blue-100">Luxury, comfort, and affordability — all in one place.</p>
      </div>

      {/* Car Cards */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Featured Cars
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={car.image_url}
                  alt={car.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
                  {car.location}
                </span>
              </div>

              <div className="p-4">
                <h4 className="font-semibold text-lg text-gray-800">
                  {car.name}
                </h4>
                <div className="flex justify-between text-gray-600 text-sm mt-1">
                  <span>{car.seats} Seats</span>
                  <span className="font-semibold text-blue-700">
                    {car.price}
                  </span>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                  Rent Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 mt-10">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>© 2025 CarHub. All Rights Reserved.</p>
          <p className="text-gray-400 mt-1">Made with ❤️ for car lovers</p>
        </div>
      </footer>
    </div>
  );
}
