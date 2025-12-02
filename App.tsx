import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import PostCard from './components/PostCard';
import ImageModal from './components/ImageModal';
import { MOCK_POSTS } from './constants';
import { Category, Post } from './types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedPost, setSelectedPost] = useState<Post>(MOCK_POSTS[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return MOCK_POSTS;
    return MOCK_POSTS.filter(post => post.category === activeCategory);
  }, [activeCategory]);

  // Update selected post if it disappears from filter, or just keep it if it's still there
  React.useEffect(() => {
    const stillExists = filteredPosts.find(p => p.id === selectedPost.id);
    if (!stillExists && filteredPosts.length > 0) {
      setSelectedPost(filteredPosts[0]);
    }
  }, [filteredPosts, selectedPost.id]);

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* Navigation Timeline (Left Column) */}
      <Sidebar 
        posts={filteredPosts}
        selectedPostId={selectedPost.id}
        onSelectPost={setSelectedPost}
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area (Right Column) */}
      <main className="flex-1 flex flex-col h-full relative w-full transition-all">
        
        {/* Mobile Header */}
        <header className="flex-none bg-white/80 backdrop-blur border-b border-slate-200 px-4 py-3 lg:hidden flex items-center justify-between z-30 sticky top-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-slate-800 truncate px-4">{selectedPost.title}</span>
          <div className="w-10"></div>
        </header>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-hidden bg-slate-50/50">
          <PostCard 
            post={selectedPost} 
            onImageClick={setPreviewImage}
          />
        </div>
      </main>

      {/* Fullscreen Image Modal */}
      <ImageModal 
        imageUrl={previewImage} 
        onClose={() => setPreviewImage(null)} 
      />
      
    </div>
  );
};

export default App;