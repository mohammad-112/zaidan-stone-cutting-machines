export type Language = 'ar' | 'en';

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  image: string;
  power: string;
  weight: string;
  workingArea: string;
  descriptionAr: string;
  descriptionEn: string;
}

export interface User {
  email: string;
  role: 'admin' | 'user';
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  balance: number;
}

export interface Invoice {
  id: string;
  customerId: string;
  customerName: string;
  machineType: string;
  amount: number;
  date: string;
  details: string;
}

export interface AccountingEntry {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
}

export interface Translation {
  [key: string]: {
    ar: string;
    en: string;
  };
}