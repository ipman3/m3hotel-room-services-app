{
  /* 
  This hook fetches all popular foods
  @component: /roomservice/PopularServiceSection
  */
}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";
import type { ProductTypesResponse } from "@/types/room-service/roomServiceType";

export function usePopularFoods() {
  return useQuery({
    queryKey: ["popularFoods"],
    queryFn: () =>
      post({
        endpoint: "/products/getPopularFoods",
      }),
      refetchInterval: 30000,
  });
}
