import React, { useState } from 'react';
import { Post } from '../types';
import { Sparkles, ArrowLeft, ArrowRight, Maximize2, Quote, BookOpen, Camera } from 'lucide-react';
import { summarizeContent } from '../services/geminiService';

interface PostCardProps {
  post: Post;
  onImageClick: (url: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onImageClick }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  // Reset states when post changes
  React.useEffect(() => {
    setSummary(null);
    setCurrentImageIdx(0);
  }, [post.id]);

  const handleSummarize = async () => {
    if (summary) return;
    setIsSummarizing(true);
    const result = await summarizeContent(post.content);
    setSummary(result);
    setIsSummarizing(false);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % post.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + post.images.length) % post.images.length);
  };

  return (
    <div className="h-full flex flex-col gap-6 max-w-7xl mx-auto p-2 md:p-6 lg:p-8 overflow-y-auto">
      
      {/* 1. TITLE SECTION */}
      <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-md uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-slate-400 text-xs font-medium px-2 border-l border-slate-200">
              {post.location}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {post.title}
          </h1>
        </div>
        <div className="flex -space-x-2">
           <img src={post.authorAvatar} className="w-10 h-10 rounded-full border-2 border-white ring-1 ring-slate-100" alt={post.author} />
        </div>
      </div>

      {/* 2. VIEWPOINT SECTION (Top full width) */}
      <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
        <div className="flex items-start gap-3">
          <Quote className="text-indigo-200 flex-shrink-0" size={32} />
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Viewpoint</h3>
            <p className="text-lg md:text-xl font-medium text-slate-800 leading-relaxed">
              {post.viewpoint}
            </p>
          </div>
        </div>
      </div>

      {/* 3. MIDDLE SPLIT SECTION: EXAMPLE (Left) & PRACTICE (Right) */}
      <div className="flex flex-col lg:flex-row gap-6 min-h-[400px]">
        
        {/* Left: Example / Content */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
            <BookOpen className="text-emerald-500" size={20} />
            <h3 className="font-bold text-slate-800">Example</h3>
          </div>
          <div className="prose prose-slate max-w-none flex-1 overflow-y-auto custom-scrollbar">
            <p className="text-slate-600 leading-7 text-base">
              {post.content}
            </p>
            <p className="text-slate-600 leading-7 text-base mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        {/* Right: Practice / Images (Switchable) */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-1 shadow-sm flex flex-col relative group">
          <div className="absolute top-5 left-5 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2 shadow-sm border border-white/50">
            <Camera className="text-purple-500" size={16} />
            <h3 className="font-bold text-slate-800 text-sm">Practice</h3>
          </div>
          
          <div className="relative flex-1 rounded-xl overflow-hidden bg-slate-100 h-[300px] lg:h-auto">
            {post.images.length > 0 ? (
              <>
                <img 
                  src={post.images[currentImageIdx]} 
                  alt="Practice" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-zoom-in"
                  onClick={() => onImageClick(post.images[currentImageIdx])}
                />
                
                {/* Image Controls */}
                {post.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                    >
                      <ArrowRight size={20} />
                    </button>
                    
                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {post.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIdx(idx); }}
                          className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIdx ? 'bg-white w-4' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
                
                <button 
                  onClick={() => onImageClick(post.images[currentImageIdx])}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Maximize2 size={16} />
                </button>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                No images available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. TAKEAWAY SECTION */}
      <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex-1">
             <div className="flex items-center gap-2 mb-3">
               <Sparkles className="text-amber-500" size={20} />
               <h3 className="font-bold text-slate-800">Takeaway</h3>
             </div>
             {summary ? (
               <p className="text-slate-700 italic border-l-4 border-amber-400 pl-4 py-1 animate-fadeIn">
                 {summary}
               </p>
             ) : (
               <p className="text-slate-400 text-sm">
                 Click the button to generate an AI summary of this session's key takeaways.
               </p>
             )}
          </div>
          <button 
            onClick={handleSummarize}
            disabled={isSummarizing || summary !== null}
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium shadow-lg hover:bg-slate-800 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
          >
            {isSummarizing ? (
              <span className="animate-pulse">Analyzing...</span>
            ) : (
              <>
                <Sparkles size={18} />
                {summary ? 'Summarized' : 'Generate Summary'}
              </>
            )}
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default PostCard;