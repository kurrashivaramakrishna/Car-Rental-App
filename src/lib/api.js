import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:3000' });

// attach token if exists
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;


// api.js
// import { supabase } from './supabaseClient';

// export async function signUpUser(email, password) {
//   return await supabase.auth.signUp({ email, password });
// }

// export async function getCars() {
//   return await supabase.from('cars').select('*');
// }
// export async function getProfile(userId) {
//   return await supabase.from('profiles').select('*').eq('id', userId).single();
// }
// export async function updateProfile(userId, profileData) {
//   return await supabase.from('profiles').upsert({ id: userId, ...profileData });
// }
// export async function uploadProfilePicture(userId, file) {
//   const fileExt = file.name.split('.').pop();
//   const fileName = `${userId}.${fileExt}`;
//   const filePath = `public/${fileName}`;
//   const { data, error } = await supabase.storage.from('profile-pictures').upload(filePath, file, {
//     upsert: true,
//   });
//   if (error) throw error;
//   return data;
// }
// export async function getProfilePictureUrl(userId) {
//   const { data, error } = await supabase.storage.from('profile-pictures').getPublicUrl(`public/${userId}.jpg`);
//   if (error) throw error;
//   return data.publicUrl;
// }
// export default {
//   signUpUser,
//   getCars,
//   getProfile,
//   updateProfile,
//   uploadProfilePicture,
//   getProfilePictureUrl,
// };
// // src/lib/api.js
// // import axios from 'axios';
// // const API = axios.create({ baseURL: 'http://localhost:3000' });
// // // attach token if exists
