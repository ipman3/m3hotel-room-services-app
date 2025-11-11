export interface ThingToDoType {
  id: number;
  name: string;
  short_desc: string;
  desc: string;
  image: string;
  images: string[];
  itinerary: string;
  highlight: string;
  price: string;
  unit: string;
  status: string;
  category_id: number;
  sort: number;
}

export interface ThingToDoTypesResponse {
  code: number;
  msg: string;
  time: string;
  data: ThingToDoType[];
}
