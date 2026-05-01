import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { formatCurrency } from '../lib/utils';

const data = [
  { name: 'Thứ 2', revenue: 4500000 },
  { name: 'Thứ 3', revenue: 5200000 },
  { name: 'Thứ 4', revenue: 4800000 },
  { name: 'Thứ 5', revenue: 6100000 },
  { name: 'Thứ 6', revenue: 7500000 },
  { name: 'Thứ 7', revenue: 9800000 },
  { name: 'Chủ Nhật', revenue: 8900000 },
];

const topProducts = [
  { name: 'Trà Sữa Vibe Brew', sales: 450, growth: 12, color: '#0F766E' },
  { name: 'Trà Nhài Nhiệt Đới', sales: 380, growth: 8, color: '#14B8A6' },
  { name: 'Cà Phê Muối', sales: 320, growth: -3, color: '#F59E0B' },
  { name: 'Bạc Xỉu', sales: 290, growth: 15, color: '#10B981' },
];

const Reports = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-zinc-800">Báo cáo & Phân tích</h2>
          <p className="text-zinc-500">Dữ liệu doanh thu và hiệu suất kinh doanh chi nhánh</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm font-bold text-zinc-600 hover:bg-zinc-50 shadow-sm transition-all">
            <Calendar size={18} />
            7 ngày qua
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-brand-teal text-white rounded-xl text-sm font-bold shadow-lg shadow-teal-900/10 hover:brightness-110 active:scale-95 transition-all">
            <Download size={18} />
            Xuất file
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportCard 
          title="Doanh thu tuần này" 
          value={formatCurrency(46800000)} 
          change="+15.4%" 
          isPositive={true} 
          icon={TrendingUp} 
          color="teal"
        />
        <ReportCard 
          title="Tổng đơn hàng" 
          value="1,284" 
          change="+8.2%" 
          isPositive={true} 
          icon={ShoppingBag} 
          color="blue"
        />
        <ReportCard 
          title="Giá trị TB đơn" 
          value={formatCurrency(36500)} 
          change="-2.1%" 
          isPositive={false} 
          icon={BarChart3} 
          color="orange"
        />
        <ReportCard 
          title="Khách hàng mới" 
          value="458" 
          change="+12.5%" 
          isPositive={true} 
          icon={Users} 
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 rounded-[32px] ambient-shadow bg-white border border-zinc-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-zinc-800 text-lg">Biểu đồ Doanh thu</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                <div className="w-3 h-3 rounded-full bg-brand-teal"></div>
                Tuần này
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#9ca3af' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#9ca3af' }}
                  tickFormatter={(val) => `${val/1000000}M`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => formatCurrency(value)}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#0F766E" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[32px] ambient-shadow bg-white border border-zinc-100">
          <h3 className="font-bold text-zinc-800 text-lg mb-6">Top sản phẩm bán chạy</h3>
          <div className="space-y-6">
            {topProducts.map((product) => (
              <div key={product.name} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-bold text-zinc-800">{product.name}</p>
                    <p className="text-xs text-zinc-400 font-be-vietnam">{product.sales} đơn hàng</p>
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-black ${product.growth >= 0 ? 'text-brand-green' : 'text-red-500'}`}>
                    {product.growth >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {Math.abs(product.growth)}%
                  </div>
                </div>
                <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000" 
                    style={{ 
                      width: `${(product.sales / topProducts[0].sales) * 100}%`,
                      backgroundColor: product.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-2xl bg-zinc-50 border border-zinc-100 font-bold text-zinc-500 text-sm hover:bg-zinc-100 hover:text-zinc-700 transition-all">
            Xem tất cả sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
};

const ReportCard = ({ title, value, change, isPositive, icon: Icon, color }: any) => {
  const colors = {
    teal: "bg-teal-50 text-brand-teal",
    blue: "bg-blue-50 text-blue-500",
    orange: "bg-orange-50 text-orange-500",
    green: "bg-emerald-50 text-brand-green"
  };

  return (
    <div className="glass-card bg-white p-6 rounded-[28px] border border-zinc-100 ambient-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${colors[color]}`}>
          <Icon size={24} />
        </div>
        <div className={`flex items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-black ${isPositive ? 'bg-green-50 text-brand-green' : 'bg-red-50 text-red-500'}`}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest">{title}</p>
        <h3 className="text-2xl font-black text-zinc-800 mt-1">{value}</h3>
      </div>
    </div>
  );
};

export default Reports;
