import React, { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from './ui/sidebar';
import { Post, Category } from '../types';
import { CATEGORIES } from '../constants';
import { 
  Circle, 
  CircleDot,
  LayoutDashboard,
  BrainCircuit,
  Settings2
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

  // Group posts based on category context, but for the links we might just list them
  // Or better, show categories as top level links? 
  // For this specific design, let's list the posts as the primary navigation items
  // but grouped visually by category if possible, or just flat list if category is selected.

  // To fit the Aceternity style, we'll map posts to links
  const links = posts.map(post => ({
    label: post.title,
    href: "#",
    onClick: () => onSelectPost(post),
    icon: (
      selectedPostId === post.id ? (
        <CircleDot className="h-5 w-5 shrink-0 text-indigo-600 dark:text-indigo-400" />
      ) : (
        <Circle className="h-5 w-5 shrink-0 text-neutral-400 dark:text-neutral-500" />
      )
    ),
  }));

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 border-r border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-800">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <LogoIcon />}
          
          {/* Category Filters */}
          <div className="mt-8 flex flex-col gap-2 mb-6">
             <div className="px-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                {open && "Categories"}
             </div>
             <div className="flex flex-col gap-1">
                {CATEGORIES.map(cat => (
                  <SidebarLink 
                    key={cat}
                    link={{
                      label: cat,
                      href: "#",
                      onClick: () => onSelectCategory(cat),
                      icon: (
                        cat === 'PM Architecture' ? <LayoutDashboard className={`h-5 w-5 ${activeCategory === cat ? 'text-indigo-500' : 'text-neutral-500'}`} /> :
                        cat === 'AI Cultivation' ? <BrainCircuit className={`h-5 w-5 ${activeCategory === cat ? 'text-indigo-500' : 'text-neutral-500'}`} /> :
                        <Settings2 className={`h-5 w-5 ${activeCategory === cat ? 'text-indigo-500' : 'text-neutral-500'}`} />
                      )
                    }}
                    className={activeCategory === cat ? "bg-neutral-100 dark:bg-neutral-800 rounded-lg" : ""}
                  />
                ))}
             </div>
          </div>

          {/* Posts List */}
          <div className="flex flex-col gap-2">
            <div className="px-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
               {open && "Posts"}
            </div>
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} className={link.label === posts.find(p=>p.id===selectedPostId)?.title ? "bg-indigo-50 dark:bg-indigo-900/20 rounded-lg" : ""} />
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