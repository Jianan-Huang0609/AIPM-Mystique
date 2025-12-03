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
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      
      {/* Navigation (Left Column) */}
      <Sidebar 
        posts={filteredPosts}
        selectedPostId={selectedPost.id}
        onSelectPost={setSelectedPost}
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory}
      />

      {/* Main Content Area (Right Column) */}
      <main className="flex-1 flex flex-col h-full relative w-full overflow-hidden bg-slate-50 border-l border-slate-200">
        
        {/* Mobile Header logic is handled within the new Sidebar component (it creates a hamburger on mobile) 
            so we mostly just need the content area here. */}

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-hidden">
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