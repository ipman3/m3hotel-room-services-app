{/* 
    This hook fetches all spas
    @component: /Pages/ViewAll/ViewAllSpa
*/}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";
import type { WellnessSpaTypesResponse } from "@/types/wellness-spa/wellnessSpaType";

export function useGetAllSpas(enabled: boolean) {
  return useQuery<WellnessSpaTypesResponse>({
    queryKey: ["getAllSpas"],
    queryFn: () =>
      post({
        endpoint: "/spa/search",
      }),
      enabled: enabled,
      refetchInterval: 30000,
  });
}
