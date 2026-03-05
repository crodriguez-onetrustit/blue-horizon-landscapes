'use client';
import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',padding:'20px',borderTop:'2px solid #333',zIndex:9999}}>
      <p style={{marginBottom:'10px'}}>We use cookies. <button onClick={()=>setShow(false)}>Accept</button></p>
    </div>
  );
}
