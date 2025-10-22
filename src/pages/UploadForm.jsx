import React, { useState } from 'react';
import API from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function UploadForm(){
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [files, setFiles] = useState([]);
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    const form = new FormData();
    form.append('model', model);
    form.append('price_per_day', price);
    form.append('location', location);
    form.append('available_from', from);
    form.append('available_to', to);
    for (let f of files) form.append('images', f);
    try {
      await API.post('/api/cars', form, { headers: { 'Content-Type': 'multipart/form-data' }});
      alert('Uploaded');
      nav('/my-listings');
    } catch(err){
      console.error(err);
      alert(err.response?.data?.error || 'Error uploading');
    }
  }

  return (
    <form onSubmit={submit} style={{maxWidth:720, margin:'0 auto', display:'grid', gap:8}}>
      <h2>Upload Car Listing</h2>
      <input value={model} onChange={e=>setModel(e.target.value)} required placeholder="Model (e.g. Toyota Corolla)" />
      <input type="number" value={price} onChange={e=>setPrice(e.target.value)} required placeholder="Price per day" />
      <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location" />
      <label>Availability from</label>
      <input type="date" value={from} onChange={e=>setFrom(e.target.value)} />
      <label>Availability to</label>
      <input type="date" value={to} onChange={e=>setTo(e.target.value)} />
      <input multiple type="file" accept="image/*" onChange={e=>setFiles(e.target.files)} />
      <button type="submit">Upload</button>
    </form>
  );
}
