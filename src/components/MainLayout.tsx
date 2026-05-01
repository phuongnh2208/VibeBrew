import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-brand-surface">
      <Sidebar />
      <div className="ml-64">
        <TopBar />
        <main className="p-8 pt-24">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
