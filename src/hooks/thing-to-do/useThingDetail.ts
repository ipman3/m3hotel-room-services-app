{
  /*
    This hook fetches the detailed information of a thing by its ID.
    @component: /thing-to-do/ServiceDetailSheet
  */
}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";
import type { ThingToDoTypesResponse } from "@/types/thing-to-do/thingToDoType";

export function useThingDetail(id: number) {
  return useQuery<ThingToDoTypesResponse>({
    queryKey: ["thingDetail", id],
    queryFn: () =>
      post({
        endpoint: "/tourpackage/detail",
        data: { id },
      }),
    enabled: !!id,
  });
}
