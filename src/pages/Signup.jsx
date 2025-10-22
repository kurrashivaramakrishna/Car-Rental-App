import React, { useState } from 'react';
import API from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const nav = useNavigate();

  async function handle(e){
    e.preventDefault();
    try {
      const { data } = await API.post('/api/auth/signup', { name, email, password });
      localStorage.setItem('token', data.token);
      nav('/');
    } catch(err){
      alert(err.response?.data?.error || 'Error');
    }
  }

  return (
    <form onSubmit={handle} style={{maxWidth:480, margin:'0 auto', display:'grid', gap:8}}>
      <h2>Sign up</h2>
      <input required placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input required placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input required placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Create account</button>
    </form>
  );
}
