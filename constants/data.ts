/**
 * Planned-Eat Landing Page Data
 * 
 * Bu dosya, landing page'de kullanılan tüm dinamik içerikleri içerir.
 * Video linkleri, fotoğraflar ve ekip üyelerinin sosyal medya bilgilerini
 * buradan güncelleyebilirsiniz.
 */

// Hero Section İçeriği
export const heroContent = {
  title: "Sağlıklı Beslenme Artık Çok Kolay",
  subtitle: "Kişiselleştirilmiş yemek planları, AI destekli tarif önerileri ve akıllı alışveriş listeleri ile beslenme hedeflerinize ulaşın.",
  appStoreUrl: "#",
  playStoreUrl: "#",
  // Uygulamanın tanıtım videosu veya görseli
  heroMediaType: "image" as "video" | "image",
  heroVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  heroImageUrl: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&q=80",
};

// Özellikler
export const features = [
  {
    id: "1",
    icon: "sparkles",
    title: "AI Tarif Önerileri",
    description: "Yapay zeka destekli kişiselleştirilmiş tarif önerileri ile damak tadınıza uygun yemekler keşfedin.",
  },
  {
    id: "2",
    icon: "chart-bar",
    title: "Kalori Takibi",
    description: "Günlük kalori alımınızı kolayca takip edin ve beslenme hedeflerinize ulaşın.",
  },
  {
    id: "3",
    icon: "shopping-cart",
    title: "Akıllı Alışveriş Listesi",
    description: "Yemek planlarınıza göre otomatik oluşturulan alışveriş listeleri ile zaman kazanın.",
  },
  {
    id: "4",
    icon: "calendar",
    title: "Haftalık Planlama",
    description: "Haftalık yemek planlarınızı önceden oluşturun ve düzenli beslenin.",
  },
];

// Medya Galerisi
export const mediaGallery = {
  sectionTitle: "Uygulamayı Keşfedin",
  promoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  screenshots: [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
      alt: "Ana Sayfa",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&q=80",
      alt: "Tarifler",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=400&q=80",
      alt: "Kalori Takibi",
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
      alt: "Alışveriş Listesi",
    },
  ],
};

// Ekip Üyeleri
export const teamMembers = [
  {
    id: "1",
    name: "İsim Soyisim",
    role: "Full Stack Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    linkedIn: "https://linkedin.com/in/username1",
    github: "https://github.com/username1",
  },
  {
    id: "2",
    name: "İsim Soyisim",
    role: "Mobile Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    linkedIn: "https://linkedin.com/in/username2",
    github: "https://github.com/username2",
  },
  {
    id: "3",
    name: "İsim Soyisim",
    role: "UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    linkedIn: "https://linkedin.com/in/username3",
    github: "https://github.com/username3",
  },
];

// Footer İçeriği
export const footerContent = {
  copyright: `© ${new Date().getFullYear()} Planned-Eat. Tüm hakları saklıdır.`,
  tagline: "Üniversite Bitirme Projesi",
};

// Site Bilgileri
export const siteInfo = {
  name: "Planned-Eat",
  logo: null, // Logo dosya yolu eklenebilir
};
