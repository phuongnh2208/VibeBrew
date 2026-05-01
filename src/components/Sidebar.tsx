import React from 'react';
import { useAuth } from '../AuthContext';
import { 
  LayoutDashboard, 
  Store,
  History, 
  Package, 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Coffee,
  Ticket,
  ShieldCheck,
  LogOut,
  CreditCard,
  Calendar
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const menuItems = [
    { icon: CreditCard, label: 'Bán hàng (POS)', path: '/pos', roles: ['STAFF', 'BRANCH_MANAGER'] },
    { icon: History, label: 'Lịch sử đơn', path: '/history', roles: ['STAFF', 'BRANCH_MANAGER'] },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', roles: ['BRANCH_MANAGER', 'OPERATIONS_MANAGER', 'ADMIN'] },
    { icon: Calendar, label: 'Quản lý ca', path: '/shifts', roles: ['BRANCH_MANAGER', 'ADMIN'] },
    { icon: Package, label: 'Kho hàng', path: '/inventory', roles: ['BRANCH_MANAGER', 'STAFF', 'ADMIN'] },
    { icon: Users, label: 'Nhà cung cấp', path: '/suppliers', roles: ['ADMIN', 'BRANCH_MANAGER', 'OPERATIONS_MANAGER'] },
    { icon: BookOpen, label: 'Recipe/Công thức', path: '/recipe', roles: ['ADMIN', 'BRANCH_MANAGER', 'STAFF'] },
    { icon: Users, label: 'CRM Khách hàng', path: '/crm', roles: ['ADMIN', 'BRANCH_MANAGER', 'OPERATIONS_MANAGER'] },
    { icon: BarChart3, label: 'Báo cáo', path: '/analytics', roles: ['ADMIN', 'BRANCH_MANAGER', 'OPERATIONS_MANAGER'] },
    { icon: Ticket, label: 'Khuyến mãi', path: '/promotions', roles: ['ADMIN', 'OPERATIONS_MANAGER', 'BRANCH_MANAGER'] },
    { icon: ShieldCheck, label: 'Audit Log', path: '/audit', roles: ['ADMIN'] },
    { icon: Settings, label: 'Hệ thống', path: '/settings', roles: ['ADMIN', 'BRANCH_MANAGER', 'OPERATIONS_MANAGER'] },
  ].filter(item => item.roles.includes(user.role));

  const roleLabel = {
    'ADMIN': 'System Admin',
    'OPERATIONS_MANAGER': 'HQ Ops Manager',
    'BRANCH_MANAGER': 'Store Manager',
    'STAFF': 'Store Staff'
  }[user.role];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-brand-teal/10 bg-white/80 backdrop-blur-xl flex flex-col py-6 px-4 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="pb-6 px-2 flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center text-white">
          <Coffee size={24} />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-brand-green leading-none">Vibe Brew</h1>
          <p className="text-[10px] font-semibold text-brand-teal tracking-wider uppercase opacity-80">
            {roleLabel}
          </p>
        </div>
      </div>

      <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-150 group",
                isActive 
                  ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20" 
                  : "text-zinc-600 hover:text-brand-teal hover:bg-teal-50"
              )}
            >
              <Icon size={20} className={cn(isActive && "fill-white/20")} />
              <span className="font-plus-jakarta text-[13px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-brand-teal/5 space-y-2">
        <Link to="/help" className="flex items-center gap-3 text-zinc-600 hover:text-brand-teal px-4 py-3 rounded-full transition-all font-plus-jakarta text-[13px] font-semibold">
          <HelpCircle size={20} />
          <span>Trợ giúp</span>
        </Link>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 text-red-500 hover:bg-red-50 px-4 py-3 rounded-full transition-all font-plus-jakarta text-[13px] font-semibold"
        >
          <LogOut size={20} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
