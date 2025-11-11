{
  /* 
  This hook fetches special all offers & News
  @route: /offer
  */
}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";

export interface SpecialOffer {
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

interface SpecialOffersResponse {
  code: number;
  msg: string;
  time: string;
  data: SpecialOffer[];
}

export function useSpecialOffers() {
  return useQuery<SpecialOffersResponse>({
    queryKey: ["specialOffers", "spa"],
    queryFn: () =>
      post({
        endpoint: "/products/getSpecialOfferByType",
        data: { type: "spa" },
      }),
      refetchInterval: 30000,
  });
}
