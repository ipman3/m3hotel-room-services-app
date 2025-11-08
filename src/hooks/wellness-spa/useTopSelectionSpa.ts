{
  /* 
  This hook fetches all top selection spas
  @component: /WellnessAndSpa/SelectionList
  */
}


import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";

export interface TopSelectionSpa {
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

interface TopSelectionSpasResponse {
  code: number;
  msg: string;
  time: string;
  data: TopSelectionSpa[];
}

export function useTopSelectionSpas() {
  return useQuery<TopSelectionSpasResponse>({
    queryKey: ["topSelectionSpas"],
    queryFn: () =>
      post({
        endpoint: "/spa/topSelectionItems",
      }),
  });
}
