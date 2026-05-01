import React from 'react';
import { 
  Package, 
  AlertTriangle, 
  Wallet, 
  History, 
  Filter, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Check, 
  ArrowUpCircle, 
  ClipboardList,
  UserPlus,
  Calendar,
  FileText,
  Save,
  CheckCircle2,
  AlertCircle,
  Download,
  Upload,
  ArrowRight
} from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_SUPPLIERS = [
  { id: 'S1', name: 'Nhà cung cấp Sữa Đà Lạt' },
  { id: 'S2', name: 'Kho Trà Vibe Brew HQ' },
  { id: 'S3', name: 'Công ty Bao bì Xanh' },
  { id: 'S4', name: 'Thực phẩm sạch HN' },
];

const INITIAL_INVENTORY = [
  { id: 1, name: 'Sữa Tươi Nguyên Chất', category: 'Thực phẩm tươi', stock: 5, unit: 'Lít', minStock: 20, status: 'LOW' },
  { id: 2, name: 'Bột Trà Sữa Premium', category: 'Bột pha chế', stock: 45, unit: 'Kg', minStock: 10, status: 'OK' },
  { id: 3, name: 'Trân Châu Đen', category: 'Topping', stock: 8.5, unit: 'Kg', minStock: 5, status: 'WARNING' },
  { id: 4, name: 'Trà Nhài Ướp Hương', category: 'Lá trà khô', stock: 12.2, unit: 'Kg', minStock: 2, status: 'OK' },
];

const MOCK_HISTORY = [
  { id: 'NK001', type: 'NHAP', supplier: 'Nhà cung cấp Sữa Đà Lạt', date: '2026-05-01', total: 1250000, status: 'HOAN_TAT' },
  { id: 'KK042', type: 'KIEM_KE', staff: 'Nguyễn Văn A', date: '2026-04-30', diff: -2, status: 'CAN_BANG' },
  { id: 'NK002', type: 'NHAP', supplier: 'Thực phẩm sạch HN', date: '2026-04-29', total: 850000, status: 'LƯU_NHÁP' },
];

const Inventory = () => {
  const [data, setData] = React.useState(INITIAL_INVENTORY);
  const [activeTab, setActiveTab] = React.useState('Nguyên liệu');
  const [history, setHistory] = React.useState(MOCK_HISTORY);
  
  // State for Import Flow
  const [showImportForm, setShowImportForm] = React.useState(false);
  const [importSlip, setImportSlip] = React.useState({
    supplierId: '',
    date: new Date().toISOString().split('T')[0],
    note: '',
    items: [] as any[]
  });

  // State for Audit Flow
  const [showAuditForm, setShowAuditForm] = React.useState(false);
  const [auditSlip, setAuditSlip] = React.useState(data.map(item => ({
    ...item,
    actualStock: item.stock,
    reason: ''
  })));

  const updateStatus = (stock: number, minStock: number) => {
    if (stock <= minStock * 0.5) return 'LOW';
    if (stock <= minStock) return 'WARNING';
    return 'OK';
  };

  // --- Nhập kho logic ---
  const addItemToSlip = (item: any) => {
    if (importSlip.items.find(i => i.id === item.id)) return;
    setImportSlip({
      ...importSlip,
      items: [...importSlip.items, { ...item, quantity: 1, price: 0 }]
    });
  };

  const updateSlipItem = (id: number, field: string, value: any) => {
    setImportSlip({
      ...importSlip,
      items: importSlip.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  const handleFinishImport = () => {
    if (!importSlip.supplierId || importSlip.items.length === 0) {
      alert('Vui lòng chọn nhà cung cấp và thêm hàng hóa.');
      return;
    }

    const total = importSlip.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const newId = `NK${String(history.length + 1).padStart(3, '0')}`;
    const supplierName = MOCK_SUPPLIERS.find(s => s.id === importSlip.supplierId)?.name || 'N/A';

    setData(data.map(inventoryItem => {
      const importedItem = importSlip.items.find(i => i.id === inventoryItem.id);
      if (importedItem) {
        const newStock = inventoryItem.stock + Number(importedItem.quantity);
        return { ...inventoryItem, stock: newStock, status: updateStatus(newStock, inventoryItem.minStock) };
      }
      return inventoryItem;
    }));

    setHistory([{ id: newId, type: 'NHAP', supplier: supplierName, date: importSlip.date, total, status: 'HOAN_TAT' }, ...history]);
    setShowImportForm(false);
    setImportSlip({ supplierId: '', date: new Date().toISOString().split('T')[0], note: '', items: [] });
    setActiveTab('Nguyên liệu');
  };

  const handleSaveDraft = () => {
    alert('Phiếu nháp đã được lưu. Tồn kho chưa thay đổi.');
    setShowImportForm(false);
    setActiveTab('Nhập kho');
  };

  // --- Kiểm kê logic ---
  const handleUpdateAudit = (id: number, field: string, value: any) => {
    setAuditSlip(auditSlip.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleBalanceStore = () => {
    const hasDiff = auditSlip.some(item => item.actualStock !== item.stock && !item.reason);
    if (hasDiff) {
      alert('Vui lòng nhập lý do cho các mặt hàng có chênh lệch.');
      return;
    }

    const diffCount = auditSlip.filter(i => i.actualStock !== i.stock).length;
    const newId = `KK${String(history.length + 1).padStart(3, '0')}`;

    setData(auditSlip.map(item => ({
      ...item,
      stock: item.actualStock,
      status: updateStatus(item.actualStock, item.minStock)
    })));

    setHistory([{ id: newId, type: 'KIEM_KE', staff: 'Admin', date: new Date().toISOString().split('T')[0], diff: diffCount, status: 'CAN_BANG' }, ...history]);
    setShowAuditForm(false);
    setActiveTab('Nguyên liệu');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Nhập kho':
        if (showImportForm) {
          return (
            <div className="p-8 space-y-8 animate-in slide-in-from-right duration-500 bg-zinc-50/50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button onClick={() => setShowImportForm(false)} className="p-2 hover:bg-white rounded-full bg-white/50 border border-zinc-100 transition-all"><X size={20}/></button>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-800 uppercase tracking-tight">Tạo phiếu nhập kho</h3>
                    <p className="text-xs text-zinc-500 font-medium italic">Ghi nhận hàng hóa từ nhà cung cấp</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleSaveDraft} className="px-6 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm font-bold text-zinc-600 hover:bg-zinc-50 flex items-center gap-2 transition-all">
                    <Save size={18} /> Lưu nháp
                  </button>
                  <button onClick={handleFinishImport} className="px-6 py-2.5 bg-brand-green text-white rounded-xl text-sm font-bold shadow-lg shadow-green-900/10 hover:brightness-110 flex items-center gap-2 transition-all">
                    <CheckCircle2 size={18} /> Hoàn tất nhập kho
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-white p-6 rounded-[2.5rem] border border-zinc-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-50 pb-4">
                      <h4 className="font-black text-[10px] uppercase tracking-widest text-zinc-400">Danh sách hàng hóa</h4>
                      <div className="relative w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input className="pl-9 pr-4 py-2 w-full text-xs font-medium bg-zinc-50 border-none rounded-full focus:ring-2 focus:ring-brand-teal/20" placeholder="Tìm và thêm nhanh..." />
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto min-h-[200px]">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                            <th className="py-3 px-2">Nguyên liệu</th>
                            <th className="py-3 px-2">Đơn vị</th>
                            <th className="py-3 px-2 w-24">Số lượng</th>
                            <th className="py-3 px-2 w-32">Đơn giá nhập</th>
                            <th className="py-3 px-2 text-right">Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                          {importSlip.items.map(item => (
                            <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors">
                              <td className="py-4 px-2">
                                <p className="font-bold text-zinc-800 text-sm line-clamp-1">{item.name}</p>
                              </td>
                              <td className="py-4 px-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">{item.unit}</td>
                              <td className="py-4 px-2">
                                <input 
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateSlipItem(item.id, 'quantity', e.target.value)}
                                  className="w-full bg-zinc-50 border border-zinc-100 rounded-lg py-1.5 px-2 text-sm font-bold text-brand-teal focus:ring-2 focus:ring-brand-teal/20"
                                />
                              </td>
                              <td className="py-4 px-2">
                                <input 
                                  type="number"
                                  value={item.price}
                                  onChange={(e) => updateSlipItem(item.id, 'price', e.target.value)}
                                  className="w-full bg-zinc-50 border border-zinc-100 rounded-lg py-1.5 px-2 text-sm font-bold text-zinc-700 focus:ring-2 focus:ring-brand-teal/20"
                                />
                              </td>
                              <td className="py-4 px-2 text-right font-black text-sm text-zinc-800">
                                {formatCurrency(item.quantity * item.price)}
                              </td>
                            </tr>
                          ))}
                          {importSlip.items.length === 0 && (
                            <tr>
                              <td colSpan={5} className="py-12 text-center">
                                <div className="flex flex-col items-center gap-3 opacity-20">
                                  <Package size={48} />
                                  <p className="font-bold text-sm">Chưa có mặt hàng nào</p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-50">
                      {data.map(i => (
                        <button 
                          key={i.id} 
                          onClick={() => addItemToSlip(i)}
                          className={cn(
                            "px-3 py-1.5 border rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                            importSlip.items.find(si => si.id === i.id)
                              ? "bg-brand-teal text-white border-brand-teal"
                              : "bg-zinc-50 border-zinc-100 text-zinc-500 hover:border-brand-teal hover:text-brand-teal"
                          )}
                        >
                          + {i.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-[2.5rem] border border-zinc-100 shadow-sm space-y-6 sticky top-8">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                          <UserPlus size={12} /> Nhà cung cấp
                        </label>
                        <select 
                          value={importSlip.supplierId}
                          onChange={(e) => setImportSlip({...importSlip, supplierId: e.target.value})}
                          className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-3.5 px-4 text-sm font-bold focus:ring-2 focus:ring-brand-teal/20 transition-all cursor-pointer"
                        >
                          <option value="">-- Chọn nhà cung cấp --</option>
                          {MOCK_SUPPLIERS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                          <Calendar size={12} /> Ngày nhập
                        </label>
                        <input 
                          type="date"
                          value={importSlip.date}
                          onChange={(e) => setImportSlip({...importSlip, date: e.target.value})}
                          className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-3.5 px-4 text-sm font-bold focus:ring-2 focus:ring-brand-teal/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                          <FileText size={12} /> Ghi chú
                        </label>
                        <textarea 
                          rows={3}
                          value={importSlip.note}
                          onChange={(e) => setImportSlip({...importSlip, note: e.target.value})}
                          className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-3.5 px-4 text-sm font-medium resize-none focus:ring-2 focus:ring-brand-teal/20"
                          placeholder="Nhập ghi chú quan trọng..."
                        />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-zinc-50 flex flex-col gap-1">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Tổng giá trị phiếu</p>
                      <p className="text-3xl font-black text-brand-green tracking-tight">
                        {formatCurrency(importSlip.items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.price)), 0))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="p-12 flex flex-col items-center justify-center space-y-8 py-24 bg-zinc-50/50">
            <div className="w-24 h-24 bg-white rounded-[40px] border border-zinc-100 shadow-sm flex items-center justify-center text-brand-teal relative">
              <ArrowUpCircle size={48} />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-green rounded-full border-4 border-zinc-50 flex items-center justify-center text-white">
                 <Plus size={16} />
              </div>
            </div>
            <div className="text-center space-y-3 max-w-sm">
              <h3 className="text-2xl font-bold text-zinc-800 uppercase tracking-tight">Nhập kho vật tư</h3>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                Ghi nhận số lượng và giá trị nguyên vật liệu thực tế nhận từ nhà cung cấp. 
                Số lượng sẽ được cộng vào tồn kho sau khi hoàn tất.
              </p>
            </div>
            <button 
              onClick={() => setShowImportForm(true)}
              className="flex items-center gap-3 px-10 py-5 bg-brand-teal text-white rounded-[2rem] font-bold shadow-xl shadow-teal-900/20 hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest mt-4"
            >
              <Plus size={20} />
              Tạo phiếu nhập mới
            </button>
          </div>
        );

      case 'Kiểm kê':
        if (showAuditForm) {
          return (
            <div className="p-8 space-y-8 animate-in slide-in-from-right duration-500 bg-zinc-50/50">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button onClick={() => setShowAuditForm(false)} className="p-2 hover:bg-white rounded-full bg-white/50 border border-zinc-100 transition-all"><X size={20}/></button>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-800 uppercase tracking-tight">Kiểm kê định kỳ</h3>
                    <p className="text-xs text-zinc-500 font-medium italic">Đối soát hàng tồn thực tế tại cửa hàng</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-6 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm font-bold text-zinc-600 hover:bg-zinc-50 flex items-center gap-2 transition-all">
                    <Upload size={18} /> Import Excel
                  </button>
                  <button onClick={handleBalanceStore} className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-zinc-800 flex items-center gap-2 transition-all">
                    <CheckCircle2 size={18} /> Cân bằng kho
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-[40px] border border-zinc-100 shadow-sm overflow-hidden ambient-shadow">
                <div className="p-6 bg-orange-50/50 border-b border-orange-100 flex items-center gap-3 text-xs font-bold text-orange-800">
                  <AlertCircle size={16} className="text-orange-600 animate-pulse" />
                  Lưu ý: Bạn nên thực hiện kiểm kê lúc đóng ca để tránh sai lệch dữ liệu "Tồn hệ thống".
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-50 bg-zinc-50/30">
                        <th className="px-8 py-5">Nguyên vật liệu</th>
                        <th className="px-8 py-5 w-32 border-l border-zinc-50">Tồn hệ thống</th>
                        <th className="px-8 py-5 w-40 border-l border-zinc-50">Tồn thực tế</th>
                        <th className="px-8 py-5 text-center border-l border-zinc-50">Chênh lệch</th>
                        <th className="px-8 py-5 min-w-[220px] border-l border-zinc-50">Lý do điều chỉnh</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                      {auditSlip.map(item => {
                        const diff = item.actualStock - item.stock;
                        return (
                          <tr key={item.id} className={cn(
                            "hover:bg-zinc-50/30 transition-colors",
                            diff !== 0 ? "bg-red-50/10" : ""
                          )}>
                            <td className="px-8 py-5">
                              <p className="font-bold text-zinc-800 text-sm uppercase">{item.name}</p>
                              <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-0.5">{item.unit}</p>
                            </td>
                            <td className="px-8 py-5 border-l border-zinc-50 font-mono font-black text-brand-teal/60 text-base">
                              {item.stock}
                            </td>
                            <td className="px-8 py-5 border-l border-zinc-50">
                              <div className="relative group/input">
                                <input 
                                  type="number"
                                  value={item.actualStock}
                                  onChange={(e) => handleUpdateAudit(item.id, 'actualStock', Number(e.target.value))}
                                  className="w-full bg-zinc-100 border-none rounded-xl py-2 px-4 text-sm font-black text-zinc-800 focus:ring-2 focus:ring-brand-teal/20 transition-all"
                                />
                                <div className="absolute top-full left-0 opacity-0 group-focus-within/input:opacity-100 transition-opacity pt-1">
                                  <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Nhập số cân được</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-5 border-l border-zinc-50 text-center">
                              <div className={cn(
                                "inline-flex flex-col items-center justify-center min-w-[60px] p-2 rounded-2xl",
                                diff > 0 ? "bg-green-100/50 text-green-700" : 
                                diff < 0 ? "bg-red-50 text-red-600" : "bg-zinc-50 text-zinc-300"
                              )}>
                                <span className="text-xs font-black uppercase tracking-widest mb-0.5">
                                   {diff === 0 ? "Khớp" : diff > 0 ? "Thừa" : "Thiếu"}
                                </span>
                                <span className="text-sm font-black italic">
                                  {diff === 0 ? "0" : diff > 0 ? `+${diff}` : diff}
                                </span>
                              </div>
                            </td>
                            <td className="px-8 py-5 border-l border-zinc-50">
                               {diff !== 0 ? (
                                 <div className="space-y-1 animate-in zoom-in-95 duration-300">
                                   <select 
                                    value={item.reason}
                                    onChange={(e) => handleUpdateAudit(item.id, 'reason', e.target.value)}
                                    className="w-full bg-red-50 border border-red-100 rounded-2xl py-2 px-4 text-xs font-bold text-red-700 focus:ring-2 focus:ring-red-200 transition-all appearance-none cursor-pointer"
                                   >
                                      <option value="">-- Chọn lý do bắt buộc --</option>
                                      <option value="HAO_HUT">Hao hụt / Bay hơi (Tự nhiên)</option>
                                      <option value="HU_HONG">Hư hỏng / Hết hạn sử dụng</option>
                                      <option value="NHAP_SAI">Nhập kho sai đợt trước</option>
                                      <option value="MAT_MAT">Mất mát / Thất thoát</option>
                                      <option value="CAN_BANG">Cân bằng kho định kỳ</option>
                                   </select>
                                 </div>
                               ) : (
                                 <div className="flex items-center gap-2 text-green-600/30">
                                    <Check size={14} />
                                    <span className="text-[10px] font-black text-zinc-300 italic uppercase tracking-widest">Dữ liệu ổn định</span>
                                 </div>
                               )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                   </table>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="p-12 flex flex-col items-center justify-center space-y-8 py-24 bg-zinc-50/50">
            <div className="w-24 h-24 bg-white rounded-[40px] border border-zinc-100 shadow-sm flex items-center justify-center text-zinc-800 relative">
              <ClipboardList size={48} />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-zinc-900 rounded-full border-4 border-zinc-50 flex items-center justify-center text-white">
                 <History size={16} />
              </div>
            </div>
            <div className="text-center space-y-3 max-w-sm">
              <h3 className="text-2xl font-bold text-zinc-800 uppercase tracking-tight">Kiểm kê hàng hóa</h3>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                Đặc biệt quan trọng để khớp số liệu thực tế và phần mềm. 
                Thao tác [Cân bằng kho] sẽ ghi đè tồn kho hệ thống và không thể hoàn tác.
              </p>
            </div>
            <button 
              onClick={() => {
                setAuditSlip(data.map(i => ({ ...i, actualStock: i.stock, reason: '' })));
                setShowAuditForm(true);
              }}
              className="flex items-center gap-3 px-10 py-5 bg-zinc-900 text-white rounded-[2rem] font-bold shadow-xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest mt-4"
            >
              <FileText size={20} />
              Tạo phiếu kiểm kê
            </button>
          </div>
        );

      case 'Lịch sử':
        return (
          <div className="p-6 animate-in fade-in">
            <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden">
               <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-50 bg-zinc-50/30">
                    <th className="px-8 py-5">Mã phiếu</th>
                    <th className="px-8 py-5">Loại</th>
                    <th className="px-8 py-5">Đối tác / Nhân viên</th>
                    <th className="px-8 py-5">Ngày thực hiện</th>
                    <th className="px-8 py-5">Giá trị / Chênh lệch</th>
                    <th className="px-8 py-5 text-center">Trạng thái</th>
                    <th className="px-8 py-5 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {history.map(h => (
                    <tr key={h.id} className="hover:bg-zinc-50/30 transition-colors">
                      <td className="px-8 py-5 font-black text-brand-teal text-sm">{h.id}</td>
                      <td className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                        {h.type === 'NHAP' ? 'Nhập kho' : 'Kiểm kê'}
                      </td>
                      <td className="px-8 py-5 font-bold text-zinc-700 text-xs">{h.supplier || h.staff}</td>
                      <td className="px-8 py-5 text-zinc-400 text-xs font-medium">{h.date}</td>
                      <td className="px-8 py-5 font-black text-zinc-800 text-sm">
                        {h.type === 'NHAP' ? formatCurrency(h.total || 0) : `${h.diff} mặt hàng`}
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                          h.status === 'HOAN_TAT' || h.status === 'CAN_BANG' ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-400"
                        )}>
                          {h.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 text-zinc-300 hover:text-brand-teal transition-all"><ArrowRight size={18}/></button>
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
          <div className="animate-in fade-in">
            <div className="p-6 bg-red-50/50 border-b border-red-100 flex items-center gap-4">
              <div className="p-2 bg-red-100 rounded-xl text-red-600"><AlertTriangle size={24} /></div>
              <div>
                <p className="text-sm font-bold text-red-800">Cảnh báo tồn kho cực thấp</p>
                <p className="text-xs text-red-600 font-medium italic">Vui lòng nhập hàng ngay để không gián đoạn việc bán lẻ.</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-red-50/20">
                    <th className="px-8 py-4 text-red-600 font-black text-[10px] uppercase tracking-widest">Nguyên liệu</th>
                    <th className="px-8 py-4 text-red-600 font-black text-[10px] uppercase tracking-widest">Tồn hiện tại</th>
                    <th className="px-8 py-4 text-red-600 font-black text-[10px] uppercase tracking-widest">Định mức an toàn</th>
                    <th className="px-8 py-4 text-red-600 font-black text-[10px] uppercase tracking-widest text-right">Thao tác nhanh</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-50">
                  {data.filter(i => i.status === 'LOW' || i.status === 'WARNING').map(item => (
                    <tr key={item.id} className="hover:bg-red-50/30 transition-colors">
                      <td className="px-8 py-6 font-bold text-zinc-800 uppercase tracking-tight">{item.name}</td>
                      <td className="px-8 py-6 font-black text-red-600 text-xl font-mono">{item.stock} {item.unit}</td>
                      <td className="px-8 py-6 text-xs font-bold text-zinc-400 uppercase tracking-widest">{item.minStock} {item.unit}</td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => {
                            setActiveTab('Nhập kho');
                            setShowImportForm(true);
                            addItemToSlip(item);
                          }}
                          className="px-6 py-2.5 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 hover:scale-105 active:scale-95 transition-all"
                        >
                          Nhập khẩn cấp
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <div className="overflow-x-auto animate-in fade-in">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/30">
                  <th className="px-8 py-5 text-brand-teal font-black text-[10px] uppercase tracking-widest">Nguyên liệu vật tư</th>
                  <th className="px-8 py-5 text-brand-teal font-black text-[10px] uppercase tracking-widest">Phân loại</th>
                  <th className="px-8 py-5 text-brand-teal font-black text-[10px] uppercase tracking-widest">Tồn kho hiện tại</th>
                  <th className="px-8 py-5 text-brand-teal font-black text-[10px] uppercase tracking-widest">Mức an toàn</th>
                  <th className="px-8 py-5 text-brand-teal font-black text-[10px] uppercase tracking-widest">Trạng thái</th>
                  <th className="px-8 py-5 text-brand-teal font-black text-[10px] uppercase tracking-widest text-right">Quản lý</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {data.map(item => (
                  <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="font-bold text-zinc-800 uppercase tracking-tight group-hover:text-brand-teal transition-colors">{item.name}</span>
                    </td>
                    <td className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">{item.category}</td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-baseline gap-1">
                           <span className={`font-black text-lg ${item.status === 'LOW' ? 'text-red-500' : 'text-zinc-800'}`}>
                            {item.stock}
                          </span>
                          <span className="text-[10px] font-black text-zinc-400 uppercase">{item.unit}</span>
                        </div>
                        <div className="w-28 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(0,0,0,0.05)] ${
                            item.status === 'LOW' ? 'bg-red-500' : item.status === 'WARNING' ? 'bg-orange-400' : 'bg-brand-green'
                          }`} style={{ width: `${Math.min(100, (item.stock / item.minStock) * 100)}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-xs font-bold text-zinc-300 uppercase tracking-widest">{item.minStock} {item.unit}</td>
                    <td className="px-8 py-6">
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                        item.status === 'OK' ? "bg-green-100/50 text-green-700" : 
                        item.status === 'WARNING' ? "bg-orange-100/50 text-orange-700" : "bg-red-100/50 text-red-600"
                      )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", 
                          item.status === 'OK' ? "bg-green-500" : 
                          item.status === 'WARNING' ? "bg-orange-500" : "bg-red-500"
                        )} />
                        <span className="text-[9px] font-black uppercase tracking-widest">
                           {item.status === 'OK' ? 'Đầy đủ' : item.status === 'WARNING' ? 'Cần lưu ý' : 'Nguy cấp'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right space-x-1">
                      <button className="p-3 text-zinc-300 hover:text-brand-teal transition-all hover:bg-white rounded-xl"><Edit2 size={16} /></button>
                      <button className="p-3 text-zinc-300 hover:text-red-500 transition-all hover:bg-white rounded-xl"><Trash2 size={16} /></button>
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-extrabold text-zinc-800 tracking-tight">KHO VẬT TƯ</h2>
          <p className="text-zinc-500 font-medium italic">Giao diện điều khiển nhập/xuất và đối soát tồn kho thời gian thực.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-8 py-4 bg-white border border-zinc-200 text-zinc-600 rounded-[2rem] font-bold text-sm shadow-sm hover:bg-zinc-50 flex items-center gap-2 transition-all active:scale-95">
            <Download size={20} /> Export Excel
          </button>
          <button className="px-8 py-4 bg-brand-green text-white rounded-[2rem] font-bold text-sm shadow-xl shadow-green-900/10 hover:brightness-110 flex items-center gap-2 transition-all active:scale-95">
            <Plus size={20} /> Thêm vật tư mới
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatItem title="Vật tư quản lý" value={data.length.toString()} icon={Package} color="teal" />
        <StatItem title="Nguồn nguy cấp" value={data.filter(i => i.status === 'LOW').length.toString()} icon={AlertTriangle} color="red" />
        <StatItem title="Ước tính giá trị" value={formatCurrency(48250000)} icon={Wallet} color="orange" />
        <StatItem title="Lịch sử giao dịch" value={history.length.toString()} icon={History} color="blue" onClick={() => setActiveTab('Lịch sử')} />
      </div>

      <div className={cn(
        "glass-card rounded-[48px] overflow-hidden bg-white border border-zinc-100 shadow-[0_32px_64px_-32px_rgba(0,0,0,0.1)] transition-all duration-700",
        (showImportForm || showAuditForm) ? "translate-y-[-10px] ring-2 ring-brand-teal/20" : ""
      )}>
        <div className="border-b border-zinc-100 flex px-8 overflow-x-auto bg-zinc-50/10 no-scrollbar">
          {['Nguyên liệu', 'Nhập kho', 'Kiểm kê', 'Lịch sử', 'Cảnh báo'].map((tab) => (
            <button 
              key={tab} 
              disabled={showImportForm || showAuditForm}
              onClick={() => setActiveTab(tab)}
              className={cn("px-10 py-8 font-black text-[10px] uppercase tracking-[0.25em] transition-all border-b-4 relative",
                activeTab === tab 
                  ? 'border-brand-teal text-brand-teal' 
                  : 'border-transparent text-zinc-400 hover:text-zinc-600',
                (showImportForm || showAuditForm) ? "opacity-30 cursor-not-allowed" : ""
              )}
            >
              {tab}
              {activeTab === tab && <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-teal animate-in fade-in slide-in-from-bottom-1" />}
            </button>
          ))}
        </div>

        {activeTab === 'Nguyên liệu' && (
          <div className="p-10 flex flex-wrap justify-between items-center gap-4 bg-white">
            <div className="flex gap-4">
              <div className="relative group">
                <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-teal transition-colors" />
                <input 
                  type="text" 
                  placeholder="Mã số, tên nguyên liệu hoặc SKU..." 
                  className="pl-14 pr-8 py-4 bg-zinc-100 border-none rounded-3xl text-sm w-96 focus:ring-2 focus:ring-brand-teal/20 transition-all font-medium placeholder:italic"
                />
              </div>
              <button className="flex items-center gap-2 px-8 py-4 rounded-3xl bg-zinc-50 border border-zinc-100 text-xs font-black uppercase tracking-widest text-zinc-500 hover:bg-zinc-100 transition-all">
                <Filter size={18} /> Phân loại
              </button>
            </div>
            <div className="flex gap-3">
              <button className="p-4 bg-zinc-50 rounded-2xl text-zinc-400 hover:text-brand-teal transition-all border border-transparent hover:border-brand-teal/20"><Upload size={22}/></button>
              <button className="p-4 bg-zinc-50 rounded-2xl text-zinc-400 hover:text-brand-teal transition-all border border-transparent hover:border-brand-teal/20"><Download size={22}/></button>
            </div>
          </div>
        )}

        {renderContent()}
      </div>
    </div>
  );
};

const StatItem = ({ title, value, icon: Icon, color, onClick }: any) => {
  const colors = {
    teal: "text-brand-teal bg-teal-50 shadow-teal-900/5",
    red: "text-red-500 bg-red-50 shadow-red-900/5",
    orange: "text-orange-500 bg-orange-50 shadow-orange-900/5",
    blue: "text-blue-500 bg-blue-50 shadow-blue-900/5"
  };
  return (
    <div 
      onClick={onClick}
      className={cn(
        "glass-card p-8 bg-white rounded-[32px] border border-zinc-100 shadow-sm flex items-center justify-between group hover:border-brand-teal transition-all duration-700 active:scale-[0.98]",
        onClick ? "cursor-pointer" : ""
      )}
    >
      <div className="space-y-2">
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">{title}</p>
        <p className="text-3xl font-black text-zinc-800 tracking-tight">{value}</p>
      </div>
      <div className={cn("p-5 rounded-[24px] transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-xl", colors[color])}>
        <Icon size={28} />
      </div>
    </div>
  );
};

export default Inventory;
