{
  /* 
    This hook fetches all thing-to-do
    @component: /Pages/ViewAll/ViewAllThing
*/
}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";
import type { ThingToDoTypesResponse } from "@/types/thing-to-do/thingToDoType";



export function useGetAllThings(enabled: boolean) {
  return useQuery<ThingToDoTypesResponse>({
    queryKey: ["getAllThings"],
    queryFn: () =>
      post({
        endpoint: "/tourpackage/search",
      }),
      enabled: enabled,
  });
}
