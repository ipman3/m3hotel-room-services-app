{
  /* 
    This hook fetches all thing-to-do
    @component: /Pages/ViewAll/ViewAllThing
*/
}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";

interface GetAllThing {
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

interface GetAllThingsResponse {
  code: number;
  msg: string;
  time: string;
  data: GetAllThing[];
}

export function useGetAllThings(enabled: boolean) {
  return useQuery<GetAllThingsResponse>({
    queryKey: ["getAllThings"],
    queryFn: () =>
      post({
        endpoint: "/tourpackage/search",
      }),
      enabled: enabled,
  });
}
