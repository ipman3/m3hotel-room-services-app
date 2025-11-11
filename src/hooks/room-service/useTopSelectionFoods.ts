import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";
import type { ProductTypesResponse } from "@/types/room-service/roomServiceType";

export function useTopSelectionFoods() {
  return useQuery<ProductTypesResponse>({
    queryKey: ["topSelectionFoods"],
    queryFn: () =>
      post({
        endpoint: "/products/getTopSelectionFoods",
      }),
      refetchInterval: 30000,
  });
}
