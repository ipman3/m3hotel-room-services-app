{
  /*
    This hook fetches the detailed information of a product by its ID.
    @component: /roomservice/ServiceDetailSheet
  */
}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";
import type { ProductTypesResponse } from "@/types/room-service/roomServiceType";

export function useProductDetail(id: number) {
  return useQuery<ProductTypesResponse>({
    queryKey: ["productDetail", id],
    queryFn: () =>
      post({
        endpoint: "/products/detail",
        data: { id },
      }),
    enabled: !!id,
  });
}
