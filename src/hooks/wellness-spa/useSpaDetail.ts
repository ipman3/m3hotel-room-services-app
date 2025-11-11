{
  /*
    This hook fetches the detailed information of a spa by its ID.
    @component: /WellnessAndSpa/ServiceDetailSheet
  */
}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";
import type { WellnessSpaTypesResponse } from "@/types/wellness-spa/wellnessSpaType";

export function useSpaDetail(id: number) {
  return useQuery<WellnessSpaTypesResponse>({
    queryKey: ["spaDetail", id],
    queryFn: () =>
      post({
        endpoint: "/spa/detail",
        data: { id },
      }),
    enabled: !!id,
  });
}
