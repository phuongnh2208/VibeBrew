export type Role = 'OPERATIONS_MANAGER' | 'BRANCH_MANAGER' | 'STAFF' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  branchId?: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  managerId: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isBestSeller?: boolean;
  isAvailable: boolean;
}

export interface Transaction {
  id: string;
  customerName: string;
  timestamp: string;
  items: string[];
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
  total: number;
  paymentMethod: string;
  branchId: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'KIM CƯƠNG' | 'VÀNG' | 'BẠC' | 'ĐỒNG';
  points: number;
  totalSpent: number;
  avatar: string;
}
