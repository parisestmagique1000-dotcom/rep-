
import React from 'react';
import { X } from 'lucide-react';
import { Club } from '../types';

interface SoundCloudModalProps {
  club: Club | null;
  onClose: () => void;
}

const SoundCloudModal: React.FC<SoundCloudModalProps> = ({ club, onClose }) => {
  if (!club) return null;

  // SoundCloud embed URL requires the clean track URL. 
  // We'll use the standard iframe embed structure.
  const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(club.soundcloudUrl)}&color=%2322d3ee&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div>
            <h2 className="font-accent text-2xl font-bold text-white">{club.name}</h2>
            <p className="text-cyan-400 text-sm font-medium tracking-wide">EXCLUSIVE MIX</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Player Body */}
        <div className="p-6">
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner">
            <iframe
              width="100%"
              height="100%"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={embedUrl}
            ></iframe>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-zinc-400 font-bold uppercase text-xs tracking-widest mb-2">ABOUT THE CLUB</h4>
              <p className="text-zinc-300 text-sm leading-relaxed">{club.description}</p>
            </div>
            <div className="flex flex-col justify-center">
              <div className="p-4 bg-zinc-800/50 rounded-xl border border-white/5">
                <p className="text-xs text-zinc-500 mb-1">CURRENTLY LISTENING TO</p>
                <p className="text-white font-medium truncate">{club.soundcloudUrl.split('/').pop()?.replace(/-/g, ' ')}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SoundCloudModal;
