# Skribbl.io Clone - Real-Time Multiplayer Drawing Game

A full-stack, real-time multiplayer drawing and guessing game inspired by Skribbl.io. The project features multiplayer rooms, real-time canvas synchronization, turn-based gameplay, time-based scoring, and a custom game engine.

---

## Live Deployment

**Frontend:**  
https://skribbl-frontend-dntc29k9u-sharikdurrani682-4803.vercel.app

**Backend:**  
https://skribbl-backend-hcas.onrender.com

---

## Application Screenshots
Lobby :-<img width="846" height="568" alt="image" src="https://github.com/user-attachments/assets/cce375ef-7b92-4e77-b8a5-8f4ad165c9a8" />
game screen:-<img width="800" height="1376" alt="skribbl-frontend-dntc29k9u-sharikdurrani682-4803 vercel app_room_WuNdmn_name=SketchNinja" src="https://github.com/user-attachments/assets/78f6e8d5-81a5-404d-9866-1c6015d438ef" />



---

## Architecture Overview

The application uses a decoupled full-stack architecture for real-time multiplayer gameplay.

### 1. Frontend — Next.js, React and HTML5 Canvas

Responsible for:
- Room creation and management
- Lobby and game interface
- Word selection and drawing phases
- Real-time drawing interface
- Chat and player score display

### 2. Backend — Node.js and Express.js

Responsible for:
- Room and session management
- Game turn handling
- Timer management
- Score calculation
- Game state synchronization

### 3. Real-Time Communication — Socket.IO

Socket.IO enables bidirectional communication between players and the backend.

Key events include drawing data, canvas clearing, undo actions, room updates, score updates, and game state transitions.

---

## Core Features

### Multiplayer Rooms
- Create and join game rooms
- Configure game settings
- Play with multiple participants

### Turn-Based Gameplay
- Player turn rotation
- Word selection for the drawer
- Timed drawing rounds
- Automatic game phase transitions

### Real-Time Drawing
- Synchronized canvas drawing
- Multiple brush colors
- Canvas clearing
- Undo functionality

### Scoring and Leaderboard
- Points based on guessing speed
- Player ranking by total score
- Winner announcement at the end of the game

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, Tailwind CSS |
| Canvas | HTML5 Canvas API |
| Backend | Node.js, Express.js |
| Real-Time Communication | Socket.IO |
| Deployment | Vercel, Render |

---

## Frontend Repository

https://github.com/Mohdsharik682/skribbl-frontend

## Backend Repository

https://github.com/Mohdsharik682/skribbl-backend

---

## Local Setup

### 1. Start the Backend

```bash
git clone https://github.com/Mohdsharik682/skribbl-backend.git
cd skribbl-backend
npm install
node src/main.js
```

### 2. Start the Frontend

Open a second terminal:

```bash
git clone https://github.com/Mohdsharik682/skribbl-frontend.git
cd skribbl-frontend
npm install
npm run dev
```

Frontend local URL:

```text
http://localhost:3000
```

For local development, configure the frontend's `NEXT_PUBLIC_BACKEND_URL` environment variable to use the local backend URL:

```text
http://localhost:4000
```

---

## Author

Developed as a full-stack multiplayer drawing and guessing game project.

