
import React from 'react';
import { Post, Category } from '../types';
import { CATEGORIES } from '../constants';
import { X, Calendar, Circle, CircleDot } from 'lucide-react';

interface SidebarProps {
  posts: Post[];
  selectedPostId: string;
  onSelectPost: (post: Post) => void;
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  posts, 
  selectedPostId, 
  onSelectPost, 
  activeCategory,
  onSelectCategory,
  isOpen, 
  onClose 
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed lg:static top-0 left-0 z-50
          h-full w-80 bg-white border-r border-slate-200 shadow-2xl lg:shadow-none
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Timeline</h1>
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="px-6 py-4 border-b border-slate-100 bg-white">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`
                  whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all
                  ${activeCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline List */}
        <div className="flex-1 overflow-y-auto py-6 pl-6 pr-4 custom-scrollbar bg-white">
          <div className="relative border-l-2 border-slate-100 ml-3 space-y-6 pb-10">
            {posts.map((post) => {
              const isSelected = selectedPostId === post.id;
              return (
                <div 
                  key={post.id} 
                  className="relative pl-8 group cursor-pointer"
                  onClick={() => {
                    onSelectPost(post);
                    if (window.innerWidth < 1024) onClose();
                  }}
                >
                  {/* Timeline Node */}
                  <div 
                    className={`
                      absolute -left-[9px] top-3 transition-all duration-300 z-10 bg-white rounded-full
                      ${isSelected 
                        ? 'text-indigo-600 scale-125' 
                        : 'text-slate-300 group-hover:text-slate-400'
                      }
                    `}
                  >
                    {isSelected ? <CircleDot size={16} fill="white" /> : <Circle size={16} fill="white" />}
                  </div>

                  {/* Content Card */}
                  <div 
                    className={`
                      p-3 rounded-xl border transition-all duration-200
                      ${isSelected 
                        ? 'bg-indigo-50 border-indigo-200 shadow-sm translate-x-1' 
                        : 'bg-transparent border-transparent hover:bg-slate-50'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wide">
                      <Calendar size={10} />
                      {post.date}
                    </div>
                    <h3 
                      className={`
                        font-bold text-sm leading-snug
                        ${isSelected ? 'text-indigo-900' : 'text-slate-700'}
                      `}
                    >
                      {post.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
             <img src="https://picsum.photos/seed/jianan/100/100" alt="User" className="w-9 h-9 rounded-full ring-2 ring-white border border-slate-200" />
             <div className="flex-1 min-w-0">
               <p className="text-xs font-bold text-slate-800">Jianan Huang</p>
               <p className="text-[10px] text-slate-400 uppercase tracking-wider">PM & Developer</p>
             </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
