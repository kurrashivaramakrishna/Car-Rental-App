// src/components/Profile.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendBase = import.meta.env.VITE_BACKEND_URL || '';

  useEffect(() => {
    const sessionUser = supabase.auth.user();
    setUser(sessionUser);
    if (!sessionUser) {
      setLoading(false);
      return;
    }

    // fetch profile row from Supabase
    (async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_key')
          .eq('id', sessionUser.id)
          .single();

        if (error) {
          console.error('profiles fetch error', error);
          setProfile(null);
          setLoading(false);
          return;
        }
        setProfile(data);

        if (data?.avatar_key) {
          // Request a signed GET URL from backend
          const resp = await fetch(`${backendBase}/api/s3/url?key=${encodeURIComponent(data.avatar_key)}`, {
            headers: {
              // Optional: pass supabase access token if backend validates
              Authorization: `Bearer ${await supabase.auth.session()?.access_token}`,
            },
          });

          if (resp.ok) {
            const json = await resp.json();
            setAvatarUrl(json.url);
          } else {
            console.error('failed to get signed url', await resp.text());
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading profile…</div>;
  if (!user) return <div>Please sign in to view your profile.</div>;

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <div style={{ width: 100, height: 100, borderRadius: 12, overflow: 'hidden', background: '#0b1220' }}>
        {avatarUrl ? (
          <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9aa7b2' }}>
            No image
          </div>
        )}
      </div>

      <div>
        <div style={{ fontWeight: 700 }}>{profile?.full_name || user.email}</div>
        <div style={{ color: '#9aa7b2', fontSize: 13 }}>{user.email}</div>
      </div>
    </div>
  );
}
