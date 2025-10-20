export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image:string;
  imageUrl:string[];
  category: string;
  isPopular?: boolean;
  packages?: string[];
}
