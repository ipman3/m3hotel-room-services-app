import type { OrderItems } from "@/types/orderItem";

export const mockOrders: OrderItems[] = [
  {
    id: "1",
    name: "Johny Wick",
    roomNumber: "302",
    orderDate: "2025-10-17",
    orderId: "ORD-001",
    totalAmount: 49.99,
    category: "Wellness & Spa",
    imageUrl:
      "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1065",
    items: [
      {
        serviceName: "products from the market",
        packageName: "Basic",
        date: new Date(),
        time: "10:30",
        price: 9,
        category: "Massage",
        serviceTypeId: 2,
        serviceType: "wellness",
        message: "hello",
        id: "6b841f9e-5126-4bdf-912a-69fb21c27a1d",
        imageUrl:
          "https://images.unsplash.com/photo-1634934044791-44efcd71ac04?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      },
      {
        serviceName: "spirulina smothie",
        packageName: "Basic",
        date: new Date(),
        time: "10:30",
        price: 9,
        category: "Massage",
        serviceTypeId: 2,
        serviceType: "wellness",
        message: "hello",
        id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        imageUrl:
          "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      },
    ],
  },
  {
    id: "2",
    name: "John Cina",
    roomNumber: "302",
    orderDate: "2025-10-17",
    orderId: "ORD-002",
    totalAmount: 19.99,
    category: "Room Service",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
    items: [
      {
        serviceName: "Aromatherapy Massage",
        packageName: "Basic",
        date: new Date(),
        time: "10:30",
        price: 9,
        category: "Massage",
        serviceTypeId: 2,
        serviceType: "wellness",
        message: "hello",
        id: "6b841f9e-5126-4bdf-912a-69fb21c27a1d",
        imageUrl:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
      },
    ],
  },
  {
    id: "3",
    name: "Robert Vonton",
    roomNumber: "305",
    orderDate: "2025-10-17",
    orderId: "ORD-003",
    totalAmount: 79.99,
    category: "Thing To Do",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
    items: [
      {
        serviceName: "Aromatherapy Massage",
        packageName: "Basic",
        date: new Date(),
        time: "10:30",
        price: 9,
        category: "Massage",
        serviceTypeId: 2,
        serviceType: "wellness",
        message: "hello",
        id: "6b841f9e-5126-4bdf-912a-69fb21c27a1d",
        imageUrl:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
      },
    ],
  },
];

export const TABS = ["All", "Room Service", "Wellness & Spa", "Thing To Do"];
