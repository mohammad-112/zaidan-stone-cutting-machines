import React, { useState } from 'react';
import { useStore } from '../services/store';
import { TEXTS } from '../constants';
import { Users, FileText, PieChart, Plus, Search, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { user, lang, customers, invoices, accounting, addCustomer, addInvoice, addAccountingEntry } = useStore();
  const t = (key: string) => TEXTS[key][lang];
  
  const [activeTab, setActiveTab] = useState<'customers' | 'invoices' | 'accounting'>('customers');

  // Forms State
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [newCust, setNewCust] = useState({ name: '', phone: '' });

  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [newInv, setNewInv] = useState({ customerId: '', machineType: '', details: '', amount: '' });

  const [showAddAcc, setShowAddAcc] = useState(false);
  const [newAcc, setNewAcc] = useState({ type: 'expense', amount: '', description: '' });

  // Access Control
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  // --- Handlers ---
  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if(newCust.name) {
        addCustomer(newCust);
        setNewCust({ name: '', phone: '' });
        setShowAddCustomer(false);
    }
  };

  const handleAddInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customers.find(c => c.id === newInv.customerId);
    if(cust && newInv.amount) {
        addInvoice({
            customerId: newInv.customerId,
            customerName: cust.name,
            machineType: newInv.machineType,
            details: newInv.details,
            amount: Number(newInv.amount)
        });
        setNewInv({ customerId: '', machineType: '', details: '', amount: '' });
        setShowAddInvoice(false);
    }
  };

  const handleAddAcc = (e: React.FormEvent) => {
      e.preventDefault();
      if(newAcc.amount) {
          addAccountingEntry({
              type: newAcc.type as 'income' | 'expense',
              amount: Number(newAcc.amount),
              description: newAcc.description
          });
          setNewAcc({ type: 'expense', amount: '', description: '' });
          setShowAddAcc(false);
      }
  };

  // --- Stats Calculation ---
  const totalIncome = accounting.filter(a => a.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = accounting.filter(a => a.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const netProfit = totalIncome - totalExpense;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-brand-dark min-h-screen">
      
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('admin')} Dashboard</h1>
          <p className="text-gray-400 text-sm">Welcome back, {user.email}</p>
        </div>
        <div className="flex bg-brand-stone p-1 rounded-lg border border-gray-700">
          <button 
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2 ${activeTab === 'customers' ? 'bg-brand-primary text-brand-dark shadow' : 'text-gray-400 hover:text-white'}`}
          >
            <Users size={16} /> {t('customers')}
          </button>
          <button 
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2 ${activeTab === 'invoices' ? 'bg-brand-primary text-brand-dark shadow' : 'text-gray-400 hover:text-white'}`}
          >
            <FileText size={16} /> {t('invoices')}
          </button>
          <button 
            onClick={() => setActiveTab('accounting')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2 ${activeTab === 'accounting' ? 'bg-brand-primary text-brand-dark shadow' : 'text-gray-400 hover:text-white'}`}
          >
            <PieChart size={16} /> {t('accounting')}
          </button>
        </div>
      </div>

      {/* --- Tab Content: Customers --- */}
      {activeTab === 'customers' && (
        <div className="animate-fade-in space-y-6">
          <div className="flex justify-between items-center">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-500 rtl:right-3 rtl:left-auto" size={18} />
              <input type="text" placeholder="Search customers..." className="pl-10 pr-4 py-2 bg-brand-stone border border-gray-700 rounded-lg text-white text-sm focus:ring-1 focus:ring-brand-primary outline-none w-64 rtl:pr-10 rtl:pl-4" />
            </div>
            <button onClick={() => setShowAddCustomer(!showAddCustomer)} className="bg-brand-primary hover:bg-amber-400 text-brand-dark px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
              <Plus size={18} /> {t('addCustomer')}
            </button>
          </div>

          {showAddCustomer && (
            <div className="bg-brand-stone p-6 rounded-xl border border-gray-700 animate-slide-up">
               <h3 className="text-white font-bold mb-4">{t('addCustomer')}</h3>
               <form onSubmit={handleAddCustomer} className="flex flex-col md:flex-row gap-4">
                 <input 
                   placeholder={t('name')} 
                   value={newCust.name} onChange={e => setNewCust({...newCust, name: e.target.value})}
                   className="bg-brand-dark border border-gray-700 rounded p-2 text-white flex-1" required 
                 />
                 <input 
                   placeholder={t('phone')} 
                   value={newCust.phone} onChange={e => setNewCust({...newCust, phone: e.target.value})}
                   className="bg-brand-dark border border-gray-700 rounded p-2 text-white flex-1" required
                 />
                 <button type="submit" className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded font-medium">Save</button>
               </form>
            </div>
          )}

          <div className="bg-brand-stone rounded-xl border border-gray-700 overflow-hidden">
            <table className="w-full text-left rtl:text-right">
              <thead className="bg-gray-800 text-gray-400 text-sm uppercase">
                <tr>
                  <th className="p-4">{t('name')}</th>
                  <th className="p-4">{t('phone')}</th>
                  <th className="p-4">{t('balance')}</th>
                  <th className="p-4">ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {customers.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-gray-500">No customers found.</td></tr>
                ) : (
                  customers.map(c => (
                    <tr key={c.id} className="text-gray-300 hover:bg-gray-800/50">
                      <td className="p-4 font-medium text-white">{c.name}</td>
                      <td className="p-4">{c.phone}</td>
                      <td className="p-4 font-mono text-brand-primary font-bold">${c.balance.toLocaleString()}</td>
                      <td className="p-4 text-xs text-gray-600 font-mono">{c.id}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- Tab Content: Invoices --- */}
      {activeTab === 'invoices' && (
        <div className="animate-fade-in space-y-6">
           <div className="flex justify-end">
            <button onClick={() => setShowAddInvoice(!showAddInvoice)} className="bg-brand-primary hover:bg-amber-400 text-brand-dark px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
              <Plus size={18} /> {t('createInvoice')}
            </button>
          </div>

          {showAddInvoice && (
            <div className="bg-brand-stone p-6 rounded-xl border border-gray-700 animate-slide-up">
               <h3 className="text-white font-bold mb-4">{t('createInvoice')}</h3>
               <form onSubmit={handleAddInvoice} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <select 
                    value={newInv.customerId} onChange={e => setNewInv({...newInv, customerId: e.target.value})}
                    className="bg-brand-dark border border-gray-700 rounded p-2 text-white" required
                 >
                   <option value="">Select Customer</option>
                   {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                 </select>
                 <input 
                   placeholder="Machine Type" 
                   value={newInv.machineType} onChange={e => setNewInv({...newInv, machineType: e.target.value})}
                   className="bg-brand-dark border border-gray-700 rounded p-2 text-white" required 
                 />
                 <input 
                   placeholder={t('amount')} type="number"
                   value={newInv.amount} onChange={e => setNewInv({...newInv, amount: e.target.value})}
                   className="bg-brand-dark border border-gray-700 rounded p-2 text-white" required 
                 />
                 <input 
                   placeholder={t('details')} 
                   value={newInv.details} onChange={e => setNewInv({...newInv, details: e.target.value})}
                   className="bg-brand-dark border border-gray-700 rounded p-2 text-white" 
                 />
                 <button type="submit" className="md:col-span-2 bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded font-medium mt-2">Create Invoice</button>
               </form>
            </div>
          )}

          <div className="bg-brand-stone rounded-xl border border-gray-700 overflow-hidden">
            <table className="w-full text-left rtl:text-right">
              <thead className="bg-gray-800 text-gray-400 text-sm uppercase">
                <tr>
                  <th className="p-4">Inv #</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Machine</th>
                  <th className="p-4">{t('date')}</th>
                  <th className="p-4">{t('amount')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {invoices.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-gray-500">No invoices yet.</td></tr>
                ) : (
                  invoices.map(inv => (
                    <tr key={inv.id} className="text-gray-300 hover:bg-gray-800/50">
                      <td className="p-4 text-xs font-mono">{inv.id}</td>
                      <td className="p-4 font-medium text-white">{inv.customerName}</td>
                      <td className="p-4">{inv.machineType}</td>
                      <td className="p-4 text-sm text-gray-500">{inv.date}</td>
                      <td className="p-4 font-mono text-brand-primary font-bold">${inv.amount.toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- Tab Content: Accounting --- */}
      {activeTab === 'accounting' && (
        <div className="animate-fade-in space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-brand-stone p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 text-green-500 mb-2">
                <TrendingUp size={20} />
                <span className="text-sm font-medium uppercase tracking-wider">{t('totalIncome')}</span>
              </div>
              <div className="text-2xl font-bold text-white font-mono">${totalIncome.toLocaleString()}</div>
            </div>
            <div className="bg-brand-stone p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 text-red-400 mb-2">
                <TrendingDown size={20} />
                <span className="text-sm font-medium uppercase tracking-wider">{t('totalExpense')}</span>
              </div>
              <div className="text-2xl font-bold text-white font-mono">${totalExpense.toLocaleString()}</div>
            </div>
            <div className="bg-brand-stone p-6 rounded-xl border border-gray-700 relative overflow-hidden">
              <div className="absolute right-0 top-0 p-4 opacity-5">
                <DollarSign size={80} />
              </div>
              <div className="flex items-center gap-3 text-brand-primary mb-2">
                <DollarSign size={20} />
                <span className="text-sm font-medium uppercase tracking-wider">{t('netProfit')}</span>
              </div>
              <div className={`text-2xl font-bold font-mono ${netProfit >= 0 ? 'text-white' : 'text-red-400'}`}>
                ${netProfit.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={() => setShowAddAcc(!showAddAcc)} className="bg-brand-primary hover:bg-amber-400 text-brand-dark px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
              <Plus size={18} /> {t('addEntry')}
            </button>
          </div>

          {showAddAcc && (
            <div className="bg-brand-stone p-6 rounded-xl border border-gray-700 animate-slide-up">
               <h3 className="text-white font-bold mb-4">{t('addEntry')}</h3>
               <form onSubmit={handleAddAcc} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <select 
                    value={newAcc.type} onChange={e => setNewAcc({...newAcc, type: e.target.value})}
                    className="bg-brand-dark border border-gray-700 rounded p-2 text-white"
                 >
                   <option value="income">{t('income')}</option>
                   <option value="expense">{t('expense')}</option>
                 </select>
                 <input 
                   placeholder={t('amount')} type="number"
                   value={newAcc.amount} onChange={e => setNewAcc({...newAcc, amount: e.target.value})}
                   className="bg-brand-dark border border-gray-700 rounded p-2 text-white" required 
                 />
                 <input 
                   placeholder="Description" 
                   value={newAcc.description} onChange={e => setNewAcc({...newAcc, description: e.target.value})}
                   className="bg-brand-dark border border-gray-700 rounded p-2 text-white md:col-span-2" required
                 />
                 <button type="submit" className="md:col-span-2 bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded font-medium mt-2">Add Entry</button>
               </form>
            </div>
          )}

          <div className="bg-brand-stone rounded-xl border border-gray-700 overflow-hidden">
            <table className="w-full text-left rtl:text-right">
              <thead className="bg-gray-800 text-gray-400 text-sm uppercase">
                <tr>
                  <th className="p-4">{t('date')}</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">{t('type')}</th>
                  <th className="p-4">{t('amount')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {accounting.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-gray-500">No entries recorded.</td></tr>
                ) : (
                  accounting.map(acc => (
                    <tr key={acc.id} className="text-gray-300 hover:bg-gray-800/50">
                      <td className="p-4 text-sm text-gray-500">{acc.date}</td>
                      <td className="p-4">{acc.description}</td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded font-bold uppercase ${acc.type === 'income' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                          {acc.type === 'income' ? t('income') : t('expense')}
                        </span>
                      </td>
                      <td className={`p-4 font-mono font-bold ${acc.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                        {acc.type === 'expense' && '-'}${acc.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};