import { useQuery } from "@tanstack/react-query";
import post from "@/lib/Api";

export function useTopSelectionFoods() {
  return useQuery({
    queryKey: ["topSelectionFoods"],
    queryFn: () =>
      post({
        endpoint: "/products/getTopSelectionFoods",
      }),
      refetchInterval: 30000,
  });
}
