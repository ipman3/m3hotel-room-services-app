

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";

export interface SpecialOfferByType {
  id: number;
  name: string;
  short_desc: string;
  desc: string;
  image: string;
  service_type: string;
  status: string;
  createtime: number;
  updatetime: number;
  sort: number;
}

interface SpecialOffersByTypeResponse {
  code: number;
  msg: string;
  time: string;
  data: SpecialOfferByType[];
}

export function useSpecialOffersByType(type: string) {
  return useQuery<SpecialOffersByTypeResponse>({
    queryKey: ["specialOffers", type],
    queryFn: () =>
      post({
        endpoint: "/products/getSpecialOfferByType",
        data: { type },
      }),
  });
}
