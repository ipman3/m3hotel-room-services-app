import { Headphones, MessageSquare, Globe, Facebook, Twitter, Instagram } from "lucide-react";

export interface ContactLink {
  label: string;
  icon: React.ElementType;
  url: string;
}

export const contactLinks: ContactLink[] = [
  {
    label: "Customer Services",
    icon: Headphones,
    url: "tel:+1234567890", // Example phone number
  },

  {
    label: "WhatsApp",
    icon: MessageSquare,
    url: "https://wa.me/1234567890", // Example WhatsApp link
  },
  {
    label: "Website",
    icon: Globe,
    url: "https://example.com",
  },
  {
    label: "Facebook",
    icon: Facebook,
    url: "https://facebook.com/your-page",
  },
  {
    label: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/your-handle",
  },
  {
    label: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/your-profile",
  },
];
