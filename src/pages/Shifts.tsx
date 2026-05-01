import React from 'react';
import { Calendar, Clock, User, CheckCircle2, AlertCircle, Plus, Filter, ChevronLeft, ChevronRight, UserCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const staffShifts = [
  { id: 1, name: 'Nguyễn Văn A', role: 'Pha chế', shift: 'Sáng', time: '06:00 - 12:00', status: 'PRESENT' },
  { id: 2, name: 'Trần Thị B', role: 'Phục vụ', shift: 'Sáng', time: '06:00 - 12:00', status: 'LATE' },
  { id: 3, name: 'Lê Văn C', role: 'Pha chế', shift: 'Chiều', time: '12:00 - 18:00', status: 'SCHEDULED' },
  { id: 4, name: 'Phạm Thị D', role: 'Thu ngân', shift: 'Chiều', time: '12:00 - 18:00', status: 'SCHEDULED' },
  { id: 5, name: 'Hoàng Văn E', role: 'Bảo vệ', shift: 'Tối', time: '18:00 - 23:00', status: 'SCHEDULED' },
];

const Shifts = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-zinc-800">Quản lý Ca làm việc</h2>
          <p className="text-zinc-500">Điều phối nhân sự và theo dõi chấm công chi nhánh</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-6 py-3 bg-white border border-zinc-200 rounded-full font-bold text-zinc-600 shadow-sm hover:bg-zinc-50 transition-all">
            <UserCheck size={20} />
            Chấm công nhanh
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-full font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all">
            <Plus size={20} />
            Sắp lịch ca mới
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card bg-white p-6 rounded-[32px] border border-zinc-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-zinc-800">Tháng 5, 2026</h3>
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-zinc-100 rounded-lg text-zinc-400"><ChevronLeft size={16}/></button>
                <button className="p-1.5 hover:bg-zinc-100 rounded-lg text-zinc-400"><ChevronRight size={16}/></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
                <span key={d} className="text-[10px] font-black text-zinc-300 uppercase">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {Array.from({ length: 31 }).map((_, i) => (
                <button 
                  key={i} 
                  className={cn(
                    "h-8 w-8 rounded-full text-xs font-bold flex items-center justify-center transition-all",
                    i + 1 === 1 ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20" : "text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card bg-zinc-900 p-6 rounded-[32px] text-white space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                <AlertCircle size={20} className="text-orange-400" />
              </div>
              <div>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Thông báo</p>
                <p className="text-xs font-bold">2 nhân viên xin nghỉ phép</p>
              </div>
            </div>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-bold transition-all">
              Xem chi tiết yêu cầu
            </button>
          </div>
        </div>

        {/* Shift List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center gap-4">
            <button className="px-6 py-2 bg-brand-teal text-white rounded-full font-bold text-sm shadow-lg shadow-brand-teal/20">Tất cả ca</button>
            <button className="px-6 py-2 bg-white text-zinc-500 rounded-full font-bold text-sm border border-zinc-100 hover:bg-zinc-50 transition-all">Ca Sáng</button>
            <button className="px-6 py-2 bg-white text-zinc-500 rounded-full font-bold text-sm border border-zinc-100 hover:bg-zinc-50 transition-all">Ca Chiều</button>
            <button className="px-6 py-2 bg-white text-zinc-500 rounded-full font-bold text-sm border border-zinc-100 hover:bg-zinc-50 transition-all">Ca Tối</button>
          </div>

          <div className="glass-card bg-white rounded-[32px] border border-zinc-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Nhân viên</th>
                  <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Vị trí</th>
                  <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Ca làm</th>
                  <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Giờ làm</th>
                  <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {staffShifts.map(staff => (
                  <tr key={staff.id} className="hover:bg-zinc-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 border border-white">
                          <User size={20} />
                        </div>
                        <span className="font-bold text-zinc-800">{staff.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-bold text-zinc-500 bg-zinc-100 px-3 py-1 rounded-lg">{staff.role}</span>
                    </td>
                    <td className="px-8 py-5 font-bold text-zinc-700">{staff.shift}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-500">
                        <Clock size={14} className="text-zinc-300" />
                        {staff.time}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <StatusBadge status={staff.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const configs: any = {
    'PRESENT': { label: 'Đã điểm danh', class: 'bg-green-100 text-green-700', icon: CheckCircle2 },
    'LATE': { label: 'Vào muộn', class: 'bg-orange-100 text-orange-700', icon: Clock },
    'SCHEDULED': { label: 'Chưa bắt đầu', class: 'bg-zinc-100 text-zinc-500', icon: Calendar },
  };
  const config = configs[status];
  const Icon = config.icon;
  
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide", config.class)}>
       <Icon size={12} />
       {config.label}
    </span>
  );
};

export default Shifts;
