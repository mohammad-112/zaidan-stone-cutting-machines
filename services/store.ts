import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { User, Customer, Invoice, AccountingEntry, Language } from '../types';
import { ADMIN_CREDENTIALS } from '../constants';

// --- Interfaces ---
interface StoreContextType {
  // Auth
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  // Language
  lang: Language;
  toggleLang: () => void;
  // Data (ERP)
  customers: Customer[];
  invoices: Invoice[];
  accounting: AccountingEntry[];
  addCustomer: (c: Omit<Customer, 'id' | 'balance'>) => void;
  addInvoice: (i: Omit<Invoice, 'id' | 'date'>) => void;
  addAccountingEntry: (e: Omit<AccountingEntry, 'id' | 'date'>) => void;
}

// --- Context ---
const StoreContext = createContext<StoreContextType | null>(null);

// --- Hook ---
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};

// --- Provider ---
export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // --- STATE (The Database in Memory) ---
  const [user, setUser] = useState<User | null>(null);
  const [lang, setLang] = useState<Language>('ar');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [accounting, setAccounting] = useState<AccountingEntry[]>([]);

  // --- INIT (Load from LocalStorage) ---
  useEffect(() => {
    // 1. Language
    const savedLang = localStorage.getItem('zaidan_lang') as Language;
    if (savedLang) setLang(savedLang);

    // 2. User Session
    const savedUser = localStorage.getItem('zaidan_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    // 3. Database Tables
    const savedCustomers = localStorage.getItem('zaidan_customers');
    if (savedCustomers) setCustomers(JSON.parse(savedCustomers));

    const savedInvoices = localStorage.getItem('zaidan_invoices');
    if (savedInvoices) setInvoices(JSON.parse(savedInvoices));

    const savedAccounting = localStorage.getItem('zaidan_accounting');
    if (savedAccounting) setAccounting(JSON.parse(savedAccounting));
  }, []);

  // --- PERSISTENCE (Save to LocalStorage on Change) ---
  useEffect(() => localStorage.setItem('zaidan_lang', lang), [lang]);
  
  useEffect(() => {
    if (user) localStorage.setItem('zaidan_user', JSON.stringify(user));
    else localStorage.removeItem('zaidan_user');
  }, [user]);

  useEffect(() => localStorage.setItem('zaidan_customers', JSON.stringify(customers)), [customers]);
  useEffect(() => localStorage.setItem('zaidan_invoices', JSON.stringify(invoices)), [invoices]);
  useEffect(() => localStorage.setItem('zaidan_accounting', JSON.stringify(accounting)), [accounting]);


  // --- ACTIONS ---
  
  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  }, []);

  const login = useCallback(async (email: string, pass: string) => {
    // Simulate delay for realism
    await new Promise(r => setTimeout(r, 500));
    
    // Check credentials (client-side check for static app)
    if (email === ADMIN_CREDENTIALS.email && pass === ADMIN_CREDENTIALS.password) {
      setUser({ email, role: 'admin' });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const addCustomer = useCallback((c: Omit<Customer, 'id' | 'balance'>) => {
    const newCustomer: Customer = { ...c, id: Date.now().toString(), balance: 0 };
    setCustomers(prev => [...prev, newCustomer]);
  }, []);

  const addInvoice = useCallback((inv: Omit<Invoice, 'id' | 'date'>) => {
    const amount = Number(inv.amount);
    const date = new Date().toISOString().split('T')[0];
    
    const newInvoice: Invoice = { 
      ...inv, 
      id: Date.now().toString(), 
      date,
      amount
    };
    
    // 1. Add Invoice
    setInvoices(prev => [...prev, newInvoice]);

    // 2. Update Customer Balance
    setCustomers(prev => prev.map(c => 
      c.id === inv.customerId ? { ...c, balance: c.balance + amount } : c
    ));

    // 3. Add to Accounting (Auto Income)
    const newEntry: AccountingEntry = {
      id: `acc_${Date.now()}`,
      type: 'income',
      amount,
      description: `Invoice #${newInvoice.id} - ${inv.customerName}`,
      date
    };
    setAccounting(prev => [...prev, newEntry]);

  }, []);

  const addAccountingEntry = useCallback((entry: Omit<AccountingEntry, 'id' | 'date'>) => {
    const newEntry: AccountingEntry = { 
      ...entry, 
      id: Date.now().toString(), 
      date: new Date().toISOString().split('T')[0] 
    };
    setAccounting(prev => [...prev, newEntry]);
  }, []);

  return React.createElement(StoreContext.Provider, {
    value: {
      user, login, logout,
      lang, toggleLang,
      customers, invoices, accounting,
      addCustomer, addInvoice, addAccountingEntry
    }
  }, children);
};