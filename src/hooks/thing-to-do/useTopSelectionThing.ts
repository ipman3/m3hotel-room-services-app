{
  /* 
  This hook fetches all top selection things to do
  @component: /thing-to-do/SelectionList
  */
}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";
import type { ThingToDoTypesResponse } from "@/types/thing-to-do/thingToDoType";

export function useTopSelectionThing() {
  return useQuery<ThingToDoTypesResponse>({
    queryKey: ["topSelectionThings"],
    queryFn: () =>
      post({
        endpoint: "/tourpackage/topSelectionItems",
      }),
  });
}