
export type UserRole = 'visitor' | 'member' | 'admin';

export interface UserProfile {
  firstName: string;
  nickname: string;
  email: string;
  instagram?: string;
  role: UserRole;
}

export interface Club {
  id: string;
  name: string;
  location: string;
  logoUrl: string;
  soundcloudUrl: string;
  instagramUrl?: string;
  facebookUrl?: string;
  description: string;
  tags: string[];
}

export interface ResidentDJ {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  imageUrl: string;
  soundcloudUrl?: string;
  instagramUrl?: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  author: string;
  type: 'photo' | 'video';
  mediaUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  isMemberPost: boolean;
  isAdminPost?: boolean;
}

export type Page = 'home' | 'clubs' | 'community' | 'register' | 'admin-setup' | 'residents';
