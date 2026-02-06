
import React, { useState } from 'react';
import { Post, Comment } from '../types';
import { Heart, MessageCircle, Send, Play, UserCircle, AlertCircle } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, text: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment }) => {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(post.id);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden shadow-xl">
      {/* Post Header */}
      <div className="p-4 flex items-center gap-3 border-b border-white/5">
        <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
          <UserCircle className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-white font-bold text-sm">{post.author}</h4>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{post.timestamp}</p>
        </div>
        {post.isMemberPost && (
          <span className="ml-auto text-[9px] font-bold px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">MEMBRE</span>
        )}
      </div>

      {/* Media */}
      <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
        <img 
          src={post.mediaUrl} 
          alt={post.caption} 
          className="w-full h-full object-cover"
        />
        {post.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center shadow-2xl scale-100 group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-black fill-black" />
            </div>
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1.5 transition-colors ${isLiked ? 'text-red-500' : 'text-zinc-400 hover:text-white'}`}
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-xs font-bold">{post.likes + (isLiked ? 1 : 0)}</span>
          </button>
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs font-bold">{post.comments.length}</span>
          </button>
        </div>

        <p className="text-sm text-zinc-200 leading-relaxed">
          <span className="font-bold mr-2 text-cyan-400">{post.author}</span>
          {post.caption}
        </p>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
            {post.comments.map(comment => (
              <div key={comment.id} className="text-xs">
                <span className="font-bold text-white mr-2">{comment.author}</span>
                <span className="text-zinc-400">{comment.text}</span>
              </div>
            ))}
            
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="flex flex-col gap-2 mt-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input 
                    type="text"
                    placeholder={isError ? "Le commentaire ne peut pas être vide" : "Ajouter un commentaire..."}
                    value={commentText}
                    onChange={(e) => {
                      setCommentText(e.target.value);
                      if (isError) setIsError(false);
                    }}
                    className={`w-full bg-zinc-800 border-none rounded-lg px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-cyan-500 transition-all ${
                      isError ? 'ring-1 ring-red-500 bg-red-500/10 placeholder:text-red-400' : ''
                    }`}
                  />
                  {isError && (
                    <AlertCircle className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500 animate-pulse" />
                  )}
                </div>
                <button type="submit" className={`p-2 transition-colors ${isError ? 'text-zinc-600' : 'text-cyan-500 hover:text-cyan-400'}`}>
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {isError && (
                <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest px-1">
                  Veuillez saisir un message
                </span>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
