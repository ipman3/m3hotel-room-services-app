{
  /* 
  This hook fetches all popular spas
  @component: /WellnessAndSpa/PopularSpaSection
  */
}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";

export interface PopularSpa {
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

interface PopularSpasResponse {
  code: number;
  msg: string;
  time: string;
  data: PopularSpa[];
}

export function usePopularSpas() {
  return useQuery<PopularSpasResponse>({
    queryKey: ["popularSpas"],
    queryFn: () =>
      post({
        endpoint: "/spa/popularItems",
      }),
  });
}
