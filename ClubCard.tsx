
import React from 'react';
import { Club } from '../types';
import { MapPin, Music, Instagram, Facebook } from 'lucide-react';

interface ClubCardProps {
  club: Club;
  onClick: (club: Club) => void;
}

const ClubCard: React.FC<ClubCardProps> = ({ club, onClick }) => {
  const handleInstagramClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (club.instagramUrl) {
      window.open(club.instagramUrl, '_blank');
    }
  };

  const handleFacebookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (club.facebookUrl) {
      window.open(club.facebookUrl, '_blank');
    }
  };

  return (
    <div 
      onClick={() => onClick(club)}
      className="group relative bg-zinc-900/50 rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/50 transition-all cursor-pointer hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] flex flex-col h-full"
    >
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={club.logoUrl} 
          alt={club.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
        
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-cyan-500 p-4 rounded-full shadow-2xl">
            <Music className="w-8 h-8 text-black" />
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-3">
          {club.tags.map(tag => (
            <span key={tag} className="text-[10px] font-accent font-bold uppercase tracking-widest bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-accent text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {club.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            {club.instagramUrl && (
              <button 
                onClick={handleInstagramClick}
                className="p-1.5 text-zinc-400 hover:text-cyan-400 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </button>
            )}
            {club.facebookUrl && (
              <button 
                onClick={handleFacebookClick}
                className="p-1.5 text-zinc-400 hover:text-cyan-400 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-start gap-2 text-zinc-400 text-sm mt-auto">
          <MapPin className="w-4 h-4 shrink-0 text-cyan-500 mt-0.5" />
          <span className="line-clamp-1">{club.location}</span>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
