import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";

export interface TopSelectionFood {
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

interface TopSelectionFoodsResponse {
  code: number;
  msg: string;
  time: string;
  data: TopSelectionFood[];
}

export function useTopSelectionFoods() {
  return useQuery<TopSelectionFoodsResponse>({
    queryKey: ["topSelectionFoods"],
    queryFn: () =>
      post({
        endpoint: "/products/getTopSelectionFoods",
      }),
  });
}
