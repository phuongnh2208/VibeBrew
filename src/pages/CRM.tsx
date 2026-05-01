import React from 'react';
import { Users, UserPlus, Filter, Download, MoreHorizontal, Diamond, Award, Medal, Search, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

const customers = [
  { id: 'c1', name: 'Lê Minh Đăng', email: 'dang.le@gmail.com', phone: '090 123 4567', tier: 'KIM CƯƠNG', spent: 15400000, points: 1250, initials: 'LD' },
  { id: 'c2', name: 'Nguyễn Thu Hà', email: 'ha.nth@outlook.com', phone: '091 876 5432', tier: 'VÀNG', spent: 8250000, points: 840, initials: 'NH' },
  { id: 'c3', name: 'Phạm Anh Tuấn', email: 'tuan.pa@vibe.vn', phone: '093 334 4455', tier: 'BẠC', spent: 3100000, points: 310, initials: 'PT' },
];

const OrderHistory = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
           <nav className="flex items-center gap-2 text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-2">
            <span>CRM</span>
            <ChevronRight size={12} />
            <span className="text-brand-teal">Danh sách Khách hàng</span>
          </nav>
          <h2 className="text-3xl font-bold text-zinc-800">Quản lý Khách hàng</h2>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-zinc-200 text-zinc-700 font-bold rounded-full shadow-sm hover:border-brand-teal transition-all">
            <Download size={18} />
            Xuất báo cáo
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-brand-green text-white font-bold rounded-full shadow-lg shadow-green-900/10 hover:shadow-green-900/20 active:scale-95 transition-all">
            <UserPlus size={18} />
            Thêm khách hàng
          </button>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatBento title="Tổng khách hàng" value="12,842" icon={Users} color="teal" trend="+12% tháng này" />
        <StatBento title="Khách mới" value="458" icon={UserPlus} color="blue" trend="Tháng 10" />
        <StatBento title="Khách VIP" value="1,205" icon={Diamond} color="orange" trend="Top 5%" />
        <StatBento title="Khách rời bỏ" value="324" icon={Users} color="red" trend="> 30 ngày" />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden ambient-shadow">
        <div className="px-8 py-6 border-b border-zinc-50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-zinc-100 px-4 py-2 rounded-full">
              <Filter size={16} className="text-zinc-500" />
              <select className="bg-transparent border-none text-sm font-bold text-zinc-700 focus:ring-0 cursor-pointer p-0">
                <option>Hạng thẻ: Tất cả</option>
                <option>Kim Cương</option>
                <option>Vàng</option>
                <option>Bạc</option>
              </select>
            </div>
            <div className="relative">
               <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Tìm khách hàng..." 
                className="pl-10 pr-4 py-2 bg-zinc-100 border-none rounded-full text-sm w-80 focus:ring-2 focus:ring-brand-teal/20 transition-all"
              />
            </div>
          </div>
          <p className="text-zinc-400 text-sm italic font-be-vietnam">Hiển thị 3 trong tổng số 12,842 khách hàng</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-teal-50/30">
                <th className="px-8 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">Tên khách hàng</th>
                <th className="px-8 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">Số điện thoại</th>
                <th className="px-8 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">Hạng thẻ</th>
                <th className="px-8 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">Tổng chi tiêu</th>
                <th className="px-8 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">Điểm tích lũy</th>
                <th className="px-8 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {customers.map(c => (
                <tr key={c.id} className="hover:bg-teal-50/20 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-brand-teal font-bold group-hover:scale-110 transition-transform">
                        {c.initials}
                      </div>
                      <div>
                        <p className="font-bold text-zinc-800">{c.name}</p>
                        <p className="text-xs text-zinc-400 font-be-vietnam">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-zinc-600 font-be-vietnam">{c.phone}</td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                      c.tier === 'KIM CƯƠNG' ? 'bg-indigo-50 text-indigo-600' :
                      c.tier === 'VÀNG' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-zinc-600'
                    }`}>
                      {c.tier === 'KIM CƯƠNG' ? <Diamond size={12} /> : c.tier === 'VÀNG' ? <Award size={12} /> : <Medal size={12} />}
                      {c.tier}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-bold text-zinc-800">{formatCurrency(c.spent)}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-800 font-bold">{c.points.toLocaleString()}</span>
                      <div className="w-16 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div className="bg-brand-teal h-full" style={{ width: `${Math.min(100, (c.points / 1500) * 100)}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button className="text-zinc-400 hover:text-brand-teal transition-colors">
                      <MoreHorizontal size={20} />
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

const StatBento = ({ title, value, icon: Icon, color, trend }: any) => {
  const colors = {
    teal: "bg-teal-50 text-brand-teal border-brand-teal",
    blue: "bg-blue-50 text-blue-500 border-blue-400",
    orange: "bg-amber-50 text-amber-500 border-orange-400",
    red: "bg-rose-50 text-rose-500 border-rose-400"
  };

  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm flex flex-col justify-between border-b-4 ${colors[color]} ambient-shadow`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors[color].split(' ')[0]} ${colors[color].split(' ')[1]}`}>
          <Icon size={28} />
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${colors[color].split(' ')[0]} ${colors[color].split(' ')[1]}`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-zinc-500 font-bold text-xs uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold text-zinc-800 mt-1">{value}</h3>
      </div>
    </div>
  );
};

export default OrderHistory;
