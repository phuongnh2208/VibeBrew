import React from 'react';
import { useAuth } from '../AuthContext';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingDown,
  DollarSign,
  Briefcase
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { formatCurrency } from '../lib/utils';
import { Link } from 'react-router-dom';

const data = [
  { name: 'Thứ 2', value: 4500000 },
  { name: 'Thứ 3', value: 5200000 },
  { name: 'Thứ 4', value: 4800000 },
  { name: 'Thứ 5', value: 6100000 },
  { name: 'Thứ 6', value: 7500000 },
  { name: 'Thứ 7', value: 9200000 },
  { name: 'CN', value: 8800000 },
];

const topProducts = [
  { name: 'Trà Sữa Vibe Brew', value: 90, color: '#50BFBF' },
  { name: 'Trà Đào Cam Sả', value: 75, color: '#38A668' },
  { name: 'Cà Phê Muối', value: 65, color: '#F5986C' },
  { name: 'Bạc Xỉu', value: 55, color: '#6BD7D7' },
  { name: 'Matcha Latte', value: 45, color: '#80D7B5' },
];

const Dashboard = () => {
  const { user } = useAuth();

  const isGlobal = user?.role === 'ADMIN' || user?.role === 'OPERATIONS_MANAGER';

  const branchData = [
    { name: 'Quận 1', revenue: 45000000, orders: 850, growth: 12 },
    { name: 'Quận 3', revenue: 38000000, orders: 720, growth: 8 },
    { name: 'Quận 7', revenue: 32000000, orders: 610, growth: -2 },
    { name: 'Thủ Đức', revenue: 28000000, orders: 540, growth: 15 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold text-zinc-800">
          {isGlobal ? 'Báo cáo Tổng hợp Hệ thống' : 'Báo cáo Chi nhánh'}
        </h2>
        <p className="text-zinc-500">Chào mừng trở lại, đây là hiệu suất kinh doanh {isGlobal ? 'toàn hệ thống' : 'của bạn'}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title={isGlobal ? "Doanh thu Toàn hệ thống" : "Doanh thu hôm nay"} 
          value={formatCurrency(isGlobal ? 143500000 : 12450000)} 
          trend={12} 
          trendType="up"
          icon={DollarSign}
          color="teal"
        />
        <StatCard 
          title={isGlobal ? "Tổng Đơn hàng (Hệ thống)" : "Số đơn hàng"} 
          value={isGlobal ? "2,142 đơn" : "142 đơn"} 
          trend={5} 
          trendType="up"
          icon={ShoppingBag}
          color="green"
        />
        <StatCard 
          title="Average Order Value" 
          value={formatCurrency(87600)} 
          trend={2} 
          trendType="down"
          icon={BarChart3}
          color="orange"
        />
      </div>

      {isGlobal && (
        <div className="glass-card p-8 rounded-[32px] ambient-shadow bg-white border border-zinc-100">
          <h3 className="text-xl font-bold text-zinc-800 mb-6">Hiệu suất các chi nhánh</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {branchData.map((branch) => (
              <div key={branch.name} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-brand-teal transition-all">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{branch.name}</p>
                <h4 className="text-lg font-bold text-zinc-800 mt-1">{formatCurrency(branch.revenue)}</h4>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-[10px] font-bold text-zinc-500">{branch.orders} đơn</span>
                  <span className={`text-[10px] font-black ${branch.growth >= 0 ? 'text-brand-green' : 'text-red-500'}`}>
                    {branch.growth > 0 ? '+' : ''}{branch.growth}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6 rounded-[32px] ambient-shadow bg-white border border-zinc-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-zinc-800">Doanh thu 7 ngày qua</h3>
            <div className="flex bg-zinc-100 p-1 rounded-full text-xs font-bold">
              <button className="px-4 py-1.5 rounded-full bg-brand-teal text-white shadow-sm">Line</button>
              <button className="px-4 py-1.5 rounded-full text-zinc-500 hover:text-zinc-700">Area</button>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#50BFBF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#50BFBF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8EFF1" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6D7979'}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
                  formatter={(value: number) => [formatCurrency(value), 'Doanh thu']}
                />
                <Area type="monotone" dataKey="value" stroke="#50BFBF" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 rounded-lg ambient-shadow">
          <h3 className="text-lg font-bold text-zinc-800 mb-6">Top 5 Bán Chạy</h3>
          <div className="space-y-6">
            {topProducts.map((p) => (
              <div key={p.name} className="space-y-2">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-zinc-700">{p.name}</span>
                  <span className="text-zinc-500">{Math.floor(p.value * 1.4)} ly</span>
                </div>
                <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${p.value}%`, backgroundColor: p.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
            <Link 
              to="/analytics"
              className="w-full mt-10 py-3 text-brand-teal font-bold text-sm hover:bg-brand-teal/5 rounded-full transition-all flex items-center justify-center gap-2"
            >
              Xem báo cáo chi tiết
              <ArrowUpRight size={16} />
            </Link>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, trendType, icon: Icon, color }: any) => {
  const colors = {
    teal: "bg-brand-teal/20 text-brand-teal",
    green: "bg-brand-green/20 text-brand-green",
    orange: "bg-[#F5986C]/20 text-[#934A25]"
  };

  return (
    <div className="glass-card p-6 rounded-lg ambient-shadow group hover:translate-y-[-4px] transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{title}</p>
          <h3 className="text-2xl font-bold text-zinc-800 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-2xl ${colors[color]}`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className={`flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
          trendType === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {trendType === 'up' ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
          {trend}%
        </div>
        <span className="text-xs text-zinc-400 font-medium font-be-vietnam">so với hôm qua</span>
      </div>
    </div>
  );
};

export default Dashboard;
