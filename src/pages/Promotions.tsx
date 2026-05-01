import React from 'react';
import { Ticket, Gift, Calendar, Plus, Search, Filter, MoreVertical, Edit2, Trash2, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_PROMOTIONS = [
  { id: 1, code: 'VIBE10', title: 'Ưu đãi Khai trương', type: 'PERCENT', value: 10, minOrder: 50000, status: 'ACTIVE', expiry: '2026-12-31', usage: 145 },
  { id: 2, code: 'FREESHIP', title: 'Miễn phí vận chuyển', type: 'FIXED', value: 30000, minOrder: 150000, status: 'ACTIVE', expiry: '2026-06-30', usage: 520 },
  { id: 3, code: 'CHAOBANMOI', title: 'Chào bạn mới', type: 'PERCENT', value: 20, minOrder: 0, status: 'EXPIRED', expiry: '2024-01-01', usage: 890 },
  { id: 4, code: 'THU5VIBE', title: 'Thứ 5 rực rỡ', type: 'PERCENT', value: 15, minOrder: 100000, status: 'SCHEDULED', expiry: '2026-12-31', usage: 0 },
];

const Promotions = () => {
  const [promos, setPromos] = React.useState(INITIAL_PROMOTIONS);
  const [showAddModal, setShowAddModal] = React.useState(false);

  const deletePromo = (id: number) => {
    if (confirm('Xóa mã khuyến mãi này?')) {
      setPromos(promos.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-zinc-800">Khuyến mãi & Ưu đãi</h2>
          <p className="text-zinc-500">Quản lý các chương trình giảm giá và mã voucher</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-full font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all"
        >
          <Plus size={20} />
          Tạo khuyến mãi mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PromotionStat title="Đang kích hoạt" value="12" icon={CheckCircle2} color="teal" />
        <PromotionStat title="Tổng lượt sử dụng" value="1.5k" icon={Ticket} color="blue" />
        <PromotionStat title="Giá trị đã giảm" value={formatCurrency(12500000)} icon={Gift} color="orange" />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden ambient-shadow">
        <div className="px-8 py-6 border-b border-zinc-50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-zinc-100 px-4 py-2 rounded-full">
              <Filter size={16} className="text-zinc-500" />
              <select className="bg-transparent border-none text-sm font-bold text-zinc-700 focus:ring-0 cursor-pointer p-0">
                <option>Trạng thái: Tất cả</option>
                <option>Đang chạy</option>
                <option>Sắp diễn ra</option>
                <option>Hết hạn</option>
              </select>
            </div>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Tìm mã hoặc tên CTKM..." 
                className="pl-10 pr-4 py-2 bg-zinc-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-brand-teal/20 transition-all font-be-vietnam"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50/30">
                <th className="px-8 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">Chiến dịch / Mã</th>
                <th className="px-8 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">Giá trị giảm</th>
                <th className="px-8 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">Đơn tối thiểu</th>
                <th className="px-8 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">Thời hạn</th>
                <th className="px-8 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">Sử dụng</th>
                <th className="px-8 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider">Trạng thái</th>
                <th className="px-8 py-4 font-bold text-zinc-500 text-xs uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {promos.map(promo => (
                <tr key={promo.id} className="hover:bg-zinc-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div>
                      <p className="font-bold text-zinc-800">{promo.title}</p>
                      <span className="inline-block px-2 py-0.5 mt-1 bg-brand-teal uppercase font-black text-[10px] text-white rounded">
                        {promo.code}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-black text-brand-teal">
                    {promo.type === 'PERCENT' ? `${promo.value}%` : `-${formatCurrency(promo.value)}`}
                  </td>
                  <td className="px-8 py-5 text-sm text-zinc-500 font-bold italic">
                    {promo.minOrder > 0 ? formatCurrency(promo.minOrder) : 'Mọi đơn hàng'}
                  </td>
                  <td className="px-8 py-5 text-sm text-zinc-500">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-zinc-400" />
                      {promo.expiry}
                    </div>
                  </td>
                  <td className="px-8 py-5 font-bold text-zinc-800">
                    {promo.usage}
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide",
                      promo.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                      promo.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                    )}>
                      {promo.status === 'ACTIVE' ? 'Đang chạy' : promo.status === 'SCHEDULED' ? 'Sắp diễn ra' : 'Hết hạn'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right space-x-2">
                    <button className="p-2 text-zinc-400 hover:text-brand-teal transition-all"><Edit2 size={16} /></button>
                    <button onClick={() => deletePromo(promo.id)} className="p-2 text-zinc-400 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
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

const PromotionStat = ({ title, value, icon: Icon, color }: any) => {
  const colors = {
    teal: "bg-teal-50 text-brand-teal",
    blue: "bg-blue-50 text-blue-500",
    orange: "bg-orange-50 text-orange-500"
  };
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100 ambient-shadow border-l-4">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl ${colors[color]}`}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">{title}</p>
          <h3 className="text-2xl font-black text-zinc-800">{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
