
import React, { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from './ui/sidebar';
import { Post, Category } from '../types';
import { 
  Circle, 
  CircleDot,
  LayoutDashboard,
  BrainCircuit,
  Home,
  MessageCircleQuestion,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  posts: Post[];
  selectedPostId: string;
  onSelectPost: (post: Post) => void;
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function SidebarDemo({ 
  posts, 
  selectedPostId, 
  onSelectPost, 
  activeCategory,
  onSelectCategory 
}: SidebarProps) {
  const [open, setOpen] = useState(false);

  // Separate posts into groups
  const homePost = posts.find(p => p.category === 'Intro');
  const qaPost = posts.find(p => p.category === 'Q&A');
  
  // Filter out Home and QA from the main list, and apply category filters if needed
  const contentPosts = posts.filter(p => 
    p.category !== 'Intro' && 
    p.category !== 'Q&A' && 
    (activeCategory === 'All' || activeCategory === p.category)
  );

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 border-r border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-800">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <LogoIcon />}
          
          {/* HOME LINK */}
          {homePost && (
             <div className="mt-8 mb-4">
               <SidebarLink
                  link={{
                    label: "Home",
                    href: "#",
                    onClick: () => onSelectPost(homePost),
                    icon: <Home className={`h-5 w-5 ${selectedPostId === homePost.id ? 'text-blue-600' : 'text-neutral-500'}`} />
                  }}
                  className={selectedPostId === homePost.id ? "bg-blue-50 dark:bg-blue-900/20 rounded-lg" : ""}
               />
             </div>
          )}

          {/* Category Filters (Modules) */}
          <div className="flex flex-col gap-2 mb-6">
             <div className="px-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                {open && "Modules"}
             </div>
             <div className="flex flex-col gap-1">
                {['PM Architecture', 'AI Cultivation', 'Q&A'].map(cat => {
                  const isQA = cat === 'Q&A';
                  // For Q&A, active state depends on if the QA post is selected.
                  // For others, it depends on the active category filter.
                  const isActive = isQA 
                    ? (qaPost && selectedPostId === qaPost.id) 
                    : activeCategory === cat;

                  return (
                    <SidebarLink 
                      key={cat}
                      link={{
                        label: cat,
                        href: "#",
                        onClick: () => {
                          if (isQA && qaPost) {
                            onSelectPost(qaPost);
                          } else {
                            onSelectCategory(cat as Category);
                          }
                        },
                        icon: (
                          cat === 'PM Architecture' ? <LayoutDashboard className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-neutral-500'}`} /> :
                          cat === 'AI Cultivation' ? <BrainCircuit className={`h-5 w-5 ${isActive ? 'text-emerald-600' : 'text-neutral-500'}`} /> :
                          <MessageCircleQuestion className={`h-5 w-5 ${isActive ? 'text-amber-600' : 'text-neutral-500'}`} />
                        )
                      }}
                      className={isActive ? (isQA ? "bg-amber-50 dark:bg-amber-900/20 rounded-lg" : "bg-neutral-100 dark:bg-neutral-800 rounded-lg") : ""}
                    />
                  );
                })}
             </div>
          </div>

          {/* Posts List */}
          <div className="flex flex-col gap-2 flex-1">
            <div className="px-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
               {open && "Chapters"}
            </div>
            {contentPosts.map((post, idx) => (
              <SidebarLink 
                key={idx} 
                link={{
                    label: post.title,
                    href: "#",
                    onClick: () => onSelectPost(post),
                    icon: selectedPostId === post.id ? (
                        <CircleDot className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                    ) : (
                        <Circle className="h-5 w-5 shrink-0 text-neutral-400 dark:text-neutral-500" />
                    )
                }} 
                className={selectedPostId === post.id ? "bg-blue-50 dark:bg-blue-900/20 rounded-lg" : ""} 
              />
            ))}
          </div>

        </div>
        
        {/* User Profile */}
        <div>
          <SidebarLink
            link={{
              label: "Jianan Huang",
              href: "#",
              icon: (
                <img
                  src="https://picsum.photos/seed/jianan/100/100"
                  className="h-7 w-7 shrink-0 rounded-full object-cover"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" />
      <motion.span
        {...({
          initial: { opacity: 0 },
          animate: { opacity: 1 }
        } as any)}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        PoC Master
      </motion.span>
    </div>
  );
};

export const LogoIcon = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" />
    </div>
  );
};

export default SidebarDemo;
