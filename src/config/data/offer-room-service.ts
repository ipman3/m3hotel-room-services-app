export interface OfferServiceItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export const OfferServiceItem: OfferServiceItem[] = [
  {
    id: '1',
    title: 'Deluxe Double Bed With Balcony',
    imageUrl: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    description: 'Enjoy a spacious room with a beautiful balcony view, perfect for a relaxing getaway. Includes complimentary breakfast.',
    price: 120.00,
  },
  {
    id: '2',
    title: 'Spa promotion of the day',
    imageUrl: '/assets/imgs/spa-package.jpg',
    description: 'Sour creamy of crab soup / River fish snail / green papaya topped rice paddy herb.',
    price: 29.00,
  },
  {
    id: '3',
    title: 'Deluxe Double Bed With Balcony',
    imageUrl: '/assets/imgs/room-service/service1.jpg',
    description: 'Book your stay and services even faster with our new mobile app. Download now for an exclusive 10% discount!',
    price: 0, // Or a relevant price if it's a paid feature
  },
  {
    id: '4',
    title: 'Deluxe Double Bed With Balcony',
    imageUrl: '/assets/imgs/room-service/service2.jpg',
    description: 'Professional web design and development services to bring your digital presence to life. Contact us for a quote.',
    price: 999.00,
  },

];

