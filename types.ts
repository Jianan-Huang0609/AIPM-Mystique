
export interface PostImage {
  url: string;
  caption: string;
}

export interface Post {
  id: string;
  title: string;
  date: string;
  location: string; // Used as a subtitle or tag
  category: Category;
  viewpoint: string; // The core idea/summary for the "Viewpoint" box
  content: string;   // The "Example" box content
  images: PostImage[];  // The "Practice" box images with captions
  author: string;
  authorAvatar: string;
  takeaway?: string; // The "Takeaway" block content
  reflection?: string; // The "Reflection/Refining" content
  links?: { title: string; url: string }[]; // Optional links for projects
}

export type Category = 'All' | 'PM Architecture' | 'AI Cultivation';

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
