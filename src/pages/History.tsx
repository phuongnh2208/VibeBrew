import React from 'react';
import { formatCurrency, cn } from '../lib/utils';
import { Search, Calendar, Filter, CreditCard, Download, ChevronLeft, ChevronRight, Printer, XCircle, CheckCircle2 } from 'lucide-react';

const orders = [
  { id: '#VB-2901', time: '14:25', customer: 'Trần Hoàng', total: 185000, status: 'COMPLETED', method: 'MoMo' },
  { id: '#VB-2900', time: '14:10', customer: 'Khách lẻ', total: 45000, status: 'COMPLETED', method: 'Cash' },
  { id: '#VB-2899', time: '13:45', customer: 'Khách lẻ', total: 120000, status: 'CANCELLED', method: 'Cash' },
  { id: '#VB-2898', time: '13:30', customer: 'Ngọc Nhi', total: 95000, status: 'COMPLETED', method: 'Card' },
  { id: '#VB-2897', time: '13:15', customer: 'Khách lẻ', total: 215000, status: 'COMPLETED', method: 'Bank' },
];

const History = () => {
  const [selectedOrderId, setSelectedOrderId] = React.useState(orders[0].id);
  const selectedOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-brand-primary">Lịch sử Đơn hàng</h2>
          <p className="text-zinc-500 mt-1">Ca làm việc hiện tại: <span className="font-bold text-brand-green">08:00 - 16:00</span></p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
             <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-zinc-200">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLYkLjd2Tb2oNtNtnoYKJDF-PXIo10m99sZhg1xBPnlr4M0gWzuFjIpCC_gMB-ve27CrCrVPQMjpQ7j7NehfpeP0v0Lf-Uph_pWNCWLQT126C7jmKH_eCFx2opUtPG0tucVdxoIk_Wkk2aYtQ5uck5wsiKCd42ODSCkbQXivn3OM_uhlaN2ndjat0TJiwOSmitcr4r1XZJec6PqyUMEaN9F1-wp5qz5WoZ5sD45sD4gLdH1lxiTEWY_i7S0dlFTPbSeeMz-LVMVfUt" className="w-full h-full object-cover" />
             </div>
             <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-zinc-200">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx0dpjBaP0b-yrZU64-hdfUZek9IHiEjZhGabP3NS_DM_c6TEWmOFzEWOHIB8Q20Za1djUAMdcSDHoJf12EtxfEg40PTzuJR1NT9ZIzkI_OfRZllH4T16zGXRlU2jRCDyQGqRtWh2jrASlXtifwmc9siecSp-txZFQn-w6lHDf9Dk0z5BtpVsQcqPBROoSQVpsRzE-ItxS4EUq9Gpkm9tpvwQqTfk7VupziR2wIoFC_RuFDPqxgWpyH1we9V_W8A_Oef6x94V9n4_x" className="w-full h-full object-cover" />
             </div>
          </div>
          <div className="pl-2 border-l border-zinc-200">
            <p className="text-sm font-bold text-zinc-800 leading-none">Minh Anh</p>
            <p className="text-[11px] text-zinc-400 mt-1 uppercase font-semibold">Nhân viên phục vụ</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-2 rounded-2xl flex flex-wrap items-center gap-3 shadow-sm">
        <div className="relative flex-1 min-w-[280px]">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm theo Mã đơn, tên khách..." 
            className="w-full pl-11 pr-4 py-3 bg-zinc-50 border-none rounded-full focus:ring-2 focus:ring-brand-teal transition-all text-sm font-be-vietnam"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-200 rounded-full text-xs font-bold hover:bg-zinc-50 transition-all">
            <Calendar size={16} /> Hôm nay
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-200 rounded-full text-xs font-bold hover:bg-zinc-50 transition-all">
            <Filter size={16} /> Trạng thái
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-200 rounded-full text-xs font-bold hover:bg-zinc-50 transition-all">
            <CreditCard size={16} /> Phương thức
          </button>
        </div>
        <div className="ml-auto flex items-center gap-3 px-4">
          <p className="text-xs text-zinc-400">Tổng cộng: <span className="font-bold text-zinc-800">124 đơn</span></p>
          <button className="p-2.5 rounded-full bg-brand-primary text-white hover:brightness-110 shadow-md">
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden ambient-shadow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-brand-primary/5 text-left border-b border-zinc-50">
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-brand-primary">Mã đơn</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-brand-primary">Thời gian</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-brand-primary">Khách hàng</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-brand-primary text-right">Tổng tiền</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-brand-primary text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {orders.map((order) => (
                  <tr 
                    key={order.id} 
                    onClick={() => setSelectedOrderId(order.id)}
                    className={cn(
                      "hover:bg-teal-50/50 transition-colors cursor-pointer",
                      selectedOrderId === order.id && "bg-teal-50 border-l-4 border-brand-primary"
                    )}
                  >
                    <td className="px-6 py-4 font-bold text-sm text-zinc-800">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-zinc-500 font-be-vietnam">{order.time}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center text-[10px] font-bold text-brand-teal uppercase">
                          {order.customer.substring(0, 2)}
                        </div>
                        <span className="text-sm font-medium text-zinc-800">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-sm text-right text-zinc-800">{formatCurrency(order.total)}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                        order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      )}>
                        {order.status === 'COMPLETED' ? 'Hoàn thành' : 'Đã hủy'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-400 font-be-vietnam">Hiển thị 5 trên 124 đơn hàng</p>
            <div className="flex gap-1">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-zinc-200 text-zinc-400 hover:bg-zinc-50 transition-all">
                <ChevronLeft size={20} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-primary text-white font-bold text-sm shadow-md">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-zinc-200 text-zinc-500 hover:bg-zinc-50 transition-all text-sm font-bold">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-zinc-200 text-zinc-500 hover:bg-zinc-50 transition-all text-sm font-bold">3</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-zinc-200 text-zinc-400 hover:bg-zinc-50 transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass-card rounded-3xl p-6 ambient-shadow border-brand-teal/20 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div>
                <h3 className="font-bold text-brand-primary">Chi tiết Đơn hàng</h3>
                <p className="text-xs font-bold text-zinc-400 mt-1 uppercase tracking-wider">{selectedOrder.id} <span className="mx-2 opacity-50">|</span> {selectedOrder.time}</p>
              </div>
              <div className={cn(
                "p-2.5 rounded-2xl",
                selectedOrder.status === 'COMPLETED' ? "bg-brand-teal/10 text-brand-teal" : "bg-red-50 text-red-500"
              )}>
                {selectedOrder.status === 'COMPLETED' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-bold text-sm text-zinc-800">2x Cà phê Muối (S)</p>
                  <p className="text-[11px] text-zinc-400 uppercase font-semibold">Ít đường, Nhiều đá</p>
                </div>
                <p className="font-bold text-sm text-zinc-800">{formatCurrency(selectedOrder.total * 0.4)}</p>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-bold text-sm text-zinc-800">1x Trà Đào Cam Sả (L)</p>
                  <p className="text-[11px] text-zinc-400 uppercase font-semibold">Trân châu trắng (+10k)</p>
                </div>
                <p className="font-bold text-sm text-zinc-800">{formatCurrency(selectedOrder.total * 0.3)}</p>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-bold text-sm text-zinc-800">1x Bánh Croissant</p>
                </div>
                <p className="font-bold text-sm text-zinc-800">{formatCurrency(selectedOrder.total * 0.3)}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-dashed border-zinc-200 space-y-2">
               <div className="flex justify-between text-sm text-zinc-500">
                <span>Tạm tính</span>
                <span>{formatCurrency(selectedOrder.total)}</span>
              </div>
               <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-zinc-800">Tổng cộng</span>
                <span className="text-xl font-extrabold text-brand-green uppercase">{formatCurrency(selectedOrder.total)}</span>
              </div>
            </div>

            <div className="p-4 bg-zinc-50 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard size={18} className="text-brand-primary" />
                <span className="text-xs font-bold text-zinc-700">{selectedOrder.method}</span>
              </div>
              {selectedOrder.status === 'COMPLETED' && <CheckCircle2 size={16} className="text-brand-green fill-brand-green/10" />}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3.5 border-2 border-brand-teal text-brand-teal rounded-full font-bold text-xs hover:bg-teal-50 transition-all active:scale-95">
                <Printer size={16} /> In lại
              </button>
              <button className="flex items-center justify-center gap-2 py-3.5 bg-red-50 text-red-500 rounded-full font-bold text-xs hover:bg-red-100 transition-all active:scale-95">
                <XCircle size={16} /> Hủy đơn
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default History;
