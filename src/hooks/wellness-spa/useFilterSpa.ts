import post from "@/lib/Api";
import { useMutation } from "@tanstack/react-query";

interface SpaSearchParams {
  q: string;
  category?: number;
  price?: string;
}

export const useSpaSearchMutation = () => {
  return useMutation({
    mutationFn: async (variables: Partial<SpaSearchParams>) => {
      const Payload = { ...variables };
      return await post({
        endpoint: "/spa/search",
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
      console.error("Error searching spa:", error);
    },
  });
};
