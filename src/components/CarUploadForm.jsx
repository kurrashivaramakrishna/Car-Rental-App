import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const CarUploadForm = ({ onCarAdded }) => {
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");
    if (!image.type.startsWith("image/")) return alert("File must be an image");

    setLoading(true);
    const fileName = `${Date.now()}_${image.name}`;

    // 1️⃣ Upload image to Supabase Storage
    // const { data: imgData, error: imgError } = await supabase.storage
    //   .from("car-images")
    //   .upload(fileName, image);
    console.log("Uploading file:", image);
const { data: imgData, error: imgError } = await supabase.storage
  .from("car-images")
  .upload(fileName, image);

console.log("imgData:", imgData, "imgError:", imgError);


    if (imgError) {
      console.error("Image upload error:", imgError);
      alert("Failed to upload image");
      setLoading(false);
      return;
    }

    // 2️⃣ Get public URL (bucket must be public)
    const { data: publicUrl } = supabase.storage
      .from("car-images")
      .getPublicUrl(fileName);

    // 3️⃣ Insert car details into Supabase table
    const { data, error } = await supabase.from("caruploading").insert([
      {
        model,
        price: Number(price),
        seats: Number(seats),
        location,
        availability_time: availability,
        image_url: publicUrl.publicUrl,
      },
    ]);

    if (error) {
      console.error("Error inserting car data:", error);
      alert("Failed to save car details!");
    } else {
      console.log("Car uploaded successfully:", data);
      alert("Car uploaded successfully!");
      // Reset form
      setModel("");
      setPrice("");
      setSeats("");
      setLocation("");
      setAvailability("");
      setImage(null);

      // Notify parent component to refresh car list
      if (onCarAdded) onCarAdded();
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleUpload}
      style={{ display: "flex", flexDirection: "column", width: "400px", margin: "auto", gap: "10px" }}
    >
      <h2>Upload Car Details</h2>
      <input type="text" placeholder="Car Model" value={model} onChange={(e) => setModel(e.target.value)} required />
      <input type="number" placeholder="Price per day" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="number" placeholder="Number of Seats" value={seats} onChange={(e) => setSeats(e.target.value)} required />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <input type="text" placeholder="Availability Time" value={availability} onChange={(e) => setAvailability(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit" disabled={loading}>{loading ? "Uploading..." : "Upload Car"}</button>
    </form>
  );
};

export default CarUploadForm;
