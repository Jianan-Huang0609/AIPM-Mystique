import React, { useState } from 'react';
import { Post } from '../types';
import { Sparkles, ArrowLeft, ArrowRight, Maximize2, Quote, BookOpen, Camera, Lightbulb, AlertCircle, Info, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { PinContainer } from './ui/3d-pin';

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

  // Determine if we should show the 3D Pin view (Milestone 3/4 or posts with links)
  const showPinView = post.links && post.links.length > 0;
  const pinLink = showPinView ? post.links![0] : null;

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
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {post.title}
            </h1>
          </div>
          {post.links && post.links.length > 0 && !showPinView && (
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
            <p className="text-lg md:text-xl font-medium leading-relaxed font-serif">
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
          
          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 max-h-[600px] xl:max-h-none markdown-body">
            {/* Custom Styled Markdown */}
            <ReactMarkdown
              components={{
                h3: ({node, ...props}) => <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3 flex items-center gap-2 before:content-[''] before:w-1 before:h-5 before:bg-indigo-500 before:rounded-full before:mr-2" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-slate-900 bg-slate-100 px-1 rounded" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 marker:text-indigo-400 text-slate-700" {...props} />,
                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 text-slate-600 leading-relaxed" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-500 my-4" {...props} />,
                a: ({node, ...props}) => <a className="text-indigo-600 hover:text-indigo-800 underline" {...props} />,
                img: ({node, ...props}) => <img className="rounded-lg max-w-full my-2 border border-slate-200" {...props} />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Right: Practice / Images (Switchable) OR 3D Pin for Projects */}
        <div className="flex-[2] flex flex-col gap-4 min-h-[400px] xl:min-h-auto relative z-0">
          
          {showPinView && pinLink ? (
            /* 3D PIN VIEW FOR LINKED PROJECTS */
            <div className="bg-slate-50/50 border border-slate-200 rounded-2xl shadow-sm flex-1 flex flex-col items-center justify-center relative overflow-visible">
               <div className="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-slate-200 shadow-sm">
                  <ExternalLink className="text-blue-500" size={14} />
                  <h3 className="font-bold text-slate-700 text-[10px] uppercase tracking-wider">Project Showcase</h3>
               </div>
               
               <div className="w-full h-full flex items-center justify-center py-10">
                 <PinContainer title={pinLink.url.replace(/^https?:\/\//, '').split('/')[0]} href={pinLink.url}>
                    <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
                      <h3 className="max-w-xs !pb-2 !m-0 font-bold text-xl text-slate-100">
                        {pinLink.title}
                      </h3>
                      <div className="text-base !m-0 !p-0 font-normal">
                        <span className="text-slate-500">
                          Click to explore the live project.
                        </span>
                      </div>
                      <div 
                        className="flex flex-1 w-full rounded-lg mt-4 bg-cover bg-center border border-white/10"
                        style={{
                          backgroundImage: `url(${post.images[0]?.url})`,
                          backgroundColor: '#1e293b'
                        }}
                      />
                    </div>
                 </PinContainer>
               </div>
            </div>
          ) : (
            /* STANDARD IMAGE GALLERY */
            <div className="bg-slate-100 border border-slate-200 rounded-2xl p-1 shadow-sm flex-1 flex flex-col relative group overflow-hidden">
             
             {/* Header Overlay */}
             <div className="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-slate-200 shadow-sm">
              <Camera className="text-purple-500" size={14} />
              <h3 className="font-bold text-slate-700 text-[10px] uppercase tracking-wider">Practice / Artifacts</h3>
            </div>

            {/* Image Container */}
            <div className="relative flex-1 rounded-xl overflow-hidden bg-white h-full w-full flex items-center justify-center">
              {currentImage ? (
                <>
                  <img 
                    src={currentImage.url} 
                    alt={currentImage.caption} 
                    className="max-w-full max-h-full object-contain cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
                    onClick={() => onImageClick(currentImage.url)}
                  />
                  
                  {/* Caption Overlay (Hover) */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 pt-12 flex justify-center items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-t from-slate-900/10 to-transparent">
                      <p className="text-slate-700 font-medium text-sm flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        <Info size={16} className="text-indigo-500" />
                        {currentImage.caption}
                      </p>
                  </div>
                  
                  {/* Navigation Controls */}
                  {post.images.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-700 p-2 rounded-full transition-all duration-200 shadow-md hover:scale-110 z-30 border border-slate-200"
                      >
                        <ArrowLeft size={20} />
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-700 p-2 rounded-full transition-all duration-200 shadow-md hover:scale-110 z-30 border border-slate-200"
                      >
                        <ArrowRight size={20} />
                      </button>
                      
                      {/* Dots */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                        {post.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setCurrentImageIdx(idx); }}
                            className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${idx === currentImageIdx ? 'bg-indigo-600 w-6' : 'bg-slate-300 w-1.5 hover:bg-slate-400'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  
                  <button 
                    onClick={() => onImageClick(currentImage.url)}
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-700 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all z-20 backdrop-blur-sm border border-slate-200 shadow-sm"
                  >
                    <Maximize2 size={18} />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
                  <div className="p-4 bg-slate-50 rounded-full border border-slate-100">
                    <Camera size={32} className="opacity-50" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-widest">No visual artifacts</span>
                </div>
              )}
            </div>
          </div>
          )}
        </div>
      </div>

      {/* 3. BOTTOM SECTION: TAKEAWAY & REFLECTION - FULL WIDTH */}
      <div className="flex flex-col gap-4 pb-8">
        {/* Takeaway Card - Full Width Row */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-6 shadow-sm flex flex-col gap-3 relative overflow-hidden group hover:shadow-md transition-shadow w-full">
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

        {/* Reflection Card - Full Width Row */}
        {post.reflection && (
          <div className="bg-slate-100 border-l-4 border-slate-400 rounded-r-xl p-6 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow w-full">
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