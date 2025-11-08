{
  /* 
    This hook fetches all products by store ID
    @component: /Pages/ViewAll/ViewAllProducts
*/
}


import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";
import type { ProductTypesResponse } from "@/types/room-service/roomServiceType";

export function useProductsByStore(store_id: number, enabled: boolean) {
  return useQuery<ProductTypesResponse>({
    queryKey: ["products", store_id],
    queryFn: () =>
      post({
        endpoint: "/products/index",
        data: { store_id },
      }),
    enabled: !!store_id && enabled,
    refetchInterval: 30000,
  });
}
