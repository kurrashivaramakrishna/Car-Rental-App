import React, { useState } from 'react';

export default function CarCard({ car }) {
  const [idx, setIdx] = useState(0);
  const imgs = car.images || [];

  return (
    <div style={{border:'1px solid #eee', borderRadius:10, overflow:'hidden', background:'#fff'}}>
      <div style={{height:160, position:'relative', background:'#f2f2f2'}}>
        {imgs.length ? <img src={imgs[idx]} alt={car.model} style={{width:'100%',height:'100%',objectFit:'cover'}} /> : (
          <div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center',color:'#777'}}>No image</div>
        )}
        {imgs.length > 1 && (
          <>
            <button onClick={()=>setIdx((idx-1+imgs.length)%imgs.length)} style={{position:'absolute',left:8,top:'50%',transform:'translateY(-50%)'}}>‹</button>
            <button onClick={()=>setIdx((idx+1)%imgs.length)} style={{position:'absolute',right:8,top:'50%',transform:'translateY(-50%)'}}>›</button>
          </>
        )}
      </div>

      <div style={{padding:12}}>
        <div style={{fontWeight:700}}>{car.model}</div>
        <div style={{color:'#555'}}>{car.location}</div>
        <div style={{marginTop:8, fontWeight:700}}>£{car.price_per_day} / day</div>
        <div style={{marginTop:8, fontSize:12, color:'#666'}}>Available: {car.available_from || 'N/A'} → {car.available_to || 'N/A'}</div>
        <div style={{marginTop:10, display:'flex', gap:8}}>
          <button style={{flex:1}}>View</button>
          <button style={{flex:1, background:'#06b6d4', color:'#fff'}}>Book</button>
        </div>
      </div>
    </div>
  );
}
