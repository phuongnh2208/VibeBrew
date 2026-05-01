import React from 'react';
import { useAuth } from '../AuthContext';
import { Search, Bell, Settings, MapPin, LogOut, RefreshCw } from 'lucide-react';
import { MOCK_BRANCHES } from '../mockData';

const TopBar = () => {
  const { user, logout } = useAuth();
  if (!user) return null;

  const userBranch = MOCK_BRANCHES.find(b => b.id === user.branchId);

  return (
    <header className="fixed top-0 right-0 left-64 bg-white/70 backdrop-blur-md border-b border-brand-teal/10 h-16 flex justify-between items-center px-6 z-40 shadow-sm">
      <div className="flex items-center gap-4">
        <h1 className="font-h3 text-brand-teal tracking-tight text-xl font-bold">Vibe Brew</h1>
        <div className="h-6 w-[1px] bg-zinc-200"></div>
        <div className="flex items-center gap-2 bg-zinc-100 px-3 py-1.5 rounded-full cursor-pointer hover:bg-zinc-200 transition-colors">
          <MapPin size={16} className="text-brand-primary" />
          <span className="font-plus-jakarta text-sm font-semibold text-zinc-700">
            {userBranch ? userBranch.name : 'Vibe Brew HQ'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group hidden lg:block">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-teal transition-colors" />
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            className="pl-10 pr-4 py-2 bg-zinc-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-brand-teal/20 transition-all font-be-vietnam"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-zinc-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-zinc-800 leading-none">{user.name}</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mt-1">{user.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-teal/20">
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button 
              onClick={logout}
              className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
              title="Đăng xuất"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
