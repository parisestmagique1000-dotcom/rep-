
import React, { useState, useEffect } from 'react';
import Logo from "./Logo";
import LivePlayer from './components/LivePlayer';
import ClubCard from './components/ClubCard';
import SoundCloudModal from './components/SoundCloudModal';
import PostCard from './components/PostCard';
import Schedule from './components/Schedule';
import { CLUBS, INITIAL_POSTS, RESIDENT_DJS } from './constants';
import { Club, Page, Post, Comment, UserProfile, UserRole } from './types';
import { Radio, Map, Share2, Users, Plus, Camera, X, MessageSquare, Mail, Copy, CheckCircle2, Key, Send, Bell, User, Instagram as InstaIcon, ShieldCheck, Share, Headphones, Music } from 'lucide-react';

interface Notification {
  id: string;
  text: string;
  timestamp: Date;
}

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [newPost, setNewPost] = useState({ caption: '', mediaUrl: '', type: 'photo' as 'photo' | 'video' });
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Registration form states
  const [regForm, setRegForm] = useState({ firstName: '', nickname: '', email: '' });
  const [adminForm, setAdminForm] = useState({ firstName: '', nickname: '', email: '', instagram: '' });

  useEffect(() => {
    const savedUser = localStorage.getItem('radio_user_profile');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const ADMIN_EMAIL = "radio-electro-paris1@hotmail.fr";

  const addNotification = (text: string) => {
    const id = Math.random().toString(36).substring(7);
    setNotifications(prev => [{ id, text, timestamp: new Date() }, ...prev].slice(0, 5));
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Radio Electro Paris',
      text: 'Rejoins la communauté Radio Electro Paris ! Le son des DJ\'s de la capitale en direct.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      setShareCopied(true);
      addNotification("Lien d'invitation copié dans le presse-papier !");
      setTimeout(() => setShareCopied(false), 3000);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = { ...regForm, role: 'member' };
    setCurrentUser(newUser);
    localStorage.setItem('radio_user_profile', JSON.stringify(newUser));
    setShowMembershipModal(false);
    setActivePage('home');
    alert(`Bienvenue ${newUser.nickname} ! Vous êtes maintenant membre.`);
  };

  const handleAdminSetup = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = { ...adminForm, role: 'admin' };
    setCurrentUser(newUser);
    localStorage.setItem('radio_user_profile', JSON.stringify(newUser));
    setActivePage('home');
    alert(`Félicitations ${newUser.nickname}, vous êtes maintenant administrateur.`);
  };

  const handleLike = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post && currentUser && (post.author === currentUser.nickname)) {
      addNotification(`Quelqu'un a aimé votre post !`);
    }
  };

  const handleComment = (postId: string, text: string) => {
    if (!currentUser) {
      alert("Veuillez vous inscrire pour commenter.");
      setShowMembershipModal(true);
      return;
    }
    const updatedPosts = posts.map(p => {
      if (p.id === postId) {
        if (p.author === currentUser.nickname) {
          addNotification(`Nouveau commentaire sur votre post: "${text.substring(0, 20)}..."`);
        }
        const newComment: Comment = {
          id: Math.random().toString(),
          author: currentUser.nickname,
          text,
          timestamp: 'Maintenant'
        };
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    });
    setPosts(updatedPosts);
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || currentUser.role !== 'admin') {
      alert("Seuls les administrateurs peuvent publier des vidéos.");
      return;
    }
    if (!newPost.mediaUrl || !newPost.caption) return;

    const post: Post = {
      id: Math.random().toString(),
      author: currentUser.nickname,
      type: newPost.type,
      mediaUrl: newPost.mediaUrl,
      caption: newPost.caption,
      likes: 0,
      comments: [],
      timestamp: 'À l\'instant',
      isMemberPost: true,
      isAdminPost: true
    };

    setPosts([post, ...posts]);
    setShowPostModal(false);
    setNewPost({ caption: '', mediaUrl: '', type: 'photo' });
  };

  return (
    <div className="min-h-screen selection:bg-cyan-500/30">
      {/* Notifications Portal */}
      <div className="fixed top-24 right-6 z-[100] space-y-3 w-80 pointer-events-none">
        {notifications.map(n => (
          <div key={n.id} className="pointer-events-auto bg-zinc-950/95 border border-cyan-500/30 backdrop-blur-2xl p-4 rounded-2xl shadow-2xl animate-in slide-in-from-right duration-300 flex items-start gap-3">
            <div className="bg-cyan-500/20 p-2 rounded-full">
              <Bell className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-1">Notification</p>
              <p className="text-xs text-zinc-400 leading-relaxed">{n.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <nav className="sticky top-0 z-[60] bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo onClick={() => setActivePage('home')} className="h-12 cursor-pointer" />
          
          <div className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => setActivePage('home')}
              className={`font-accent text-xs font-bold tracking-widest uppercase transition-all ${activePage === 'home' ? 'text-cyan-400' : 'text-zinc-400 hover:text-white'}`}
            >
              ACCUEIL
            </button>
            <button 
              onClick={() => setActivePage('residents')}
              className={`font-accent text-xs font-bold tracking-widest uppercase transition-all ${activePage === 'residents' ? 'text-cyan-400' : 'text-zinc-400 hover:text-white'}`}
            >
              DJ'S RÉSIDENT
            </button>
            <button 
              onClick={() => setActivePage('clubs')}
              className={`font-accent text-xs font-bold tracking-widest uppercase transition-all ${activePage === 'clubs' ? 'text-cyan-400' : 'text-zinc-400 hover:text-white'}`}
            >
              LES CLUBS
            </button>
            <button 
              onClick={() => setActivePage('community')}
              className={`font-accent text-xs font-bold tracking-widest uppercase transition-all ${activePage === 'community' ? 'text-cyan-400' : 'text-zinc-400 hover:text-white'}`}
            >
              VIDÉO DJ
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleShare}
              className="p-2.5 rounded-full bg-zinc-900 border border-white/5 text-zinc-400 hover:text-cyan-400 transition-all"
              title="Inviter des amis"
            >
              <Share2 className="w-5 h-5" />
            </button>
            {currentUser ? (
              <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900 rounded-full border border-white/5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${currentUser.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-cyan-500 text-black'}`}>
                  {currentUser.nickname.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">{currentUser.nickname}</span>
                {currentUser.role === 'admin' && <ShieldCheck className="w-4 h-4 text-purple-400" />}
              </div>
            ) : (
              <button 
                onClick={() => setShowMembershipModal(true)}
                className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-[10px] uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-lg"
              >
                DEVENIR MEMBRE
              </button>
            )}
          </div>
        </div>
      </nav>

      <LivePlayer />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {activePage === 'home' && (
          <section className="space-y-16">
            <div className="relative rounded-[48px] overflow-hidden bg-zinc-950 border border-white/5 p-10 md:p-20 shadow-2xl">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1500313830540-7b6650a74fd0?auto=format&fit=crop&q=80&w=2000" 
                  className="w-full h-full object-cover opacity-60 grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000"
                  alt="Paris Night Scene - Seine"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent"></div>
              </div>

              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-accent font-bold tracking-[0.2em] mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  RADIO ELECTRO PARIS
                </div>
                <h1 className="text-5xl md:text-7xl font-accent font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
                  LES MIX DES DJ'S DE LA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">CAPITALE</span>
                </h1>
                <p className="text-lg text-zinc-300 mb-10 leading-relaxed font-light max-w-lg">
                  L'expérience ultime de la scène électronique parisienne : les clubs, les bars & soirées de Paris.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setActivePage('clubs')}
                    className="flex items-center gap-3 bg-cyan-500 text-black px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-cyan-400 transition-all shadow-[0_0_40px_rgba(34,211,238,0.4)]"
                  >
                    <Map className="w-5 h-5" /> ÉCOUTER LES CLUBS
                  </button>
                  <button 
                    onClick={() => setActivePage('community')}
                    className="flex items-center gap-3 bg-zinc-800 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-zinc-700 transition-all"
                  >
                    <Camera className="w-5 h-5" /> VIDÉO DJ
                  </button>
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-3 bg-zinc-900 border border-white/10 text-white px-6 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-zinc-800 transition-all"
                  >
                    <Share2 className="w-5 h-5 text-cyan-400" /> INVITER
                  </button>
                </div>
              </div>
            </div>

            <Schedule />

            {/* Reordered: Vidéo DJ before Clubs */}
            <div>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="font-accent text-3xl font-bold text-white mb-2 uppercase tracking-tighter">VIDÉO DJ</h2>
                  <p className="text-zinc-500 font-bold text-xs tracking-widest uppercase">L'œil de la communauté</p>
                </div>
                <button 
                  onClick={() => setActivePage('community')}
                  className="text-cyan-400 font-bold text-[10px] tracking-widest uppercase hover:underline"
                >
                  Voir tout
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                {posts.slice(0, 2).map(post => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onLike={handleLike} 
                    onComment={handleComment} 
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="font-accent text-3xl font-bold text-white mb-2 uppercase tracking-tighter">Écouter les Clubs</h2>
                  <p className="text-zinc-500 font-bold text-xs tracking-widest uppercase">Paris Underground Essentials</p>
                </div>
                <button 
                  onClick={() => setActivePage('clubs')}
                  className="text-cyan-400 font-bold text-[10px] tracking-widest uppercase hover:underline"
                >
                  Découvrir
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {CLUBS.slice(0, 4).map(club => (
                  <ClubCard key={club.id} club={club} onClick={setSelectedClub} />
                ))}
              </div>
            </div>
          </section>
        )}

        {activePage === 'residents' && (
          <section>
            <div className="text-center mb-16">
              <h2 className="font-accent text-5xl font-black text-white mb-4 uppercase tracking-tighter">DJ'S RÉSIDENT</h2>
              <p className="text-zinc-500 max-w-xl mx-auto uppercase text-[10px] font-bold tracking-[0.2em] leading-relaxed">Les visages et les sons qui définissent l'identité de Radio Electro Paris.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {RESIDENT_DJS.map(dj => (
                <div key={dj.id} className="group relative bg-zinc-950 rounded-[32px] overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all duration-500">
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img src={dj.imageUrl} alt={dj.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-1">{dj.specialty}</p>
                      <h3 className="text-2xl font-accent font-black text-white uppercase tracking-tighter">{dj.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-zinc-400 text-xs leading-relaxed mb-6 font-light">{dj.bio}</p>
                    <div className="flex items-center gap-4">
                      {dj.soundcloudUrl && (
                        <button 
                          onClick={() => window.open(dj.soundcloudUrl, '_blank')}
                          className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 border border-white/5 text-white py-3 rounded-xl hover:bg-white hover:text-black transition-all text-[10px] font-black uppercase tracking-widest"
                        >
                          <Headphones className="w-4 h-4" /> ÉCOUTER
                        </button>
                      )}
                      <button className="p-3 bg-zinc-900 border border-white/5 text-zinc-400 hover:text-cyan-400 rounded-xl transition-all">
                        <InstaIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activePage === 'clubs' && (
          <section>
            <div className="text-center mb-16">
              <h2 className="font-accent text-5xl font-black text-white mb-4 uppercase tracking-tighter">Le Répertoire Clubbing</h2>
              <p className="text-zinc-500 max-w-xl mx-auto uppercase text-[10px] font-bold tracking-[0.2em] leading-relaxed">Sets SoundCloud exclusifs et liens Instagram / Facebook directs des meilleurs spots parisiens.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {CLUBS.map(club => (
                <ClubCard key={club.id} club={club} onClick={setSelectedClub} />
              ))}
            </div>
          </section>
        )}

        {activePage === 'community' && (
          <section className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-accent text-5xl font-black text-white mb-4 uppercase tracking-tighter">VIDÉO DJ</h2>
              <p className="text-zinc-500 font-bold text-[10px] tracking-widest uppercase leading-relaxed">La galerie exclusive alimentée par nos administrateurs.</p>
              <button 
                onClick={handleShare}
                className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full text-xs font-black uppercase tracking-widest hover:bg-cyan-500/20 transition-all"
              >
                <Share className="w-4 h-4" /> INVITER DES AMIS
              </button>
            </div>

            {currentUser?.role === 'admin' ? (
              <div className="bg-zinc-950 border border-cyan-500/30 p-8 rounded-[32px] mb-12 shadow-[0_0_40px_rgba(34,211,238,0.05)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-black text-lg shadow-lg">
                    {currentUser.nickname.charAt(0).toUpperCase()}
                  </div>
                  <button 
                    onClick={() => setShowPostModal(true)}
                    className="flex-1 text-left bg-zinc-900 hover:bg-zinc-800 px-6 py-4 rounded-2xl text-zinc-500 text-sm transition-all border border-white/5"
                  >
                    Publier une nouvelle vidéo exclusive...
                  </button>
                </div>
                <div className="flex justify-around border-t border-white/5 pt-6">
                  <button onClick={() => {setNewPost({...newPost, type: 'photo'}); setShowPostModal(true)}} className="flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors text-xs font-black tracking-widest uppercase">
                    <Camera className="w-5 h-5" /> PHOTO
                  </button>
                  <button onClick={() => {setNewPost({...newPost, type: 'video'}); setShowPostModal(true)}} className="flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors text-xs font-black tracking-widest uppercase">
                    <Plus className="w-5 h-5" /> VIDÉO
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-950/50 border border-white/10 p-12 rounded-[48px] mb-12 text-center shadow-2xl">
                <ShieldCheck className="w-12 h-12 text-zinc-700 mx-auto mb-6" />
                <h3 className="text-white font-accent font-bold mb-3 uppercase tracking-wider">Espace Galerie Exclusive</h3>
                <p className="text-zinc-500 text-sm mb-10 leading-relaxed font-light">
                  Seuls les administrateurs officiels de Radio Electro Paris peuvent enrichir la galerie Vidéo DJ.<br/>
                  Les membres peuvent interagir et laisser des commentaires.
                </p>
                {!currentUser && (
                  <button 
                    onClick={() => setShowMembershipModal(true)}
                    className="bg-white text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-xl"
                  >
                    DEVENIR MEMBRE POUR COMMENTER
                  </button>
                )}
              </div>
            )}

            <div className="space-y-12">
              {posts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onLike={handleLike} 
                  onComment={handleComment} 
                />
              ))}
            </div>
          </section>
        )}

        {/* Admin Setup Page (Hidden Route Simulation) */}
        {activePage === 'admin-setup' && (
          <section className="max-w-md mx-auto py-12">
            <div className="bg-zinc-950 border border-purple-500/30 p-10 rounded-[40px] shadow-2xl">
              <div className="text-center mb-8">
                <ShieldCheck className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h2 className="font-accent text-3xl font-black text-white uppercase tracking-tighter">ADMINISTRATION</h2>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-2">Configuration de votre profil officiel</p>
              </div>
              <form onSubmit={handleAdminSetup} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Prénom</label>
                  <input 
                    type="text" required
                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    value={adminForm.firstName}
                    onChange={e => setAdminForm({...adminForm, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Surnom (Public)</label>
                  <input 
                    type="text" required
                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    value={adminForm.nickname}
                    onChange={e => setAdminForm({...adminForm, nickname: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Lien Instagram</label>
                  <div className="relative">
                    <InstaIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                    <input 
                      type="url" required
                      placeholder="https://instagram.com/..."
                      className="w-full bg-zinc-900 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                      value={adminForm.instagram}
                      onChange={e => setAdminForm({...adminForm, instagram: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Email Professionnel</label>
                  <input 
                    type="email" required
                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    value={adminForm.email}
                    onChange={e => setAdminForm({...adminForm, email: e.target.value})}
                  />
                </div>
                <button type="submit" className="w-full bg-purple-600 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-purple-500 transition-all mt-6 shadow-xl">
                  ACTIVER MON ACCÈS ADMIN
                </button>
              </form>
            </div>
          </section>
        )}
      </main>

      {/* Member Registration Modal */}
      {showMembershipModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl">
          <div className="bg-zinc-950 w-full max-w-md rounded-[48px] border border-white/10 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-12 text-center relative">
              <button onClick={() => setShowMembershipModal(false)} className="absolute top-8 right-8 text-zinc-600 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
              <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-cyan-500/20">
                <User className="w-10 h-10 text-cyan-400" />
              </div>
              <h3 className="font-accent text-3xl font-black text-white mb-4 uppercase tracking-tighter">REJOINDRE LE CLUB</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-10">
                Inscrivez-vous pour rejoindre la communauté, liker les publications et laisser des commentaires sur le Booth.
              </p>
              
              <form onSubmit={handleRegister} className="space-y-4 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Prénom</label>
                    <input 
                      type="text" required
                      className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-cyan-500 outline-none"
                      value={regForm.firstName}
                      onChange={e => setRegForm({...regForm, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Surnom</label>
                    <input 
                      type="text" required
                      className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-cyan-500 outline-none"
                      value={regForm.nickname}
                      onChange={e => setRegForm({...regForm, nickname: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Email</label>
                  <input 
                    type="email" required
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-cyan-500 outline-none"
                    value={regForm.email}
                    onChange={e => setRegForm({...regForm, email: e.target.value})}
                  />
                </div>
                <button type="submit" className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-cyan-400 transition-all mt-6">
                  M'INSCRIRE MAINTENANT
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/5">
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-4">Postuler pour être Administrateur ?</p>
                <a 
                  href={`mailto:${ADMIN_EMAIL}?subject=Demande%20d'accès%20Administrateur%20Radio%20Electro%20Paris&body=Bonjour,%20je%20souhaite%20devenir%20administrateur%20pour%20pouvoir%20partager%20des%20vidéos%20sur%20le%20site.`}
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold text-[10px] uppercase tracking-widest"
                >
                  <Mail className="w-3 h-3" /> ENVOYER MA DEMANDE PAR EMAIL
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Modal (Admins only) */}
      {showPostModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <div className="bg-zinc-950 w-full max-w-lg rounded-3xl border border-white/10 overflow-hidden shadow-2xl animate-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="font-accent text-xl font-bold text-white uppercase tracking-wider">PUBLICATION OFFICIELLE</h3>
              <button onClick={() => setShowPostModal(false)} className="text-zinc-400 hover:text-white"><X /></button>
            </div>
            <form onSubmit={handleAddPost} className="p-8 space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Lien Média (Source Directe)</label>
                <input 
                  type="url" required
                  placeholder="https://..." 
                  className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-5 py-4 text-white focus:ring-1 focus:ring-purple-500 outline-none"
                  value={newPost.mediaUrl}
                  onChange={(e) => setNewPost({...newPost, mediaUrl: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Légende</label>
                <textarea 
                  required
                  placeholder="Décrivez ce moment..." 
                  className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-5 py-4 text-white focus:ring-1 focus:ring-purple-500 outline-none min-h-[120px]"
                  value={newPost.caption}
                  onChange={(e) => setNewPost({...newPost, caption: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-4">
                <button 
                  type="button"
                  onClick={() => setNewPost({...newPost, type: 'photo'})}
                  className={`flex-1 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest border transition-all ${newPost.type === 'photo' ? 'bg-purple-600 border-purple-600 text-white' : 'bg-transparent border-white/10 text-zinc-500'}`}
                >
                  PHOTO
                </button>
                <button 
                  type="button"
                  onClick={() => setNewPost({...newPost, type: 'video'})}
                  className={`flex-1 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest border transition-all ${newPost.type === 'video' ? 'bg-purple-600 border-purple-600 text-white' : 'bg-transparent border-white/10 text-zinc-500'}`}
                >
                  VIDÉO
                </button>
              </div>
              <button type="submit" className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-cyan-400 transition-all mt-6 shadow-2xl">
                PUBLIER SUR LE SITE
              </button>
            </form>
          </div>
        </div>
      )}

      <footer className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5 text-center text-zinc-600">
        <Logo className="h-8 justify-center mb-8 grayscale opacity-50" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3">RADIO ELECTRO PARIS</p>
        <p className="text-[10px] max-w-sm mx-auto leading-relaxed">© 2024 TOUS DROITS RÉSERVÉS. L'EXPÉRIENCE UNDERGROUND DE LA CAPITALE DISPONIBLE PARTOUT DANS LE MONDE.</p>
        
        {/* Hidden Admin Entry Point for Demonstration */}
        <div className="mt-8 flex justify-center opacity-0 hover:opacity-100 transition-opacity">
          <button 
            onClick={() => setActivePage('admin-setup')}
            className="text-[8px] font-bold uppercase tracking-widest text-zinc-800"
          >
            ADMIN ACCESS
          </button>
        </div>
      </footer>

      <SoundCloudModal 
        club={selectedClub} 
        onClose={() => setSelectedClub(null)} 
      />

      {/* Navigation Mobile */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-4 flex items-center gap-8 shadow-2xl">
        <button onClick={() => setActivePage('home')} className={`flex flex-col items-center gap-1.5 transition-colors ${activePage === 'home' ? 'text-cyan-400' : 'text-zinc-600'}`}>
          <Radio className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-wider">Home</span>
        </button>
        <button onClick={() => setActivePage('residents')} className={`flex flex-col items-center gap-1.5 transition-colors ${activePage === 'residents' ? 'text-cyan-400' : 'text-zinc-600'}`}>
          <Headphones className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-wider">DJs</span>
        </button>
        <button onClick={() => setActivePage('clubs')} className={`flex flex-col items-center gap-1.5 transition-colors ${activePage === 'clubs' ? 'text-cyan-400' : 'text-zinc-600'}`}>
          <Map className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-wider">Clubs</span>
        </button>
        <button onClick={() => setActivePage('community')} className={`flex flex-col items-center gap-1.5 transition-colors ${activePage === 'community' ? 'text-cyan-400' : 'text-zinc-600'}`}>
          <Camera className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-wider">Video</span>
        </button>
      </div>
    </div>
  );
};

export default App;
