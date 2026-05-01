import React from 'react';
import { Settings as SettingsIcon, Store, Bell, Shield, Smartphone, Globe, Save } from 'lucide-react';
import { cn } from '../lib/utils';

const Settings = () => {
  const [activeTab, setActiveTab] = React.useState('Store');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-zinc-800">Cấu hình Hệ thống</h2>
          <p className="text-zinc-500">Quản lý thiết lập cửa hàng và bảo mật tài khoản</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-full font-bold shadow-lg shadow-teal-900/10 hover:brightness-110 active:scale-95 transition-all">
          <Save size={20} />
          Lưu thay đổi
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 glass-card bg-white rounded-3xl shadow-sm border border-zinc-100 p-2 h-fit">
          <SettingCategory 
            label="Cửa hàng" 
            icon={Store} 
            active={activeTab === 'Store'} 
            onClick={() => setActiveTab('Store')} 
          />
          <SettingCategory 
            label="Thông báo" 
            icon={Bell} 
            active={activeTab === 'Notifications'} 
            onClick={() => setActiveTab('Notifications')} 
          />
          <SettingCategory 
            label="Bảo mật" 
            icon={Shield} 
            active={activeTab === 'Security'} 
            onClick={() => setActiveTab('Security')} 
          />
          <SettingCategory 
            label="Thiết bị (POS)" 
            icon={Smartphone} 
            active={activeTab === 'Devices'} 
            onClick={() => setActiveTab('Devices')} 
          />
          <SettingCategory 
            label="Ngôn ngữ" 
            icon={Globe} 
            active={activeTab === 'Language'} 
            onClick={() => setActiveTab('Language')} 
          />
        </div>

        <div className="lg:col-span-3 glass-card bg-white rounded-[32px] shadow-sm border border-zinc-100 p-8 ambient-shadow space-y-8">
          {activeTab === 'Store' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-zinc-800 border-b border-zinc-50 pb-4">Thông tin Cửa hàng</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Tên cửa hàng" defaultValue="Vibe Brew - Quận 1" />
                <InputGroup label="SĐT Liên hệ" defaultValue="028 7300 1234" />
                <InputGroup label="Mã số thuế" defaultValue="0312345678" />
                <InputGroup label="Website" defaultValue="vibe-brew.vn" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase ml-1">Địa chỉ</label>
                <textarea 
                  className="w-full bg-zinc-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-brand-teal/20 h-24"
                  defaultValue="123 Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh"
                />
              </div>
              <div className="pt-4 border-t border-zinc-50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-zinc-800">Trạng thái cửa hàng</h4>
                  <p className="text-xs text-zinc-500">Tạm thời đóng cửa chi nhánh trên hệ thống</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-teal"></div>
                </label>
              </div>
            </div>
          )}

          {activeTab !== 'Store' && (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto text-zinc-400">
                <SettingsIcon size={32} />
              </div>
              <div>
                <h3 className="font-bold text-zinc-800">Đang phát triển</h3>
                <p className="text-sm text-zinc-500 max-w-xs mx-auto">Các thiết lập nâng cao cho {activeTab} sẽ có mặt trong phiên bản cập nhật tiếp theo.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SettingCategory = ({ label, icon: Icon, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all font-bold text-sm",
      active ? "bg-brand-teal text-white shadow-lg shadow-teal-900/10" : "text-zinc-500 hover:bg-zinc-50"
    )}
  >
    <Icon size={18} />
    {label}
  </button>
);

const InputGroup = ({ label, defaultValue }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-zinc-400 uppercase ml-1">{label}</label>
    <input 
      type="text" 
      className="w-full bg-zinc-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-brand-teal/20" 
      defaultValue={defaultValue} 
    />
  </div>
);

export default Settings;
