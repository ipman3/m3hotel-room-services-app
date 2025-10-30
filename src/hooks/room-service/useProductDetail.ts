{
  /*
    This hook fetches the detailed information of a product by its ID.
    @component: /roomservice/ServiceDetailSheet
  */
}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";

export interface ProductDetail {
  id: number;
  code: string;
  store_id: number;
  name: string;
  category_id: number;
  cost: string;
  price: string;
  tax: number;
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
  category_name: string;
}

interface ProductDetailResponse {
  code: number;
  msg: string;
  time: string;
  data: ProductDetail;
}

export function useProductDetail(id: number) {
  return useQuery<ProductDetailResponse>({
    queryKey: ["productDetail", id],
    queryFn: () =>
      post({
        endpoint: "/products/detail",
        data: { id },
      }),
    enabled: !!id,
  });
}
