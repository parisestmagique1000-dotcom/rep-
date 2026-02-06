
import { Club, Post, ResidentDJ } from './types';

export const STREAM_URL = 'https://radioelec.radioca.st/stream';
export const STATUS_PAGE_URL = 'https://philae.shoutca.st/system/streaminfo.js';

export const RESIDENT_DJS: ResidentDJ[] = [
  {
    id: 'dj-1',
    name: 'Sissi Laz',
    specialty: 'House / Groovy',
    bio: 'Résidente emblématique de la scène parisienne, Sissi distille un mix solaire entre House classique et pépites modernes.',
    imageUrl: 'https://images.unsplash.com/photo-1594623125724-1067f5e40d7a?auto=format&fit=crop&q=80&w=400',
    soundcloudUrl: 'https://soundcloud.com/sissilaz'
  },
  {
    id: 'dj-2',
    name: 'Kirollus',
    specialty: 'Disco / Boogie',
    bio: 'Le maître du groove rétro. Ses passages au Badaboum sont devenus légendaires pour tous les amoureux du vinyle.',
    imageUrl: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&q=80&w=400',
    soundcloudUrl: 'https://soundcloud.com/kirollus'
  },
  {
    id: 'dj-3',
    name: 'Marc G.',
    specialty: 'Techno / Industrial',
    bio: 'Explorateur des sonorités sombres et percutantes, Marc G. représente l\'aile dure de l\'underground parisien.',
    imageUrl: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'dj-4',
    name: 'Léa D.',
    specialty: 'Minimal / Micro',
    bio: 'Finesse et précision. Léa construit des sets hypnotiques qui font vibrer les afters les plus sélects de la capitale.',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=400'
  }
];

// List of secret codes for membership
export const SECRET_CODES = [
  'PARIS-NIGHT-001',
  'ELECTRO-VIBE-2024',
  'LOUVRE-TECHNO',
  'ARC-DE-TRIONPHE-SET',
  'BASTILLE-DEEP',
  'PIGALLE-HOUSE',
  'MARAIS-MINIMAL',
  'EIFFEL-BEAT-75',
  'REXY-GUEST-22',
  'BADABOUM-VIP'
];

export const CLUBS: Club[] = [
  {
    id: 'rexy-paris',
    name: 'Le Rexy Paris',
    location: '9 Rue de la Jussienne, 75002 Paris',
    logoUrl: 'https://images.unsplash.com/photo-1574631335431-7787680182ce?auto=format&fit=crop&q=80&w=400',
    soundcloudUrl: 'https://soundcloud.com/sissilaz/girly-groove',
    instagramUrl: 'https://www.instagram.com/rexy_paris/',
    facebookUrl: 'https://www.facebook.com/rexyparisofficiel?locale=fr_FR',
    description: 'A legendary subterranean club in the heart of Paris, known for its intimate atmosphere and cutting-edge electronic sounds.',
    tags: ['Techno', 'House', 'Intimate']
  },
  {
    id: 'badaboum-paris',
    name: 'Badaboum Paris',
    location: '2 bis Rue des Taillandiers, 75011 Paris',
    logoUrl: 'https://images.unsplash.com/photo-1514525253361-bee8a48740d7?auto=format&fit=crop&q=80&w=400',
    soundcloudUrl: 'https://soundcloud.com/kirollus/6hr-live-set-disco-boogie-house-live-from-badaboum-paris-1',
    instagramUrl: 'https://www.instagram.com/badaboum_paris/',
    facebookUrl: 'https://www.facebook.com/lebadaboum/',
    description: 'An iconic venue combining a concert hall, a cocktail bar, and a club. Famous for its disco and house vibes.',
    tags: ['Disco', 'House', 'Cocktails']
  },
  {
    id: 'concrete-paris',
    name: 'Concrete (Dehors Brute)',
    location: 'Paris, France',
    logoUrl: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&q=80&w=400',
    soundcloudUrl: 'https://soundcloud.com/marceldettmann/live-at-concrete-paris',
    instagramUrl: 'https://www.instagram.com/concrete.paris/',
    facebookUrl: 'https://www.facebook.com/ConcreteParis/',
    description: 'A cornerstone of Parisian techno, known for its boat-party origins and influence on the European scene.',
    tags: ['Minimal', 'Techno', 'Boat']
  },
  {
    id: 'djoon-paris',
    name: 'Djoon',
    location: '22 Bd Vincent Auriol, 75013 Paris',
    logoUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400',
    soundcloudUrl: 'https://soundcloud.com/djoon/djoon-podcast-083-osunlade',
    instagramUrl: 'https://www.instagram.com/djoonclub/',
    facebookUrl: 'https://www.facebook.com/djoonclub/',
    description: 'The soul of house music in Paris. A place where Afro-house and soulful beats meet a passionate crowd.',
    tags: ['Soulful House', 'Afro', 'Warm']
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    author: 'Alex_Techno',
    type: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    caption: 'Lumières incroyables hier soir au Rexy ! ✨',
    likes: 42,
    timestamp: 'Il y a 2h',
    isMemberPost: true,
    comments: [
      { id: 'c1', author: 'Léa', text: 'C\'était le feu ! 🔥', timestamp: 'Il y a 1h' }
    ]
  },
  {
    id: 'p2',
    author: 'DiscoQueen',
    type: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
    caption: 'Le set de Kirollus au Badaboum était magique 💃',
    likes: 128,
    timestamp: 'Il y a 5h',
    isMemberPost: true,
    comments: []
  }
];
