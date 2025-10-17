import { Icons } from "../../public/assets/icons";

export interface ContactLink {
  label: string;
  icon: string;
  url: string;
}

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    icon: Icons.MailIcon,
    url: "https://example.com",
  },
  {
    label: "Phone Number",
    icon: Icons.PhoneIcon,
    url: "https://facebook.com/your-page",
  },
  {
    label: "Telegram",
    icon: Icons.TelegramIcon,
    url: "https://twitter.com/your-handle",
  },
];
