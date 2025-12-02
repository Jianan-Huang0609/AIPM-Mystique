export interface Post {
  id: string;
  title: string;
  date: string;
  location: string;
  category: Category;
  viewpoint: string; // The core idea/summary for the "Viewpoint" box
  content: string;   // The "Example" box content
  images: string[];  // The "Practice" box images
  author: string;
  authorAvatar: string;
}

export type Category = 'All' | 'Tech Talk' | 'Workshop' | 'Social' | 'Hackathon';

export interface SidebarProps {
  posts: Post[];
  selectedPostId: string;
  onSelectPost: (post: Post) => void;
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  isOpen: boolean;
  onClose: () => void;
}

export interface ImageModalProps {
  imageUrl: string | null;
  onClose: () => void;
}