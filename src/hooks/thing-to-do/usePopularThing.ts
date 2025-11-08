{
  /* 
  This hook fetches all popular things to do
  @component: /thing-to-do/PopularThingSection
  */
}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";
import type { ThingToDoTypesResponse } from "@/types/thing-to-do/thingToDoType";

export function usePopularThings() {
  return useQuery<ThingToDoTypesResponse>({
    queryKey: ["popularThings"],
    queryFn: () =>
      post({
        endpoint: "/tourpackage/popularItems",
      }),
      refetchInterval: 30000,
  });
}
