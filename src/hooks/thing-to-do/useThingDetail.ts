{
  /*
    This hook fetches the detailed information of a thing by its ID.
    @component: /thing-to-do/ServiceDetailSheet
  */
}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";


export interface DetailThing {
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

interface DetailThingsResponse {
  code: number;
  msg: string;
  time: string;
  data: DetailThing;
}


export function useThingDetail(id: number) {
  return useQuery<DetailThingsResponse>({
    queryKey: ["thingDetail", id],
    queryFn: () =>
      post({
        endpoint: "/tourpackage/detail",
        data: { id },
      }),
    enabled: !!id,
  });
}
