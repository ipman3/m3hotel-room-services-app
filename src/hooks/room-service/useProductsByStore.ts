// import { useQuery } from "@tanstack/react-query";
// import post from "@/lib/Api";

// export interface Product {
//   id: number;
//   code: string;
//   store_id: number;
//   name: string;
//   category_id: number;
//   cost: string;
//   price: string;
//   tax: number;
//   discount: string;
//   color: string;
//   unit: string;
//   description: string;
//   photo: string;
//   photothumb: string;
//   supplier_id: number;
//   type: string;
//   alertqt: number;
//   taxmethod: number;
//   h_stores: string;
//   parent_id: number | null;
//   options: string;
//   weigh: number;
//   status: string;
//   createtime: number;
//   updatetime: number;
// }

// export interface ProductsResponse {
//   code: number;
//   msg: string;
//   time: string;
//   data: {
//     total: number;
//     per_page: number;
//     current_page: number;
//     last_page: number;
//     data: Product[];
//   };
// }

// export function useProductsByStore(store_id: number) {
//   return useQuery<ProductsResponse>({
//     queryKey: ["products", store_id],
//     queryFn: () =>
//       post({
//         endpoint: "/products/index",
//         data: { store_id },
//       }),
//     enabled: !!store_id,
//   });
// }
