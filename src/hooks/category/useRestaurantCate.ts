import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";

interface Category {
  id: number;
  store_id: number;
  name: string;
  weigh: number;
  status: string;
  createtime: number;
  updatetime: number;
  service_type: string;
  parent_id: number;
}

interface ApiResponse {
  code: number;
  msg: string;
  time: string;
  data: Category[];
}

export function useCategories(type: string) {
  return useQuery<ApiResponse>({
    queryKey: ["categories", type],
    queryFn: () =>
      post({
        endpoint: "/products/getCategoryByType",
        data: {
          type: type,
        },
      }),
    enabled: !!type,
    refetchInterval: 30000,
  });
}
