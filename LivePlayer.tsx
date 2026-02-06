
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, Music } from 'lucide-react';
import { STREAM_URL } from './constants';

const LivePlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [nowPlaying, setNowPlaying] = useState('Chargement...');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const songElement = document.getElementById('cc_streaminfo_song');
      if (songElement && songElement.innerText !== 'Loading ...') {
        setNowPlaying(songElement.innerText);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.src = "";
      } else {
        audioRef.current.src = STREAM_URL;
        audioRef.current.play().catch(err => console.error("Playback failed", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const monuments = [
    <svg viewBox="0 0 100 140" className="w-full h-full"><path fill="currentColor" d="M50 5 L47 15 L53 15 Z M47 15 L44 45 L56 45 L53 15 Z M44 45 L38 95 L62 95 L56 45 Z M38 95 L20 140 L35 140 L50 105 L65 140 L80 140 L62 95 Z" /></svg>,
    <svg viewBox="0 0 100 100" className="w-full h-full"><path fill="currentColor" d="M10 10 H90 V90 H70 V40 Q50 30 30 40 V90 H10 Z" /></svg>,
    <svg viewBox="0 0 100 100" className="w-full h-full"><path fill="currentColor" d="M50 10 L90 90 H10 Z" /></svg>,
    <svg viewBox="0 0 100 100" className="w-full h-full"><path fill="currentColor" d="M45 10 L50 0 L55 10 V90 H45 Z" /></svg>,
    <svg viewBox="0 0 100 100" className="w-full h-full"><path fill="currentColor" d="M20 90 V20 H40 V90 M60 90 V20 H80 V90 M40 50 H60" /></svg>
  ];

  return (
    <div className="sticky top-20 z-50 bg-zinc-950/98 backdrop-blur-2xl border-b border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center gap-6 justify-between">
        
        <div className="flex items-center gap-4 w-full md:w-1/3 overflow-hidden">
          <div className="relative shrink-0">
            <div className={`absolute -inset-1 bg-cyan-400 rounded-lg blur opacity-40 ${isPlaying ? 'animate-pulse' : ''}`}></div>
            <div className="relative bg-black p-3 rounded-lg border border-cyan-500/20">
              <Radio className={`w-6 h-6 text-cyan-400 ${isPlaying ? 'animate-bounce' : ''}`} />
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-2 mb-0.5">
               <span className="flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
               </span>
               <span className="text-[10px] font-accent font-bold text-red-500 tracking-widest uppercase">EN DIRECT</span>
            </div>
            <div className="flex items-center gap-2 overflow-hidden">
              <Music className="w-3 h-3 text-cyan-400 shrink-0" />
              <div className="whitespace-nowrap overflow-hidden">
                <p className={`font-accent text-sm font-bold text-white tracking-tight`}>
                  {nowPlaying}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="hidden lg:flex gap-5 items-end h-14">
            {monuments.map((svg, i) => (
              <div 
                key={`left-${i}`} 
                className={`w-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] transition-transform duration-300 origin-bottom`} 
                style={{ 
                  transform: isPlaying ? `scaleY(${0.6 + Math.random() * 0.7})` : 'scaleY(0.5)',
                  opacity: isPlaying ? 1 : 0.3
                }}
              >
                {svg}
              </div>
            ))}
          </div>

          <button 
            onClick={togglePlay}
            className="group relative flex flex-col items-center justify-center p-2 transition-all hover:scale-110 active:scale-95"
            title={isPlaying ? "Pause" : "Play"}
          >
            <div className="relative w-16 h-20">
              <svg viewBox="0 0 100 140" className={`w-full h-full transition-all duration-700 ${isPlaying ? 'text-cyan-400 scale-105' : 'text-zinc-600'} drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]`}>
                <path fill="currentColor" d="M50 5 L47 15 L53 15 Z" />
                <path fill="currentColor" d="M47 15 L44 45 L56 45 L53 15 Z" />
                <path fill="currentColor" d="M44 45 L38 95 L62 95 L56 45 Z" />
                <path fill="currentColor" d="M38 95 L20 140 L35 140 L50 105 L65 140 L80 140 L62 95 Z" />
                <rect fill="currentColor" x="42" y="42" width="16" height="3" />
                <rect fill="currentColor" x="35" y="92" width="30" height="4" />
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center pt-8">
                <div className="bg-black/60 backdrop-blur-md rounded-full p-2.5 border border-cyan-500/30 group-hover:border-cyan-400 transition-all">
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white fill-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white fill-white translate-x-0.5" />
                  )}
                </div>
              </div>
            </div>
          </button>

          <div className="hidden lg:flex gap-5 items-end h-14">
            {[...monuments].reverse().map((svg, i) => (
              <div 
                key={`right-${i}`} 
                className={`w-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] transition-transform duration-300 origin-bottom`} 
                style={{ 
                  transform: isPlaying ? `scaleY(${0.6 + Math.random() * 0.7})` : 'scaleY(0.5)',
                  opacity: isPlaying ? 1 : 0.3
                }}
              >
                {svg}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center justify-end gap-4 w-1/3">
          <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full border border-white/5 shadow-inner">
            <button onClick={toggleMute} className="text-zinc-400 hover:text-white transition-colors">
              {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>

      </div>
      <audio ref={audioRef} preload="none" />
    </div>
  );
};

export default LivePlayer;
