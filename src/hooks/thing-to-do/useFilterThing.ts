import post from "@/lib/Api";
import { useMutation } from "@tanstack/react-query";

interface ThingSearchParams {
  q: string;
  category?: number;
  price?: string;
}

export const useThingSearchMutation = () => {
  return useMutation({
    mutationFn: async (variables: Partial<ThingSearchParams>) => {
      const Payload = { ...variables };
      return await post({
        endpoint: "/tourpackage/search",
        data: Payload
      });
    },
    onSuccess: (data) => {
      if (data.code === 1) {
        console.log("Search success:", data.data);
      } else {
        console.error("Search failed:", data.msg);
      }
    },
    onError: (error) => {
      console.error("Error searching tour packages:", error);
    },
  });
};
