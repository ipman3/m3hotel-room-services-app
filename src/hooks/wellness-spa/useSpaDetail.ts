{
  /*
    This hook fetches the detailed information of a spa by its ID.
    @component: /WellnessAndSpa/ServiceDetailSheet
  */
}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";

export interface SpaDetail {
  id: number;
  name: string;
  short_desc: string;
  desc: string;
  image: string;
  images: string[];
  price: string;
  unit: string;
  status: string;
  category_id: number;
}

interface SpaDetailResponse {
  code: number;
  msg: string;
  time: string;
  data: SpaDetail;
}

export function useSpaDetail(id: number) {
  return useQuery<SpaDetailResponse>({
    queryKey: ["spaDetail", id],
    queryFn: () =>
      post({
        endpoint: "/spa/detail",
        data: { id },
      }),
    enabled: !!id,
  });
}
