import React from 'react';
import { Package, AlertTriangle, Wallet, History, Filter, Plus, Search, Edit2, Trash2, X, Check, ArrowUpCircle, ClipboardList } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_INVENTORY = [
  { id: 1, name: 'Sữa Tươi Nguyên Chất', category: 'Thực phẩm tươi', stock: 5, unit: 'Lít', minStock: 20, status: 'LOW' },
  { id: 2, name: 'Bột Trà Sữa Premium', category: 'Bột pha chế', stock: 45, unit: 'Kg', minStock: 10, status: 'OK' },
  { id: 3, name: 'Trân Châu Đen', category: 'Topping', stock: 8.5, unit: 'Kg', minStock: 5, status: 'WARNING' },
  { id: 4, name: 'Trà Nhài Ướp Hương', category: 'Lá trà khô', stock: 12.2, unit: 'Kg', minStock: 2, status: 'OK' },
];

const Inventory = () => {
  const [data, setData] = React.useState(INITIAL_INVENTORY);
  const [activeTab, setActiveTab] = React.useState('Nguyên liệu');
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showImportModal, setShowImportModal] = React.useState<{isOpen: boolean, item?: any}>({ isOpen: false });
  const [auditMode, setAuditMode] = React.useState(false);

  const updateStatus = (stock: number, minStock: number) => {
    if (stock <= minStock * 0.5) return 'LOW';
    if (stock <= minStock) return 'WARNING';
    return 'OK';
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem = {
      id: Date.now(),
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      stock: Number(formData.get('stock')),
      unit: formData.get('unit') as string,
      minStock: Number(formData.get('minStock')),
      status: updateStatus(Number(formData.get('stock')), Number(formData.get('minStock')))
    };
    setData([...data, newItem]);
    setShowAddModal(false);
  };

  const handleImport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = Number(formData.get('amount'));
    if (!showImportModal.item) return;

    setData(data.map(item => {
      if (item.id === showImportModal.item.id) {
        const newStock = item.stock + amount;
        return { ...item, stock: newStock, status: updateStatus(newStock, item.minStock) };
      }
      return item;
    }));
    setShowImportModal({ isOpen: false });
  };

  const handleAudit = (id: number, newStock: number) => {
    setData(data.map(item => {
      if (item.id === id) {
        return { ...item, stock: newStock, status: updateStatus(newStock, item.minStock) };
      }
      return item;
    }));
  };

  const deleteItem = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa nguyên liệu này?')) {
      setData(data.filter(i => i.id !== id));
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Nhập kho':
        return (
          <div className="p-6 space-y-4 animate-in fade-in">
            <div className="flex justify-between items-center bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center">
                  <ArrowUpCircle size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900">Tính năng Nhập kho</h4>
                  <p className="text-xs text-blue-700">Chọn nguyên liệu bên dưới để cộng thêm số lượng vào kho.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.map(item => (
                <div key={item.id} className="p-4 bg-white border border-zinc-100 rounded-2xl flex justify-between items-center hover:border-blue-200 transition-all group">
                  <div>
                    <h5 className="font-bold text-zinc-800">{item.name}</h5>
                    <p className="text-xs text-zinc-400">Hiện tại: <span className="font-bold text-zinc-600">{item.stock} {item.unit}</span></p>
                  </div>
                  <button 
                    onClick={() => setShowImportModal({ isOpen: true, item })}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-xs hover:bg-blue-600 hover:text-white transition-all"
                  >
                    Nhập thêm
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Kiểm kê':
        return (
          <div className="p-6 space-y-4 animate-in fade-in">
            <div className="flex justify-between items-center bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-800 text-white rounded-xl flex items-center justify-center">
                  <ClipboardList size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-800">Chế độ Kiểm kê</h4>
                  <p className="text-xs text-zinc-500">Cập nhật số lượng thực tế sau khi kiểm kho.</p>
                </div>
              </div>
              <button 
                onClick={() => setAuditMode(!auditMode)}
                className={cn(
                  "px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm",
                  auditMode ? "bg-brand-green text-white" : "bg-white border border-zinc-200 text-zinc-600"
                )}
              >
                {auditMode ? 'Hoàn tất kiểm kê' : 'Bắt đầu kiểm kho'}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-zinc-400 text-[10px] uppercase tracking-widest border-b border-zinc-50">
                    <th className="px-4 py-3">Nguyên liệu</th>
                    <th className="px-4 py-3">Số lượng cũ</th>
                    <th className="px-4 py-3">Số lượng mới</th>
                    <th className="px-4 py-3">Chênh lệch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {data.map(item => (
                    <tr key={item.id}>
                      <td className="px-4 py-4 font-bold text-zinc-800 text-sm">{item.name}</td>
                      <td className="px-4 py-4 text-sm text-zinc-500">{item.stock} {item.unit}</td>
                      <td className="px-4 py-4">
                        {auditMode ? (
                          <input 
                            type="number"
                            defaultValue={item.stock}
                            step="0.1"
                            onBlur={(e) => handleAudit(item.id, Number(e.target.value))}
                            className="w-24 px-3 py-1 bg-zinc-100 border-none rounded-lg text-sm font-bold focus:ring-2 focus:ring-brand-teal/20"
                          />
                        ) : (
                          <span className="text-sm font-bold text-zinc-400 italic">Chờ kiểm kê...</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs font-medium text-zinc-400">--</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Cảnh báo':
        return (
          <div className="overflow-x-auto animate-in fade-in">
             <table className="w-full text-left">
              <thead>
                <tr className="bg-red-50/50">
                  <th className="px-6 py-4 text-red-700 font-bold text-xs uppercase tracking-wider">Nguyên liệu sắp hết</th>
                  <th className="px-6 py-4 text-red-700 font-bold text-xs uppercase tracking-wider">Hiện tại</th>
                  <th className="px-6 py-4 text-red-700 font-bold text-xs uppercase tracking-wider">Định mức</th>
                  <th className="px-6 py-4 text-red-700 font-bold text-xs uppercase tracking-wider text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {data.filter(i => i.status === 'LOW' || i.status === 'WARNING').map(item => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 font-bold text-zinc-800">{item.name}</td>
                    <td className="px-6 py-4 font-bold text-red-500">{item.stock} {item.unit}</td>
                    <td className="px-6 py-4 text-sm text-zinc-500">{item.minStock} {item.unit}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setActiveTab('Nhập kho')}
                        className="text-brand-teal font-bold text-sm underline"
                      >
                        Đặt hàng ngay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return (
          <div className="overflow-x-auto animate-in fade-in">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50/50">
                  <th className="px-6 py-4 text-brand-teal font-bold text-xs uppercase tracking-wider">Nguyên liệu</th>
                  <th className="px-6 py-4 text-brand-teal font-bold text-xs uppercase tracking-wider">Phân loại</th>
                  <th className="px-6 py-4 text-brand-teal font-bold text-xs uppercase tracking-wider">Tồn kho</th>
                  <th className="px-6 py-4 text-brand-teal font-bold text-xs uppercase tracking-wider">Định mức</th>
                  <th className="px-6 py-4 text-brand-teal font-bold text-xs uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-4 text-brand-teal font-bold text-xs uppercase tracking-wider text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {data.map(item => (
                  <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-zinc-800">{item.name}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-500">{item.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`font-bold ${item.status === 'LOW' ? 'text-red-500' : 'text-zinc-800'}`}>
                          {item.stock} {item.unit}
                        </span>
                        <div className="w-24 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${
                            item.status === 'LOW' ? 'bg-red-500' : item.status === 'WARNING' ? 'bg-orange-400' : 'bg-brand-green'
                          }`} style={{ width: `${Math.min(100, (item.stock / item.minStock) * 50)}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-500">{item.minStock} {item.unit}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'OK' ? 'bg-green-100 text-green-700' : 
                        item.status === 'WARNING' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {item.status === 'OK' ? 'Đầy đủ' : item.status === 'WARNING' ? 'Cần lưu ý' : 'Sắp hết'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="p-2 text-zinc-400 hover:text-brand-teal transition-colors"><Edit2 size={16} /></button>
                      <button 
                        onClick={() => deleteItem(item.id)}
                        className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-zinc-800">Quản lý Kho</h2>
          <p className="text-zinc-500">Theo dõi nguyên liệu và định mức tồn kho chi nhánh.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-full font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all"
          >
            <Plus size={20} />
            Thêm nguyên liệu
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatItem 
          title="Tổng mặt hàng" 
          value={data.length.toString()} 
          icon={Package} 
          color="teal" 
          onClick={() => setActiveTab('Nguyên liệu')}
          active={activeTab === 'Nguyên liệu'}
        />
        <StatItem 
          title="Cần nhập kho" 
          value={data.filter(i => i.status !== 'OK').length.toString()} 
          icon={AlertTriangle} 
          color="red" 
          sub="Dưới định mức" 
          onClick={() => setActiveTab('Cảnh báo')}
          active={activeTab === 'Cảnh báo'}
        />
        <StatItem 
          title="Giá trị tồn kho" 
          value={formatCurrency(45200000)} 
          icon={Wallet} 
          color="orange" 
        />
        <StatItem 
          title="Kiểm kê gần nhất" 
          value="08:30" 
          icon={History} 
          color="green" 
          sub="Hôm nay" 
          onClick={() => setActiveTab('Kiểm kê')}
          active={activeTab === 'Kiểm kê'}
        />
      </div>

      <div className="glass-card rounded-3xl overflow-hidden ambient-shadow bg-white">
        <div className="border-b border-zinc-100 flex px-6 overflow-x-auto">
          {['Nguyên liệu', 'Nhập kho', 'Kiểm kê', 'Cảnh báo'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={cn("px-6 py-4 font-bold text-sm transition-all border-b-2 whitespace-nowrap",
                activeTab === tab 
                  ? 'border-brand-teal text-brand-teal' 
                  : 'border-transparent text-zinc-400 hover:text-zinc-600'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Nguyên liệu' && (
          <div className="p-6 flex flex-wrap justify-between items-center gap-4 border-b border-zinc-50">
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 text-sm font-semibold text-zinc-600 hover:bg-zinc-50">
                <Filter size={16} />
                Lọc theo loại
              </button>
              <div className="relative group">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Tìm nguyên liệu..." 
                  className="pl-10 pr-4 py-2 bg-zinc-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-brand-teal/20 transition-all font-be-vietnam"
                />
              </div>
            </div>
          </div>
        )}

        {renderContent()}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-zinc-800">Thêm nguyên liệu mới</h3>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-zinc-100 rounded-full"><X size={20}/></button>
              </div>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase ml-1">Tên nguyên liệu</label>
                  <input name="name" required className="w-full bg-zinc-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-brand-teal/20" placeholder="VD: Sữa tươi, Trà đen..."/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase ml-1">Phân loại</label>
                    <input name="category" required className="w-full bg-zinc-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-brand-teal/20" placeholder="VD: Sữa..."/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase ml-1">Đơn vị</label>
                    <input name="unit" required className="w-full bg-zinc-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-brand-teal/20" placeholder="VD: Kg, Lít..."/>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase ml-1">Số lượng tồn</label>
                    <input name="stock" type="number" step="0.1" required className="w-full bg-zinc-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-brand-teal/20" placeholder="0"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase ml-1">Định mức tối thiểu</label>
                    <input name="minStock" type="number" step="0.1" required className="w-full bg-zinc-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-brand-teal/20" placeholder="10"/>
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-brand-teal text-white rounded-2xl font-bold shadow-lg shadow-brand-teal/20 hover:brightness-110">Thêm vào kho</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Import Modal */}
      <AnimatePresence>
        {showImportModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowImportModal({ isOpen: false })}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-[32px] p-8 shadow-2xl space-y-6"
            >
              <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-600">Nhập kho</h3>
                  <p className="text-xs text-zinc-400 font-medium">{showImportModal.item?.name}</p>
                </div>
                <button onClick={() => setShowImportModal({ isOpen: false })} className="p-2 hover:bg-zinc-100 rounded-full"><X size={20}/></button>
              </div>
              <form onSubmit={handleImport} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase ml-1">Số lượng nhập thêm</label>
                  <div className="relative">
                    <input name="amount" type="number" step="0.1" autoFocus required className="w-full bg-blue-50 border-none rounded-2xl py-4 px-6 text-2xl font-bold text-blue-600 focus:ring-2 focus:ring-blue-200" placeholder="0.0"/>
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-blue-300">{showImportModal.item?.unit}</span>
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:brightness-110">Xác nhận nhập kho</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatItem = ({ title, value, icon: Icon, color, sub, onClick, active }: any) => {
  const colors = {
    teal: "bg-brand-teal/10 text-brand-teal",
    red: "bg-red-100 text-red-600",
    orange: "bg-orange-100 text-orange-600",
    green: "bg-brand-green/10 text-brand-green"
  };
  return (
    <div 
      onClick={onClick}
      className={cn(
        "glass-card p-6 rounded-2xl shadow-sm border transition-all duration-300",
        onClick ? "cursor-pointer hover:translate-y-[-4px] hover:shadow-md" : "",
        active ? "border-brand-teal ring-1 ring-brand-teal/20 bg-teal-50/30" : "border-white/50 bg-white"
      )}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{title}</span>
        <div className={`p-2 rounded-xl ${colors[color]}`}><Icon size={18} /></div>
      </div>
      <p className="text-2xl font-bold text-zinc-800">{value}</p>
      {sub && <p className={`text-[10px] font-bold mt-1 uppercase ${color === 'red' ? 'text-red-500' : 'text-zinc-400'}`}>{sub}</p>}
    </div>
  );
};

export default Inventory;
