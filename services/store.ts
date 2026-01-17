import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { User, Customer, Invoice, AccountingEntry, Language } from '../types';

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
  // State
  const [user, setUser] = useState<User | null>(null);
  const [lang, setLang] = useState<Language>('ar');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [accounting, setAccounting] = useState<AccountingEntry[]>([]);

  // 1. Initialize: Load Language preference
  useEffect(() => {
    const savedLang = localStorage.getItem('zaidan_lang') as Language;
    if (savedLang) setLang(savedLang);
    
    // Check if user is already logged in (Check session via simple ping or trying to fetch data)
    // For simplicity, we'll let the user login again or check failure on data fetch
    fetchERPData(); 
  }, []);

  // 2. Persist Language
  useEffect(() => localStorage.setItem('zaidan_lang', lang), [lang]);

  // --- API Helper ---
  const fetchERPData = async () => {
    try {
      const res = await fetch('/api/erp/data');
      if (res.ok) {
        const data = await res.json();
        setCustomers(data.customers || []);
        setInvoices(data.invoices || []);
        setAccounting(data.accounting || []);
        // If fetch succeeds, we assume we are admin/logged in (or the endpoint is public, but it is protected in server.js)
        // We can infer user role here if the API returned user info, but for now we trust the login flow.
      } else {
         // If 403/401, we are not logged in as admin
      }
    } catch (error) {
      console.error("Failed to fetch ERP data", error);
    }
  };

  // --- Actions ---
  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  }, []);

  const login = useCallback(async (email: string, pass: string) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        fetchERPData(); // Fetch data after successful login
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      setUser(null);
      setCustomers([]);
      setInvoices([]);
      setAccounting([]);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const addCustomer = useCallback(async (c: Omit<Customer, 'id' | 'balance'>) => {
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(c)
      });
      if (res.ok) {
        const savedCustomer = await res.json();
        setCustomers(prev => [...prev, savedCustomer]);
      }
    } catch (e) { console.error(e); }
  }, []);

  const addInvoice = useCallback(async (inv: Omit<Invoice, 'id' | 'date'>) => {
    try {
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inv)
      });
      if (res.ok) {
        await fetchERPData(); // Refresh all data to sync balances and accounting
      }
    } catch (e) { console.error(e); }
  }, []);

  const addAccountingEntry = useCallback(async (entry: Omit<AccountingEntry, 'id' | 'date'>) => {
    try {
      const res = await fetch('/api/accounting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
      if (res.ok) {
         await fetchERPData(); // Refresh data
      }
    } catch (e) { console.error(e); }
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