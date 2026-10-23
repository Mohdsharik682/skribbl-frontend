
import { io } from 'socket.io-client';

// Backend URL from environment or production
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  'https://skribbl-backend-hcas.onrender.com';

export const socket = io(BACKEND_URL, {
  autoConnect: false,
});



