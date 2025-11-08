{
  /* 
  This hook fetches all popular things to do
  @component: /thing-to-do/PopularThingSection
  */
}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";

export interface PopularThing {
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


interface PopularThingsResponse {
  code: number;
  msg: string;
  time: string;
  data: PopularThing[];
}

export function usePopularThings() {
  return useQuery<PopularThingsResponse>({
    queryKey: ["popularThings"],
    queryFn: () =>
      post({
        endpoint: "/tourpackage/popularItems",
      }),
  });
}
