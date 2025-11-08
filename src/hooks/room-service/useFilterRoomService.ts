import post from "@/lib/Api";
import { useMutation } from "@tanstack/react-query";

interface RoomServiceSearchParams {
  q: string;
  category?: number;
  price?: string;
}

export const useRoomServiceSearchMutation = () => {
  return useMutation({
    mutationFn: async (variables: Partial<RoomServiceSearchParams>) => {
      const Payload = { ...variables };
      return await post({
        endpoint: "/products/search",
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
