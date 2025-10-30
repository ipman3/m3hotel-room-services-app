{
  /* 
  This hook fetches special details offers & News by Id
  @route: /offer/$offerId
  */
}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";

export interface SpecialOfferDetails {
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

interface SpecialOfferDetailsResponse {
  code: number;
  msg: string;
  time: string;
  data: SpecialOfferDetails;
}

export function useSpecialOffersDetails(offerId: number) {
  return useQuery<SpecialOfferDetailsResponse>({
    queryKey: ["specialOffersDetails", offerId],
    queryFn: () =>
      post({
        endpoint: "/products/getSpecialOffersDetail",
        data: { id: offerId }
      }),
  });
}
