{
  /* 
  This hook fetches all top selection things to do
  @component: /thing-to-do/SelectionList
  */
}


import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";


export interface TopSelectionThing {
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


interface TopSelectionThingsResponse {
  code: number;
  msg: string;
  time: string;
  data: TopSelectionThing[];
}

export function useTopSelectionThing() {
  return useQuery<TopSelectionThingsResponse>({
    queryKey: ["topSelectionThings"],
    queryFn: () =>
      post({
        endpoint: "/tourpackage/topSelectionItems",
      }),
  });
}