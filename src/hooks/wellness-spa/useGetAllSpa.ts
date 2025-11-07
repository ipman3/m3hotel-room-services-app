{/* 
    This hook fetches all spas
    @component: /Pages/ViewAll/ViewAllSpa
*/}

import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";

export interface GetAllSpa {
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

interface GetAllSpasResponse {
  code: number;
  msg: string;
  time: string;
  data: GetAllSpa[];
}

export function useGetAllSpas(enabled: boolean) {
  return useQuery<GetAllSpasResponse>({
    queryKey: ["getAllSpas"],
    queryFn: () =>
      post({
        endpoint: "/spa/search",
      }),
      enabled: enabled,
  });
}
