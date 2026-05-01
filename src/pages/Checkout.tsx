import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatCurrency } from '../lib/utils';
import { Coffee, CheckCircle2, QrCode, CreditCard, Banknote, ChevronLeft, Printer, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, subtotal, discount, total, customer } = location.state || { cart: [], subtotal: 0, discount: 0, total: 0 };
  
  const [method, setMethod] = useState<'CASH' | 'MOMO' | 'CARD'>('MOMO');
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = () => {
    setIsPaid(true);
  };

  if (isPaid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg bg-white rounded-[40px] shadow-2xl p-8 text-center space-y-6 border border-brand-teal/10"
        >
          <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green mx-auto mb-4">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-zinc-800">Thanh toán thành công!</h2>
            <p className="text-zinc-500 font-medium">Đơn hàng #VB-{Math.floor(Math.random() * 10000)} đã hoàn tất</p>
          </div>

          <div className="bg-zinc-50 rounded-3xl p-6 text-left space-y-4">
             <div className="flex justify-between items-center pb-4 border-b border-zinc-200 border-dashed">
                <span className="text-sm text-zinc-500">Mã giao dịch</span>
                <span className="font-bold text-zinc-800 uppercase">VIBE{Date.now().toString().slice(-6)}</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500">Tổng cộng</span>
                <span className="text-xl font-black text-brand-green">{formatCurrency(total)}</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/pos')}
              className="flex items-center justify-center gap-2 py-4 bg-brand-teal text-white rounded-2xl font-bold hover:brightness-110 shadow-lg shadow-brand-teal/20"
            >
              <Coffee size={20} />
              Đơn hàng mới
            </button>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center bg-zinc-100 text-zinc-600 rounded-2xl hover:bg-zinc-200 transition-colors">
                <Printer size={20} />
              </button>
              <button className="flex-1 flex items-center justify-center bg-zinc-100 text-zinc-600 rounded-2xl hover:bg-zinc-200 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-all shadow-sm"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h2 className="text-3xl font-extrabold text-brand-primary tracking-tight">Thanh toán</h2>
          <p className="text-zinc-500">Vui lòng chọn phương thức thanh toán</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Payment Methods */}
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => setMethod('CASH')}
              className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center gap-3 ${
                method === 'CASH' 
                  ? 'border-brand-teal bg-brand-teal/5 shadow-lg shadow-brand-teal/10' 
                  : 'border-zinc-100 bg-white hover:border-brand-teal/30'
              }`}
            >
              <div className={`p-4 rounded-2xl ${method === 'CASH' ? 'bg-brand-teal text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                <Banknote size={32} />
              </div>
              <span className="font-bold text-sm">Tiền mặt</span>
            </button>
            <button 
              onClick={() => setMethod('MOMO')}
              className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center gap-3 ${
                method === 'MOMO' 
                  ? 'border-brand-teal bg-brand-teal/5 shadow-lg shadow-brand-teal/10' 
                  : 'border-zinc-100 bg-white hover:border-brand-teal/30'
              }`}
            >
              <div className={`p-4 rounded-2xl ${method === 'MOMO' ? 'bg-brand-teal text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                <QrCode size={32} />
              </div>
              <span className="font-bold text-sm">Chuyển khoản</span>
            </button>
            <button 
              onClick={() => setMethod('CARD')}
              className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center gap-3 ${
                method === 'CARD' 
                  ? 'border-brand-teal bg-brand-teal/5 shadow-lg shadow-brand-teal/10' 
                  : 'border-zinc-100 bg-white hover:border-brand-teal/30'
              }`}
            >
              <div className={`p-4 rounded-2xl ${method === 'CARD' ? 'bg-brand-teal text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                <CreditCard size={32} />
              </div>
              <span className="font-bold text-sm">Cà thẻ</span>
            </button>
          </div>

          <div className="bg-white rounded-[40px] border border-zinc-100 p-8 shadow-sm text-center space-y-6">
            {method === 'MOMO' ? (
              <>
                <div className="mx-auto w-64 h-64 bg-zinc-50 rounded-3xl flex items-center justify-center border-4 border-zinc-100">
                  <div className="w-56 h-56 bg-brand-teal flex items-center justify-center text-white rounded-2xl">
                    <QrCode size={180} strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-zinc-800">Quét mã QR để thanh toán</h4>
                  <p className="text-zinc-500 text-sm">Hỗ trợ MoMo, VNPay, Zalopay</p>
                </div>
              </>
            ) : method === 'CASH' ? (
              <div className="py-12 space-y-4">
                <Banknote size={80} className="mx-auto text-brand-teal opacity-20" />
                <div>
                  <h4 className="font-bold text-lg text-zinc-800">Tiền mặt</h4>
                  <p className="text-zinc-500 text-sm">Vui lòng nhận tiền từ khách hàng</p>
                </div>
              </div>
            ) : (
              <div className="py-12 space-y-4">
                <CreditCard size={80} className="mx-auto text-brand-teal opacity-20" />
                <div>
                  <h4 className="font-bold text-lg text-zinc-800">Máy quẹt thẻ</h4>
                  <p className="text-zinc-500 text-sm">Vui lòng cắm thẻ vào máy POS</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Summary & Confirm */}
        <div className="space-y-6">
          <div className="bg-white rounded-[40px] border border-zinc-100 p-8 shadow-sm space-y-6">
            <h3 className="font-bold font-h3 text-xl text-brand-primary">Tóm tắt đơn hàng</h3>
            
            <div className="max-h-64 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {cart.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-zinc-800 text-sm">{item.quantity}x {item.name}</p>
                    <p className="text-[11px] text-zinc-400 font-medium">Đơn giá: {formatCurrency(item.price)}</p>
                  </div>
                  <span className="font-bold text-sm text-zinc-800">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-dashed border-zinc-200 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Tạm tính</span>
                <span className="font-bold text-zinc-800">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Giảm giá</span>
                <span className="font-bold text-red-500">-{formatCurrency(discount)}</span>
              </div>
              {customer && (
                <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Khách hàng</span>
                    <span className="font-bold text-brand-teal">{customer.name} ({customer.tier})</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-4 border-t border-zinc-200">
                <span className="text-lg font-bold text-zinc-800 tracking-tight">Hết:</span>
                <span className="text-3xl font-black text-brand-green">{formatCurrency(total)}</span>
              </div>
            </div>
            
            <button 
              onClick={handlePayment}
              className="w-full py-5 bg-brand-green text-white rounded-3xl font-extrabold text-lg shadow-xl shadow-brand-green/20 hover:scale-[1.02] active:scale-95 transition-all mt-4"
            >
              Xác nhận & Hoàn tất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
