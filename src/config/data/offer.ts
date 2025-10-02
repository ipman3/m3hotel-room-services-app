export interface OfferAndNewsItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export const offerAndNewsItems: OfferAndNewsItem[] = [
  {
    id: '1',
    title: 'Deluxe Double Bed With Balcony',
    imageUrl: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    description: 'Enjoy a spacious room with a beautiful balcony view, perfect for a relaxing getaway. Includes complimentary breakfast.',
    price: 120.00,
  },
  {
    id: '2',
    title: 'Our Spa Packages Promotion',
    imageUrl: 'https://images.pexels.com/photos/161737/pedicure-massage-therapist-spa-161737.jpeg',
    description: 'Sour creamy of crab soup / River fish snail / green papaya topped rice paddy herb.',
    price: 29.00,
  },
  {
    id: '3',
    title: 'New Mobile App Feature',
    imageUrl: 'https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg',
    description: 'Book your stay and services even faster with our new mobile app. Download now for an exclusive 10% discount!',
    price: 0, // Or a relevant price if it's a paid feature
  },
  {
    id: '4',
    title: 'Our Web Design Services',
    imageUrl: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg',
    description: 'Professional web design and development services to bring your digital presence to life. Contact us for a quote.',
    price: 999.00,
  },
  {
    id: "5",
    title: "Conference Room Booking",
    imageUrl: "https://images.pexels.com/photos/3212179/pexels-photo-3212179.jpeg",
    description: "State-of-the-art conference facilities available for daily rental. Includes AV equipment and catering options.",
    price: 250.00,
  },
];

