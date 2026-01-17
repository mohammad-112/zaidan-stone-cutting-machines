import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './services/store';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';

// NOTE: This application is implemented as a React Single Page Application (SPA).
// Backend logic (Authentication, Database, ERP) is simulated using React Context and LocalStorage
// to meet the requirement of a "handful of files" and strict React/Tailwind constraint of the output format.
// In a production environment with Node.js/SQLite, the `services/store.ts` would be replaced
// by API calls to the Express endpoints.

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Catch all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </StoreProvider>
  );
};

export default App;