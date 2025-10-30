{
  /* 
  This hook fetches all popular foods
  @component: /roomservice/PopularServiceSection
  */
}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";

export interface PopularFood {
  id: number;
  code: string;
  store_id: number;
  name: string;
  category_id: number;
  cost: string;
  price: string;
  tax: string;
  discount: string;
  color: string;
  unit: string;
  description: string;
  photo: string;
  photothumb: string;
  supplier_id: number;
  type: string;
  alertqt: number;
  taxmethod: number;
  h_stores: string;
  parent_id: number | null;
  options: string;
  weigh: number;
  status: string;
  createtime: number;
  updatetime: number;
}

interface PopularFoodsResponse {
  code: number;
  msg: string;
  time: string;
  data: PopularFood[];
}

export function usePopularFoods() {
  return useQuery<PopularFoodsResponse>({
    queryKey: ["popularFoods"],
    queryFn: () =>
      post({
        endpoint: "/products/getPopularFoods",
      }),
  });
}
