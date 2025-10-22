import React, { useEffect, useState } from 'react';
import API from '../lib/api';
import CarCard from '../shared/carCard';

export default function Dashboard(){
  const [cars, setCars] = useState([]);
  useEffect(()=> {
    API.get('/api/cars').then(r=>setCars(r.data)).catch(console.error);
  }, []);
  return (
    <div>
      <h2>Available cars</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))', gap:20}}>
        {cars.map(c => <CarCard key={c.id} car={c} />)}
      </div>
    </div>
  );
}
