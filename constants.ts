import { Post, Category } from './types';

export const CATEGORIES: Category[] = ['All', 'Tech Talk', 'Workshop', 'Social', 'Hackathon'];

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Cursor AI & The Future',
    date: 'Oct 24',
    location: 'San Francisco',
    category: 'Tech Talk',
    viewpoint: "AI-native editors are not just tools; they are the new operating system for software engineering, fundamentally shifting how we approach code generation.",
    content: "We explored how AI-native editors are changing the landscape of software engineering. The discussion focused on the integration of LLMs directly into the IDE workflow, reducing context switching and increasing velocity. Attendees shared their own workflows and custom prompts. Key examples included using natural language to refactor legacy codebases and generating unit tests automatically.",
    images: [
      'https://picsum.photos/seed/cursor1/800/600',
      'https://picsum.photos/seed/cursor2/800/600',
      'https://picsum.photos/seed/cursor3/800/600'
    ],
    author: 'Jianan Huang',
    authorAvatar: 'https://picsum.photos/seed/avatar1/100/100'
  },
  {
    id: '2',
    title: 'React 19 Deep Dive',
    date: 'Nov 12',
    location: 'New York',
    category: 'Workshop',
    viewpoint: "React 19 represents a shift towards automatic optimization, removing the manual burden of memoization from developers.",
    content: "A hands-on session covering the new React Compiler, Actions, and Server Components. We built a full-stack application from scratch using Next.js and the latest experimental features of React to understand the performance benefits. The example project demonstrated a 40% reduction in client-side bundle size.",
    images: [
      'https://picsum.photos/seed/react1/800/400',
      'https://picsum.photos/seed/react2/800/400'
    ],
    author: 'Sarah Chen',
    authorAvatar: 'https://picsum.photos/seed/avatar2/100/100'
  },
  {
    id: '3',
    title: 'Winter Social',
    date: 'Dec 15',
    location: 'Austin',
    category: 'Social',
    viewpoint: "Building a community requires more than just code; it requires shared spaces for casual connection and cross-pollination of ideas.",
    content: "An end-of-year gathering for local developers. No tech talks, just good food, drinks, and networking. It was great to connect with people from different companies and backgrounds in a relaxed atmosphere. We organized a small ice-breaker game that led to three new startup collaborations.",
    images: [
      'https://picsum.photos/seed/social1/600/600',
      'https://picsum.photos/seed/social2/600/600',
      'https://picsum.photos/seed/social3/600/600',
      'https://picsum.photos/seed/social4/600/600'
    ],
    author: 'Mike Ross',
    authorAvatar: 'https://picsum.photos/seed/avatar3/100/100'
  },
  {
    id: '4',
    title: '24-Hour AI Hackathon',
    date: 'Jan 20',
    location: 'Remote',
    category: 'Hackathon',
    viewpoint: "Constraint breeds creativity. The 24-hour limit pushed teams to focus on core value propositions rather than feature creep.",
    content: "Teams competed to build the most innovative agentic workflows using the Gemini API. The winning team built a fully autonomous travel planner that books flights and hotels based on vague user preferences. The energy was incredible throughout the night, with over 50 projects submitted.",
    images: [
      'https://picsum.photos/seed/hack1/900/500',
    ],
    author: 'Emily Zhang',
    authorAvatar: 'https://picsum.photos/seed/avatar4/100/100'
  }
];