import React from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  MoreVertical,
  ShieldCheck,
  Package,
  Clock,
  Star
} from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';

const SUPPLIERS_DATA = [
  { 
    id: 'S1', 
    name: 'Nhà cung cấp Sữa Đà Lạt', 
    contact: 'Nguyễn Văn Nam', 
    phone: '0901 234 567', 
    email: 'nam.nv@dalatmilk.vn',
    address: 'Lâm Đồng, Việt Nam',
    rating: 4.8,
    category: 'Thực phẩm tươi',
    totalOrders: 156,
    status: 'ACTIVE'
  },
  { 
    id: 'S2', 
    name: 'Kho Trà Vibe Brew HQ', 
    contact: 'Trần Thị Huệ', 
    phone: '028 999 888', 
    email: 'supply@vibebrew.vn',
    address: 'Hồ Chí Minh, Việt Nam',
    rating: 5.0,
    category: 'Nguyên liệu độc quyền',
    totalOrders: 284,
    status: 'ACTIVE'
  },
  { 
    id: 'S3', 
    name: 'Công ty Bao bì Xanh', 
    contact: 'Phạm Quang Vinh', 
    phone: '0988 555 444', 
    email: 'vinh.pq@greenpack.com',
    address: 'Bình Dương, Việt Nam',
    rating: 4.2,
    category: 'Vật tư tiêu hao',
    totalOrders: 42,
    status: 'WARNING'
  }
];

const Suppliers = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-extrabold text-zinc-800 tracking-tight">NHÀ CUNG CẤP</h2>
          <p className="text-zinc-500 font-medium italic">Quản lý mạng lưới đối tác cung ứng vật tư của hệ thống.</p>
        </div>
        <button className="px-8 py-4 bg-zinc-900 text-white rounded-[2rem] font-bold text-sm shadow-xl hover:bg-zinc-800 flex items-center gap-2 transition-all active:scale-95">
          <Plus size={20} /> Thêm đối tác mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SupplierStat label="Đối tác chiến lược" value="12" icon={Star} color="teal" />
        <SupplierStat label="Đang chờ thanh toán" value={formatCurrency(45000000)} icon={Clock} color="orange" />
        <SupplierStat label="Độ tin cậy hệ thống" value="98%" icon={ShieldCheck} color="green" />
      </div>

      <div className="glass-card bg-white rounded-[48px] border border-zinc-100 shadow-sm overflow-hidden ambient-shadow">
        <div className="p-8 border-b border-zinc-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm đối tác, số điện thoại..." 
              className="w-full pl-12 pr-6 py-4 bg-zinc-100 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-brand-teal/20 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-4 bg-zinc-50 rounded-2xl text-zinc-400 hover:text-brand-teal transition-all border border-transparent hover:border-brand-teal/20">
              <Package size={22} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100">Đối tác</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100">Liên hệ</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100">Lĩnh vực</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100">Đánh giá</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100 text-center">Giao dịch</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {SUPPLIERS_DATA.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-zinc-50/20 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-brand-teal group-hover:text-white transition-all">
                        <Users size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-zinc-800 text-sm uppercase tracking-tight">{supplier.name}</p>
                        <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest">{supplier.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-zinc-700">
                        <Phone size={12} className="text-zinc-300" /> {supplier.phone}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-400">
                        <Mail size={12} className="text-zinc-300" /> {supplier.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                      {supplier.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-1.5 text-orange-500">
                      <Star size={14} fill="currentColor" />
                      <span className="font-black text-sm">{supplier.rating}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <p className="text-xs font-black text-zinc-800">{supplier.totalOrders}</p>
                    <p className="text-[9px] font-medium text-zinc-400 uppercase tracking-widest">Đơn hàng</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-3 text-zinc-300 hover:text-brand-teal transition-all">
                      <ExternalLink size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SupplierStat = ({ label, value, icon: Icon, color }: any) => {
  const colors = {
    teal: "text-brand-teal bg-teal-50",
    green: "text-brand-green bg-green-50",
    orange: "text-orange-500 bg-orange-50"
  };
  return (
    <div className="glass-card bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm flex items-center gap-6">
      <div className={cn("p-4 rounded-2xl", colors[color])}>
        <Icon size={28} />
      </div>
      <div>
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">{label}</p>
        <p className="text-2xl font-black text-zinc-800 tracking-tight">{value}</p>
      </div>
    </div>
  );
};

export default Suppliers;
