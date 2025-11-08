export interface ProductType {
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
}

export interface ProductTypesResponse {
  code: number;
  msg: string;
  time: string;
  data: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    data: ProductType[];
  };
}