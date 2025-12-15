import React from 'react';

// --- Data Models ---
export interface SalesData {
  name: string;
  China: number;
  UAE: number;
  USA: number;
  Canada: number;
  Other: number;
}

export interface SubscriberData {
  day: string;
  value: number;
}

export interface Integration {
  id: string;
  name: string;
  type: string;
  rate: number;
  profit: number;
  icon: string;
  active: boolean;
}

export interface SalesDistributionData {
  name: string;
  value: number;
  color: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  stock: number | string;
  category: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  spent: string;
}

export interface InvoiceData {
  id: string;
  client: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
}

// --- Component Props ---
export interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon?: React.ReactNode;
}

// --- Navigation ---
export interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: string | number;
  role?: string;
}

export interface MenuSection {
  category: string;
  items: MenuItem[];
}

// --- Auth ---
export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}