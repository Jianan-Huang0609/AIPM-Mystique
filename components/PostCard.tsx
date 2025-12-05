
import React, { useState, useEffect } from 'react';
import { Post, Category } from '../types';
import { Sparkles, ArrowLeft, ArrowRight, Maximize2, Quote, BookOpen, Camera, Lightbulb, AlertCircle, Info, ExternalLink, HelpCircle, PenLine, Save, ChevronDown, ChevronUp, Undo2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { PinContainer } from './ui/3d-pin';
import { motion, AnimatePresence } from 'framer-motion';

interface PostCardProps {
  post: Post;
  onImageClick: (url: string) => void;
  onNavigate?: (category: Category) => void;
}

// --- Internal Component for Q&A Items with Local Storage ---
interface QAItemCardProps {
  item: { topic: string; questions: string[] };
  index: number;
}

const QAItemCard: React.FC<QAItemCardProps> = ({ item, index }) => {
  const storageKey = `qa_answer_${index}`;
  const [answer, setAnswer] = useState("");

  // Load saved answer from localStorage on mount
  useEffect(() => {
    const savedAnswer = localStorage.getItem(storageKey);
    if (savedAnswer) {
      setAnswer(savedAnswer);
    }
  }, [storageKey]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setAnswer(newValue);
    localStorage.setItem(storageKey, newValue);
  };

  return (
    <div className="bg-white border border-[#E8DCC6] rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all relative overflow-hidden group h-full flex flex-col">
      {/* Accent Bar */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#734025]" />
      
      <div className="flex flex-col gap-6 pl-3 flex-1">
        {/* Topic Badge */}
        <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[#734025]/10 flex items-center justify-center shrink-0">
                <HelpCircle className="text-[#734025]" size={18} />
            </div>
            <span className="px-3 py-1 bg-[#734025] text-white text-sm font-bold rounded-full shadow-sm tracking-wide">
                {item.topic}
            </span>
        </div>

        {/* Parallel Questions */}
        <div className="flex flex-col gap-4 flex-1">
            {item.questions.map((question, qIdx) => (
                <div key={qIdx} className="relative pl-6 before:content-[''] before:absolute before:left-1 before:top-2.5 before:w-2 before:h-2 before:bg-[#DC9942] before:rounded-full">
                    <h3 className="text-lg font-bold text-[#4A2C2A] leading-snug">
                        {question}
                    </h3>
                </div>
            ))}
        </div>

        {/* Answer Section (Editable) */}
        <div className="mt-2">
           <div className="relative">
             <div className="absolute top-3 left-3 text-[#DC9942]">
                <PenLine size={18} />
             </div>
             <textarea 
                value={answer}
                onChange={handleInputChange}
                placeholder="Click here to type your answer or summary live..."
                className="w-full min-h-[140px] p-3 pl-10 bg-[#FDFBF7] border border-[#E8DCC6] rounded-xl text-base text-[#4A2C2A] placeholder:text-[#BCAAA4] focus:outline-none focus:border-[#734025]/50 focus:bg-white transition-all resize-y font-serif leading-relaxed"
             />
             {answer && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-[#734025] font-bold bg-white/80 px-2 py-1 rounded-md shadow-sm opacity-50 hover:opacity-100 transition-opacity pointer-events-none">
                   <Save size={12} />
                   <span>Saved</span>
                </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};


const PostCard: React.FC<PostCardProps> = ({ post, onImageClick, onNavigate }) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isHomeContextExpanded, setIsHomeContextExpanded] = useState(false);

  // Reset states when post changes
  React.useEffect(() => {
    setCurrentImageIdx(0);
    setIsHomeContextExpanded(false);
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

  const showPinView = post.links && post.links.length > 0;
  const pinLink = showPinView ? post.links![0] : null;

  // --- HOME VIEW ---
  if (post.category === 'Intro') {
    return (
      <div className="h-full flex flex-col justify-center items-center p-8 lg:p-12 bg-gradient-to-br from-[#FDFBF9] to-[#FFF5F7] overflow-y-auto">
         <div className="max-w-[90%] xl:max-w-7xl 2xl:max-w-screen-2xl w-full flex flex-col items-center text-center gap-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#734025]/10 text-[#734025] text-sm font-bold uppercase tracking-widest border border-[#734025]/20">
               <Sparkles size={16} />
               <span>Architecture Sharing</span>
            </div>
            
            {/* Split Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-black text-[#4A2C2A] tracking-tight leading-tight flex flex-col items-center gap-3">
               <span>论CER PoC项目的架构决策</span>
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#734025] to-[#DC9942] pb-3">与研发效能管理</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-serif text-[#734025] italic max-w-4xl leading-relaxed">
               {post.viewpoint}
            </h2>

            {/* Expandable PoC Context Module */}
            <div className="w-full max-w-3xl mt-6">
              <motion.div 
                layout
                className={`bg-white border border-[#E8DCC6] rounded-2xl overflow-hidden shadow-sm transition-all ${isHomeContextExpanded ? 'shadow-lg ring-1 ring-[#734025]/30' : ''}`}
              >
                <div 
                  onClick={() => setIsHomeContextExpanded(!isHomeContextExpanded)}
                  className="p-5 md:p-6 cursor-pointer flex items-center justify-between text-[#4A2C2A] hover:bg-[#FDFBF7] transition-colors"
                >
                  <p className="font-medium text-lg md:text-xl text-center w-full relative">
                    {post.content}
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#DC9942] pr-6">
                      {isHomeContextExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </span>
                  </p>
                </div>
                
                <AnimatePresence>
                  {isHomeContextExpanded && post.characteristics && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="border-t border-[#E8DCC6] bg-[#FFF5F7]/30"
                    >
                      <div className="p-8 flex flex-col gap-8 text-left">
                         <div className="flex items-center gap-2 text-[#734025] uppercase text-sm font-bold tracking-widest mb-2">
                            <Info size={16} />
                            <span>PoC Context & Constraints</span>
                         </div>
                         <div className="grid grid-cols-1 gap-6">
                            {post.characteristics.map((char, idx) => (
                              <div key={idx} className="flex flex-col gap-1.5">
                                <span className="font-bold text-[#734025] text-base md:text-lg">{char.label}</span>
                                <p className="text-[#4A2C2A] text-base md:text-lg leading-relaxed">{char.description}</p>
                              </div>
                            ))}
                         </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-16">
               <button 
                  onClick={() => onNavigate?.('PM Architecture')}
                  className="group flex flex-col gap-5 p-8 bg-white border border-[#E8DCC6] rounded-3xl shadow-sm hover:shadow-xl hover:border-[#734025]/50 transition-all text-left"
               >
                  <div className="h-12 w-12 rounded-full bg-[#734025]/10 flex items-center justify-center text-[#734025] group-hover:scale-110 transition-transform">
                     <BookOpen size={24} />
                  </div>
                  <div>
                     <h3 className="font-bold text-[#4A2C2A] text-xl mb-1">PM Architecture</h3>
                     <p className="text-sm text-[#8D6E63]">6 Steps to efficient management</p>
                  </div>
                  <div className="mt-auto pt-4 text-[#DC9942] text-sm font-bold uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     Explore <ArrowRight size={14} />
                  </div>
               </button>

               <button 
                   onClick={() => onNavigate?.('AI Cultivation')}
                   className="group flex flex-col gap-5 p-8 bg-white border border-[#E8DCC6] rounded-3xl shadow-sm hover:shadow-xl hover:border-[#734025]/50 transition-all text-left"
               >
                  <div className="h-12 w-12 rounded-full bg-[#734025]/10 flex items-center justify-center text-[#734025] group-hover:scale-110 transition-transform">
                     <Sparkles size={24} />
                  </div>
                  <div>
                     <h3 className="font-bold text-[#4A2C2A] text-xl mb-1">AI Cultivation</h3>
                     <p className="text-sm text-[#8D6E63]">4 Milestones for personal growth</p>
                  </div>
                  <div className="mt-auto pt-4 text-[#DC9942] text-sm font-bold uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     Explore <ArrowRight size={14} />
                  </div>
               </button>

               <button 
                   onClick={() => onNavigate?.('Q&A')}
                   className="group flex flex-col gap-5 p-8 bg-white border border-[#E8DCC6] rounded-3xl shadow-sm hover:shadow-xl hover:border-[#734025]/50 transition-all text-left"
               >
                  <div className="h-12 w-12 rounded-full bg-[#734025]/10 flex items-center justify-center text-[#734025] group-hover:scale-110 transition-transform">
                     <HelpCircle size={24} />
                  </div>
                  <div>
                     <h3 className="font-bold text-[#4A2C2A] text-xl mb-1">Q&A</h3>
                     <p className="text-sm text-[#8D6E63]">Discussion on boundaries & docs</p>
                  </div>
                  <div className="mt-auto pt-4 text-[#DC9942] text-sm font-bold uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     Explore <ArrowRight size={14} />
                  </div>
               </button>
            </div>
         </div>
      </div>
    )
  }

  // --- Q&A VIEW ---
  if (post.category === 'Q&A') {
    return (
      <div className="h-full flex flex-col gap-8 w-full max-w-[1600px] mx-auto p-6 md:p-12 overflow-y-auto custom-scrollbar bg-[#FDFBF9]">
         {/* Header */}
         <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-[#4A2C2A] mb-6 tracking-tight">{post.title}</h1>
            <p className="text-2xl text-[#734025] max-w-4xl mx-auto font-serif italic">{post.viewpoint}</p>
         </div>

         {/* Q&A Cards - Horizontal Grid (3 Columns) - Enforced on Medium screens and up */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">
            {post.qaItems?.map((item, idx) => (
               <div key={idx} className="w-full">
                   <QAItemCard item={item} index={idx} />
               </div>
            ))}
         </div>
      </div>
    )
  }

  // --- STANDARD VIEW ---
  return (
    <div className="h-full flex flex-col gap-8 w-full max-w-[96%] 2xl:max-w-[90%] mx-auto p-6 md:p-8 lg:p-10 overflow-y-auto custom-scrollbar bg-[#FDFBF9]">
      
      {/* 1. HEADER & VIEWPOINT SECTION */}
      <div className="flex flex-col gap-6">
        {/* Title Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#E8DCC6] pb-6">
          <div>
             <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-[#734025] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-[#8D6E63] text-sm font-semibold uppercase tracking-wider">
                 • {post.location}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl 2xl:text-5xl font-extrabold text-[#4A2C2A] tracking-tight leading-tight">
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
                   className="flex items-center gap-1.5 text-sm font-bold text-[#734025] bg-[#734025]/10 px-4 py-2 rounded-full hover:bg-[#734025]/20 transition-colors"
                 >
                   {link.title} <ExternalLink size={14} />
                 </a>
               ))}
             </div>
          )}
        </div>

        {/* Viewpoint Card - Warm Brown Gradient */}
        <div className="w-full bg-gradient-to-r from-[#734025] to-[#A1887F] rounded-2xl p-8 md:p-10 shadow-lg text-white relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 text-white opacity-10 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
            <Quote size={180} />
          </div>
          <div className="relative z-10 flex flex-col gap-4">
             <div className="flex items-center gap-2 text-white/80 uppercase text-sm font-bold tracking-widest">
                <Sparkles size={16} />
                <span>Core Viewpoint</span>
             </div>
            <p className="text-2xl md:text-3xl 2xl:text-4xl font-medium leading-relaxed font-serif">
              {post.viewpoint}
            </p>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE SPLIT SECTION */}
      <div className="flex flex-col xl:flex-row gap-8 min-h-[60vh]">
        
        {/* Left: Content / Example */}
        <div className="flex-[3] bg-white border border-[#E8DCC6] rounded-3xl shadow-sm flex flex-col overflow-hidden">
          <div className="px-8 py-5 border-b border-[#E8DCC6] bg-[#FFF5F7]/30 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#4A2C2A]">
                <BookOpen className="text-[#734025]" size={20} />
                <h3 className="font-bold text-sm uppercase tracking-wide">Core Logic & Context</h3>
            </div>
          </div>
          
          <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar flex-1 max-h-[800px] xl:max-h-none markdown-body">
            {/* Custom Styled Markdown */}
            <ReactMarkdown
              components={{
                h3: ({node, ...props}) => <h3 className="text-xl 2xl:text-2xl font-bold text-[#734025] mt-8 mb-4 flex items-center gap-2 before:content-[''] before:w-1.5 before:h-6 before:bg-[#DC9942] before:rounded-full before:mr-2" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-[#734025]" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-3 marker:text-[#DC9942] text-[#4A2C2A] text-lg 2xl:text-xl" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 space-y-3 marker:text-[#DC9942] text-[#4A2C2A] text-lg 2xl:text-xl" {...props} />,
                li: ({node, ...props}) => <li className="pl-2" {...props} />,
                p: ({node, ...props}) => <p className="mb-6 text-[#5D4037] text-lg 2xl:text-xl leading-relaxed" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#DC9942] pl-6 italic text-[#8D6E63] my-6 text-lg" {...props} />,
                a: ({node, ...props}) => <a className="text-[#734025] hover:text-[#DC9942] underline" target="_blank" rel="noopener noreferrer" {...props} />,
                img: ({node, ...props}) => <img className="rounded-xl max-w-full my-4 border border-[#E8DCC6] shadow-sm" {...props} />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Right: Practice / Images (Switchable) OR 3D Pin for Projects */}
        <div className="flex-[2] flex flex-col gap-4 min-h-[500px] xl:min-h-auto relative z-0">
          
          {showPinView && pinLink ? (
            /* 3D PIN VIEW FOR LINKED PROJECTS */
            <div className="bg-[#FFF5F7]/30 border border-[#E8DCC6] rounded-3xl shadow-sm flex-1 flex flex-col items-center justify-center relative overflow-visible">
               <div className="absolute top-6 left-6 z-20 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-[#E8DCC6] shadow-sm">
                  <ExternalLink className="text-[#734025]" size={16} />
                  <h3 className="font-bold text-[#4A2C2A] text-xs uppercase tracking-wider">Project Showcase</h3>
               </div>
               
               <div className="w-full h-full flex items-center justify-center py-12">
                 <PinContainer title={pinLink.url.replace(/^https?:\/\//, '').split('/')[0]} href={pinLink.url}>
                    <div className="flex basis-full flex-col p-6 tracking-tight text-white/80 sm:basis-1/2 w-[24rem] h-[24rem]">
                      <h3 className="max-w-xs !pb-3 !m-0 font-bold text-2xl text-white">
                        {pinLink.title}
                      </h3>
                      <div className="text-lg !m-0 !p-0 font-normal">
                        <span className="text-white/60">
                          Click to explore the live project.
                        </span>
                      </div>
                      <div 
                        className="flex flex-1 w-full rounded-xl mt-6 bg-cover bg-center border border-white/10"
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
            <div className="bg-[#FDFBF7] border border-[#E8DCC6] rounded-3xl p-1.5 shadow-sm flex-1 flex flex-col relative group overflow-hidden">
             
             {/* Header Overlay */}
             <div className="absolute top-6 left-6 z-20 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-[#E8DCC6] shadow-sm">
              <Camera className="text-[#734025]" size={16} />
              <h3 className="font-bold text-[#4A2C2A] text-xs uppercase tracking-wider">Practice / Artifacts</h3>
            </div>

            {/* Image Container */}
            <div className="relative flex-1 rounded-2xl overflow-hidden bg-white h-full w-full flex items-center justify-center">
              {currentImage ? (
                <>
                  <img 
                    src={currentImage.url} 
                    alt={currentImage.caption} 
                    className="max-w-full max-h-full object-contain cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
                    onClick={() => onImageClick(currentImage.url)}
                  />
                  
                  {/* Caption Overlay (Hover) */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 pt-16 flex justify-center items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-t from-[#4A2C2A]/10 to-transparent">
                      <p className="text-[#4A2C2A] font-medium text-base flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#E8DCC6] shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        <Info size={18} className="text-[#734025]" />
                        {currentImage.caption}
                      </p>
                  </div>
                  
                  {/* Navigation Controls */}
                  {post.images.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#4A2C2A] p-3 rounded-full transition-all duration-200 shadow-md hover:scale-110 z-30 border border-[#E8DCC6]"
                      >
                        <ArrowLeft size={24} />
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#4A2C2A] p-3 rounded-full transition-all duration-200 shadow-md hover:scale-110 z-30 border border-[#E8DCC6]"
                      >
                        <ArrowRight size={24} />
                      </button>
                      
                      {/* Dots */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                        {post.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setCurrentImageIdx(idx); }}
                            className={`h-2 rounded-full transition-all duration-300 shadow-sm ${idx === currentImageIdx ? 'bg-[#734025] w-8' : 'bg-[#E8DCC6] w-2 hover:bg-[#D7CCC8]'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  
                  <button 
                    onClick={() => onImageClick(currentImage.url)}
                    className="absolute top-6 right-6 bg-white/80 hover:bg-white text-[#4A2C2A] p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all z-20 backdrop-blur-sm border border-[#E8DCC6] shadow-sm"
                  >
                    <Maximize2 size={20} />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-[#BCAAA4] gap-4">
                  <div className="p-6 bg-[#FDFBF7] rounded-full border border-[#E8DCC6]">
                    <Camera size={40} className="opacity-50" />
                  </div>
                  <span className="text-sm font-medium uppercase tracking-widest">No visual artifacts</span>
                </div>
              )}
            </div>
          </div>
          )}
        </div>
      </div>

      {/* 3. BOTTOM SECTION: TAKEAWAY & REFLECTION & TRADEOFF */}
      <div className="flex flex-col gap-6 pb-12">
        
        {/* Takeaway Card (Mustard Gold Accent) */}
        <div className="bg-white border border-[#DC9942] border-l-[8px] rounded-r-2xl p-8 md:p-10 shadow-sm flex flex-col gap-6 relative group hover:shadow-md transition-shadow w-full">
          <div>
            <div className="flex items-center gap-2.5 text-[#DC9942] mb-4">
                <Lightbulb size={24} />
                <h3 className="font-bold uppercase text-sm tracking-widest">Key Takeaway</h3>
            </div>
            {post.takeaway ? (
                 <div className="text-[#4A2C2A] font-serif text-lg md:text-xl leading-relaxed italic relative z-10">
                    <ReactMarkdown
                        components={{
                            p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />
                        }}
                    >
                        {post.takeaway}
                    </ReactMarkdown>
                </div>
            ) : (
                <p className="text-[#BCAAA4] text-lg italic">No takeaway specified.</p>
            )}
          </div>

          {/* Tradeoff / Reverse Thinking (Dusty Pink Accent) */}
          {post.tradeoff && (
             <div className="pt-8 border-t border-[#E8DCC6] mt-2">
               <div className="flex items-center gap-2.5 text-[#DD8B8B] mb-4">
                  <Undo2 size={20} />
                  <h3 className="font-bold uppercase text-sm tracking-widest">Reverse Thinking / Tradeoff</h3>
               </div>
               <div className="bg-[#FFF5F7]/30 p-6 md:p-8 rounded-xl border border-[#DD8B8B] border-l-[6px]">
                   <ReactMarkdown
                    components={{
                         p: ({node, ...props}) => <p className="text-[#4A2C2A] text-lg md:text-xl font-medium italic leading-relaxed" {...props} />,
                         blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#DD8B8B] pl-4 my-2 text-[#734025]" {...props} />,
                         ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-3 mt-3 text-[#4A2C2A] text-lg md:text-xl" {...props} />,
                         li: ({node, ...props}) => <li className="pl-2" {...props} />
                    }}
                   >
                     {post.tradeoff}
                   </ReactMarkdown>
               </div>
             </div>
          )}
        </div>

        {/* Reflection Card (Warm Brown Accent) */}
        {post.reflection && (
          <div className="bg-white border border-[#734025] border-l-[8px] rounded-r-2xl p-8 md:p-10 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow w-full">
            <div className="flex items-center gap-2.5 text-[#734025] mb-3">
              <AlertCircle size={24} />
              <h3 className="font-bold uppercase text-sm tracking-widest">Reflection & Refining</h3>
            </div>
            <div className="text-[#4A2C2A] text-lg md:text-xl leading-relaxed">
              <ReactMarkdown
                  components={{
                    strong: ({node, ...props}) => <strong className="font-bold text-[#734025]" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-3 mt-3" {...props} />,
                    li: ({node, ...props}) => <li className="pl-2" {...props} />,
                    p: ({node, ...props}) => <p className="mb-4" {...props} />,
                  }}
              >
                {post.reflection}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default PostCard;
