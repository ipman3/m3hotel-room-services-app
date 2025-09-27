export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "How do I manage my notifications?",
    answer:
      "To manage notifications, navigate to the 'Settings' page from your profile. Select 'Notification Settings,' and you can customize your preferences for different types of alerts.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "Simply browse to the service you're interested in, such as 'Wellness & Spa,' select a specific service, fill in your desired date and package, and proceed to the confirmation page.",
  },
  {
    question: "Can I view my order history?",
    answer:
      "Yes, you can view all your past and upcoming appointments by navigating to the 'Profile' section and selecting 'Order History.'",
  },
  {
    question: "How is my payment information stored?",
    answer:
      "We do not store your full payment information on our servers. All transactions are handled by our secure, PCI-compliant payment partner to ensure the highest level of security.",
  },
  {
    question: "Is my personal data safe and private?",
    answer:
      "Absolutely. We prioritize your privacy and use end-to-end encryption for all personal data. We will never share your information with third parties without your explicit consent.",
  },
];
