import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Download, 
  User, 
  Clock, 
  Activity,
  ChevronLeft,
  ChevronRight,
  Database,
  Lock,
  Eye,
  Key
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const auditData = [
  { id: 'LOG-001', user: 'Hoàng Anh', action: 'Cập nhật Công thức', detail: 'Sửa định lượng Trà Sữa Vibe Brew', module: 'RECIPES', time: '10:45 - 01/05/2026', ip: '192.168.1.15' },
  { id: 'LOG-002', user: 'System Admin', action: 'Đăng nhập', detail: 'Đăng nhập thành công từ thiết bị mới', module: 'AUTH', time: '09:30 - 01/05/2026', ip: '1.2.3.4' },
  { id: 'LOG-003', user: 'Minh Anh', action: 'Hoàn tác Đơn hàng', detail: 'Hủy đơn #ORD-7742 (Lý do: Khách đổi ý)', module: 'POS', time: '08:15 - 01/05/2026', ip: '192.168.1.22' },
  { id: 'LOG-004', user: 'Hoàng Anh', action: 'Điều chỉnh Kho', detail: 'Cập nhật tồn kho thực tế: Sữa Tươi (-2L)', module: 'INVENTORY', time: 'Sau kiểm kê - 01/05/2026', ip: '192.168.1.15' },
  { id: 'LOG-005', user: 'Quang Vinh', action: 'Thiết lập Khuyến mãi', detail: 'Tạo mã GIAM10 cho chiến dịch Hè', module: 'MARKETING', time: '17:20 - 30/04/2026', ip: '192.168.1.5' },
  { id: 'LOG-006', user: 'Trần Trọng', action: 'Nhập hàng', detail: 'Nhập 50kg Bột Trà Sữa từ nhà cung cấp', module: 'INVENTORY', time: '15:10 - 30/04/2026', ip: '10.0.0.8' },
  { id: 'LOG-007', user: 'Minh Anh', action: 'Kết thúc Ca', detail: 'Bàn giao ca sáng, tổng tiền mặt: 4.250.000đ', module: 'SHIFTS', time: '12:00 - 30/04/2026', ip: '192.168.1.22' },
];

const AuditLog = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-zinc-800">Audit Log</h2>
          <p className="text-zinc-500">Nhật ký hoạt động hệ thống và bảo mật (Read-only)</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm font-bold text-zinc-600 hover:bg-zinc-50 shadow-sm transition-all border-dashed">
            <Lock size={18} className="text-zinc-400" />
            Security Mode
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-zinc-800 active:scale-95 transition-all">
            <Download size={18} />
            Export Logs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AuditStat label="Tổng hoạt động" value="12,402" icon={Activity} color="teal" />
        <AuditStat label="Cảnh báo bảo mật" value="0" icon={ShieldCheck} color="green" />
        <AuditStat label="Truy cập Database" value="842" icon={Database} color="blue" />
      </div>

      <div className="glass-card bg-white rounded-[32px] border border-zinc-100 shadow-sm overflow-hidden ambient-shadow">
        <div className="p-6 border-b border-zinc-50 bg-zinc-50/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-full text-xs font-bold text-zinc-600 hover:bg-zinc-50">
              <Filter size={14} />
              Tất cả module
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-full text-xs font-bold text-zinc-600 hover:bg-zinc-50">
              <User size={14} />
              Nhân viên
            </button>
          </div>
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Tìm hành động, ID..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-full text-sm focus:ring-2 focus:ring-brand-teal/20 transition-all font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100">ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100">Người thực hiện</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100">Hành động</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100">Chi tiết</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100">Module</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100">Thời gian</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {auditData.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-50/30 transition-colors group">
                  <td className="px-6 py-4 text-[10px] font-black text-brand-teal font-mono">{log.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-400 font-bold text-xs uppercase">
                        {log.user.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-zinc-800">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-zinc-700">{log.action}</td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-zinc-500 font-medium max-w-[200px] truncate">{log.detail}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest",
                      getModuleColor(log.module)
                    )}>
                      {log.module}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-zinc-800">{log.time.split(' - ')[0]}</span>
                      <span className="text-[10px] font-medium text-zinc-400">{log.time.split(' - ')[1]}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-zinc-300 hover:text-brand-teal transition-all">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-zinc-50 flex justify-between items-center bg-zinc-50/10">
          <p className="text-xs font-bold text-zinc-400">Hiển thị 7 bản ghi gần nhất</p>
          <div className="flex gap-2">
            <button className="p-2 border border-zinc-100 rounded-lg text-zinc-300 hover:text-zinc-500 transition-all cursor-not-allowed">
              <ChevronLeft size={16} />
            </button>
            <button className="px-4 py-2 border border-brand-teal/20 rounded-lg text-brand-teal text-xs font-black">1</button>
            <button className="px-4 py-2 border border-zinc-100 rounded-lg text-zinc-400 text-xs font-bold hover:bg-zinc-50">2</button>
            <button className="p-2 border border-zinc-100 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const getModuleColor = (module: string) => {
  switch (module) {
    case 'RECIPES': return 'bg-purple-100 text-purple-700';
    case 'AUTH': return 'bg-zinc-100 text-zinc-700';
    case 'POS': return 'bg-brand-teal/10 text-brand-teal';
    case 'INVENTORY': return 'bg-orange-100 text-orange-700';
    case 'MARKETING': return 'bg-blue-100 text-blue-700';
    case 'SHIFTS': return 'bg-green-100 text-green-700';
    default: return 'bg-zinc-100 text-zinc-500';
  }
};

const AuditStat = ({ label, value, icon: Icon, color }: any) => {
  const colors = {
    teal: "text-brand-teal bg-teal-50",
    green: "text-brand-green bg-green-50",
    blue: "text-blue-500 bg-blue-50"
  };
  return (
    <div className="glass-card bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex items-center gap-4">
      <div className={cn("p-3 rounded-2xl", colors[color])}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">{label}</p>
        <p className="text-2xl font-black text-zinc-800">{value}</p>
      </div>
    </div>
  );
};

export default AuditLog;
