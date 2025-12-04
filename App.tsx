
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import PostCard from './components/PostCard';
import ImageModal from './components/ImageModal';
import { MOCK_POSTS } from './constants';
import { Category, Post } from './types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedPost, setSelectedPost] = useState<Post>(() => {
    return MOCK_POSTS.find(p => p.id === 'home') || MOCK_POSTS[0];
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    // We want the 'filtered list' passed to sidebar to be mostly about content
    // Home and Q&A are handled specially in the Sidebar component itself, 
    // but we still pass everything so it can find them.
    return MOCK_POSTS;
  }, []);

  // Handler for navigation from Home Page
  const handleNavigate = (category: Category) => {
    if (category === 'Q&A') {
      const qaPost = MOCK_POSTS.find(p => p.category === 'Q&A');
      if (qaPost) setSelectedPost(qaPost);
    } else {
      setActiveCategory(category);
      // Select the first post of that category
      const firstPost = MOCK_POSTS.find(p => p.category === category);
      if (firstPost) setSelectedPost(firstPost);
    }
  };

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
        
        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-hidden">
          <PostCard 
            post={selectedPost} 
            onImageClick={setPreviewImage}
            onNavigate={handleNavigate}
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
