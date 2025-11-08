{
  /* 
  This hook fetches all popular spas
  @component: /WellnessAndSpa/PopularSpaSection
  */
}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";
import type { WellnessSpaTypesResponse } from "@/types/wellness-spa/wellnessSpaType";

export function usePopularSpas() {
  return useQuery<WellnessSpaTypesResponse>({
    queryKey: ["popularSpas"],
    queryFn: () =>
      post({
        endpoint: "/spa/popularItems",
      }),
  });
}
