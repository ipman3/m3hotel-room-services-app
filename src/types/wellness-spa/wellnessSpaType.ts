export interface WellnessSpaType {
  id: number;
  name: string;
  short_desc: string;
  desc: string;
  image: string;
  images: string[];
  price: string;
  unit: string;
  status: string;
  category_id: number;
}

export interface WellnessSpaTypesResponse {
  code: number;
  msg: string;
  time: string;
  data: WellnessSpaType[];
}