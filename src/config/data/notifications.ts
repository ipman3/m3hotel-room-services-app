export interface Notification {
  id: string;
  date: string; 
  price: number;
  qty: number;
  invoiceId: string;
}

export const notificationItems: Notification[] = [
  {
    id: "1",
    date: "2025-08-05T22:19:00Z",
    price: 55.00,
    qty: 5,
    invoiceId: "822632",
  },
  {
    id: "2",
    date: "2025-08-06T22:19:00Z",
    price: 20.00,
    qty: 2,
    invoiceId: "822632",
  },
  {
    id: "3",
    date: "2025-08-07T22:19:00Z",
    price: 55.00,
    qty: 5,
    invoiceId: "822632",
  },
  {
    id: "4",
    date: "2025-08-07T22:19:00Z",
    price: 55.00,
    qty: 5,
    invoiceId: "822632",
  },
];
