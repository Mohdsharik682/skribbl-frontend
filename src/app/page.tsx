
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { socket } from '@/lib/socket';
import {  Settings, Play, Users, Gem,RefreshCw } from 'lucide-react';

export default function LobbyScreen() {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');
  const router = useRouter();

  const [rounds, setRounds] = useState(3);
  const [drawTime, setDrawTime] = useState(80);
  const [maxPlayers, setMaxPlayers] = useState(8);
  const [showSettings, setShowSettings] = useState(false);

  const randomNames = [
    'DoodleKoala',
    'SketchNinja',
    'ArtisticPotato',
    'DrawMaster',
    'PencilHero',
  ];

  const pickRandomName = () => {
    setName(randomNames[Math.floor(Math.random() * randomNames.length)]);
  };

  useEffect(() => {
    socket.disconnect();
  }, []);

  const handleCreateRoom = () => {
    if (!name.trim()) return alert('Bhai, apna naam toh daal do!');

    socket.connect();

    const settings = { rounds, drawTime, maxPlayers };

    socket.emit(
      'create_room',
      { hostName: name, settings },
      (response: any) => {
        if (response.success) {
          router.push(
            `/room/${response.roomId}?name=${encodeURIComponent(name)}`
          );
        } else {
          alert(response.message);
        }
      }
    );
  };

  const handleJoinRoom = () => {
    if (!name.trim()) return alert('Enter your name!');
    if (!roomId.trim()) return alert('Room ID required!');

    const cleanRoomId = roomId.trim().replace(/\s+/g, '').toLowerCase();
    console.log('Typed Room ID:', JSON.stringify(cleanRoomId));
    const cleanName = name.trim();

    router.push(
      `/room/${cleanRoomId}?name=${encodeURIComponent(cleanName)}`
    );
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#eff8ff] via-[#dbeafe] to-[#f0f9ff] p-4 font-sans text-[#172554]">

      {/* Background Decorative Orbs */}
      <div className="pointer-events-none absolute left-[-10%] top-[-5%] h-64 w-64 rounded-full bg-sky-400/30 blur-[80px] md:h-96 md:w-96 md:blur-[120px]" />

      <div className="pointer-events-none absolute bottom-[-5%] right-[-10%] h-64 w-64 rounded-full bg-blue-500/20 blur-[80px] md:h-96 md:w-96 md:blur-[120px]" />

      {/* Main Title */}
      <div className="z-10 mb-8 text-center md:mb-10">
        <div className="mb-2 flex items-center justify-center gap-3 md:mb-3 md:gap-4">
          {/* <Gamepad2 className="h-10 w-10 text-sky-600 md:h-12 md:w-12" /> */}
          <Gem className="h-10 w-10 text-violet-600 md:h-12 md:w-12" />

          <h1 className="text-4xl font-black tracking-[0.1em] text-[#172554] md:text-6xl md:tracking-[0.15em]">
            SKRIBBL
          </h1>
        </div>

        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600 md:text-xs md:tracking-[0.25em]">
          Multiplayer Drawing &amp; Guessing
        </p>
      </div>

      {/* Main Lobby Card */}
      <div className="z-10 w-full max-w-md space-y-4 rounded-2xl border border-sky-200 bg-white/90 p-4 shadow-xl shadow-blue-900/10 backdrop-blur-xl md:space-y-6 md:rounded-3xl md:p-8">

        {/* Player Name */}
        <div className="flex w-full gap-2 md:gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateRoom();
            }}
            placeholder="Enter your Name"
            className="min-w-0 flex-1 rounded-xl border border-sky-200 bg-sky-50 px-3 py-3 text-sm font-semibold text-[#172554] placeholder-slate-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-200 md:rounded-2xl md:px-5 md:py-4 md:text-lg"
          />

          <button
            onClick={pickRandomName}
            className="group flex shrink-0 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 px-3 py-3 text-sky-700 transition-colors hover:bg-sky-100 md:rounded-2xl md:p-4"
            title="Generate Random Name"
          >
            
            {<RefreshCw className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180 md:h-7 md:w-7" />}
          </button>
        </div>

        {/* Room Settings */}
        <div className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex w-full items-center justify-between rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 font-semibold text-slate-700 transition-all hover:bg-sky-100 md:rounded-2xl md:px-6 md:py-4"
          >
            <span className="flex items-center gap-2 text-sm md:gap-3 md:text-base">
              <Settings className="h-5 w-5 text-sky-600" />
              Room Setting
            </span>

            <span className="text-[10px] tracking-widest text-slate-500 md:text-xs">
              {showSettings ? 'CLOSE' : 'EXPAND'}
            </span>
          </button>

          {showSettings && (
            <div className="mt-3 space-y-4 rounded-xl border border-sky-200 bg-sky-50 p-4 md:space-y-6 md:rounded-2xl md:p-6">

              <div>
                <div className="mb-2 flex justify-between text-xs font-semibold text-slate-700 md:mb-3 md:text-sm">
                  <span>Total Rounds</span>
                  <span className="text-sky-700">{rounds}</span>
                </div>

                <input
                  type="range"
                  min="2"
                  max="10"
                  step="1"
                  value={rounds}
                  onChange={(e) => setRounds(parseInt(e.target.value))}
                  className="w-full cursor-pointer accent-sky-600"
                />
              </div>

              <div>
                <div className="mb-2 flex justify-between text-xs font-semibold text-slate-700 md:mb-3 md:text-sm">
                  <span>Draw Duration</span>
                  <span className="text-sky-700">{drawTime}s</span>
                </div>

                <input
                  type="range"
                  min="15"
                  max="240"
                  step="5"
                  value={drawTime}
                  onChange={(e) => setDrawTime(parseInt(e.target.value))}
                  className="w-full cursor-pointer accent-sky-600"
                />
              </div>

              <div>
                <div className="mb-2 flex justify-between text-xs font-semibold text-slate-700 md:mb-3 md:text-sm">
                  <span>Max Capacity</span>
                  <span className="text-sky-700">{maxPlayers} Players</span>
                </div>

                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
                  className="w-full cursor-pointer accent-sky-600"
                />
              </div>
            </div>
          )}
        </div>

        {/* Create Room */}
        <button
          onClick={handleCreateRoom}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 hover:from-sky-500 hover:to-blue-600 hover:shadow-blue-500/30 md:gap-3 md:rounded-2xl md:py-4 md:text-xl"
        >
          <Play className="h-4 w-4 md:h-6 md:w-6" fill="currentColor" />
          INITIATE LOBBY
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 py-1 md:gap-4">
          <div className="flex-1 border-t border-sky-200" />

          <span className="whitespace-nowrap text-[10px] font-semibold tracking-[0.15em] text-slate-500 md:text-xs md:tracking-[0.2em]">
            OR JOIN EXISTING
          </span>

          <div className="flex-1 border-t border-sky-200" />
        </div>

        {/* Join Room */}
        <div className="flex w-full gap-2 md:gap-3">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleJoinRoom();
            }}
            placeholder="ROOM ID"
            className="min-w-0 flex-1 rounded-xl border border-sky-200 bg-sky-50 px-3 py-3 text-sm font-bold tracking-wider text-[#172554] placeholder-slate-400 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-200 md:rounded-2xl md:px-5 md:py-4 md:text-lg md:tracking-widest"
          />

          <button
            onClick={handleJoinRoom}
            className="flex w-24 shrink-0 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1 hover:from-blue-600 hover:to-indigo-700 md:w-1/3 md:gap-2 md:rounded-2xl md:py-4 md:text-lg"
          >
            <Users className="h-4 w-4 md:h-[22px] md:w-[22px]" />
            JOIN
          </button>
        </div>
      </div>
    </div>
  );
}
