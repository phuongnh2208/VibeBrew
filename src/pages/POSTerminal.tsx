import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_CUSTOMERS, MOCK_PROMOS } from '../mockData';
import { formatCurrency, cn } from '../lib/utils';
import { ShoppingCart, Plus, Minus, Trash2, Receipt, CreditCard as PaymentIcon, Phone, Ticket, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const POSTerminal = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<any[]>([]);
  const [category, setCategory] = useState('Tất cả món');
  const [phone, setPhone] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<any>(null);

  const customer = useMemo(() => {
    return MOCK_CUSTOMERS.find(c => c.phone === phone);
  }, [phone]);

  const availablePromos = useMemo(() => {
    return MOCK_PROMOS.filter(p => !p.tier || (customer && p.tier === customer.tier));
  }, [customer]);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.type === 'PERCENT') {
      return subtotal * appliedPromo.discount;
    }
    return appliedPromo.discount;
  }, [subtotal, appliedPromo]);

  const total = Math.max(0, subtotal - discountAmount);

  const categories = ['Tất cả món', 'Trà sữa', 'Trà trái cây', 'Cà phê', 'Đá xay', 'Topping'];

  const filteredProducts = category === 'Tất cả món' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === category);

  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-160px)] gap-6 overflow-hidden">
      {/* Left: Product Selection */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none flex-shrink-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                category === cat 
                  ? 'bg-brand-teal text-white shadow-lg shadow-brand-teal/20' 
                  : 'bg-white text-zinc-500 hover:bg-zinc-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-10 content-start">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              onClick={() => addToCart(product)}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-zinc-100 hover:border-brand-teal/30 hover:shadow-2xl hover:shadow-brand-teal/5 transition-all cursor-pointer group active:scale-[0.98] flex flex-col h-[280px] md:h-[320px]"
            >
              <div className="relative h-32 md:h-40 lg:h-48 overflow-hidden flex-shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {product.isBestSeller && (
                  <div className="absolute top-3 left-3 bg-brand-green/90 backdrop-blur-md px-3 py-1 rounded-full text-white font-black text-[9px] uppercase tracking-wider z-10 shadow-lg">
                    HOT
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-grow min-h-0">
                <div className="flex-grow flex items-center">
                  <h3 className="font-bold text-zinc-800 text-[13px] md:text-[14px] leading-tight line-clamp-2 uppercase group-hover:text-brand-teal transition-colors tracking-tight text-center w-full">{product.name}</h3>
                </div>
                <div className="mt-auto pt-3 border-t border-zinc-50 flex justify-between items-center group-hover:border-brand-teal/10 transition-colors">
                  <span className="font-black text-brand-green text-sm md:text-base">
                    {formatCurrency(product.price)}
                  </span>
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shadow-lg group-hover:bg-brand-teal group-hover:rotate-90 transition-all duration-300">
                    <Plus size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Cart Summary */}
      <aside className="w-[400px] flex flex-col bg-white rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-zinc-100 overflow-hidden">
        <div className="p-6 border-b border-zinc-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-brand-teal" />
            <h3 className="font-bold text-zinc-800">Chi tiết đơn hàng</h3>
          </div>
          <span className="bg-zinc-100 text-zinc-500 px-3 py-1 rounded-full text-xs font-bold">
            {cart.reduce((s, i) => s + i.quantity, 0)} món
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          <AnimatePresence initial={false}>
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-400 opacity-50 space-y-4">
                <ShoppingCart size={48} strokeWidth={1.5} />
                <p className="font-medium text-sm">Chưa có món nào được chọn</p>
              </div>
            ) : (
              cart.map(item => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  key={item.id}
                  className="group"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-zinc-800">{item.name}</h4>
                      <p className="text-[11px] text-zinc-400 mt-1 uppercase tracking-wide">Mặc định • Size M</p>
                    </div>
                    <span className="font-bold text-sm text-zinc-800">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-zinc-100 rounded-full p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-500 hover:bg-white hover:text-brand-teal transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <button 
                         onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-500 hover:bg-white hover:text-brand-teal transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Customer & Promo Section - Moved and Compacted */}
        <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50/30 space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 group">
              <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-teal transition-colors" />
              <input 
                type="text"
                placeholder="SĐT khách..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl py-1.5 pl-9 pr-3 shadow-sm focus:ring-2 focus:ring-brand-teal/20 text-xs font-medium"
              />
            </div>
            {customer && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-brand-green text-white flex items-center justify-center text-[8px] font-bold">
                  {customer.tier[0]}
                </div>
                <span className="text-[10px] font-bold text-zinc-600 truncate max-w-[80px]">{customer.name}</span>
              </motion.div>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none items-center">
            <Ticket size={14} className="text-zinc-400 flex-shrink-0" />
            <div className="flex items-center gap-1.5">
              {availablePromos.map(promo => (
                <button
                  key={promo.code}
                  onClick={() => setAppliedPromo(promo)}
                  className={cn(
                    "whitespace-nowrap px-2.5 py-1 rounded-lg text-[9px] font-bold transition-all border",
                    appliedPromo?.code === promo.code
                      ? "bg-brand-teal text-white border-brand-teal"
                      : "bg-white text-zinc-500 border-zinc-200 hover:border-brand-teal/50"
                  )}
                >
                  {promo.code}
                </button>
              ))}
              {appliedPromo && (
                <button onClick={() => setAppliedPromo(null)} className="text-zinc-400 hover:text-red-500">
                  <X size={12} />
                </button>
              )}
              {availablePromos.length === 0 && <span className="text-[9px] text-zinc-400 italic">Không có mã</span>}
            </div>
          </div>
        </div>

        <div className="p-6 bg-zinc-50/50 border-t border-zinc-100 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-zinc-500">
              <span>Tạm tính</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-zinc-500">
              <span>Khuyến mãi</span>
              <span className="font-medium text-red-500">- {formatCurrency(discountAmount)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 mt-2 border-t border-dashed border-zinc-200">
              <span className="font-bold text-zinc-800">Tổng cộng</span>
              <span className="text-2xl font-extrabold text-brand-green">{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center gap-1 py-3 border-2 border-brand-teal text-brand-teal rounded-2xl font-bold hover:bg-teal-50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" disabled={cart.length === 0}>
              <Receipt size={18} />
              <span className="text-[9px] uppercase tracking-wider">Tạm tính</span>
            </button>
            <button 
              onClick={() => navigate('/checkout', { state: { cart, subtotal, discount: discountAmount, total, customer } })}
              className="flex flex-col items-center justify-center gap-1 py-3 bg-brand-green text-white rounded-2xl font-bold shadow-lg shadow-brand-green/20 hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={cart.length === 0}
            >
              <PaymentIcon size={18} />
              <span className="text-[9px] uppercase tracking-wider">Thanh toán</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default POSTerminal;
