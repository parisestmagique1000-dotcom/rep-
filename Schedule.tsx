
import React, { useState, useEffect } from 'react';
import { Clock, Music, Disc } from 'lucide-react';

const Schedule: React.FC = () => {
  const [currentTimeInMinutes, setCurrentTimeInMinutes] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeInMinutes(now.getHours() * 60 + now.getMinutes());
    };
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const generate24hSchedule = () => {
    const schedule = [];
    const titles = [
      "Midnight Techno", "Deep Underground", "Afterhours Minimal", "Night Groove", "Moonlight Beats",
      "Sunrise Ambient", "Morning Minimal", "Early Bird House", "Breakfast Tech", "Morning Pulse",
      "Office Groove", "Midday Minimal", "Lunch Beat", "Afternoon Tech", "Daily Selection",
      "Workday House", "Sunset Warm-up", "Cocktail Groove", "Evening Selection", "Peak Time Intro",
      "Mainstage Session", "Techno Peak", "Clubbing Night", "Midnight Special"
    ];
    
    const details = [
      "Le son pur de la nuit", "Voyage au coeur du bpm", "Minimalisme hypnotique", "Deep house nocturne", "Vibrations lunaires",
      "Réveil en douceur", "Minimal house matinale", "Progressive morning", "Tech house énergisante", "Le plein de vitamines",
      "Deep house pour bosser", "Rythmes légers et précis", "Le beat du midi", "Tech house dynamique", "Sélection de la rédaction",
      "Fin de journée en musique", "Transition vers la nuit", "House élégante et festive", "Best of Electro Paris", "Montée en puissance",
      "Le son des plus grands clubs", "L'énergie maximale", "Ambiance dancefloor", "Les pépites de minuit"
    ];

    for (let i = 0; i < 24; i++) {
      const startH = i.toString().padStart(2, '0');
      const endH = ((i + 1) % 24).toString().padStart(2, '0');
      schedule.push({
        time: `${startH}h00 - ${endH}h00`,
        title: titles[i],
        type: i >= 18 || i < 4 ? 'set' : 'playlist',
        detail: details[i]
      });
    }
    return schedule;
  };

  const dailySchedule = generate24hSchedule();

  const parseTime = (timeStr: string) => {
    const [h, m] = timeStr.split('h').map(Number);
    return h * 60 + m;
  };

  const isCurrentSlot = (timeRange: string) => {
    const [startStr, endStr] = timeRange.split(' - ');
    const start = parseTime(startStr);
    let end = parseTime(endStr);
    
    // Handle midnight wrap-around
    if (end === 0 && start !== 0) end = 24 * 60;
    
    return currentTimeInMinutes >= start && currentTimeInMinutes < end;
  };

  return (
    <div className="bg-zinc-900/40 rounded-[32px] border border-white/5 p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-cyan-400" />
          <h2 className="font-accent text-2xl font-bold text-white uppercase tracking-tight">Grille des Programmes</h2>
        </div>
        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
          24 Heures de Son Non-Stop
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {dailySchedule.map((item, index) => {
          const isActive = isCurrentSlot(item.time);
          return (
            <div 
              key={index} 
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-500 ${
                isActive 
                ? 'bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_20px_rgba(34,211,238,0.1)] scale-[1.03] z-10' 
                : item.type === 'playlist' 
                  ? 'bg-zinc-800/30 border-white/5' 
                  : 'bg-white/5 border-white/10'
              } hover:scale-[1.02]`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                isActive 
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)]' 
                : item.type === 'playlist' 
                  ? 'bg-zinc-700/50 text-zinc-400' 
                  : 'bg-zinc-800 text-cyan-400/60'
              }`}>
                {item.type === 'playlist' ? <Music className="w-5 h-5" /> : <Disc className={`w-5 h-5 ${isActive ? 'animate-spin-slow' : ''}`} />}
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-2 mb-1">
                  {isActive && (
                    <span className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      <span className="text-[9px] font-black text-red-500 uppercase tracking-widest animate-pulse">EN DIRECT</span>
                    </span>
                  )}
                  <span className={`block text-[10px] font-bold tracking-widest uppercase ${isActive ? 'text-white' : 'text-cyan-400/70'}`}>
                    {item.time}
                  </span>
                </div>
                <h4 className={`font-bold text-sm truncate ${isActive ? 'text-white' : 'text-zinc-200'}`}>{item.title}</h4>
                <p className={`text-[11px] truncate ${isActive ? 'text-cyan-400/80' : 'text-zinc-500'}`}>{item.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
