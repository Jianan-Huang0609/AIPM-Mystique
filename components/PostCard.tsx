
import React, { useState } from 'react';
import { Post } from '../types';
import { Sparkles, ArrowLeft, ArrowRight, Maximize2, Quote, BookOpen, Camera, Lightbulb, AlertCircle, Info, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface PostCardProps {
  post: Post;
  onImageClick: (url: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onImageClick }) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  // Reset states when post changes
  React.useEffect(() => {
    setCurrentImageIdx(0);
  }, [post.id]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (post.images.length > 0) {
      setCurrentImageIdx((prev) => (prev + 1) % post.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (post.images.length > 0) {
      setCurrentImageIdx((prev) => (prev - 1 + post.images.length) % post.images.length);
    }
  };

  const currentImage = post.images.length > 0 ? post.images[currentImageIdx] : null;

  return (
    <div className="h-full flex flex-col gap-6 max-w-7xl mx-auto p-4 md:p-6 lg:p-8 overflow-y-auto custom-scrollbar">
      
      {/* 1. HEADER & VIEWPOINT SECTION */}
      <div className="flex flex-col gap-4">
        {/* Title Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 border-b border-slate-200 pb-4">
          <div>
             <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                 • {post.location}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {post.title}
            </h1>
          </div>
          {post.links && post.links.length > 0 && (
             <div className="flex gap-2">
               {post.links.map(link => (
                 <a 
                   key={link.url}
                   href={link.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors"
                 >
                   {link.title} <ExternalLink size={12} />
                 </a>
               ))}
             </div>
          )}
        </div>

        {/* Viewpoint Card */}
        <div className="w-full bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 md:p-8 shadow-lg text-white relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 text-white opacity-10 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
            <Quote size={140} />
          </div>
          <div className="relative z-10 flex flex-col gap-3">
             <div className="flex items-center gap-2 text-indigo-200 uppercase text-xs font-bold tracking-widest">
                <Sparkles size={14} />
                <span>Core Viewpoint</span>
             </div>
            <p className="text-xl md:text-2xl font-medium leading-relaxed font-serif">
              "{post.viewpoint}"
            </p>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE SPLIT SECTION */}
      <div className="flex flex-col xl:flex-row gap-6 min-h-[500px]">
        
        {/* Left: Content / Example */}
        <div className="flex-[3] bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-700">
                <BookOpen className="text-emerald-500" size={18} />
                <h3 className="font-bold text-sm uppercase tracking-wide">Core Logic & Context</h3>
            </div>
          </div>
          
          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 max-h-[600px] xl:max-h-none">
            {/* Custom Styled Markdown */}
            <div className="text-slate-700 leading-relaxed text-sm md:text-base space-y-4">
                <ReactMarkdown
                  components={{
                    h3: ({node, ...props}) => <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3 flex items-center gap-2 before:content-[''] before:w-1 before:h-5 before:bg-indigo-500 before:rounded-full before:mr-2" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold text-slate-900 bg-slate-100 px-1 rounded" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 marker:text-indigo-400" {...props} />,
                    li: ({node, ...props}) => <li className="pl-1" {...props} />,
                    p: ({node, ...props}) => <p className="mb-4 text-slate-600" {...props} />,
                    table: ({node, ...props}) => <div className="overflow-x-auto my-4 rounded-lg border border-slate-200"><table className="min-w-full divide-y divide-slate-200" {...props} /></div>,
                    thead: ({node, ...props}) => <thead className="bg-slate-50" {...props} />,
                    th: ({node, ...props}) => <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider" {...props} />,
                    td: ({node, ...props}) => <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600 border-t border-slate-100" {...props} />,
                  }}
                >
                  {post.content}
                </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Right: Practice / Images (Switchable) */}
        <div className="flex-[2] flex flex-col gap-4 min-h-[400px] xl:min-h-auto">
          <div className="bg-slate-900 rounded-2xl p-1 shadow-lg flex-1 flex flex-col relative group overflow-hidden">
             
             {/* Header Overlay */}
             <div className="absolute top-4 left-4 z-20 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
              <Camera className="text-purple-400" size={14} />
              <h3 className="font-bold text-white text-[10px] uppercase tracking-wider">Practice / Artifacts</h3>
            </div>

            {/* Image Container */}
            <div className="relative flex-1 rounded-xl overflow-hidden bg-slate-800 h-full w-full">
              {currentImage ? (
                <>
                  <img 
                    src={currentImage.url} 
                    alt={currentImage.caption} 
                    className="w-full h-full object-contain bg-black/40 cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
                    onClick={() => onImageClick(currentImage.url)}
                  />
                  
                  {/* Caption Overlay (Hover) - Improved visibility */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex justify-center items-end h-32">
                      <p className="text-white font-medium text-sm md:text-base flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        <Info size={16} className="text-indigo-400" />
                        {currentImage.caption}
                      </p>
                  </div>
                  
                  {/* Navigation Controls */}
                  {post.images.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/50 backdrop-blur text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-30 border border-white/10"
                      >
                        <ArrowLeft size={20} />
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/50 backdrop-blur text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-30 border border-white/10"
                      >
                        <ArrowRight size={20} />
                      </button>
                      
                      {/* Dots */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                        {post.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setCurrentImageIdx(idx); }}
                            className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${idx === currentImageIdx ? 'bg-white w-6' : 'bg-white/40 w-1.5 hover:bg-white/60'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  
                  <button 
                    onClick={() => onImageClick(currentImage.url)}
                    className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all z-20 backdrop-blur-sm border border-white/10"
                  >
                    <Maximize2 size={18} />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-3">
                  <div className="p-4 bg-slate-800 rounded-full">
                    <Camera size={32} className="opacity-40" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-widest">No visual artifacts</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM SECTION: TAKEAWAY & REFLECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
        {/* Takeaway Card */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-6 shadow-sm flex flex-col gap-3 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-amber-700/80 mb-1">
            <Lightbulb size={18} />
            <h3 className="font-bold uppercase text-[10px] tracking-widest">Key Takeaway</h3>
          </div>
          {post.takeaway ? (
            <p className="text-amber-900 font-serif text-lg leading-relaxed italic relative z-10">
              {post.takeaway}
            </p>
          ) : (
             <p className="text-amber-900/40 text-sm italic">No takeaway specified.</p>
          )}
        </div>

        {/* Reflection Card */}
        {post.reflection && (
          <div className="bg-slate-100 border-l-4 border-slate-400 rounded-r-xl p-6 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-slate-500 mb-1">
              <AlertCircle size={18} />
              <h3 className="font-bold uppercase text-[10px] tracking-widest">Reflection & Refining</h3>
            </div>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              {post.reflection}
            </p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default PostCard;
