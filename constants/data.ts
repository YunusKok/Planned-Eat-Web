/**
 * Planned-Eat Landing Page Data
 * 
 * This file contains all dynamic content used on the landing page.
 * You can update video links, photos, and team member social media info here.
 */

// Hero Section Content
export const heroContent = {
  title: "Healthy Eating Made Easy",
  subtitle: "Achieve your nutrition goals with personalized meal plans, AI-powered recipe suggestions, and smart shopping lists.",
  appStoreUrl: "#",
  playStoreUrl: "#",
  // Promotion video or image for the app
  heroMediaType: "image" as "video" | "image",
  heroVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  heroImageUrl: require('@/assets/images/hero-app-screen.png'),
};

// Features
export const features = [
  {
    id: "1",
    icon: "sparkles",
    title: "AI Recipe Suggestions",
    description: "Discover meals that suit your taste with AI-powered personalized recipe recommendations.",
  },
  {
    id: "2",
    icon: "chart-bar",
    title: "Calorie Tracking",
    description: "Easily track your daily calorie intake and reach your nutritional goals.",
  },
  {
    id: "3",
    icon: "shopping-cart",
    title: "Smart Shopping List",
    description: "Save time with shopping lists automatically generated based on your meal plans.",
  },
  {
    id: "4",
    icon: "calendar",
    title: "Weekly Planning",
    description: "Create your weekly meal plans in advance and eat regularly.",
  },
];

// Media Gallery
export const mediaGallery = {
  sectionTitle: "Discover the App",
  promoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  // Main showcase images (Empty -> Filled transition)
  showcaseImages: {
    empty: require('@/assets/images/screenshot-home-empty.png'),
    filled: require('@/assets/images/screenshot-home-filled.png'),
  },
  screenshots: [
    {
      id: "1",
      image: require('@/assets/images/screenshot-home-empty.png'),
      alt: "Plan Your Day",
      description: "Start your day by creating a personalized meal plan. Our AI suggests recipes based on your preferences and nutritional goals.",
    },
    {
      id: "2",
      image: require('@/assets/images/screenshot-home-filled.png'),
      alt: "Daily Overview",
      description: "Track your calories, macros, and meals in one place. Get a clear view of your daily nutrition throughout the day.",
    },
    {
      id: "3",
      image: require('@/assets/images/screenshot-meal-plan.png'),
      alt: "Meal Plan Preview",
      description: "Get a detailed preview of your upcoming meals. Swap out recipes you don't like and save your perfect plan.",
    },
  ],
};

// Team Members
export const teamMembers = [
  {
    id: "1",
    name: "Yusuf Ad",
    role: "Full Stack Developer",
    avatar: require("@/assets/images/team-yusuf.png"),
    linkedIn: "https://www.linkedin.com/in/yusuf-ad",
    github: "https://github.com/yusuf-ad",
  },
  {
    id: "2",
    name: "Yunus Mert Kök",
    role: "Mobile Developer",
    avatar: require("@/assets/images/team-yunus.png"),
    linkedIn: "https://www.linkedin.com/in/yunus-mert-kok",
    github: "https://github.com/YunusKok",
  },
  {
    id: "3",
    name: "Osman İleri",
    role: "UI/UX Designer",
    avatar: require("@/assets/images/team-osman.png"),
    linkedIn: "https://www.linkedin.com/in/osman-ileri-944682299",
    github: "https://github.com/Osmanileri",
  },
];

// Footer Content
export const footerContent = {
  copyright: `© ${new Date().getFullYear()} Planned-Eat. All rights reserved.`,
  tagline: "University Graduation Project",
};

// Site Info
export const siteInfo = {
  name: "Planned-Eat",
  logo: null, // Logo file path can be added
};
