{
  /* 
  This hook fetches all top selection spas
  @component: /WellnessAndSpa/SelectionList
  */
}


import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";
import type { WellnessSpaTypesResponse } from "@/types/wellness-spa/wellnessSpaType";

export function useTopSelectionSpas() {
  return useQuery<WellnessSpaTypesResponse>({
    queryKey: ["topSelectionSpas"],
    queryFn: () =>
      post({
        endpoint: "/spa/topSelectionItems",
      }),
      refetchInterval: 30000,
  });
}
